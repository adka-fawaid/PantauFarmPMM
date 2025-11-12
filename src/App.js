import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import Users from './components/Users';
import './App.css';
import './styles/responsive.css';
import './styles/global-responsive.css';
import './styles/mobile-optimized.css';
import './styles/layout-alignment.css';

function App() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default open on desktop
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });
  
  // Global chat history state with localStorage
  const [chatMessages, setChatMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    if (savedMessages) {
      return JSON.parse(savedMessages);
    }
    return [
      {
        id: 1,
        type: 'bot',
        content: 'Halo! Saya adalah AI Assistant untuk sistem monitoring pertanian Anda. Bagaimana saya bisa membantu Anda hari ini?',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  // Save chat messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const handleMenuChange = (menuId) => {
    setActiveMenu(menuId);
  };

  const handleHeaderAction = (action, data) => {
    console.log('Header action:', action, data);
    
    switch(action) {
      case 'enable-auto':
        alert('Mode Otomatis Diaktifkan!\nSistem akan secara otomatis melakukan penyiraman berdasarkan sensor kelembaban tanah.');
        break;
      case 'disable-auto':
        alert('Mode Otomatis Dimatikan!\nAnda kembali dapat mengontrol penyiraman secara manual.');
        break;
      case 'start-manual-watering':
        alert(`Penyiraman Manual Dimulai!\n\nDurasi: ${data?.duration || 5} menit\nSistem akan berhenti otomatis setelah waktu selesai.\n\n💧 Mode Otomatis telah dinonaktifkan secara otomatis!\n🌱 Pastikan level air mencukupi!`);
        break;
      case 'stop-manual-watering':
        alert('Penyiraman Manual Dihentikan!\n\n⏹️ Sistem penyiraman telah dihentikan.\n🔄 Anda dapat mengaktifkan mode otomatis kembali jika diperlukan.');
        break;
      case 'auto-stop-manual-watering':
        alert('Penyiraman Manual Selesai!\n\n✅ Waktu penyiraman telah habis.\n🌱 Penyiraman berhasil diselesaikan!\n🔄 Anda dapat mengaktifkan mode otomatis atau melakukan penyiraman manual lagi.');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    // Handle logout logic here
    // For example: redirect to login page, clear session, etc.
    alert('Logout functionality - redirect to login page');
  };

  const toggleSidebar = () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      const newCollapsed = !sidebarCollapsed;
      setSidebarCollapsed(newCollapsed);
      localStorage.setItem('sidebarCollapsed', JSON.stringify(newCollapsed));
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Initialize sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        setSidebarOpen(false);
        setSidebarCollapsed(false);
      } else {
        setSidebarOpen(true);
        // Keep collapsed state for desktop
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard shortcut for toggle sidebar
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ctrl/Cmd + B to toggle sidebar
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault();
        toggleSidebar();
      }
      // Escape to close mobile sidebar
      if (event.key === 'Escape' && window.innerWidth <= 768 && sidebarOpen) {
        closeSidebar();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen, sidebarCollapsed]);

  return (
    <div className="App">
      <div className={`app-container ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Sidebar 
          activeMenu={activeMenu} 
          onMenuChange={handleMenuChange}
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          onClose={closeSidebar}
          chatMessagesCount={chatMessages.length}
        />
        <div className="main-content">
          <Header 
            onAction={handleHeaderAction} 
            onMenuToggle={toggleSidebar}
            onLogout={handleLogout}
            sidebarCollapsed={sidebarCollapsed}
          />
          <div className="content-area">
            {activeMenu === 'dashboard' && <Dashboard />}
            {activeMenu === 'chatbot' && <Chatbot messages={chatMessages} setMessages={setChatMessages} />}
            {activeMenu === 'users' && <Users />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
