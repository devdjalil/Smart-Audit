import React, { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import ChatHeader from './ChatHeader'
import ChatWindow from './ChatWindow'
import InputBar from './InputBar'
import DocumentPanel from './DocumentPanel'

function ChatInterface() {
  const { translations, showDocuments, uploadDocument } = useAppContext()
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [messageIdCounter, setMessageIdCounter] = useState(2)
  const chatWindowRef = useRef(null)

  useEffect(() => {
    // Message de bienvenue
    const welcomeMessage = {
      id: 1,
      text: translations.welcomeMessage,
      sender: 'assistant',
      timestamp: new Date()
    }
    setMessages([welcomeMessage])
  }, [translations.welcomeMessage])

  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollToBottom()
    }
  }

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || isTyping) return

    const userMessage = {
      id: messageIdCounter,
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setMessageIdCounter(prev => prev + 1)
    
    setTimeout(scrollToBottom, 100)
    await simulateAssistantResponse(messageText)
  }

  const handleUploadDocument = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const document = {
        name: file.name,
        size: file.size,
        type: file.type,
        content: e.target.result
      }
      
      uploadDocument(document)
      
      // Ajouter un message de confirmation
      const confirmMessage = {
        id: messageIdCounter,
        text: `📄 ${translations.documentUploaded}: ${file.name}`,
        sender: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, confirmMessage])
      setMessageIdCounter(prev => prev + 1)
      setTimeout(scrollToBottom, 100)
    }
    reader.readAsDataURL(file)
  }

  const simulateAssistantResponse = async (userMessage) => {
    setIsTyping(true)
    
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    
    const responses = [
      "C'est une excellente question ! Laissez-moi analyser cela pour vous...",
      "Je comprends votre demande. Voici ce que je peux vous dire :",
      "Intéressant ! Basé sur les documents que vous avez partagés, voici mon analyse :",
      "Merci pour cette question. Permettez-moi de vous donner une réponse détaillée :",
      "C'est un sujet fascinant. Voici mon point de vue :"
    ]
    
    const assistantMessage = {
      id: messageIdCounter,
      text: responses[Math.floor(Math.random() * responses.length)] + " " + 
            `Concernant "${userMessage}", je peux vous aider à analyser cette information.`,
      sender: 'assistant',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, assistantMessage])
    setMessageIdCounter(prev => prev + 1)
    setIsTyping(false)
    setTimeout(scrollToBottom, 100)
  }

  return (
    <div className="chat-interface">
      <ChatHeader />
      {showDocuments && <DocumentPanel />}
      <ChatWindow 
        ref={chatWindowRef}
        messages={messages} 
        isTyping={isTyping}
      />
      <InputBar 
        onSendMessage={handleSendMessage}
        onUploadDocument={handleUploadDocument}
        disabled={isTyping}
      />
    </div>
  )
}

export default ChatInterface