import React from 'react'
import { useAppContext } from '../context/AppContext'

function ChatHeader() {
  const { 
    translations, 
    currentLanguage, 
    isDarkMode, 
    showDocuments, 
    documentCount,
    changeLanguage,
    toggleTheme,
    toggleDocumentView
  } = useAppContext()

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value)
  }

  return (
    <header className="chat-header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">
            <img 
              src="/src/pictures/egis.png" 
              alt="Logo" 
              className="logo-header" 
              style={{ height: '35px', width: '50px' }}
            />
          </div>
          <h1 className="app-title">{translations.appTitle}</h1>
        </div>
        
        <div className="header-actions">
          {/* Sélecteur de langue */}
          <div className="language-selector">
            <select 
              value={currentLanguage} 
              onChange={handleLanguageChange} 
              className="language-select"
            >
              <option value="fr">🇫🇷 Français</option>
              <option value="en">🇺🇸 English</option>
              <option value="ar">🇸🇦 العربية</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="it">🇮🇹 Italiano</option>
              <option value="es">🇪🇸 Español</option>
              <option value="ja">🇯🇵 日本語</option>
            </select>
          </div>

          {/* Bouton documents */}
          <button 
            className={`action-btn ${showDocuments ? 'active' : ''}`}
            title={translations.viewDocuments}
            onClick={toggleDocumentView}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {documentCount > 0 && <span className="document-badge">{documentCount}</span>}
          </button>

          {/* Bouton thème */}
          <button 
            className="action-btn" 
            title={isDarkMode ? translations.lightMode : translations.darkMode}
            onClick={toggleTheme}
          >
            {isDarkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            )}
          </button>

          {/* Nouvelle conversation */}
          <button className="action-btn" title={translations.newConversation}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default ChatHeader