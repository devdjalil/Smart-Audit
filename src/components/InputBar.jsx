import React, { useState, useRef, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'

function InputBar({ onSendMessage, onUploadDocument, disabled }) {
  const { translations } = useAppContext()
  const [messageText, setMessageText] = useState('')
  const messageInputRef = useRef(null)
  const fileInputRef = useRef(null)

  const canSend = messageText.trim().length > 0 && !disabled

  const sendMessage = () => {
    if (!canSend) return
    
    const message = messageText.trim()
    onSendMessage(message)
    
    setMessageText('')
    resetTextareaHeight()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  const adjustTextareaHeight = () => {
    const textarea = messageInputRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      const newHeight = Math.min(textarea.scrollHeight, 120)
      textarea.style.height = newHeight + 'px'
    }
  }

  const resetTextareaHeight = () => {
    const textarea = messageInputRef.current
    if (textarea) {
      textarea.style.height = 'auto'
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      onUploadDocument(file)
      // Reset input
      event.target.value = ''
    }
  }

  const handleInputChange = (e) => {
    setMessageText(e.target.value)
    adjustTextareaHeight()
  }

  useEffect(() => {
    messageInputRef.current?.focus()
  }, [])

  return (
    <div className="input-bar">
      <div className="input-container">
        <div className="input-wrapper">
          {/* Bouton d'upload */}
          <button 
            onClick={triggerFileUpload} 
            className="upload-btn"
            title={translations.uploadDocument}
            disabled={disabled}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 10L12 5L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Input file caché */}
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            accept=".pdf,.doc,.docx,.txt,.md,.json,.csv"
            style={{ display: 'none' }}
          />
          
          {/* Zone de saisie de texte */}
          <textarea
            ref={messageInputRef}
            value={messageText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={translations.typeMessage}
            className="message-input"
            rows="1"
          />
          
          {/* Bouton d'envoi */}
          <button
            onClick={sendMessage}
            disabled={!canSend}
            className={`send-button ${canSend ? 'active' : ''}`}
            title={translations.sendMessage}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        {/* Texte d'aide */}
        <div className="help-text">
          {translations.keyboardShortcut}
        </div>
      </div>
    </div>
  )
}

export default InputBar