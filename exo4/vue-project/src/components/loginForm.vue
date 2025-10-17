<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { login: loginAuth, register: registerAuth, isAuthenticated, user } = useAuth()

const modeConnexion = ref<'login' | 'register'>('login')
const nomUtilisateur = ref('')
const emailUtilisateur = ref('')
const motDePasse = ref('')
const messageErreur = ref('')

async function login() {
  try {
    await loginAuth(emailUtilisateur.value, motDePasse.value)
  } catch (erreur: any) {
    messageErreur.value = 'Erreur de connexion'
  }
}

async function register() {
  try {
    await registerAuth(nomUtilisateur.value, emailUtilisateur.value, motDePasse.value)
    alert('Compte créé avec succès')
    modeConnexion.value = 'login'
    nomUtilisateur.value = ''
    emailUtilisateur.value = ''
    motDePasse.value = ''
  } catch (erreur: any) {
    messageErreur.value = 'Erreur lors de la création du compte'
  }
}
</script>

<template>
  <div v-if="!isAuthenticated" style="border: 2px solid #333; padding: 20px; max-width: 400px; margin: 20px auto;">
    <div style="display: flex; gap: 10px; margin-bottom: 20px;">
      <button 
        @click="modeConnexion = 'login'" 
        :style="{ 
          padding: '10px 20px', 
          cursor: 'pointer',
          background: modeConnexion === 'login' ? '#42b983' : '#ccc',
          color: modeConnexion === 'login' ? 'white' : '#333',
          border: 'none'
        }"
      >
        Connexion
      </button>
      <button 
        @click="modeConnexion = 'register'" 
        :style="{ 
          padding: '10px 20px', 
          cursor: 'pointer',
          background: modeConnexion === 'register' ? '#42b983' : '#ccc',
          color: modeConnexion === 'register' ? 'white' : '#333',
          border: 'none'
        }"
      >
        Inscription
      </button>
    </div>

    <div v-if="modeConnexion === 'login'">
      <h2>Connexion</h2>
      <div style="margin: 10px 0;">
        <input 
          v-model="emailUtilisateur" 
          type="email" 
          placeholder="Email" 
          style="width: 100%; padding: 8px; margin: 5px 0;"
        >
      </div>
      <div style="margin: 10px 0;">
        <input 
          v-model="motDePasse" 
          type="password" 
          placeholder="Mot de passe" 
          style="width: 100%; padding: 8px; margin: 5px 0;"
        >
      </div>
      <button 
        @click="login" 
        style="padding: 10px 20px; background: #42b983; color: white; border: none; cursor: pointer;"
      >
        Se connecter
      </button>
    </div>

    <div v-else>
      <h2>Inscription</h2>
      <div style="margin: 10px 0;">
        <input 
          v-model="nomUtilisateur" 
          type="text" 
          placeholder="Nom d'utilisateur" 
          style="width: 100%; padding: 8px; margin: 5px 0;"
        >
      </div>
      <div style="margin: 10px 0;">
        <input 
          v-model="emailUtilisateur" 
          type="email" 
          placeholder="Email" 
          style="width: 100%; padding: 8px; margin: 5px 0;"
        >
      </div>
      <div style="margin: 10px 0;">
        <input 
          v-model="motDePasse" 
          type="password" 
          placeholder="Mot de passe" 
          style="width: 100%; padding: 8px; margin: 5px 0;"
        >
      </div>
      <button 
        @click="register" 
        style="padding: 10px 20px; background: #42b983; color: white; border: none; cursor: pointer;"
      >
        Créer mon compte
      </button>
    </div>
    
    <p v-if="messageErreur" style="color: red; margin-top: 10px;">{{ messageErreur }}</p>
  </div>
  
  <div v-else style="padding: 20px; text-align: center;">
    <p>Connecté en tant que {{ user?.username || user?.email }}</p>
  </div>
</template>