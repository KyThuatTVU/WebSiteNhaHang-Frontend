# API Configuration Guide

## Tổng quan

Hệ thống đã được cập nhật để sử dụng cấu hình API tập trung, tự động phát hiện môi trường và sử dụng URL phù hợp.

## Cách hoạt động

### 1. File cấu hình chính: `js/config.js`

File này chứa class `AppConfig` tự động:
- Phát hiện môi trường (development/production)
- Thiết lập URL API phù hợp
- Cung cấp các utility functions

### 2. Phát hiện môi trường

```javascript
// Development: localhost hoặc 127.0.0.1
if (hostname === 'localhost' || hostname === '127.0.0.1') {
    this.API_BASE_URL = 'http://localhost:3000/api';
    this.BASE_URL = 'http://localhost:3000';
}
// Production: domain khác
else {
    this.API_BASE_URL = 'https://web-site-nha-hang-back-end.vercel.app/api';
    this.BASE_URL = 'https://web-site-nha-hang-back-end.vercel.app';
}
```

### 3. Các file đã được cập nhật

- `js/chatbot.js` - Chatbot API calls
- `js/menu-api.js` - Menu API service
- `js/auth.js` - Authentication
- `js/cart-integration.js` - Cart integration
- Tất cả file HTML chính đã include `js/config.js`

## Cách sử dụng

### 1. Trong JavaScript

```javascript
// Sử dụng config object
const apiUrl = window.appConfig.getApiUrl('chat');
const imageUrl = window.appConfig.getImageUrl('food.jpg');

// Hoặc sử dụng global variables
const apiUrl = window.API_BASE_URL + '/chat';
const baseUrl = window.BASE_URL;
```

### 2. Test kết nối API

```javascript
// Test connection
const isConnected = await window.appConfig.testConnection();
if (isConnected) {
    console.log('API connected successfully');
}
```

### 3. Lấy thông tin môi trường

```javascript
const settings = window.appConfig.getSettings();
console.log('Environment:', settings.environment);
console.log('API URL:', settings.apiUrl);
console.log('Is Production:', settings.isProduction);
```

## Lợi ích

1. **Tự động**: Không cần thay đổi code khi deploy
2. **Tập trung**: Tất cả cấu hình ở một nơi
3. **Linh hoạt**: Dễ dàng thêm môi trường mới
4. **Debug**: Có logging và error handling

## Troubleshooting

### 1. Nếu API không hoạt động

```javascript
// Kiểm tra cấu hình hiện tại
console.log('Current config:', window.appConfig.getSettings());

// Test kết nối
window.appConfig.testConnection().then(result => {
    console.log('Connection test:', result);
});
```

### 2. Nếu hình ảnh không hiển thị

```javascript
// Kiểm tra URL hình ảnh
const imageUrl = window.appConfig.getImageUrl('your-image.jpg');
console.log('Image URL:', imageUrl);
```

### 3. Force reload config

```javascript
// Reload trang để áp dụng cấu hình mới
location.reload();
```

## Cập nhật URL Production

Để thay đổi URL production, chỉnh sửa trong `js/config.js`:

```javascript
setAPIUrl() {
    if (this.isDevelopment) {
        this.API_BASE_URL = 'http://localhost:3000/api';
        this.BASE_URL = 'http://localhost:3000';
    } else {
        // Thay đổi URL này
        this.API_BASE_URL = 'https://your-new-domain.com/api';
        this.BASE_URL = 'https://your-new-domain.com';
    }
}
```

## Kiểm tra hoạt động

1. Mở Developer Console
2. Chạy: `console.log(window.appConfig.getSettings())`
3. Kiểm tra API URL có đúng không
4. Test connection: `window.appConfig.testConnection()`

Hệ thống sẽ tự động sử dụng localhost khi chạy local và Vercel URL khi deploy production.
