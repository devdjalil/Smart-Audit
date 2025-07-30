import { createStore } from 'vuex'

// Traductions
const translations = {
  fr: {
    appTitle: 'ConformX',
    newConversation: 'Nouvelle conversation',
    typeMessage: 'Tapez votre message...',
    sendMessage: 'Envoyer le message',
    uploadDocument: 'Télécharger un document',
    viewDocuments: 'Voir les documents',
    darkMode: 'Mode sombre',
    lightMode: 'Mode clair',
    language: 'Langue',
    welcomeMessage: "Bonjour ! Je suis ConformX, votre assistant IA. Comment puis-je vous aider aujourd'hui ?",
    keyboardShortcut: 'Appuyez sur Entrée pour envoyer, Maj+Entrée pour une nouvelle ligne',
    documentUploaded: 'Document téléchargé avec succès',
    noDocuments: 'Aucun document téléchargé',
    documents: 'Documents'
  },
  en: {
    appTitle: 'ConformX',
    newConversation: 'New conversation',
    typeMessage: 'Type your message...',
    sendMessage: 'Send message',
    uploadDocument: 'Upload document',
    viewDocuments: 'View documents',
    darkMode: 'Dark mode',
    lightMode: 'Light mode',
    language: 'Language',
    welcomeMessage: "Hello! I'm ConformX, your AI assistant. How can I help you today?",
    keyboardShortcut: 'Press Enter to send, Shift+Enter for new line',
    documentUploaded: 'Document uploaded successfully',
    noDocuments: 'No documents uploaded',
    documents: 'Documents'
  },
  ar: {
    appTitle: 'ConformX',
    newConversation: 'محادثة جديدة',
    typeMessage: 'اكتب رسالتك...',
    sendMessage: 'إرسال الرسالة',
    uploadDocument: 'تحميل مستند',
    viewDocuments: 'عرض المستندات',
    darkMode: 'الوضع المظلم',
    lightMode: 'الوضع الفاتح',
    language: 'اللغة',
    welcomeMessage: "مرحباً! أنا ConformX، مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟",
    keyboardShortcut: 'اضغط Enter للإرسال، Shift+Enter لسطر جديد',
    documentUploaded: 'تم تحميل المستند بنجاح',
    noDocuments: 'لا توجد مستندات محملة',
    documents: 'المستندات'
  },
  de: {
    appTitle: 'ConformX',
    newConversation: 'Neue Unterhaltung',
    typeMessage: 'Geben Sie Ihre Nachricht ein...',
    sendMessage: 'Nachricht senden',
    uploadDocument: 'Dokument hochladen',
    viewDocuments: 'Dokumente anzeigen',
    darkMode: 'Dunkler Modus',
    lightMode: 'Heller Modus',
    language: 'Sprache',
    welcomeMessage: "Hallo! Ich bin ConformX, Ihr KI-Assistent. Wie kann ich Ihnen heute helfen?",
    keyboardShortcut: 'Drücken Sie Enter zum Senden, Shift+Enter für neue Zeile',
    documentUploaded: 'Dokument erfolgreich hochgeladen',
    noDocuments: 'Keine Dokumente hochgeladen',
    documents: 'Dokumente'
  },
  it: {
    appTitle: 'ConformX',
    newConversation: 'Nuova conversazione',
    typeMessage: 'Digita il tuo messaggio...',
    sendMessage: 'Invia messaggio',
    uploadDocument: 'Carica documento',
    viewDocuments: 'Visualizza documenti',
    darkMode: 'Modalità scura',
    lightMode: 'Modalità chiara',
    language: 'Lingua',
    welcomeMessage: "Ciao! Sono ConformX, il tuo assistente IA. Come posso aiutarti oggi?",
    keyboardShortcut: 'Premi Invio per inviare, Shift+Invio per nuova riga',
    documentUploaded: 'Documento caricato con successo',
    noDocuments: 'Nessun documento caricato',
    documents: 'Documenti'
  },
  es: {
    appTitle: 'ConformX',
    newConversation: 'Nueva conversación',
    typeMessage: 'Escribe tu mensaje...',
    sendMessage: 'Enviar mensaje',
    uploadDocument: 'Subir documento',
    viewDocuments: 'Ver documentos',
    darkMode: 'Modo oscuro',
    lightMode: 'Modo claro',
    language: 'Idioma',
    welcomeMessage: "¡Hola! Soy ConformX, tu asistente de IA. ¿Cómo puedo ayudarte hoy?",
    keyboardShortcut: 'Presiona Enter para enviar, Shift+Enter para nueva línea',
    documentUploaded: 'Documento subido exitosamente',
    noDocuments: 'No hay documentos subidos',
    documents: 'Documentos'
  },
  ja: {
    appTitle: 'ConformX',
    newConversation: '新しい会話',
    typeMessage: 'メッセージを入力してください...',
    sendMessage: 'メッセージを送信',
    uploadDocument: 'ドキュメントをアップロード',
    viewDocuments: 'ドキュメントを表示',
    darkMode: 'ダークモード',
    lightMode: 'ライトモード',
    language: '言語',
    welcomeMessage: "こんにちは！私はConformX、あなたのAIアシスタントです。今日はどのようにお手伝いできますか？",
    keyboardShortcut: 'Enterで送信、Shift+Enterで改行',
    documentUploaded: 'ドキュメントが正常にアップロードされました',
    noDocuments: 'アップロードされたドキュメントはありません',
    documents: 'ドキュメント'
  }
}

export default createStore({
  state: {
    currentLanguage: 'fr',
    isDarkMode: false,
    documents: [],
    showDocuments: false
  },
  mutations: {
    setLanguage(state, language) {
      state.currentLanguage = language
    },
    toggleTheme(state) {
      state.isDarkMode = !state.isDarkMode
    },
    addDocument(state, document) {
      state.documents.push({
        id: Date.now(),
        name: document.name,
        size: document.size,
        type: document.type,
        content: document.content,
        uploadDate: new Date()
      })
    },
    removeDocument(state, documentId) {
      state.documents = state.documents.filter(doc => doc.id !== documentId)
    },
    toggleDocuments(state) {
      state.showDocuments = !state.showDocuments
    }
  },
  actions: {
    changeLanguage({ commit }, language) {
      commit('setLanguage', language)
    },
    toggleTheme({ commit }) {
      commit('toggleTheme')
    },
    uploadDocument({ commit }, document) {
      commit('addDocument', document)
    },
    deleteDocument({ commit }, documentId) {
      commit('removeDocument', documentId)
    },
    toggleDocumentView({ commit }) {
      commit('toggleDocuments')
    }
  },
  getters: {
    currentLanguage: (state) => state.currentLanguage,
    isDarkMode: (state) => state.isDarkMode,
    translations: (state) => translations[state.currentLanguage] || translations.fr,
    documents: (state) => state.documents,
    showDocuments: (state) => state.showDocuments,
    documentCount: (state) => state.documents.length
  }
})