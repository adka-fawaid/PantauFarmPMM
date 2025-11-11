import React from 'react';
import NotificationBell from './NotificationBell';
import './Header.css';

const Header = ({ onAction, onMenuToggle }) => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="header">
      <div className="header-container">
        <div className="header-left">
          <button className="menu-toggle" onClick={onMenuToggle}>
            ☰
          </button>
          <div className="header-title">
            <h2>Dashboard</h2>
            <div className="header-subtitle">
              Pantau sistem Anda secara real-time untuk memastikan semuanya berjalan dengan lancar
            </div>
          </div>
        </div>
        
        <div className="header-right">
          <div className="header-info">
            <div className="datetime-info">
              {currentDate}
            </div>
            <NotificationBell />
          </div>
          
          <div className="header-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => onAction('reports')}
            >
              <span className="btn-icon">📊</span>
              <span className="btn-text">Hasilkan Penyimpanan</span>
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => onAction('stream')}
            >
              <span className="btn-icon">📺</span>
              <span className="btn-text">Alur Waktu Simi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;