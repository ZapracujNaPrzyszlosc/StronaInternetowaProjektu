import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import AnimatedStats from '../components/AnimatedCounter'; // Dodany import

function About() {
  useEffect(() => {
    document.title = 'Zapracuj na przyszłość | O nas';
  }, []);

  return (
    <div className="about-page">
      <Helmet>
        <title>Zapracuj na przyszłość | O nas</title>
        <meta name="description" content="Poznaj projekt Zapracuj na przyszłość stworzony w ramach olimpiady Zwolnieni z Teorii. Dowiedz się więcej o naszej misji i celach." />
        <meta name="keywords" content="o projekcie, zwolnieni z teorii, projekt społeczny, misja, wywiady zawodowe, projekt edukacyjny" />
        <link rel="canonical" href="https://zapracujnaprzyszlosc.pl/o-nas" />
        <meta property="og:title" content="Zapracuj na przyszłość | O nas" />
        <meta property="og:description" content="Poznaj projekt Zapracuj na przyszłość stworzony w ramach olimpiady Zwolnieni z Teorii." />
        <meta property="og:url" content="https://zapracujnaprzyszlosc.pl/o-nas" />
        <meta property="og:type" content="website" />
      </Helmet>
  
      {/* Hero Section with enhanced gradient background */}
      <section className="about-hero">
        <div className="container">
          <motion.div
            className="about-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>O projekcie</h1>
            <p className="about-subtitle">Poznaj nas i dowiedz się więcej o projekcie "Zapracuj na przyszłość"</p>
          </motion.div>
        </div>
        <div className="about-hero-bg">
          <div className="gradient-overlay"></div>
          {/* Added decorative shapes for visual interest */}
          <motion.div 
            className="hero-shape-1" 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            style={{
              position: 'absolute',
              top: '15%',
              left: '10%',
              width: '300px',
              height: '300px',
              borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              background: 'linear-gradient(135deg, rgba(126, 34, 206, 0.08) 0%, rgba(225, 29, 72, 0.08) 100%)',
              zIndex: 0,
            }}
          />
          <motion.div 
            className="hero-shape-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
            style={{
              position: 'absolute',
              bottom: '10%',
              right: '10%',
              width: '250px',
              height: '250px',
              borderRadius: '63% 37% 30% 70% / 50% 45% 55% 50%',
              background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.08) 0%, rgba(126, 34, 206, 0.08) 100%)',
              zIndex: 0,
            }}
          />
        </div>
      </section>

      {/* Mission Section with Logo */}
      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>Nasza misja</h2>
              <p>Projekt Zapracuj na przyszłość powstał w ramach olimpiady Zwolnieni z Teorii z myślą o młodych ludziach, którzy stoją przed wyborem ścieżki kariery. Naszym celem jest pokazanie, jak wygląda praca w różnych branżach, bezpośrednio od osób, które wykonują te zawody na co dzień.</p>
              <p>Wierzymy, że najlepszym sposobem na poznanie danego zawodu jest rozmowa z osobą, która już go wykonuje. Dlatego przeprowadzamy wywiady z profesjonalistami z różnych dziedzin i publikujemy je w formie krótkich, angażujących filmów na TikToku.</p>
              <p>Chcemy, aby młodzi ludzie mogli podejmować świadome decyzje dotyczące swojej przyszłości zawodowej, bazując na realnych informacjach, a nie tylko na wyobrażeniach o danym zawodzie.</p>
              
              {/* ZwolnieniZTeorii button with their brand colors */}
              <motion.a 
                href="https://zwolnienizteorii.pl/"
                target="_blank"
                rel="noopener noreferrer"
                className="zzt-button"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 15px -3px rgba(212, 1, 125, 0.3)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.75rem 1.5rem',
                  background: '#d4017d',
                  color: '#ffffff',
                  borderRadius: '2rem',
                  marginTop: '1.5rem',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgba(212, 1, 125, 0.2)',
                  textDecoration: 'none',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '0.75rem' }}>
                  <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1952 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01L9 11.01" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Projekt społeczny w ramach Zwolnionych z Teorii
              </motion.a>
            </motion.div>
            
            <motion.div
              className="about-image"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="blob-animation">
                <div className="image-placeholder">
                  {/* Replaced gradient with logo */}
                  <motion.img 
                    src="/logo512.png" 
                    alt="Zapracuj na przyszłość logo" 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'contain',
                      padding: '2rem' 
                    }} 
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tutaj zastąpiłem oryginalną sekcję stats komponentem AnimatedStats */}
      <AnimatedStats />

      {/* Goals Section with enhanced design */}
      <section className="project-goals">
        <div className="container">
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{
              fontSize: '2.5rem',
              background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              position: 'relative',
              display: 'inline-block',
              marginBottom: '1.5rem'
            }}>
              Nasze cele
              <motion.span 
                style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '4px',
                  background: 'linear-gradient(90deg, var(--primary-color), var(--secondary-color))',
                  borderRadius: '2px'
                }}
                initial={{ width: 0 }}
                whileInView={{ width: '60px' }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
            </h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-light)', maxWidth: '800px', margin: '0 auto 2rem' }}>
              Co chcemy osiągnąć poprzez projekt "Zapracuj na przyszłość"
            </p>
          </motion.div>
          
          <div className="goals-grid">
            <motion.div
              className="goal-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -10, boxShadow: 'var(--shadow-lg)' }}
            >
              <div className="goal-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.27002 6.96002L12 12L20.73 6.96002" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22.08V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Edukacja</h3>
              <p>Dostarczanie rzetelnych informacji o różnych zawodach i ścieżkach kariery, aby wspomóc proces podejmowania decyzji.</p>
            </motion.div>
            
            <motion.div
              className="goal-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10, boxShadow: 'var(--shadow-lg)' }}
            >
              <div className="goal-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 17H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 3C8.68629 3 6 5.68629 6 9C6 10.2145 6.36084 11.3447 6.98117 12.2893C7.93504 13.7486 9.24848 15.8855 10.0376 17.2428C10.3428 17.7738 10.4954 18.0393 10.7618 18.227C10.9637 18.3707 11.2252 18.498 11.5007 18.498C11.776 18.498 12 18.3711 12 18.3711C12 18.3711 12.224 18.498 12.4993 18.498C12.7748 18.498 13.0363 18.3707 13.2382 18.227C13.5046 18.0393 13.6572 17.7738 13.9624 17.2428C14.7515 15.8855 16.065 13.7486 17.0188 12.2893C17.6392 11.3447 18 10.2145 18 9C18 5.68629 15.3137 3 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              </div>
              <h3>Inspiracja</h3>
              <p>Inspirowanie młodych ludzi do odkrywania swoich pasji i zainteresowań zawodowych poprzez pokazywanie różnorodnych ścieżek kariery.</p>
            </motion.div>
            
            <motion.div
              className="goal-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10, boxShadow: 'var(--shadow-lg)' }}
            >
              <div className="goal-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 22V18C16 15.7909 14.2091 14 12 14H5C2.79086 14 1 15.7909 1 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.5 10C10.7091 10 12.5 8.20914 12.5 6C12.5 3.79086 10.7091 2 8.5 2C6.29086 2 4.5 3.79086 4.5 6C4.5 8.20914 6.29086 10 8.5 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 14H20.6C21.7 14 22.5 14.8 22.5 15.9C22.5 15.9 22.5 16.1 22.5 16.1L21 19C20.8 19.6 20.3 20 19.6 20H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 5H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Wsparcie</h3>
              <p>Tworzenie społeczności, w której młodzi ludzie mogą znaleźć wsparcie i inspirację w planowaniu swojej przyszłości zawodowej.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={{ padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
        <div 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            background: 'radial-gradient(circle at 90% 10%, rgba(126, 34, 206, 0.08) 0%, rgba(225, 29, 72, 0.08) 90%)'
          }}
        />
        <div className="container">
          <motion.div
            className="text-center"
            style={{
              maxWidth: '800px',
              margin: '0 auto',
              position: 'relative',
              zIndex: 2,
              padding: '3rem',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: 'var(--shadow-lg)'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1.5rem' }}>Chcesz zobaczyć nasze wywiady?</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--text-light)' }}>
              Obserwuj nas na TikToku, aby być na bieżąco z nowymi wywiadami i treściami!
            </p>
            <motion.a 
              href="https://www.tiktok.com/@zapracuj.na.przyszlosc" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(126, 34, 206, 0.4)' }}
              style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24" fill="currentColor" style={{marginRight: '12px'}}>
                <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
              </svg>
              Odwiedź nasz TikTok
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default About;