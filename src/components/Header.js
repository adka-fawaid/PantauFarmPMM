import React, { useState } from 'react';
import NotificationBell from './NotificationBell';
import { useScreenSize } from '../hooks/useScreenSize';
import './Header.css';
import '../styles/header-utilities.css';

const Header = ({ onAction, onMenuToggle, onLogout }) => {
  const { isMobile, isTablet } = useScreenSize();
  const [showNotification, setShowNotification] = useState(true);
  
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: isMobile ? 'short' : 'long',
    year: 'numeric',
    month: isMobile ? 'short' : 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  return (
    <div className="header">
      {/* Top section with logo and date/time */}
      <div className="header-top">
        <div className="header-brand">
          <button className="menu-toggle" onClick={onMenuToggle}>
            ☰
          </button>
          <div className="logo-section">
            <span className="brand-name">Monitoring</span>
          </div>
        </div>
        
        <div className="header-datetime">
          <span className="date-time">{currentDate}</span>
          <div className="header-controls">
            <NotificationBell />
            <button className="logout-btn" title="Logout" onClick={onLogout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 17V14H9V10H16V7L21 12L16 17M14 2A2 2 0 0 1 16 4V6H14V4H5V20H14V18H16V20A2 2 0 0 1 14 22H5A2 2 0 0 1 3 20V4A2 2 0 0 1 5 2H14Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Notification banner */}
      {showNotification && (
        <div className="notification-banner">
          <div className="notification-content">
            <span className="notification-icon">ℹ️</span>
            <span className="notification-text">Perintah akan segera dilaksanakan!</span>
            <button className="notification-close" onClick={handleNotificationClose}>✕</button>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="header-actions">
        <button 
          className="action-btn btn-orange"
          onClick={() => onAction('reports')}
        >
          <span className="btn-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM12 7C14.8 7 17 9.2 17 12V15H20V17H4V15H7V12C7 9.2 9.2 7 12 7ZM9 12V15H15V12C15 10.3 13.7 9 12 9S9 10.3 9 12Z"/>
            </svg>
          </span>
          <span className="btn-text">
            {isMobile ? 'Hentikan Penyiraman' : 'Hentikan Penyiraman'}
          </span>
        </button>
        <button 
          className="action-btn btn-blue"
          onClick={() => onAction('stream')}
        >
          <span className="btn-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM12 20C12.6 20 13 20.4 13 21C13 21.6 12.6 22 12 22C11.4 22 11 21.6 11 21C11 20.4 11.4 20 12 20ZM6 10.5C6 12.7 7.3 14 9.5 14S13 12.7 13 10.5S11.7 7 9.5 7S6 8.3 6 10.5ZM14.5 17C16.7 17 18 15.7 18 13.5S16.7 10 14.5 10S11 11.3 11 13.5S12.3 17 14.5 17Z"/>
            </svg>
          </span>
          <span className="btn-text">
            {isMobile ? 'Atur Waktu Siram' : 'Atur Waktu Siram'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;