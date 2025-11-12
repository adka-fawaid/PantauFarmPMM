import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import Login from './components/Login';
import './App.css';
import './styles/responsive.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuChange = (menuId) => {
    if (menuId === 'logout') {
      setIsLoggedIn(false);
      console.log('Logout clicked');
    } else {
      setActiveMenu(menuId);
    }
  };

  const handleHeaderAction = (action) => {
    console.log('Header action:', action);
    // Handle header actions here
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLoginSuccess = (credentials) => {
    // Set user as logged in and navigate to dashboard
    setIsLoggedIn(true);
    setActiveMenu('dashboard');
    console.log('User logged in:', credentials.email);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLoginSuccess} />;
  }

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
          />
          <div className="content-area">
            {activeMenu === 'dashboard' && <Dashboard />}
            {activeMenu === 'monitoring' && <div className="placeholder">Monitoring Page</div>}
            {activeMenu === 'chatbot' && <Chatbot />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
