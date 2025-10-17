import { defineStore } from 'pinia';
import { ref } from 'vue';
import * as auth from '../services/authService'

export interface User {
  _id: string;
  username: string;
  email: string;
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
