import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

function About() {
  useEffect(() => {
    document.title = 'Zapracuj na przyszłość | O nas';
  }, []);

  return (
    <div className="about-page">
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
              <p>Projekt "Zapracuj na przyszłość" powstał w ramach olimpiady "Zwolnieni z Teorii" z myślą o młodych ludziach, którzy stoją przed wyborem ścieżki kariery. Naszym celem jest pokazanie, jak wygląda praca w różnych branżach, bezpośrednio od osób, które wykonują te zawody na co dzień.</p>
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

      {/* Stats Section with improved styling */}
      <section className="project-stats" style={{ background: 'var(--background-light)' }}>
        <div className="container">
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '3rem' }}
          >
            <h2 style={{
              fontSize: '2.5rem',
              background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
            }}>Nasze osiągnięcia</h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-light)', maxWidth: '800px', margin: '0 auto' }}>
              Rezultaty naszej pracy i zasięg projektu
            </p>
          </motion.div>
          
          <div className="stats-grid">
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="stat-number">20+</h3>
              <p>Przeprowadzonych wywiadów</p>
            </motion.div>
            
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="stat-number">15+</h3>
              <p>Zaprezentowanych branż</p>
            </motion.div>
            
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="stat-number">5000+</h3>
              <p>Obserwujących na TikToku</p>
            </motion.div>
            
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="stat-number">100k+</h3>
              <p>Łącznych wyświetleń</p>
            </motion.div>
          </div>
        </div>
      </section>

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
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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