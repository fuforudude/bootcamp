import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface User {
  id: string
  name: string
  email: string
};

export const useUserStore = defineStore('user', () => {
  const loggedUser = ref<User | null>(null);
  

  function setLoggedUser(user: User | null) {
    loggedUser.value = user
    localStorage.setItem('user', JSON.stringify(loggedUser.value));
  };
  return {
    loggedUser,
    setLoggedUser
  };
});
