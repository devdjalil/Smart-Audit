<template>
  <div class="document-item">
    <div class="document-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" stroke-width="2"/>
        <path d="M14 2V8H20" stroke="currentColor" stroke-width="2"/>
      </svg>
    </div>
    
    <div class="document-info">
      <div class="document-name">{{ document.name }}</div>
      <div class="document-meta">
        {{ formatFileSize(document.size) }} • {{ formatDate(document.uploadDate) }}
      </div>
    </div>
    
    <div class="document-actions">
      <button @click="viewDocument" class="action-btn view-btn" title="Visualiser">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" stroke-width="2"/>
          <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
      
      <button @click="deleteDocument" class="action-btn delete-btn" title="Supprimer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocumentItem',
  props: {
    document: {
      type: Object,
      required: true
    }
  },
  methods: {
    viewDocument() {
      this.$emit('view', this.document)
    },
    deleteDocument() {
      this.$emit('delete', this.document.id)
    },
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    }
  }
}
</script>

<style scoped>
.document-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin-bottom: 8px;
}

.document-item:hover {
  background-color: var(--bg-tertiary);
}

.document-icon {
  width: 40px;
  height: 40px;
  background-color: var(--bg-tertiary);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.document-info {
  flex: 1;
  min-width: 0;
}

.document-name {
  font-weight: 500;
  color: var(--text-primary);
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.document-meta {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
}

.document-actions {
  display: flex;
  gap: 4px;
}

.action-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-btn {
  color: var(--text-secondary);
}

.view-btn:hover {
  background-color: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.delete-btn {
  color: var(--text-muted);
}

.delete-btn:hover {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
</style>