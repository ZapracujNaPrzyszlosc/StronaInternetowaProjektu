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
              Co chcemy osiągnąć przez nasz projekt
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
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap-icon lucide-graduation-cap">
                  <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/>
                  <path d="M22 10v6"/>
                  <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb-icon lucide-lightbulb">
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                  <path d="M9 18h6"/>
                  <path d="M10 22h4"/>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-handshake-icon lucide-heart-handshake">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                  <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/>
                  <path d="m18 15-2-2"/>
                  <path d="m15 18-2-2"/>
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