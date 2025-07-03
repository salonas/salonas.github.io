import React, { useState, useEffect } from 'react'
import { useLanguage } from '../Components/Lang'
import PageLoader from '../Components/PageLoader'
import emailjs from '@emailjs/browser'
import '../Assets/Contact.scss'

// EmailJS configuration
const EMAILJS_USER_ID = process.env.REACT_APP_EMAILJS_USER_ID
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID

function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_USER_ID)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message
        },
        EMAILJS_USER_ID
      )
      
      setShowModal(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Failed to send message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <PageLoader>
      <div className="contact-page-root">
        <main>
          <div className="contact-container">
            <section className="contact-main-section animate-item">
              <h2 className="contact-title animate-title">{t('contact-title')}</h2>
              
              <div className="contact-content animate-item">
                <div className="contact-info-section animate-card">
                  <h3 className="contact-info-title animate-title">{t('contact-info-title')}</h3>
                  
                  <div className="contact-item animate-skill">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/732/732200.png" 
                      alt="Email"
                      className="contact-icon animate-image"
                    />
                    <div className="contact-info">
                      <div className="contact-label animate-text">
                        {t('contact-email-label')}
                      </div>
                      <a 
                        href="mailto:jsalonas2003@gmail.com"
                        className="contact-link animate-text"
                      >
                        jsalonas2003@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="contact-item animate-skill">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/25/25231.png" 
                      alt="GitHub"
                      className="contact-icon animate-image"
                    />
                    <div className="contact-info">
                      <div className="contact-label animate-text">
                        {t('contact-github-label')}
                      </div>
                      <a 
                        href="https://github.com/salonas" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link animate-text"
                      >
                        salonas
                      </a>
                    </div>
                  </div>
                  
                  <div className="contact-item animate-skill">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/2111/2111370.png" 
                      alt="Discord"
                      className="contact-icon animate-image"
                    />
                    <div className="contact-info">
                      <div className="contact-label animate-text">
                        {t('contact-discord-label')}
                      </div>
                      <a 
                        href="https://discord.gg/bvVhptgG" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-link animate-text"
                      >
                        salonas
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="contact-form-section">
                  <h3 className="contact-form-title">{t('contact-form-title')}</h3>
                  
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                      <label htmlFor="contact-name" className="form-label">
                        {t('contact-form-name-label')}
                      </label>
                      <input 
                        type="text" 
                        id="contact-name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="contact-email" className="form-label">
                        {t('contact-form-email-label')}
                      </label>
                      <input 
                        type="email" 
                        id="contact-email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="contact-message" className="form-label">
                        {t('contact-form-message-label')}
                      </label>
                      <textarea 
                        id="contact-message" 
                        name="message" 
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="form-textarea"
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="form-submit-btn"
                    >
                      {isSubmitting ? 'Sending...' : t('contact-form-send-btn')}
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Modal de confirmación */}
        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 className="modal-title">{t('contact-modal-title')}</h3>
              <p className="modal-message">{t('contact-modal-message')}</p>
              <button onClick={closeModal} className="modal-close-btn">
                {t('contact-modal-close')}
              </button>
            </div>
          </div>
        )}
      </div>
    </PageLoader>
  )
}

export default Contact
