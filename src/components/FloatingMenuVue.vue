<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        theme="dark"
        permanent
      >
        <v-list nav>
          <v-list-item prepend-icon="mdi-email" title="Inbox" value="inbox"></v-list-item>
          <v-list-item prepend-icon="mdi-account-supervisor-circle" title="Supervisors" value="supervisors"></v-list-item>
          <v-list-item prepend-icon="mdi-clock-start" title="Clock-in" value="clockin"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 250px"></v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'FloatingMenuVue',
  data() {
    return {
      visible: true,
      items: [
        { title: 'Accueil', icon: 'mdi-home' },
        { title: 'Profil', icon: 'mdi-account' },
        { title: 'Paramètres', icon: 'mdi-cog' },
      ],
    }
  },
}
</script>

<style scoped>
.floating-menu {
  position: fixed;
  top: 100px;
  left: 20px;
  width: 220px;
  background-color: #1e1e1e;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  overflow: hidden;
}
</style>
