<template>
  <div>
    <h1>Accueil</h1>
    <div v-if="!isAuthenticated">
      <p>Vous devez vous connecter</p>
      <LoginForm />
    </div>
    <div v-else>
      <p>Bienvenue ! Utilisez le menu pour naviguer.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import LoginForm from '@/components/loginForm.vue'

const { isAuthenticated } = useAuth()
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
p {
  margin: 10px 0;
}
</style>
