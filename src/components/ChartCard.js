import React from 'react';
import './ChartCard.css';

const ChartCard = ({ title, subtitle, chartData, color = '#6366f1' }) => {
  // Simple chart visualization using SVG
  const generateChart = () => {
    const width = 300;
    const height = 150;
    const points = chartData || [20, 35, 45, 60, 70, 85, 75, 90, 85, 95];
    
    // Generate path for the chart
    const pathData = points.map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - (point / 100) * height;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    // Generate area path
    const areaPath = `${pathData} L ${width} ${height} L 0 ${height} Z`;

    return (
      <svg width={width} height={height} className="chart-svg">
        {/* Area fill */}
        <path
          d={areaPath}
          fill={`url(#gradient-${color.replace('#', '')})`}
          opacity="0.3"
        />
        {/* Line */}
        <path
          d={pathData}
          stroke={color}
          strokeWidth="3"
          fill="none"
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    );
  };

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
        <p className="chart-subtitle">{subtitle}</p>
      </div>
      <div className="chart-container">
        {generateChart()}
      </div>
    </div>
  );
};

export default ChartCard;