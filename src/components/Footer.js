import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Footer() {
  const [hasMoved, setHasMoved] = useState(false);
  const constraintsRef = useRef(null);
  
  // Funkcja do obsługi przekierowania na GitHub po kliknięciu :)
  const handleEasterEggClick = () => {
    window.location.href = 'https://github.com/philornot';
  };
  
  // Funkcja wywoływana podczas przeciągania
  const handleDrag = (event, info) => {
    if (Math.abs(info.offset.x) > 5 || Math.abs(info.offset.y) > 5) {
      setHasMoved(true);
    }
  };

  return (
    <footer className="footer" ref={constraintsRef}>
      <div className="container footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <Link to="/">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Zapracuj na przyszłość
              </motion.div>
            </Link>
            <p className="footer-tagline">Poznaj różne ścieżki kariery</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-nav">
              <h4>Nawigacja</h4>
              <ul>
                <li><Link to="/">Strona główna</Link></li>
                <li><Link to="/o-nas">O nas</Link></li>
                <li><Link to="/tiktok">Nasze TikToki</Link></li>
                <li><Link to="/kontakt">Kontakt</Link></li>
              </ul>
            </div>
            
            <div className="footer-social">
              <h4>Social Media</h4>
              <ul>
                <li>
                  <a href="https://www.tiktok.com/@zapracuj.na.przyszlosc" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" fill="currentColor">
                      <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                    </svg>
                    TikTok
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/zapracuj.na.przyszlosc/" target="_blank" rel="noopener noreferrer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C20.102 2.381 21.621 3.924 21.769 7.152C21.827 8.417 21.838 8.797 21.838 12.001C21.838 15.206 21.826 15.585 21.769 16.85C21.62 20.075 20.105 21.621 16.85 21.769C15.584 21.827 15.206 21.839 12 21.839C8.796 21.839 8.416 21.827 7.151 21.769C3.891 21.62 2.38 20.07 2.232 16.849C2.174 15.584 2.162 15.205 2.162 12C2.162 8.796 2.175 8.417 2.232 7.151C2.381 3.924 3.896 2.38 7.151 2.232C8.417 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C2.695 0.272 0.273 2.69 0.073 7.052C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.668 0.072 16.948C0.272 21.306 2.69 23.728 7.052 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.668 23.986 16.948 23.928C21.302 23.728 23.73 21.31 23.927 16.948C23.986 15.668 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.732 2.699 21.311 0.273 16.949 0.073C15.668 0.014 15.259 0 12 0V0ZM12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.163 12 18.163C15.403 18.163 18.162 15.404 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.209 14.209 16 12 16ZM18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.595C16.965 6.39 17.61 7.035 18.406 7.035C19.201 7.035 19.845 6.39 19.845 5.595C19.845 4.8 19.201 4.155 18.406 4.155Z" fill="currentColor"/>
                    </svg>
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom" style={{ position: 'relative', minHeight: '40px' }}>
          {/* Text footer z możliwością przeciągania - zawsze widoczny */}
          <motion.p
            drag
            dragConstraints={constraintsRef}
            onDrag={handleDrag}
            whileDrag={{ scale: 1.05 }}
            style={{ 
              cursor: 'grab',
              display: 'inline-block',
              position: 'absolute',
              zIndex: 2,
              background: hasMoved ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
              padding: hasMoved ? '6px 12px' : '0',
              borderRadius: 'var(--radius-sm)',
              boxShadow: hasMoved ? 'var(--shadow-sm)' : 'none'
            }}
          >
            &copy; {new Date().getFullYear()} Zapracuj na przyszłość. Projekt w ramach olimpiady Zwolnionych z Teorii.
          </motion.p>
          
          {/* Element Easter Egg :) widoczny tylko gdy tekst został przesunięty */}
          {hasMoved && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              onClick={handleEasterEggClick}
              style={{ 
                cursor: 'pointer', 
                fontSize: '2rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                zIndex: 1
              }}
            >
              :)
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Dodanie nieco CSS dla Easter Egga */}
      <style jsx="true">{`
        .footer-bottom {
          position: relative;
          min-height: 1.6em;
        }
      `}</style>
    </footer>
  );
}

export default Footer;