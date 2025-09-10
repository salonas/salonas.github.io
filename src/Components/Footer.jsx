import React from 'react'
import { useLanguage } from './Lang'

function Footer() {
    const { t } = useLanguage()
    
    const scrollToTop = () => {
        // Restaurar cualquier overflow hidden que pueda estar interfiriendo
        document.body.style.overflow = 'unset';
        document.documentElement.style.overflow = 'unset';
        
        // Usar solo smooth scroll
        try {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        } catch (error) {
            console.error('Error al hacer scroll:', error);
            // Fallback final - scroll instantáneo solo si hay error
            window.scrollTo(0, 0);
        }
    };

    return (
        <div>
            <footer className="pixel-footer">
                <h1 id="footer-title" style={{textAlign: "center"}}>{t('footer-title')}</h1>
                <p id="footer-desc">{t('footer-desc')}</p>
                <button type="button" className="to-top-btn" id="footer-top-btn" onClick={scrollToTop}>
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
