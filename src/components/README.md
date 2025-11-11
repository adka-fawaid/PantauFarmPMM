# Dashboard Monitoring Pantau Farm

Dashboard monitoring untuk sistem pantau farm dengan berbagai komponen terpisah menggunakan React.

## Struktur Komponen

### 1. **Sidebar** (`src/components/Sidebar.js`)
- Navigasi menu utama
- Menampilkan informasi user
- Logo aplikasi
- Menu: Dashboard, Monitoring, Users, Logout

### 2. **Header** (`src/components/Header.js`)
- Judul halaman dan deskripsi
- Tombol aksi: "Hasilkan Penyimpanan" dan "Alur Waktu Simi"
- Informasi waktu real-time

### 3. **Dashboard** (`src/components/Dashboard.js`)
- Container utama untuk metrics dan charts
- Layout grid responsif
- Mengatur data untuk MetricCard dan ChartCard

### 4. **MetricCard** (`src/components/MetricCard.js`)
- Menampilkan metric tunggal (Jarak Air, Kelembaban, Suhu)
- Animasi hover
- Trend line sederhana
- Color coding untuk setiap metric

### 5. **ChartCard** (`src/components/ChartCard.js`)
- Menampilkan grafik area chart menggunakan SVG
- Data visualization untuk trend monitoring
- Responsive design

## Fitur Utama

- ✅ **Responsive Design**: Adaptif untuk berbagai ukuran layar
- ✅ **Component-based**: Setiap bagian adalah komponen terpisah
- ✅ **Interactive UI**: Hover effects dan transitions
- ✅ **Real-time Data**: Support untuk data real-time
- ✅ **Custom Charts**: SVG-based charts tanpa library eksternal
- ✅ **Modern Styling**: CSS Grid, Flexbox, dan modern styling

## Cara Menggunakan

1. **Instalasi dependencies:**
   ```bash
   npm install
   ```

2. **Jalankan development server:**
   ```bash
   npm start
   ```

3. **Build untuk production:**
   ```bash
   npm run build
   ```

## Data Structure

### Metrics Data Format:
```javascript
{
  title: "Jarak Air Ke Sensor, Di Penampungan",
  value: "8",
  unit: "CM",
  subtitle: "Jarak Air Ke Sensor, Di Penampungan",
  color: "blue", // blue, green, purple, orange
  trend: { color: "#3b82f6" }
}
```

### Chart Data Format:
```javascript
const chartData = [20, 35, 45, 60, 70, 85, 75, 90, 85, 95]; // Array of numbers (0-100)
```

## Customization

### Menambah Metric Baru:
1. Edit `src/components/Dashboard.js`
2. Tambah object baru ke array `metrics`
3. Pilih warna: "blue", "green", "purple", atau "orange"

### Menambah Chart Baru:
1. Edit `src/components/Dashboard.js`
2. Tambah `ChartCard` component baru di `charts-section`
3. Berikan data dan konfigurasi yang sesuai

### Mengubah Styling:
- Setiap komponen memiliki file CSS terpisah
- Gunakan CSS custom properties untuk konsistensi warna
- Responsive breakpoints sudah disiapkan

## Browser Support

- ✅ Chrome (Latest)
- ✅ Firefox (Latest) 
- ✅ Safari (Latest)
- ✅ Edge (Latest)

## Teknologi yang Digunakan

- **React 19.2.0**: Framework utama
- **CSS3**: Styling dengan Grid, Flexbox, Custom Properties
- **SVG**: Custom charts tanpa library eksternal
- **CSS Modules**: Scoped styling per component