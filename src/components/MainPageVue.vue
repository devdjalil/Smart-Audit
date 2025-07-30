<template>
  <v-app dark>
    <!-- Barre supérieure -->
    <v-app-bar app color="grey darken-4">
      <v-app-bar-nav-icon />
      <v-toolbar-title class="font-weight-bold">Application</v-toolbar-title>
    </v-app-bar>

    <!-- Menu latéral -->
    <v-navigation-drawer app color="grey darken-4">
        <template>
        <div>
            <FloatingMenuVue v-if="showMenu" />
            <v-btn
            v-if="!showMenu"
            fab
            small
            bottom
            left
            fixed
            class="ma-4"
            color="primary"
            @click="showMenu = true"
            >
            <v-icon>mdi-menu</v-icon>
            </v-btn>
        </div>
        </template>
    </v-navigation-drawer>

    <!-- Contenu principal -->
    <v-main class="grey darken-3">
      <v-container fluid>
        <!-- Tu peux ajouter tes composants ici -->
      </v-container>
    </v-main>

    <!-- Bouton flottant en bas à droite -->
    <v-btn
      fab
      dark
      fixed
      bottom
      right
      color="blue"
      class="ma-4"
    >
      <v-icon>mdi-github</v-icon>
    </v-btn>
  </v-app>
</template>



<script>

import FloatingMenuVue from './FloatingMenuVue'
export default {
  name: 'MainPageVue',
  props: {
  },  components: {
    FloatingMenuVue,
  }
}
</script>
<style>
.wireframe-block {
  background: #ddd;
  height: 100px;
  border: 1px dashed #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
}
</style>
