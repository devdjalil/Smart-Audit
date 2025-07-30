<template>
  <div class="input-bar">
    <div class="input-container">
      <div class="input-wrapper">
        <!-- Bouton d'upload -->
        <button 
          @click="triggerFileUpload" 
          class="upload-btn"
          :title="translations.uploadDocument"
          :disabled="disabled"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 10L12 5L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 5V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Input file caché -->
        <input
          ref="fileInput"
          type="file"
          @change="handleFileUpload"
          accept=".pdf,.doc,.docx,.txt,.md,.json,.csv"
          style="display: none"
        />
        
        <!-- Zone de saisie de texte -->
        <textarea
          ref="messageInput"
          v-model="messageText"
          @keydown="handleKeydown"
          @input="adjustTextareaHeight"
          :disabled="disabled"
          :placeholder="translations.typeMessage"
          class="message-input"
          rows="1"
        ></textarea>
        
        <!-- Bouton d'envoi -->
        <button
          @click="sendMessage"
          :disabled="!canSend"
          class="send-button"
          :class="{ 'active': canSend }"
          :title="translations.sendMessage"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      
      <!-- Texte d'aide -->
      <div class="help-text">
        {{ translations.keyboardShortcut }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputBar',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      messageText: ''
    }
  },
  computed: {
    translations() {
      return this.$store.getters.translations
    },
    canSend() {
      return this.messageText.trim().length > 0 && !this.disabled
    }
  },
  methods: {
    sendMessage() {
      if (!this.canSend) return
      
      const message = this.messageText.trim()
      this.$emit('send-message', message)
      
      this.messageText = ''
      this.resetTextareaHeight()
    },

    handleKeydown(event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        this.sendMessage()
      }
    },

    adjustTextareaHeight() {
      const textarea = this.$refs.messageInput
      if (textarea) {
        textarea.style.height = 'auto'
        const newHeight = Math.min(textarea.scrollHeight, 120)
        textarea.style.height = newHeight + 'px'
      }
    },

    resetTextareaHeight() {
      const textarea = this.$refs.messageInput
      if (textarea) {
        textarea.style.height = 'auto'
      }
    },

    triggerFileUpload() {
      this.$refs.fileInput.click()
    },

    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.$emit('upload-document', file)
        // Reset input
        event.target.value = ''
      }
    },

    focusInput() {
      this.$nextTick(() => {
        this.$refs.messageInput?.focus()
      })
    }
  },
  mounted() {
    this.focusInput()
  }
}
</script>

<style scoped>
.input-bar {
  background-color: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  padding: 16px 24px 24px;
  position: sticky;
  bottom: 0;
  transition: all 0.3s ease;
}

.input-container {
  max-width: 800px;
  margin: 0 auto;
}

.input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  background-color: var(--bg-tertiary);
  border: 2px solid var(--border-color);
  border-radius: 24px;
  padding: 12px 16px;
  transition: all 0.2s ease;
}

.input-wrapper:focus-within {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.upload-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.upload-btn:hover:not(:disabled) {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.upload-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.message-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  line-height: 1.5;
  resize: none;
  font-family: inherit;
  color: var(--text-primary);
  min-height: 24px;
  max-height: 120px;
}

.message-input::placeholder {
  color: var(--text-muted);
}

.message-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: var(--border-color);
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.send-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.send-button.active {
  background: var(--gradient-primary);
  color: white;
  transform: scale(1.05);
}

.send-button.active:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.help-text {
  font-size: 12px;
  color: var(--text-muted);
  text-align: center;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .input-bar {
    padding: 12px 16px 16px;
  }
  
  .input-wrapper {
    padding: 10px 14px;
    gap: 10px;
  }
  
  .message-input {
    font-size: 16px;
  }
  
  .upload-btn,
  .send-button {
    width: 36px;
    height: 36px;
  }
  
  .help-text {
    font-size: 11px;
    margin-top: 6px;
  }
}
</style>