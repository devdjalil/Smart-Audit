<template>
  <div class="message-bubble" :class="messageClasses">
    <div class="message-content">
      <div v-if="message.sender === 'assistant'" class="avatar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <div class="bubble">
        <div class="message-text">{{ message.text }}</div>
        <div class="message-time">{{ formatTime(message.timestamp) }}</div>
      </div>
      
      <div v-if="message.sender === 'user'" class="avatar user-avatar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageBubble',
  props: {
    message: {
      type: Object,
      required: true,
      validator(value) {
        return value.id && value.text && value.sender && value.timestamp
      }
    }
  },
  computed: {
    messageClasses() {
      return {
        'user-message': this.message.sender === 'user',
        'assistant-message': this.message.sender === 'assistant'
      }
    }
  },
  methods: {
    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>

<style scoped>
.message-bubble {
  display: flex;
  margin-bottom: 4px;
}

.message-content {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  max-width: 85%;
}

.user-message {
  justify-content: flex-end;
}

.user-message .message-content {
  flex-direction: row-reverse;
}

.assistant-message {
  justify-content: flex-start;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: var(--gradient-primary);
  color: white;
}

.user-avatar {
  background: var(--gradient-user);
}

.bubble {
  background-color: var(--bg-primary);
  border-radius: 18px;
  padding: 12px 16px;
  box-shadow: 0 1px 2px var(--shadow);
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
}

.user-message .bubble {
  background: var(--gradient-primary);
  color: white;
}

.message-text {
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 4px;
}

.message-time {
  font-size: 12px;
  opacity: 0.7;
  text-align: right;
}

.user-message .message-time {
  color: rgba(255, 255, 255, 0.8);
}

.assistant-message .message-time {
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .message-content {
    max-width: 90%;
    gap: 8px;
  }
  
  .avatar {
    width: 28px;
    height: 28px;
  }
  
  .bubble {
    padding: 10px 14px;
  }
  
  .message-text {
    font-size: 14px;
  }
}
</style>