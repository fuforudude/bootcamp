import { ref } from 'vue'
import { userService } from '@/services/userService'

export interface User {
  _id: string;
  username: string;
  email: string;
}

export function useUsers() {
  const users = ref<User[] | null>([]);

  async function fetchUsers() {
    const response = await userService.getAllUsers();
    users.value = response.data || response;
  }

  async function getUserById(id: string): Promise<User | null> {
    const response = await userService.getUserById(id);
    return response.data || response;
  }

  async function addUser(username: string, email: string, password: string) {
    await userService.addUser(username, email, password);
    await fetchUsers();
  }

  async function updateUser(id: string, username?: string, email?: string, password?: string) {
    await userService.updateUser(id, username, email, password);
    await fetchUsers();
  }

  async function deleteUser(id: string) {
    await userService.deleteUser(id);
    await fetchUsers();
  }

  return { 
    users, 
    fetchUsers, 
    getUserById,
    addUser,
    updateUser,
    deleteUser
  }
}