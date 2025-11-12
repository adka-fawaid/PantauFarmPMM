# Sidebar Hide/Show Feature

## Overview
Fitur untuk menyembunyikan dan menampilkan sidebar dengan smooth animation dan responsive behavior.

## Features

### Desktop Mode (> 768px)
- **Collapsed State**: Sidebar menyempit menjadi 70px dengan icon saja
- **Expanded State**: Sidebar penuh 250px dengan label dan badge
- **Tooltip**: Hover pada collapsed menu item menampilkan tooltip nama menu
- **Memory**: Preferensi collapsed/expanded tersimpan di localStorage

### Mobile Mode (≤ 768px)
- **Hidden State**: Sidebar tersembunyi di luar layar
- **Visible State**: Sidebar muncul dengan overlay background
- **Touch Friendly**: Easy swipe-like interaction

## Controls

### Toggle Methods
1. **Header Button**: Klik tombol hamburger/arrow di header
2. **Keyboard Shortcut**: `Ctrl+B` (Windows) atau `Cmd+B` (Mac)
3. **Mobile Escape**: Tekan `Esc` untuk menutup sidebar di mobile

### Visual Indicators
- **Desktop**: Arrow icon berubah (◀️ collapsed, ▶️ expanded)
- **Mobile**: Hamburger icon (☰)
- **Tooltip**: Hover pada button untuk melihat status

## Technical Details

### State Management
```javascript
const [sidebarOpen, setSidebarOpen] = useState(true);        // Mobile visibility
const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Desktop size
```

### CSS Classes
- `.sidebar.collapsed` - Collapsed state styling
- `.app-container.sidebar-collapsed` - Layout adjustment
- `.sidebar-overlay` - Mobile overlay background

### Responsive Breakpoints
- **Mobile**: ≤ 768px - Toggle visibility
- **Desktop**: > 768px - Toggle size (collapsed/expanded)

### Animations
- Smooth 0.3s ease transitions
- Tooltip fade-in animation
- Transform animations for mobile slide

### Accessibility
- ARIA labels and tooltips
- Keyboard navigation support
- Screen reader friendly

## Usage Examples

### Basic Toggle
```javascript
// Toggle sidebar programmatically
toggleSidebar();
```

### Check Current State
```javascript
const isMobile = window.innerWidth <= 768;
const currentState = isMobile ? sidebarOpen : sidebarCollapsed;
```

### Restore Preferences
```javascript
// Preferences automatically restored from localStorage on app start
const savedCollapsed = localStorage.getItem('sidebarCollapsed');
```

## Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance
- Hardware acceleration enabled
- Efficient event handling with cleanup
- Throttled resize events
- Minimal DOM manipulation