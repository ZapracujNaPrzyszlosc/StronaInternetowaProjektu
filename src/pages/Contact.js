import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

function Contact() {
  useEffect(() => {
    document.title = 'Zapracuj na przyszłość | Kontakt';
  }, []);

  return (
    <div className="contact-page">
      <Helmet>
        <title>Zapracuj na przyszłość | Kontakt</title>
        <meta name="description" content="Skontaktuj się z zespołem projektu Zapracuj na przyszłość. Masz pytania? Chcesz współpracować? Napisz do nas lub odwiedź nasze social media." />
        <meta name="keywords" content="kontakt, współpraca, zapytanie, social media, tiktok, instagram" />
        <link rel="canonical" href="https://zapracujnaprzyszlosc.pl/kontakt" />
        <meta property="og:title" content="Zapracuj na przyszłość | Kontakt" />
        <meta property="og:description" content="Skontaktuj się z zespołem projektu Zapracuj na przyszłość." />
        <meta property="og:url" content="https://zapracujnaprzyszlosc.pl/kontakt" />
        <meta property="og:type" content="website" />
      </Helmet>
  
      <section className="contact-hero">
        <div className="container">
          <motion.div
            className="contact-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Kontakt</h1>
            <div className="title-underline"></div>
            <p className="contact-subtitle">Masz pytania lub chcesz współpracować? Skontaktuj się z nami!</p>
          </motion.div>
        </div>
        <div className="contact-hero-bg">
          <div className="gradient-overlay"></div>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-shape-1"></div>
        <div className="contact-shape-2"></div>
        <div className="container">
          <motion.div
            className="contact-info-centered"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2>Informacje kontaktowe</h2>
            <div className="title-underline"></div>
            <p>Jesteśmy otwarci na wszelkie pytania, sugestie i propozycje współpracy. Skontaktuj się z nami za pomocą poniższych metod lub poprzez nasze profile w mediach społecznościowych.</p>
            
            <div className="contact-methods-row">
              <motion.div 
                className="contact-method"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <p>
                    zapracujnaprzyszlosc.zzt<br />
                    @gmail.com
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="contact-method"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </div>
                <div className="contact-details">
                  <h3>TikTok</h3>
                  <p>@zapracuj.na.przyszlosc</p>
                  <a 
                    href="https://www.tiktok.com/@zapracuj.na.przyszlosc" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-social-link"
                  >
                    Odwiedź nasz profil
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="contact-method"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C20.102 2.381 21.621 3.924 21.769 7.152C21.827 8.417 21.838 8.797 21.838 12.001C21.838 15.206 21.826 15.585 21.769 16.85C21.62 20.075 20.105 21.621 16.85 21.769C15.584 21.827 15.206 21.839 12 21.839C8.796 21.839 8.416 21.827 7.151 21.769C3.891 21.62 2.38 20.07 2.232 16.849C2.174 15.584 2.162 15.205 2.162 12C2.162 8.796 2.175 8.417 2.232 7.151C2.381 3.924 3.896 2.38 7.151 2.232C8.417 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C2.695 0.272 0.273 2.69 0.073 7.052C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.668 0.072 16.948C0.272 21.306 2.69 23.728 7.052 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.668 23.986 16.948 23.928C21.302 23.728 23.73 21.31 23.927 16.948C23.986 15.668 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.732 2.699 21.311 0.273 16.949 0.073C15.668 0.014 15.259 0 12 0V0ZM12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.163 12 18.163C15.403 18.163 18.162 15.404 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.209 14.209 16 12 16ZM18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.595C16.965 6.39 17.61 7.035 18.406 7.035C19.201 7.035 19.845 6.39 19.845 5.595C19.845 4.8 19.201 4.155 18.406 4.155Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="contact-details">
                  <h3>Instagram</h3>
                  <p>@zapracuj.na.przyszlosc</p>
                  <a 
                    href="https://www.instagram.com/zapracuj.na.przyszlosc/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-social-link"
                  >
                    Odwiedź nasz profil
                  </a>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="contact-cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h3>Chcesz nawiązać współpracę?</h3>
              <p>Jeśli jesteś profesjonalistą w swojej branży i chciałbyś/-abyś podzielić się swoim doświadczeniem z młodymi ludźmi, zachęcamy do kontaktu!</p>
              <div className="contact-buttons">
                <a 
                  href="mailto:zapracujnaprzyszlosc.zzt@gmail.com" 
                  className="btn btn-primary"
                >
                  Wyślij email
                </a>
                <a 
                  href="https://www.tiktok.com/@zapracuj.na.przyszlosc" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24" fill="currentColor" style={{marginRight: '8px'}}>
                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                  </svg>
                  Obserwuj nas
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="contact-bg">
          <div className="glass-effect"></div>
        </div>
      </section>
    </div>
  );
}

export default Contact;