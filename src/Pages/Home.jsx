import React from 'react'
import Media from '../Components/Media'
import { useLanguage } from '../Components/Lang'
import PageLoader from '../Components/PageLoader'
import '../Assets/Home.scss'

function Home() {
  const { t } = useLanguage()

  return (
    <PageLoader>
      <div className="home-page">
        <main>
          <section className="home-section animate-item">
              <h2 id="welcome-title" className="animate-title">{t('welcome-title')}</h2>
              <br />
              <br />
              <img src={Media.salonasGato} alt="Salonas Gato" className="bio-gato-img animate-image" />
              <h2 className="bio-title animate-title" id="about-title">{t('about-title')}</h2>
              <p className="bio-text animate-text" id="about-desc" style={{fontWeight: 600, color: '#7c6a4a'}} dangerouslySetInnerHTML={{ __html: t('about-desc') }}>
              </p>
          </section>
          <section className="home-section animate-item">
              <h2 className="bio-title animate-title" id="journey-title">{t('journey-title')}</h2>
              <p className="bio-text animate-text" id="journey-desc" style={{color: '#3a2d1a'}} dangerouslySetInnerHTML={{ __html: t('journey-desc') }}>
              </p>
              <p className="bio-text animate-text" style={{marginTop: '1.5em'}}>
               <span className="quote-highlight" id="journey-quote">{t('journey-quote')}</span>
              </p>
          </section>
          <section className="home-section animate-item">
              <h2 className="bio-title animate-title" id="interests-title">{t('interests-title')}</h2>
              <p className="bio-text animate-text" id="interests-desc" style={{color: '#3a2d1a'}} dangerouslySetInnerHTML={{ __html: t('interests-desc') }}>
              </p>
          </section>
          <section className="home-section animate-item">
              <h2 className="bio-title animate-title" id="community-title">{t('community-title')}</h2>
              <p className="bio-text animate-text" id="community-desc" style={{color: '#3a2d1a'}}>
                  {t('community-desc')}
              </p>
              <p className="bio-text animate-text" style={{marginTop: '1.5em'}}>
               <span className="quote-highlight" id="community-quote">{t('community-quote')}</span>
              </p>
          </section>
        </main>
      </div>
    </PageLoader>
  )
}

export default Home
