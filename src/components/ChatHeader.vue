<template>
  <header class="chat-header">
    <div class="header-content">
      <div class="logo-section">
        <div class="logo-icon">
          <!-- <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg> -->


         <img :src="ImageLogo" alt=""  class="logo-header" style="height:35px; width: 50px;"/>
        </div>
        <h1 class="app-title">{{ translations.appTitle }}</h1>
      </div>
      
      <div class="header-actions">
        <!-- Sélecteur de langue -->
        <div class="language-selector">
          <select v-model="currentLanguage" @change="changeLanguage" class="language-select">
            <option value="fr">🇫🇷 Français</option>
            <option value="en">🇺🇸 English</option>
            <option value="ar">🇸🇦 العربية</option>
            <option value="de">🇩🇪 Deutsch</option>
            <option value="it">🇮🇹 Italiano</option>
            <option value="es">🇪🇸 Español</option>
            <option value="ja">🇯🇵 日本語</option>
          </select>
        </div>

        <!-- Bouton documents -->
        <button 
          class="action-btn" 
          :title="translations.viewDocuments"
          @click="toggleDocuments"
          :class="{ 'active': showDocuments }"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-if="documentCount > 0" class="document-badge">{{ documentCount }}</span>
        </button>

        <!-- Bouton thème -->
        <button 
          class="action-btn" 
          :title="isDarkMode ? translations.lightMode : translations.darkMode"
          @click="toggleTheme"
        >
          <svg v-if="isDarkMode" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
            <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>

        <!-- Nouvelle conversation -->
        <button class="action-btn" :title="translations.newConversation">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import ImageLogo from '@/pictures/egis.png'

export default {
  name: 'ChatHeader',
    data() {
    return {
      ImageLogo: ImageLogo // Ceci "utilise" ImageLogo dans le script pour ESLint
                           // et le rend disponible pour le template
    };
  },
  computed: {
    translations() {
      return this.$store.getters.translations
    },
    currentLanguage: {
      get() {
        return this.$store.getters.currentLanguage
      },
      set(value) {
        this.$store.dispatch('changeLanguage', value)
      }
    },
    isDarkMode() {
      return this.$store.getters.isDarkMode
    },
    showDocuments() {
      return this.$store.getters.showDocuments
    },
    documentCount() {
      return this.$store.getters.documentCount
    }
  },
  methods: {
    changeLanguage() {
      // La réactivité se charge du changement
    },
    toggleTheme() {
      this.$store.dispatch('toggleTheme')
    },
    toggleDocuments() {
      this.$store.dispatch('toggleDocumentView')
    }
  }
}

</script>

<style scoped>
.chat-header {
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  padding: 0 24px;
  height: 60px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: var(--gradient-primary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.app-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.language-selector {
  position: relative;
}

.language-select {
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.language-select:hover {
  border-color: var(--text-secondary);
}

.action-btn {
  width: 40px;
  height: 40px;
  border: none;
  background-color: transparent;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s ease;
  position: relative;
}

.action-btn:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}

.action-btn.active {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}

.document-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background: var(--gradient-primary);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

@media (max-width: 768px) {
  .chat-header {
    padding: 0 16px;
    height: 56px;
  }
  
  .app-title {
    font-size: 18px;
  }
  
  .logo-icon {
    width: 28px;
    height: 28px;
  }
  
  .language-select {
    font-size: 12px;
    padding: 6px 8px;
  }
}
</style>