import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'

const ChatWindow = forwardRef(({ messages, isTyping }, ref) => {
  const chatWindowRef = useRef(null)

  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight
    }
  }

  useImperativeHandle(ref, () => ({
    scrollToBottom
  }))

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  return (
    <div className="chat-window" ref={chatWindowRef}>
      <div className="messages-container">
        {messages.map(message => (
          <MessageBubble
            key={message.id}
            message={message}
            className="message-item"
          />
        ))}
        
        {isTyping && <TypingIndicator />}
      </div>
    </div>
  )
})

ChatWindow.displayName = 'ChatWindow'

export default ChatWindow