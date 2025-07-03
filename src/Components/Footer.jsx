import React from 'react'
import { useLanguage } from './Lang'

function Footer() {
    const { t } = useLanguage()
    
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <div>
            <footer className="pixel-footer">
                <h1 id="footer-title" style={{textAlign: "center"}}>{t('footer-title')}</h1>
                <p id="footer-desc">{t('footer-desc')}</p>
                <button className="to-top-btn" id="footer-top-btn" onClick={scrollToTop}>
                    {t('footer-top-btn')}
                </button>
            </footer>
            <center>
                <div className="pixel-footer-div">{t('footer-copyright')}</div>
            </center>
        </div>
    )
}

export default Footer
