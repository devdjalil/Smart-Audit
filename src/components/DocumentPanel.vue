<template>
  <div class="document-panel">
    <div class="panel-header">
      <h3>{{ translations.documents }}</h3>
      <button @click="closePanel" class="close-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
    
    <div class="documents-list">
      <div v-if="documents.length === 0" class="no-documents">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" class="empty-icon">
          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" stroke-width="2"/>
          <path d="M14 2V8H20" stroke="currentColor" stroke-width="2"/>
        </svg>
        <p>{{ translations.noDocuments }}</p>
      </div>
      
      <div v-else>
        <DocumentItem 
          v-for="document in documents" 
          :key="document.id"
          :document="document"
          @delete="deleteDocument"
          @view="viewDocument"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DocumentItem from './DocumentItem.vue'

export default {
  name: 'DocumentPanel',
  components: {
    DocumentItem
  },
  computed: {
    translations() {
      return this.$store.getters.translations
    },
    documents() {
      return this.$store.getters.documents
    }
  },
  methods: {
    closePanel() {
      this.$store.dispatch('toggleDocumentView')
    },
    deleteDocument(documentId) {
      this.$store.dispatch('deleteDocument', documentId)
    },
    viewDocument(document) {
      // Logique pour visualiser le document
      console.log('Viewing document:', document)
    }
  }
}
</script>

<style scoped>
.document-panel {
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  max-height: 300px;
  overflow-y: auto;
  transition: all 0.3s ease;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color);
}

.panel-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.close-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: var(--bg-tertiary);
  color: var(--text-primary);
}

.documents-list {
  padding: 16px 24px;
}

.no-documents {
  text-align: center;
  padding: 32px 16px;
  color: var(--text-muted);
}

.empty-icon {
  margin-bottom: 16px;
  opacity: 0.5;
}

.no-documents p {
  margin: 0;
  font-size: 14px;
}

.document-panel::-webkit-scrollbar {
  width: 6px;
}

.document-panel::-webkit-scrollbar-track {
  background: transparent;
}

.document-panel::-webkit-scrollbar-thumb {
  background-color: var(--border-color);
  border-radius: 3px;
}
</style>