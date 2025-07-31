import React, { createContext, useContext, useReducer } from 'react'

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

const initialState = {
  currentLanguage: 'fr',
  isDarkMode: false,
  documents: [],
  showDocuments: false
}

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, currentLanguage: action.payload }
    case 'TOGGLE_THEME':
      return { ...state, isDarkMode: !state.isDarkMode }
    case 'ADD_DOCUMENT':
      return {
        ...state,
        documents: [...state.documents, {
          id: Date.now(),
          name: action.payload.name,
          size: action.payload.size,
          type: action.payload.type,
          content: action.payload.content,
          uploadDate: new Date()
        }]
      }
    case 'REMOVE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.filter(doc => doc.id !== action.payload)
      }
    case 'TOGGLE_DOCUMENTS':
      return { ...state, showDocuments: !state.showDocuments }
    default:
      return state
  }
}

const AppContext = createContext()

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const value = {
    ...state,
    translations: translations[state.currentLanguage] || translations.fr,
    documentCount: state.documents.length,
    changeLanguage: (language) => dispatch({ type: 'SET_LANGUAGE', payload: language }),
    toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
    uploadDocument: (document) => dispatch({ type: 'ADD_DOCUMENT', payload: document }),
    deleteDocument: (documentId) => dispatch({ type: 'REMOVE_DOCUMENT', payload: documentId }),
    toggleDocumentView: () => dispatch({ type: 'TOGGLE_DOCUMENTS' })
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}