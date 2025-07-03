import React from 'react'
import { useLanguage } from '../Components/Lang'
import PageLoader from '../Components/PageLoader'
import orquesta1 from '../Assets/img/orquesta1.gif'
import orquesta2 from '../Assets/img/orquesta2.gif'
import '../Assets/Projects.scss'

function Projects() {
  const { t } = useLanguage()

  return (
    <PageLoader>
      <div className="projects-page">
        <main>
          <div className="projects-container">
            <section className="projects-main-section animate-item">
              <h2 className="projects-title animate-title">
                {t('projects-title')}
              </h2>
              
              <div className="project-card animate-card">
                <div className="project-left">
                  <div className="project-header compact-header">
                    <div className="project-header-main animate-text">
                      <h3 className="project-main-title animate-title">
                        {t('project-orquesta-title')}
                      </h3>
                      <h4 className="project-subtitle animate-text">
                        {t('project-orquesta-subtitle')}
                      </h4>
                      <span className="project-status animate-text">
                        {t('project-orquesta-status')}
                      </span>
                    </div>
                  </div>
                  <div className="project-gallery large-gallery animate-image">
                    <img 
                      src={orquesta1} 
                      alt="Orquesta Cobquecura 1" 
                      className="project-gif large-gif" 
                    />
                    <img 
                      src={orquesta2} 
                      alt="Orquesta Cobquecura 2" 
                      className="project-gif large-gif" 
                    />
                  </div>
                </div>
                
                <div className="project-right">
                  <div className="project-details">
                    <div className="project-detail-card">
                      <h5 className="project-detail-title">
                        {t('project-orquesta-desc-title')}
                      </h5>
                      <div className="project-detail-content">
                        {t('project-orquesta-desc')}
                      </div>
                    </div>
                    
                    <div className="project-detail-card">
                      <h5 className="project-detail-title">
                        {t('project-orquesta-features-title')}
                      </h5>
                      <div className="project-detail-content">
                        <ul>
                          <li>{t('feature-admin')}</li>
                          <li>{t('feature-academic')}</li>
                          <li>{t('feature-instruments')}</li>
                          <li>{t('feature-news')}</li>
                          <li>{t('feature-roles')}</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="project-detail-card">
                      <h5 className="project-detail-title">
                        {t('project-orquesta-tech-title')}
                      </h5>
                      <div className="project-detail-content">
                        <ul>
                          <li>{t('tech-frontend')}</li>
                          <li>{t('tech-backend')}</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="project-detail-card">
                      <h5 className="project-detail-title">
                        {t('project-orquesta-db-title')}
                      </h5>
                      <div className="project-detail-content">
                        {t('project-orquesta-db-desc')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="project-link-container">
                    <a 
                      href="https://github.com/salonas/OrquestaDeCobquecuraWEB" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      {t('project-orquesta-link')}
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </PageLoader>
  )
}

export default Projects
