import { ref, computed } from 'vue';
import { authService } from '@/services/authService';

export interface User {
  _id: string
  username: string
  email: string
}

const user = ref<User | null>(null);
const token = ref<string | null>(localStorage.getItem('token'));

export function useAuth() {
  const isAuthenticated = computed(() => !!token.value);

  async function register(username: string, email: string, password: string) {
    const response = await authService.register(username, email, password);
    return response;
  }

  async function login(email: string, password: string) {
    const response = await authService.login(email, password);
    token.value = localStorage.getItem('token');
    await getProfile();
    return response;
  }

  async function getProfile() {
    const response = await authService.connectedUser();
    user.value = response.data;
    return response;
  }

  function logout() {
    authService.logout();
    user.value = null;
    token.value = null;
  }

  if (token.value && !user.value) {
    getProfile().catch(() => {
      logout();
    });
  }

  return {
    user,
    isAuthenticated,
    register,
    login,
    getProfile,
    logout
  }
}