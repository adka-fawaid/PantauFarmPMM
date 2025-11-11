import React, { useState } from 'react';
import './NotificationBell.css';

const NotificationBell = () => {
  const [notifications] = useState([
    { id: 1, message: 'Kelembaban tanah mencapai level optimal', type: 'success', time: '5 menit lalu' },
    { id: 2, message: 'Jarak air sensor perlu perhatian', type: 'warning', time: '15 menit lalu' },
    { id: 3, message: 'Suhu meningkat di atas normal', type: 'error', time: '1 jam lalu' }
  ]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="notification-bell">
      <button 
        className="bell-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        🔔
        {notifications.length > 0 && (
          <span className="notification-count">{notifications.length}</span>
        )}
      </button>
      
      {isOpen && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <h4>Notifikasi</h4>
          </div>
          <div className="notification-list">
            {notifications.map(notif => (
              <div key={notif.id} className={`notification-item ${notif.type}`}>
                <div className="notification-message">{notif.message}</div>
                <div className="notification-time">{notif.time}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;