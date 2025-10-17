<script setup lang="ts">;
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import UserDetails from '@/components/UserDetails.vue';
import { mockerLesUsers } from './utils/mockerladata';

const userStore = useUserStore();
const mockerladataUser = mockerLesUsers();

onMounted(() => {
  localStorage.setItem('users', JSON.stringify(mockerladataUser))

  userStore.setLoggedUser({
    id: '4',
    name: 'Pipoune Keduback',
    email: 'pipoune.keduback@example.com'
  });
});
</script>

<template>
  <div class="app">
    <h1>Gestion des utilisateurs</h1>
    <UserDetails userId="1" />
    <UserDetails userId="2" />
    <UserDetails userId="3" />
    <UserDetails userId="4" />
    <UserDetails userId="999" />
  </div>
</template>