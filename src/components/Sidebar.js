import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeMenu, onMenuChange, isOpen, isCollapsed, onClose, chatMessagesCount }) => {
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard Monitoring' },
    { id: 'chatbot', icon: '🤖', label: 'AI Chatbot', badge: chatMessagesCount > 1 ? chatMessagesCount - 1 : null },
    { id: 'users', icon: '👥', label: 'Users' }
  ];

  const handleMenuClick = (itemId) => {
    onMenuChange(itemId);
    if (onClose) onClose(); // Close sidebar on mobile after menu selection
  };

  return (
    <>
      {isOpen && window.innerWidth <= 768 && <div className="sidebar-overlay" onClick={onClose}></div>}
      <div className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">🌱</div>
        </div>
        {!isCollapsed && (
          <div className="user-info">
            <div className="user-name">Helmi Ridwan</div>
            <div className="user-role">Administrator</div>
          </div>
        )}
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div 
            key={item.id}
            className={`nav-item ${activeMenu === item.id ? 'active' : ''}`}
            onClick={() => handleMenuClick(item.id)}
            title={isCollapsed ? item.label : ''}
          >
            <span className="nav-icon">{item.icon}</span>
            {!isCollapsed && <span className="nav-label">{item.label}</span>}
            {item.badge && !isCollapsed && (
              <span className="nav-badge">{item.badge}</span>
            )}
            {item.badge && isCollapsed && (
              <span className="nav-badge-collapsed">{item.badge}</span>
            )}
          </div>
        ))}
      </nav>
      </div>
    </>
  );
};

export default Sidebar;