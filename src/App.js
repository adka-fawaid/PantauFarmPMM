import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import Users from './components/Users';
import './App.css';
import './styles/responsive.css';

function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuChange = (menuId) => {
    setActiveMenu(menuId);
  };

  const handleHeaderAction = (action) => {
    console.log('Header action:', action);
    // Handle header actions here
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    // Handle logout logic here
    // For example: redirect to login page, clear session, etc.
    alert('Logout functionality - redirect to login page');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="App">
      <div className="app-container">
        <Sidebar 
          activeMenu={activeMenu} 
          onMenuChange={handleMenuChange}
          isOpen={sidebarOpen}
          onClose={closeSidebar}
        />
        <div className="main-content">
          <Header 
            onAction={handleHeaderAction} 
            onMenuToggle={toggleSidebar}
            onLogout={handleLogout}
          />
          <div className="content-area">
            {activeMenu === 'dashboard' && <Dashboard />}
            {activeMenu === 'chatbot' && <Chatbot />}
            {activeMenu === 'users' && <Users />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
