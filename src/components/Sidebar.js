import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeMenu, onMenuChange, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'monitoring', icon: '📈', label: 'Monitoring' },
    { id: 'chatbot', icon: '🤖', label: 'AI Chatbot' },
    { id: 'logout', icon: '🚪', label: 'Logout' }
  ];

  const handleMenuClick = (itemId) => {
    onMenuChange(itemId);
    if (onClose) onClose(); // Close sidebar on mobile after menu selection
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">🌱</div>
        </div>
        <div className="user-info">
          <div className="user-name">Helmi Ridwan</div>
          <div className="user-role">Administrator</div>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div 
            key={item.id}
            className={`nav-item ${activeMenu === item.id ? 'active' : ''}`}
            onClick={() => handleMenuClick(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </nav>
      </div>
    </>
  );
};

export default Sidebar;