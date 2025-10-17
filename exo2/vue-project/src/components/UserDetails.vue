<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useUsers } from '@/composables/useUsers';
import type { User } from '@/composables/useUsers';

const props = defineProps<{ userId?: string }>();
const userStore = useUserStore();
const { getUserById } = useUsers();

const user = ref<User | null>(null);
const loggedUser = computed(() => 
  userStore.loggedUser?.id === props.userId
);

const isLoggedUser = computed(() => loggedUser.value);

watchEffect(() => {
  if (!props.userId) {
    user.value = null
  } else if (loggedUser.value == true) {
    user.value = userStore.loggedUser
  } else {
    user.value = getUserById(props.userId)
  };
});
</script>

<template>
  <div v-if="!user">Utilisateur introuvable</div>
  <div v-else>
    <h2>{{ user.name }}</h2>
    <span v-if="isLoggedUser">C'est moi</span>
    <p>{{ user.email }}</p>
    <button v-if="isLoggedUser">Modifier mon profil</button>
    <button v-else>Contacter</button>
  </div>
</template>