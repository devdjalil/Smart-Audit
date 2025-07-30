<template>
  <div class="typing-indicator">
    <div class="typing-content">
      <div class="avatar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <div class="typing-bubble">
        <div class="typing-dots">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TypingIndicator'
}
</script>

<style scoped>
.typing-indicator {
  display: flex;
  justify-content: flex-start;
  animation: fadeInUp 0.3s ease-out;
}

.typing-content {
  display: flex;
  align-items: flex-end;
  gap: 12px;
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

.typing-bubble {
  background-color: var(--bg-primary);
  border-radius: 18px;
  padding: 16px 20px;
  box-shadow: 0 1px 2px var(--shadow);
}

.typing-dots {
  display: flex;
  gap: 4px;
  align-items: center;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--text-muted);
  animation: typing 1.4s infinite ease-in-out;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
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

@media (max-width: 768px) {
  .typing-content {
    gap: 8px;
  }
  
  .avatar {
    width: 28px;
    height: 28px;
  }
  
  .typing-bubble {
    padding: 12px 16px;
  }
}
</style>