<template>
  <div id="app" :class="{ 'dark-theme': isDarkMode }">
    <ChatInterface />
  </div>
</template>

<script>
import ChatInterface from './components/ChatInterface.vue'

export default {
  name: 'App',
  components: {
    ChatInterface
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Light theme colors */
  --bg-primary: #ffffff;
  --bg-secondary: #f7f7f8;
  --bg-tertiary: #f8f9fa;
  --text-primary: #1a1a1a;
  --text-secondary: #9ca3af;
  --text-muted: #9ca3af;
  --border-color: #e5e5e7;
  --shadow: rgba(0, 0, 0, 0.1);
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-user: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.dark-theme {
  /* Dark theme colors */
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --bg-tertiary: #3a3a3a;
  --text-primary: #ffffff;
  --text-secondary: #d1d5db;
  --text-muted: #9ca3af;
  --border-color: #404040;
  --shadow: rgba(0, 0, 0, 0.3);
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-user: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  transition: all 0.3s ease;
}

body {
  margin: 0;
  height: 100vh;
  overflow: hidden;
}
</style>