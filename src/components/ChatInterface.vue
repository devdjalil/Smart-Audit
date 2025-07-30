<template>
  <div class="chat-interface">
    <!-- En-tête de l'application -->
    <ChatHeader />
    
    <!-- Panneau des documents (conditionnel) -->
    <DocumentPanel v-if="showDocuments" />
    
    <!-- Zone de conversation principale -->
    <ChatWindow 
      :messages="messages" 
      :is-typing="isTyping"
      @scroll-to-bottom="scrollToBottom"
    />
    
    <!-- Barre de saisie fixe en bas -->
    <InputBar 
      @send-message="handleSendMessage"
      @upload-document="handleUploadDocument"
      :disabled="isTyping"
    />
  </div>
</template>

<script>
import ChatHeader from './ChatHeader.vue'
import ChatWindow from './ChatWindow.vue'
import InputBar from './InputBar.vue'
import DocumentPanel from './DocumentPanel.vue'

export default {
  name: 'ChatInterface',
  components: {
    ChatHeader,
    ChatWindow,
    InputBar,
    DocumentPanel
  },
  data() {
    return {
      messages: [],
      isTyping: false,
      messageIdCounter: 2
    }
  },
  computed: {
    translations() {
      return this.$store.getters.translations
    },
    showDocuments() {
      return this.$store.getters.showDocuments
    }
  },
  methods: {
    /**
     * Gère l'envoi d'un nouveau message utilisateur
     */
    async handleSendMessage(messageText) {
      if (!messageText.trim() || this.isTyping) return

      const userMessage = {
        id: this.messageIdCounter++,
        text: messageText,
        sender: 'user',
        timestamp: new Date()
      }
      
      this.messages.push(userMessage)
      this.scrollToBottom()

      await this.simulateAssistantResponse(messageText)
    },

    /**
     * Gère l'upload de documents
     */
    handleUploadDocument(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const document = {
          name: file.name,
          size: file.size,
          type: file.type,
          content: e.target.result
        }
        
        this.$store.dispatch('uploadDocument', document)
        
        // Ajouter un message de confirmation
        const confirmMessage = {
          id: this.messageIdCounter++,
          text: `📄 ${this.translations.documentUploaded}: ${file.name}`,
          sender: 'assistant',
          timestamp: new Date()
        }
        this.messages.push(confirmMessage)
        this.scrollToBottom()
      }
      reader.readAsDataURL(file)
    },

    /**
     * Simule une réponse de l'assistant
     */
    async simulateAssistantResponse(userMessage) {
      this.isTyping = true
      
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
      
      const responses = [
        "C'est une excellente question ! Laissez-moi analyser cela pour vous...",
        "Je comprends votre demande. Voici ce que je peux vous dire :",
        "Intéressant ! Basé sur les documents que vous avez partagés, voici mon analyse :",
        "Merci pour cette question. Permettez-moi de vous donner une réponse détaillée :",
        "C'est un sujet fascinant. Voici mon point de vue :"
      ]
      
      const assistantMessage = {
        id: this.messageIdCounter++,
        text: responses[Math.floor(Math.random() * responses.length)] + " " + 
              `Concernant "${userMessage}", je peux vous aider à analyser cette information.`,
        sender: 'assistant',
        timestamp: new Date()
      }
      
      this.messages.push(assistantMessage)
      this.isTyping = false
      this.scrollToBottom()
    },

    /**
     * Force le scroll vers le bas
     */
    scrollToBottom() {
      this.$nextTick(() => {
        const chatWindow = this.$el.querySelector('.chat-window')
        if (chatWindow) {
          chatWindow.scrollTop = chatWindow.scrollHeight
        }
      })
    }
  },
  mounted() {
    // Message de bienvenue
    const welcomeMessage = {
      id: 1,
      text: this.translations.welcomeMessage,
      sender: 'assistant',
      timestamp: new Date()
    }
    this.messages.push(welcomeMessage)
  }
}
</script>

<style scoped>
.chat-interface {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--bg-secondary);
}
</style>