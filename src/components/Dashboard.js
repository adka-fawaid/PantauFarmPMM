import React from 'react';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import './Dashboard.css';

const Dashboard = () => {
  const metrics = [
    {
      title: "Jarak Air Ke Sensor, Di Penampungan",
      value: "8",
      unit: "CM",
      subtitle: "Jarak Air Ke Sensor, Di Penampungan",
      color: "blue",
      trend: { color: "#3b82f6" }
    },
    {
      title: "Kelembaban Tanah",
      value: "83",
      unit: "%",
      subtitle: "Kelembaban Tanah",
      color: "green",
      trend: { color: "#10b981" }
    },
    {
      title: "Kelembaban Udara",
      value: "93",
      unit: "%",
      subtitle: "Kelembaban Udara",
      color: "purple",
      trend: { color: "#8b5cf6" }
    },
    {
      title: "Suhu",
      value: "31",
      unit: "°C",
      subtitle: "",
      color: "orange",
      trend: { color: "#f59e0b" }
    }
  ];

  const chartData1 = [30, 45, 60, 75, 85, 90, 85, 80, 75, 70];
  const chartData2 = [40, 55, 70, 85, 90, 95, 88, 82, 78, 75];

  return (
    <div className="dashboard">
      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
      
      <div className="charts-section">
        <ChartCard
          title="Jarak Air Ke Sensor, Di Penampungan (CM dan Waktu)"
          subtitle=""
          chartData={chartData1}
          color="#6366f1"
        />
        <ChartCard
          title="Kelembaban Tanah (Persentase dan Waktu)"
          subtitle=""
          chartData={chartData2}
          color="#10b981"
        />
      </div>
    </div>
  );
};

export default Dashboard;