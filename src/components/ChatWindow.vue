<template>
  <div class="chat-window" ref="chatWindow">
    <div class="messages-container">
      <MessageBubble
        v-for="message in messages"
        :key="message.id"
        :message="message"
        class="message-item"
      />
      
      <TypingIndicator v-if="isTyping" />
    </div>
  </div>
</template>

<script>
import MessageBubble from './MessageBubble.vue'
import TypingIndicator from './TypingIndicator.vue'

export default {
  name: 'ChatWindow',
  components: {
    MessageBubble,
    TypingIndicator
  },
  props: {
    messages: {
      type: Array,
      required: true
    },
    isTyping: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    messages: {
      handler() {
        this.$nextTick(() => {
          this.scrollToBottom()
        })
      },
      deep: true
    },
    
    isTyping() {
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  },
  methods: {
    scrollToBottom() {
      const chatWindow = this.$refs.chatWindow
      if (chatWindow) {
        chatWindow.scrollTop = chatWindow.scrollHeight
      }
    }
  }
}
</script>

<style scoped>
.chat-window {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background-color: var(--bg-secondary);
}

.messages-container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.chat-window::-webkit-scrollbar {
  width: 6px;
}

.chat-window::-webkit-scrollbar-track {
  background: transparent;
}

.chat-window::-webkit-scrollbar-thumb {
  background-color: var(--border-color);
  border-radius: 3px;
}

.chat-window::-webkit-scrollbar-thumb:hover {
  background-color: var(--text-muted);
}

@media (max-width: 768px) {
  .chat-window {
    padding: 16px;
  }
  
  .messages-container {
    gap: 12px;
  }
}
</style>