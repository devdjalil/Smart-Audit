import React from 'react'
import { useAppContext } from './context/AppContext'
import ChatInterface from './components/ChatInterface'

function App() {
  const { isDarkMode } = useAppContext()

  return (
    <div className={`app ${isDarkMode ? 'dark-theme' : ''}`}>
      <ChatInterface />
    </div>
  )
}

export default App