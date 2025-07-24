# Mobile Data Fix - Hướng dẫn sửa lỗi dữ liệu mobile

## 🔍 Vấn đề đã được giải quyết

**Vấn đề:** Chế độ di động không có dữ liệu, chatbot và menu vẫn gọi API localhost

**Nguyên nhân:** 
- Các file JavaScript hardcode URL `http://localhost:3000`
- Mobile pages sử dụng dữ liệu mẫu thay vì gọi API thực tế
- Không có cấu hình tập trung để quản lý API URLs

## ✅ Giải pháp đã triển khai

### 1. Tạo hệ thống cấu hình tập trung

**File mới:** `js/config.js`
- Tự động phát hiện môi trường (development/production)
- Development: `http://localhost:3000/api`
- Production: `https://web-site-nha-hang-back-end.vercel.app/api`

### 2. Cập nhật các file API

**Files đã sửa:**
- `js/chatbot.js` - Sử dụng URL động
- `js/menu-api.js` - Cập nhật baseURL và fallback data
- `js/auth.js` - Sử dụng cấu hình tập trung
- `js/cart-integration.js` - Cập nhật API_BASE URL

### 3. Cập nhật mobile pages

**Files đã sửa:**
- `mobile-Index-new.html` - Load featured items từ API
- `mobile-Menu-new.html` - Thay thế dữ liệu mẫu bằng API calls
- `mobile-thanhtoan.html` - Thêm config.js

### 4. Thêm config.js vào tất cả HTML files

**Files đã cập nhật:**
- `index.html`
- `Menu-new.html`
- `mobile-Index-new.html`
- `mobile-Menu-new.html`
- `mobile-thanhtoan.html`
- `test-auto-logout.html`
- `test-login-required.html`

## 🛠️ Files mới được tạo

### 1. `mobile-qr-access.html`
- Trang tạo QR code để truy cập mobile từ PC
- Hiển thị trạng thái API connection
- Liên kết trực tiếp đến các trang mobile

### 2. `mobile-test-suite.html`
- Trang test toàn diện cho mobile features
- Kiểm tra API connections
- Test các tính năng mobile (toast, vibration, modal)
- Debug information

### 3. `test-api-config.html`
- Trang test cấu hình API chi tiết
- Kiểm tra kết nối từng endpoint
- Test image loading
- Debug console

## 📱 Cách sử dụng

### Từ PC:
1. Mở `mobile-qr-access.html`
2. Quét QR code bằng điện thoại
3. Hoặc copy URL và gửi cho điện thoại

### Từ Mobile:
1. Truy cập trực tiếp: `your-domain.com/mobile-Index-new.html`
2. Sử dụng các liên kết trong `mobile-qr-access.html`

### Test và Debug:
1. `mobile-test-suite.html` - Test tổng hợp
2. `test-api-config.html` - Test API chi tiết
3. Developer Console - Xem logs chi tiết

## 🔧 Cách hoạt động

### Phát hiện môi trường tự động:
```javascript
// Development: localhost hoặc 127.0.0.1
if (hostname === 'localhost' || hostname === '127.0.0.1') {
    this.API_BASE_URL = 'http://localhost:3000/api';
}
// Production: domain khác
else {
    this.API_BASE_URL = 'https://web-site-nha-hang-back-end.vercel.app/api';
}
```

### Sử dụng trong code:
```javascript
// Cách mới (khuyến nghị)
const apiUrl = window.appConfig.getApiUrl('chat');
const imageUrl = window.appConfig.getImageUrl('food.jpg');

// Cách cũ (vẫn hoạt động)
const apiUrl = window.API_BASE_URL + '/chat';
```

## 🧪 Kiểm tra hoạt động

### 1. Kiểm tra cấu hình:
```javascript
console.log(window.appConfig.getSettings());
```

### 2. Test kết nối API:
```javascript
window.appConfig.testConnection().then(result => {
    console.log('API Connection:', result);
});
```

### 3. Kiểm tra mobile features:
- Mở `mobile-test-suite.html`
- Chạy tất cả tests
- Xem kết quả trong real-time

## 🔍 Troubleshooting

### Nếu vẫn không có dữ liệu:
1. Kiểm tra Developer Console có lỗi không
2. Chạy `window.appConfig.testConnection()`
3. Kiểm tra network tab trong DevTools
4. Sử dụng `test-api-config.html` để debug

### Nếu hình ảnh không hiển thị:
1. Kiểm tra `window.appConfig.BASE_URL`
2. Test image URLs trong console
3. Kiểm tra CORS settings

### Nếu chatbot không hoạt động:
1. Kiểm tra `window.appConfig.getApiUrl('chat')`
2. Test chat API trong `mobile-test-suite.html`
3. Xem console logs khi gửi tin nhắn

## 📊 Kết quả

✅ **Mobile pages giờ đây có dữ liệu thực từ API**
✅ **Chatbot hoạt động trên mobile**
✅ **Menu hiển thị đúng món ăn và giá cả**
✅ **Hình ảnh load từ server backend**
✅ **Tự động chuyển đổi giữa development và production**
✅ **Có tools để test và debug**

## 🚀 Deploy

Khi deploy lên production:
1. Không cần thay đổi code
2. Hệ thống tự động detect environment
3. Sử dụng Vercel URLs cho production
4. Test bằng `mobile-test-suite.html`

Hệ thống giờ đây hoàn toàn tự động và hoạt động trên cả development và production! 🎉
