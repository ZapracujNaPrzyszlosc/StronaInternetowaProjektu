import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

function Home() {
  useEffect(() => {
    document.title = 'Zapracuj na przyszłość | Strona główna';
  }, []);

  return (
    <div className="home-page">
      <Helmet>
        <title>Zapracuj na przyszłość | Strona główna</title>
        <meta name="description" content="Zapracuj na przyszłość to projekt społeczny pomagający młodym ludziom w wyborze ścieżki kariery poprzez wywiady z profesjonalistami z różnych branż na TikToku." />
        <meta name="keywords" content="kariera, wybór zawodu, ścieżka kariery, wywiady zawodowe, tiktok, zawody, profesjonaliści, zwolnieni z teorii" />
        <link rel="canonical" href="https://zapracujnaprzyszlosc.pl/" />
        <meta property="og:title" content="Zapracuj na przyszłość | Strona główna" />
        <meta property="og:description" content="Poznaj różne ścieżki kariery poprzez rozmowy z profesjonalistami na naszym TikToku." />
        <meta property="og:url" content="https://zapracujnaprzyszlosc.pl/" />
        <meta property="og:type" content="website" />
      </Helmet>
  
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
                <Link to="/o-nas" className="btn btn-primary">O projekcie</Link>
                <a href="https://www.tiktok.com/@zapracuj.na.przyszlosc" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24" fill="currentColor" style={{marginRight: '8px'}}>
                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                  </svg>
                  Zobacz nasze TikToki
                </a>
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
                    allowFullScreen={true}
                    allow="encrypted-media; fullscreen"
                    title="TikTok Zapracuj na przyszłość - osadzony profil"
                    style={{ overflow: 'hidden' }}
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
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                  <path d="M9 18h6"/>
                  <path d="M10 22h4"/>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"></path>
                  <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
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
              allow="encrypted-media;"
              title="Najnowsze materiały z TikToka - Zapracuj na przyszłość"
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
            <h2>Wspieraj nasz projekt</h2>
            <p>Obserwuj nas w mediach społecznościowych, aby odkrywać nowe zawody i inspirować się do świadomego planowania kariery. Regularnie publikujemy nowe wywiady i treści!</p>
            <div className="cta-buttons">
              <a href="https://www.tiktok.com/@zapracuj.na.przyszlosc" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24" fill="currentColor" style={{marginRight: '8px'}}>
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                </svg>
                Obserwuj na TikToku
              </a>
              <a href="https://www.instagram.com/zapracuj.na.przyszlosc/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{marginRight: '8px'}}>
                  <path d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C20.102 2.381 21.621 3.924 21.769 7.152C21.827 8.417 21.838 8.797 21.838 12.001C21.838 15.206 21.826 15.585 21.769 16.85C21.62 20.075 20.105 21.621 16.85 21.769C15.584 21.827 15.206 21.839 12 21.839C8.796 21.839 8.416 21.827 7.151 21.769C3.891 21.62 2.38 20.07 2.232 16.849C2.174 15.584 2.162 15.205 2.162 12C2.162 8.796 2.175 8.417 2.232 7.151C2.381 3.924 3.896 2.38 7.151 2.232C8.417 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C2.695 0.272 0.273 2.69 0.073 7.052C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.668 0.072 16.948C0.272 21.306 2.69 23.728 7.052 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.668 23.986 16.948 23.928C21.302 23.728 23.73 21.31 23.927 16.948C23.986 15.668 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.732 2.699 21.311 0.273 16.949 0.073C15.668 0.014 15.259 0 12 0V0ZM12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.163 12 18.163C15.403 18.163 18.162 15.404 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.209 14.209 16 12 16ZM18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.595C16.965 6.39 17.61 7.035 18.406 7.035C19.201 7.035 19.845 6.39 19.845 5.595C19.845 4.8 19.201 4.155 18.406 4.155Z" />
                </svg>
                Obserwuj na Instagramie
              </a>
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