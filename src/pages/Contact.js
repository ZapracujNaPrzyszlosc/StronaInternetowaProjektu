import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  useEffect(() => {
    document.title = 'Zapracuj na przyszłość | Kontakt';
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <motion.div
            className="contact-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Kontakt</h1>
            <p className="contact-subtitle">Masz pytania lub chcesz współpracować? Skontaktuj się z nami!</p>
          </motion.div>
        </div>
        <div className="contact-hero-bg">
          <div className="gradient-overlay"></div>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2>Informacje kontaktowe</h2>
              <p>Jesteśmy otwarci na wszelkie pytania, sugestie i propozycje współpracy. Skontaktuj się z nami za pomocą formularza lub poprzez nasze profile w mediach społecznościowych.</p>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.27097 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.2165 3.36163C2.30513 3.09849 2.44757 2.85669 2.63477 2.65162C2.82196 2.44655 3.04981 2.28271 3.30379 2.17052C3.55778 2.05833 3.83234 2.00026 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04208 3.23945 9.11 3.72C9.23668 4.68007 9.47151 5.62273 9.81 6.53C9.94454 6.88792 9.97366 7.27691 9.8939 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51356 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0555 17.47 14.19C18.3773 14.5285 19.3199 14.7633 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="contact-details">
                    <h3>Telefon</h3>
                    <p>+48 123 456 789</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="contact-details">
                    <h3>Email</h3>
                    <p>kontakt@zapracujnaprzyszlosc.pl</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.321 5.562C18.1707 4.42133 17.5587 2.86067 17.592 1.20667H13.1953V16.3267C13.1853 17.102 12.884 17.8453 12.3587 18.3947C11.8333 18.944 11.1213 19.2733 10.3467 19.318C10.146 19.324 9.942 19.304 9.74467 19.258C8.70867 19.096 7.78067 18.456 7.23733 17.5233C7.19503 17.457 7.15237 17.391 7.10933 17.3247C6.65999 16.495 6.56399 15.5137 6.84667 14.6027C7.13067 13.6863 7.78267 12.9167 8.652 12.498C9.48867 12.0997 10.4613 12.0843 11.3033 12.4747V8.00533C11.0047 7.96067 10.7047 7.95333 10.404 7.97933C9.18933 8.05267 8.01067 8.44667 6.97933 9.12467C5.68533 9.95667 4.66533 11.1507 4.0587 12.5783C3.71467 13.402 3.52667 14.276 3.49933 15.162C3.48667 15.518 3.50267 15.876 3.54733 16.2313C3.68067 17.2347 4.03067 18.208 4.57467 19.074C5.43467 20.4167 6.732 21.4413 8.24733 21.976C9.18867 22.3113 10.1807 22.4553 11.172 22.3993C12.3047 22.3313 13.418 22.0393 14.4347 21.5453C15.8593 20.856 17.0627 19.7613 17.912 18.3993C18.5387 17.3933 18.918 16.2593 19.022 15.0907C19.0567 14.762 19.0727 14.4307 19.0673 14.0987V7.0887C19.396 7.35667 19.7407 7.6 20.0973 7.81867C21.2333 8.508 22.5033 8.92067 23.8333 9.04V4.65733C22.304 4.52133 20.8427 4.03067 19.5513 3.218C19.3873 4.01333 19.058 4.77067 18.5793 5.4387C18.8407 5.46533 19.0827 5.51667 19.321 5.562Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="contact-details">
                    <h3>TikTok</h3>
                    <p>@zapracuj.na.przyszlosc</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C20.102 2.381 21.621 3.924 21.769 7.152C21.827 8.417 21.838 8.797 21.838 12.001C21.838 15.206 21.826 15.585 21.769 16.85C21.62 20.075 20.105 21.621 16.85 21.769C15.584 21.827 15.206 21.839 12 21.839C8.796 21.839 8.416 21.827 7.151 21.769C3.891 21.62 2.38 20.07 2.232 16.849C2.174 15.584 2.162 15.205 2.162 12C2.162 8.796 2.175 8.417 2.232 7.151C2.381 3.924 3.896 2.38 7.151 2.232C8.417 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C2.695 0.272 0.273 2.69 0.073 7.052C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.668 0.072 16.948C0.272 21.306 2.69 23.728 7.052 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.668 23.986 16.948 23.928C21.302 23.728 23.73 21.31 23.927 16.948C23.986 15.668 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.732 2.699 21.311 0.273 16.949 0.073C15.668 0.014 15.259 0 12 0V0ZM12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.163 12 18.163C15.403 18.163 18.162 15.404 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.209 14.209 16 12 16ZM18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.595C16.965 6.39 17.61 7.035 18.406 7.035C19.201 7.035 19.845 6.39 19.845 5.595C19.845 4.8 19.201 4.155 18.406 4.155Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="contact-details">
                    <h3>Instagram</h3>
                    <p>@zapracuj.na.przyszlosc</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="contact-form-container"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="form-card">
                <h2>Wyślij wiadomość</h2>
                
                {submitStatus === 'success' ? (
                  <div className="success-message">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1952 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18457 2.99721 7.13633 4.39828 5.49707C5.79935 3.85782 7.69279 2.71538 9.79619 2.24015C11.8996 1.76491 14.1003 1.98234 16.07 2.86" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 4L12 14.01L9 11.01" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p>Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name">Imię i nazwisko</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email">Adres email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="message">Wiadomość</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="button-loader"></span>
                          Wysyłanie...
                        </>
                      ) : 'Wyślij wiadomość'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
        <div className="contact-bg">
          <div className="glass-effect"></div>
        </div>
      </section>
    </div>
  );
}

export default Contact;