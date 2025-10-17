<template>
  <header>
    <nav v-if="isAuthenticated">
      <router-link to="/">Accueil</router-link>
      <router-link to="/admin">Administration</router-link>
      <router-link to="/search">Recherche</router-link>
      <span>{{ user?.username || user?.email }}</span>
      <button @click="seDeconnecter">Deconnexion</button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

const { user, isAuthenticated, logout } = useAuth()
const router = useRouter()

function seDeconnecter() {
  logout()
  router.push('/')
}
</script>

<style scoped>
header {
  background: #333;
  padding: 15px;
  margin-bottom: 20px;
}

nav {
  display: flex;
  gap: 15px;
  align-items: center;
}

a {
  color: white;
  text-decoration: none;
  padding: 8px 12px;
}

a:hover, a.router-link-active {
  background: #555;
}

span {
  color: white;
  margin-left: auto;
}

button {
  padding: 8px 12px;
  cursor: pointer;
}
</style>