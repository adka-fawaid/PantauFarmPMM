import React, { useState, useEffect, useRef } from 'react';
import NotificationBell from './NotificationBell';
import { useScreenSize } from '../hooks/useScreenSize';
import './Header.css';
import '../styles/header-utilities.css';

const Header = ({ onAction, onMenuToggle, onLogout, sidebarCollapsed }) => {
  const { isMobile, isTablet } = useScreenSize();
  const [showNotification, setShowNotification] = useState(true);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [isManualActive, setIsManualActive] = useState(false);
  const [showWateringModal, setShowWateringModal] = useState(false);
  const [wateringDuration, setWateringDuration] = useState(5);
  const [remainingTime, setRemainingTime] = useState(0);
  const timerRef = useRef(null);
  
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

  const handleAutoMode = () => {
    if (!isManualActive) {
      setIsAutoMode(!isAutoMode);
      onAction(isAutoMode ? 'disable-auto' : 'enable-auto');
    }
  };

  const handleManualWatering = () => {
    if (isManualActive) {
      // Stop manual watering
      setIsManualActive(false);
      setRemainingTime(0);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      onAction('stop-manual-watering');
    } else if (!isAutoMode) {
      // Start manual watering modal
      setShowWateringModal(true);
    }
  };

  const startManualWatering = () => {
    setShowWateringModal(false);
    setIsManualActive(true);
    setRemainingTime(wateringDuration * 60); // Convert to seconds
    
    // Disable auto mode if it was on
    if (isAutoMode) {
      setIsAutoMode(false);
    }
    
    // Start countdown timer
    timerRef.current = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          // Timer finished, stop watering
          setIsManualActive(false);
          clearInterval(timerRef.current);
          onAction('auto-stop-manual-watering');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    onAction('start-manual-watering', { duration: wateringDuration });
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const closeModal = () => {
    setShowWateringModal(false);
  };

  return (
    <div className="header">
      {/* Top section with logo and date/time */}
      <div className="header-top">
        <div className="header-brand">
          <button 
            className="menu-toggle" 
            onClick={onMenuToggle}
            title={isMobile ? 'Toggle Menu' : (sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar')}
          >
            {isMobile ? '☰' : (sidebarCollapsed ? '▶️' : '◀️')}
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
          className={`action-btn ${isAutoMode ? 'btn-green active' : 'btn-green'} ${isManualActive ? 'disabled' : ''}`}
          onClick={handleAutoMode}
          disabled={isManualActive}
        >
          <span className="btn-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/>
            </svg>
          </span>
          <span className="btn-text">
            {isAutoMode ? 'Mode Otomatis ON' : 'Automatis'}
          </span>
        </button>
        <button 
          className={`action-btn ${isManualActive ? 'btn-red active' : 'btn-blue'} ${isAutoMode ? 'disabled' : ''}`}
          onClick={handleManualWatering}
          disabled={isAutoMode}
        >
          <span className="btn-icon">
            {isManualActive ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16,8A8,8 0 0,1 8,16H16M16,16V8M8,8A8,8 0 0,1 16,16H8M8,16V8"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,18A6,6 0 0,1 6,12C6,10 8,7.75 12,3.5C16,7.75 18,10 18,12A6,6 0 0,1 12,18M12,2C7.5,7 4,10.61 4,14A8,8 0 0,0 20,14C20,10.61 16.5,7 12,2Z"/>
              </svg>
            )}
          </span>
          <span className="btn-text">
            {isManualActive ? (
              <span>
                Siram Aktif
                {remainingTime > 0 && (
                  <small style={{display: 'block', fontSize: '0.8em', opacity: 0.9}}>
                    {formatTime(remainingTime)}
                  </small>
                )}
              </span>
            ) : 'Manual Siram'}
          </span>
        </button>
      </div>

      {/* Watering Duration Modal */}
      {showWateringModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Pengaturan Penyiraman Manual</h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="duration">Durasi Penyiraman (menit):</label>
                <input
                  type="number"
                  id="duration"
                  min="1"
                  max="60"
                  value={wateringDuration}
                  onChange={(e) => setWateringDuration(Number(e.target.value))}
                  className="duration-input"
                />
                <div className="duration-presets">
                  <button 
                    className={`preset-btn ${wateringDuration === 2 ? 'active' : ''}`}
                    onClick={() => setWateringDuration(2)}
                  >
                    2 min
                  </button>
                  <button 
                    className={`preset-btn ${wateringDuration === 5 ? 'active' : ''}`}
                    onClick={() => setWateringDuration(5)}
                  >
                    5 min
                  </button>
                  <button 
                    className={`preset-btn ${wateringDuration === 10 ? 'active' : ''}`}
                    onClick={() => setWateringDuration(10)}
                  >
                    10 min
                  </button>
                  <button 
                    className={`preset-btn ${wateringDuration === 15 ? 'active' : ''}`}
                    onClick={() => setWateringDuration(15)}
                  >
                    15 min
                  </button>
                </div>
              </div>
              <div className="watering-info">
                <p>💧 Sistem akan menyiram selama <strong>{wateringDuration} menit</strong></p>
                <p>🌱 Pastikan level air mencukupi sebelum memulai</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeModal}>
                Batal
              </button>
              <button className="btn-start" onClick={startManualWatering}>
                🚿 Mulai Siram
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;