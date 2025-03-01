import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  useEffect(() => {
    document.title = 'Zapracuj na przyszłość | Strona główna';
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1>Zapracuj na przyszłość</h1>
              <p className="hero-subtitle">Poznaj różne ścieżki kariery poprzez rozmowy z profesjonalistami</p>
              <div className="hero-buttons">
                <Link to="/about" className="btn btn-primary">O projekcie</Link>
                <a href="https://www.tiktok.com/@zapracuj.na.przyszlosc" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Zobacz nasze TikToki</a>
              </div>
            </motion.div>
            
            <motion.div
              className="hero-image"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="blob-animation">
                <div className="tiktok-placeholder">
                  <iframe 
                    src="https://www.tiktok.com/embed/@zapracuj.na.przyszlosc" 
                    allowFullScreen 
                    scrolling="no" 
                    allow="encrypted-media;"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="hero-bg">
          <div className="gradient-overlay"></div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Nasz projekt</h2>
            <p>Pomagamy młodym ludziom w wyborze ścieżki kariery</p>
          </motion.div>
          
          <div className="features-grid">
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Wywiady z profesjonalistami</h3>
              <p>Rozmawiamy z ludźmi z różnych branż, aby pokazać, jak wygląda ich praca na co dzień</p>
            </motion.div>
            
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 12V22H4V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 7H2V12H22V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Inspirujące treści</h3>
              <p>Tworzymy krótkie, angażujące materiały, które mogą zainspirować do odkrywania nowych możliwości zawodowych</p>
            </motion.div>
            
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 20.9999V18.9999C22.9993 18.1136 22.7044 17.2527 22.1614 16.5522C21.6184 15.8517 20.8581 15.3515 20 15.1299" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.12988C16.8604 3.35018 17.623 3.85058 18.1676 4.55219C18.7122 5.2538 19.0078 6.11671 19.0078 7.00488C19.0078 7.89305 18.7122 8.75596 18.1676 9.45757C17.623 10.1592 16.8604 10.6596 16 10.8799" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Społeczność</h3>
              <p>Budujemy społeczność młodych ludzi, którzy chcą świadomie rozwijać swoją karierę</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="tiktok-preview-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Nasze najnowsze TikToki</h2>
            <p>Zobacz, jak wygląda praca w różnych branżach</p>
          </motion.div>
          
          <div className="tiktok-grid">
            <div className="tiktok-embed-container">
              <iframe 
                src="https://www.tiktok.com/embed/@zapracuj.na.przyszlosc" 
                allowFullScreen 
                scrolling="no" 
                allow="encrypted-media;"
              ></iframe>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/tiktok" className="btn btn-primary">Zobacz więcej</Link>
          </div>
        </div>
        <div className="gradient-bg"></div>
      </section>
      
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Zostań częścią naszego projektu</h2>
            <p>Obserwuj nas na TikToku i Instagramie, aby być na bieżąco z nowymi filmami i treściami</p>
            <div className="cta-buttons">
              <a href="https://www.tiktok.com/@zapracuj.na.przyszlosc" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Obserwuj na TikToku</a>
              <a href="https://www.instagram.com/zapracuj.na.przyszlosc/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Obserwuj na Instagramie</a>
            </div>
          </motion.div>
        </div>
        <div className="cta-bg">
          <div className="glass-effect"></div>
        </div>
      </section>
    </div>
  );
}

export default Home;