<template>
  <div>
    <div v-if="!isAuthenticated">
      <p>Vous devez etre connecte pour acceder à cette page</p>
      <button @click="$router.push('/')">Se connecter</button>
    </div>

    <div v-else>
      <h1>Gestion des utilisateurs</h1>
      
      <button @click="afficherFormulaire = !afficherFormulaire">Ajouter un utilisateur</button>
      <button @click="chargerUtilisateurs">Actualiser</button>

      <div v-if="afficherFormulaire" style="margin: 20px 0; padding: 15px; border: 1px solid #ddd;">
        <h3>Nouvel utilisateur</h3>
        <input v-model="nouvelUtilisateur.username" type="text" placeholder="Nom d'utilisateur" />
        <input v-model="nouvelUtilisateur.email" type="email" placeholder="Email" />
        <input v-model="nouvelUtilisateur.password" type="password" placeholder="Mot de passe" />
        <button @click="ajouterUtilisateur">Creer</button>
        <button @click="afficherFormulaire = false">Annuler</button>
      </div>

      <div v-for="utilisateur in listeUtilisateurs" :key="utilisateur._id" style="border: 1px solid #ccc; margin: 10px 0; padding: 10px;">
        <h3>{{ utilisateur.username }}</h3>
        <p>{{ utilisateur.email }}</p>
        <button @click="supprimerUtilisateur(utilisateur._id)">Supprimer</button>
      </div>

      <p v-if="listeUtilisateurs.length === 0">Aucun utilisateur</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUsers } from '@/composables/useUsers'
import { useAuth } from '@/composables/useAuth'

const { users: listeUtilisateurs, fetchUsers, addUser, deleteUser } = useUsers()
const { isAuthenticated } = useAuth()

const afficherFormulaire = ref(false)
const nouvelUtilisateur = ref({
  username: '',
  email: '',
  password: ''
})

onMounted(() => {
  if (isAuthenticated.value) {
    chargerUtilisateurs()
  }
})

async function chargerUtilisateurs() {
  try {
    await fetchUsers()
  } catch (erreur) {
    console.error(erreur)
  }
}

async function ajouterUtilisateur() {
  try {
    await addUser(nouvelUtilisateur.value.username, nouvelUtilisateur.value.email, nouvelUtilisateur.value.password)
    nouvelUtilisateur.value = { username: '', email: '', password: '' }
    afficherFormulaire.value = false
    alert('Utilisateur cree')
  } catch (erreur) {
    alert('Erreur')
  }
}

async function supprimerUtilisateur(id: string) {
  if (!confirm('Confirmer la suppression ?')) return
  try {
    await deleteUser(id)
    alert('Utilisateur supprime')
  } catch (erreur) {
    alert('Erreur')
  }
}
</script>

<style scoped>
button {
  margin: 5px;
  padding: 8px 12px;
  cursor: pointer;
}
input {
  display: block;
  margin: 10px 0;
  padding: 8px;
  width: 100%;
  max-width: 300px;
}
</style>
