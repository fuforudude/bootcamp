<template>
  <div>
    <div v-if="!isAuthenticated">
      <p>Vous devez etre connecte pour acceder a cette page</p>
      <button @click="$router.push('/')">Se connecter</button>
    </div>

    <div v-else>
      <h1>Rechercher un utilisateur</h1>
      
      <input 
        v-model="recherche" 
        type="text" 
        placeholder="Rechercher par nom ou email"
        style="padding: 10px; width: 100%; max-width: 400px;"
      />

      <div v-if="utilisateursFiltres.length > 0" style="margin-top: 20px;">
        <p>{{ utilisateursFiltres.length }} resultat(s)</p>
        <div v-for="utilisateur in utilisateursFiltres" :key="utilisateur._id" style="border: 1px solid #ccc; margin: 10px 0; padding: 10px;">
          <h3>{{ utilisateur.username }}</h3>
          <p>{{ utilisateur.email }}</p>
        </div>
      </div>

      <p v-else-if="recherche">Aucun resultat</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUsers } from '@/composables/useUsers'
import { useAuth } from '@/composables/useAuth'

const { users: listeUtilisateurs, fetchUsers } = useUsers()
const { isAuthenticated } = useAuth()
const recherche = ref('')

onMounted(() => {
  if (isAuthenticated.value) {
    fetchUsers()
  }
})

const utilisateursFiltres = computed(() => {
  if (!recherche.value) return []
  
  const termesRecherche = recherche.value.toLowerCase()
  return listeUtilisateurs.value 
    ? listeUtilisateurs.value.filter(utilisateur => 
        utilisateur.username.toLowerCase().includes(termesRecherche) || 
        utilisateur.email.toLowerCase().includes(termesRecherche)
      )
    : []
})
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
button {
  padding: 8px 12px;
  cursor: pointer;
}
</style>
