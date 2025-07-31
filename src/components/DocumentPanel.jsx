import React from 'react'
import { useAppContext } from '../context/AppContext'
import DocumentItem from './DocumentItem'

function DocumentPanel() {
  const { translations, documents, toggleDocumentView, deleteDocument } = useAppContext()

  const handleDeleteDocument = (documentId) => {
    deleteDocument(documentId)
  }

  const handleViewDocument = (document) => {
    console.log('Viewing document:', document)
  }

  return (
    <div className="document-panel">
      <div className="panel-header">
        <h3>{translations.documents}</h3>
        <button onClick={toggleDocumentView} className="close-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
      
      <div className="documents-list">
        {documents.length === 0 ? (
          <div className="no-documents">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="empty-icon">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <p>{translations.noDocuments}</p>
          </div>
        ) : (
          <div>
            {documents.map(document => (
              <DocumentItem 
                key={document.id}
                document={document}
                onDelete={handleDeleteDocument}
                onView={handleViewDocument}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentPanel