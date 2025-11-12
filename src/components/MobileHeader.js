import React from 'react';
import './MobileHeader.css';

const MobileHeader = ({ onMenuToggle, title = 'Dashboard', notifications = 0 }) => {
  return (
    <div className="mobile-header">
      <button 
        className="mobile-menu-btn" 
        onClick={onMenuToggle}
        aria-label="Open menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
      
      <h1 className="mobile-title">{title}</h1>
      
      <div className="mobile-actions">
        <button className="mobile-notification-btn">
          🔔
          {notifications > 0 && (
            <span className="notification-badge">{notifications}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default MobileHeader;