import React from 'react';
import './ChatbotFeatures.css';

// Komponen untuk menampilkan data sensor secara real-time dalam chat
export const SensorDataCard = ({ sensorData }) => {
  return (
    <div className="sensor-data-card">
      <div className="sensor-data-header">
        <span className="sensor-icon">📊</span>
        <h4>Data Sensor Terkini</h4>
      </div>
      <div className="sensor-grid">
        <div className="sensor-item">
          <span className="sensor-label">Kelembaban Tanah</span>
          <span className="sensor-value">{sensorData?.soilMoisture || '83'}%</span>
        </div>
        <div className="sensor-item">
          <span className="sensor-label">Suhu</span>
          <span className="sensor-value">{sensorData?.temperature || '31'}°C</span>
        </div>
        <div className="sensor-item">
          <span className="sensor-label">Kelembaban Udara</span>
          <span className="sensor-value">{sensorData?.humidity || '93'}%</span>
        </div>
        <div className="sensor-item">
          <span className="sensor-label">Level Air</span>
          <span className="sensor-value">{sensorData?.waterLevel || '8'} CM</span>
        </div>
      </div>
    </div>
  );
};

// Komponen untuk rekomendasi AI
export const AIRecommendation = ({ type, data }) => {
  const getRecommendationContent = () => {
    switch (type) {
      case 'watering':
        return {
          icon: '💧',
          title: 'Rekomendasi Penyiraman',
          content: `Berdasarkan kelembaban tanah ${data.soilMoisture}%, disarankan untuk menunggu ${data.waitTime} jam sebelum penyiraman berikutnya.`,
          action: 'Atur Jadwal Penyiraman'
        };
      case 'temperature':
        return {
          icon: '🌡️',
          title: 'Peringatan Suhu',
          content: `Suhu saat ini ${data.temp}°C. ${data.temp > 35 ? 'Pertimbangkan penambahan naungan atau sistem cooling.' : 'Suhu dalam rentang normal untuk pertumbuhan optimal.'}`,
          action: data.temp > 35 ? 'Aktifkan Cooling' : null
        };
      default:
        return {
          icon: '🤖',
          title: 'Saran AI',
          content: 'Sistem berjalan optimal. Lanjutkan monitoring rutin.',
          action: null
        };
    }
  };

  const recommendation = getRecommendationContent();

  return (
    <div className="ai-recommendation">
      <div className="recommendation-header">
        <span className="recommendation-icon">{recommendation.icon}</span>
        <h4>{recommendation.title}</h4>
      </div>
      <p className="recommendation-content">{recommendation.content}</p>
      {recommendation.action && (
        <button className="recommendation-action">
          {recommendation.action}
        </button>
      )}
    </div>
  );
};

// Komponen untuk menampilkan chart mini dalam chat
export const MiniChart = ({ data, type, title }) => {
  const generatePath = (points) => {
    if (!points || points.length === 0) return '';
    
    const width = 200;
    const height = 60;
    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min || 1;
    
    return points.map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((point - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const chartData = data || [20, 25, 30, 28, 32, 35, 31, 29, 33, 30];
  const pathData = generatePath(chartData);

  return (
    <div className="mini-chart">
      <div className="chart-header">
        <span className="chart-title">{title}</span>
        <span className="chart-value">{chartData[chartData.length - 1]}{type === 'temperature' ? '°C' : '%'}</span>
      </div>
      <svg width="200" height="60" className="chart-svg">
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          d={`${pathData} L 200 60 L 0 60 Z`}
          fill="url(#chartGradient)"
        />
        <path
          d={pathData}
          stroke="#3b82f6"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
};

// Komponen untuk menampilkan tips pertanian
export const FarmingTip = ({ tip }) => {
  const tips = [
    {
      icon: '🌱',
      title: 'Kelembaban Optimal',
      content: 'Tanaman sayuran membutuhkan kelembaban tanah 60-80% untuk pertumbuhan optimal.',
      category: 'Kelembaban'
    },
    {
      icon: '☀️',
      title: 'Manajemen Suhu',
      content: 'Suhu ideal untuk kebanyakan tanaman sayuran adalah 20-30°C. Di atas 35°C dapat menghambat pertumbuhan.',
      category: 'Suhu'
    },
    {
      icon: '💧',
      title: 'Jadwal Penyiraman',
      content: 'Siram tanaman pada pagi hari (06:00-08:00) atau sore hari (16:00-18:00) untuk efisiensi maksimal.',
      category: 'Penyiraman'
    }
  ];

  const selectedTip = tips.find(t => t.category.toLowerCase() === tip?.toLowerCase()) || tips[0];

  return (
    <div className="farming-tip">
      <div className="tip-header">
        <span className="tip-icon">{selectedTip.icon}</span>
        <h4>{selectedTip.title}</h4>
      </div>
      <p className="tip-content">{selectedTip.content}</p>
      <div className="tip-footer">
        <span className="tip-category">💡 Tips {selectedTip.category}</span>
      </div>
    </div>
  );
};