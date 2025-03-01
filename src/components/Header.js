import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Zapracuj na przyszłość
          </motion.div>
        </Link>

        <div className={`mobile-menu-button ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/" onClick={() => setMenuOpen(false)}>Strona główna</Link>
            </li>
            <li className={location.pathname === '/about' ? 'active' : ''}>
              <Link to="/about" onClick={() => setMenuOpen(false)}>O nas</Link>
            </li>
            <li className={location.pathname === '/tiktok' ? 'active' : ''}>
              <Link to="/tiktok" onClick={() => setMenuOpen(false)}>Nasze TikToki</Link>
            </li>
            <li className={location.pathname === '/contact' ? 'active' : ''}>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>Kontakt</Link>
            </li>
            <li className="social-link">
              <a href="https://www.tiktok.com/@zapracuj.na.przyszlosc" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.321 5.562C18.1707 4.42133 17.5587 2.86067 17.592 1.20667H13.1953V16.3267C13.1853 17.102 12.884 17.8453 12.3587 18.3947C11.8333 18.944 11.1213 19.2733 10.3467 19.318C10.146 19.324 9.942 19.304 9.74467 19.258C8.70867 19.096 7.78067 18.456 7.23733 17.5233C7.19503 17.457 7.15237 17.391 7.10933 17.3247C6.65999 16.495 6.56399 15.5137 6.84667 14.6027C7.13067 13.6863 7.78267 12.9167 8.652 12.498C9.48867 12.0997 10.4613 12.0843 11.3033 12.4747V8.00533C11.0047 7.96067 10.7047 7.95333 10.404 7.97933C9.18933 8.05267 8.01067 8.44667 6.97933 9.12467C5.68533 9.95667 4.66533 11.1507 4.0587 12.5783C3.71467 13.402 3.52667 14.276 3.49933 15.162C3.48667 15.518 3.50267 15.876 3.54733 16.2313C3.68067 17.2347 4.03067 18.208 4.57467 19.074C5.43467 20.4167 6.732 21.4413 8.24733 21.976C9.18867 22.3113 10.1807 22.4553 11.172 22.3993C12.3047 22.3313 13.418 22.0393 14.4347 21.5453C15.8593 20.856 17.0627 19.7613 17.912 18.3993C18.5387 17.3933 18.918 16.2593 19.022 15.0907C19.0567 14.762 19.0727 14.4307 19.0673 14.0987V7.0887C19.396 7.35667 19.7407 7.6 20.0973 7.81867C21.2333 8.508 22.5033 8.92067 23.8333 9.04V4.65733C22.304 4.52133 20.8427 4.03067 19.5513 3.218C19.3873 4.01333 19.058 4.77067 18.5793 5.4387C18.8407 5.46533 19.0827 5.51667 19.321 5.562Z" fill="currentColor"/>
                </svg>
              </a>
            </li>
            <li className="social-link">
              <a href="https://www.instagram.com/zapracuj.na.przyszlosc/" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C20.102 2.381 21.621 3.924 21.769 7.152C21.827 8.417 21.838 8.797 21.838 12.001C21.838 15.206 21.826 15.585 21.769 16.85C21.62 20.075 20.105 21.621 16.85 21.769C15.584 21.827 15.206 21.839 12 21.839C8.796 21.839 8.416 21.827 7.151 21.769C3.891 21.62 2.38 20.07 2.232 16.849C2.174 15.584 2.162 15.205 2.162 12C2.162 8.796 2.175 8.417 2.232 7.151C2.381 3.924 3.896 2.38 7.151 2.232C8.417 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C2.695 0.272 0.273 2.69 0.073 7.052C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.668 0.072 16.948C0.272 21.306 2.69 23.728 7.052 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.668 23.986 16.948 23.928C21.302 23.728 23.73 21.31 23.927 16.948C23.986 15.668 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.732 2.699 21.311 0.273 16.949 0.073C15.668 0.014 15.259 0 12 0V0ZM12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.163 12 18.163C15.403 18.163 18.162 15.404 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.209 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.209 14.209 16 12 16ZM18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.595C16.965 6.39 17.61 7.035 18.406 7.035C19.201 7.035 19.845 6.39 19.845 5.595C19.845 4.8 19.201 4.155 18.406 4.155Z" fill="currentColor"/>
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;