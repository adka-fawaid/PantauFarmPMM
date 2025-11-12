import React, { useState } from 'react';
import NotificationBell from './NotificationBell';
import { useScreenSize } from '../hooks/useScreenSize';
import './Header.css';
import '../styles/header-utilities.css';

const Header = ({ onAction, onMenuToggle }) => {
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
            <button className="settings-btn" title="Settings">⚙️</button>
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
          <span className="btn-icon">�</span>
          <span className="btn-text">
            {isMobile ? 'Hentikan Penyiraman' : 'Hentikan Penyiraman'}
          </span>
        </button>
        <button 
          className="action-btn btn-blue"
          onClick={() => onAction('stream')}
        >
          <span className="btn-icon">📺</span>
          <span className="btn-text">
            {isMobile ? 'Atur Waktu Siram' : 'Atur Waktu Siram'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;