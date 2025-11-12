import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Halo! Saya adalah AI Assistant untuk sistem monitoring pertanian Anda. Bagaimana saya bisa membantu Anda hari ini?',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Predefined responses for farming/monitoring system
    if (lowerMessage.includes('kelembaban') || lowerMessage.includes('moisture')) {
      return 'Berdasarkan data sensor terbaru, kelembaban tanah saat ini 83%. Ini masih dalam rentang optimal untuk tanaman Anda. Apakah ada area khusus yang ingin Anda monitor?';
    }
    
    if (lowerMessage.includes('suhu') || lowerMessage.includes('temperature')) {
      return 'Suhu lingkungan saat ini 31°C. Temperatur ini cukup ideal untuk pertumbuhan tanaman. Saya sarankan untuk tetap memantau jika suhu naik di atas 35°C.';
    }
    
    if (lowerMessage.includes('air') || lowerMessage.includes('water') || lowerMessage.includes('penyiraman')) {
      return 'Jarak air ke sensor di penampungan saat ini 8 CM. Level air masih mencukupi untuk sistem penyiraman otomatis. Apakah Anda ingin mengatur jadwal penyiraman?';
    }
    
    if (lowerMessage.includes('sensor') || lowerMessage.includes('monitoring')) {
      return 'Semua sensor bekerja dengan normal. Kelembaban tanah: 83%, Kelembaban udara: 93%, Suhu: 31°C, Level air: 8CM. Ada sensor tertentu yang ingin Anda periksa?';
    }
    
    if (lowerMessage.includes('jadwal') || lowerMessage.includes('schedule')) {
      return 'Untuk mengatur jadwal penyiraman, Anda bisa menggunakan tombol "Atur Waktu Siram" di dashboard. Atau saya bisa membantu memberikan rekomendasi jadwal berdasarkan kondisi tanaman saat ini.';
    }
    
    if (lowerMessage.includes('bantuan') || lowerMessage.includes('help')) {
      return 'Saya dapat membantu Anda dengan:\n• Monitoring status sensor (kelembaban, suhu, level air)\n• Rekomendasi jadwal penyiraman\n• Analisis data pertanian\n• Troubleshooting sistem\n• Tips perawatan tanaman\n\nApa yang ingin Anda ketahui?';
    }
    
    if (lowerMessage.includes('rekomendasi') || lowerMessage.includes('saran')) {
      return 'Berdasarkan data saat ini:\n✓ Kelembaban tanah optimal, tidak perlu penyiraman dalam 2-3 jam\n✓ Suhu masih aman, pertimbangkan naungan jika naik >35°C\n✓ Level air mencukupi untuk 2-3 hari ke depan\n\nApakah ada aspek khusus yang ingin dianalisis?';
    }
    
    // Default responses
    const defaultResponses = [
      'Terima kasih atas pertanyaan Anda. Berdasarkan sistem monitoring saat ini, semua parameter dalam kondisi normal. Adakah yang spesifik ingin Anda ketahui?',
      'Saya memahami pertanyaan Anda. Untuk memberikan jawaban yang lebih akurat, bisakah Anda memberikan detail lebih spesifik tentang aspek monitoring yang ingin diketahui?',
      'Pertanyaan yang menarik! Sistem monitoring kami dapat membantu menganalisis berbagai aspek pertanian. Apakah Anda ingin saya jelaskan lebih detail tentang data sensor tertentu?'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    // Simulate API call delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: generateBotResponse(inputMessage),
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: 'Status Sensor', action: () => setInputMessage('Bagaimana status semua sensor saat ini?') },
    { text: 'Rekomendasi Penyiraman', action: () => setInputMessage('Berikan rekomendasi jadwal penyiraman') },
    { text: 'Analisis Data', action: () => setInputMessage('Analisis data monitoring hari ini') },
    { text: 'Tips Perawatan', action: () => setInputMessage('Berikan tips perawatan tanaman') }
  ];

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: 'Chat telah dibersihkan. Bagaimana saya bisa membantu Anda?',
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="chatbot-info">
          <div className="bot-avatar">
            <span className="bot-icon">🤖</span>
            <span className="bot-status"></span>
          </div>
          <div className="bot-details">
            <h3 className="bot-name">AI Farm Assistant</h3>
            <p className="bot-description">Asisten pintar untuk monitoring pertanian</p>
          </div>
        </div>
        <div className="chatbot-controls">
          <button className="control-btn" onClick={clearChat} title="Clear Chat">
            🗑️
          </button>
        </div>
      </div>

      <div className="quick-actions">
        <p className="quick-actions-title">Tanyakan sesuatu atau pilih:</p>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="quick-action-btn"
              onClick={action.action}
            >
              {action.text}
            </button>
          ))}
        </div>
      </div>

      <div className="messages-container">
        <div className="messages-list">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.type === 'user' ? 'message-user' : 'message-bot'}`}
            >
              <div className="message-avatar">
                {message.type === 'user' ? (
                  <span className="user-avatar">👤</span>
                ) : (
                  <span className="bot-avatar-small">🤖</span>
                )}
              </div>
              <div className="message-content">
                <div className="message-bubble">
                  <div className="message-text">
                    {message.content.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < message.content.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="message-time">{message.timestamp}</div>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message message-bot">
              <div className="message-avatar">
                <span className="bot-avatar-small">🤖</span>
              </div>
              <div className="message-content">
                <div className="message-bubble typing-indicator">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="input-container">
        <div className="input-wrapper">
          <textarea
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tanyakan tentang sistem monitoring, sensor, atau minta rekomendasi..."
            className="message-input"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="send-button"
          >
            {isLoading ? (
              <span className="loading-spinner">⏳</span>
            ) : (
              <span className="send-icon">📤</span>
            )}
          </button>
        </div>
        <div className="input-footer">
          <p className="ai-disclaimer">
            AI dapat membuat kesalahan. Verifikasi informasi penting dengan data sensor langsung.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Chatbot;