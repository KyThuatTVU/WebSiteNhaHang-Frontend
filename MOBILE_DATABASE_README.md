# Mobile Database Integration - Hướng dẫn sử dụng

## 🔧 Vấn đề đã được giải quyết

**Vấn đề:** Tất cả các chức năng database không dùng được ở chế độ di động

**Nguyên nhân:** 
- Các trang mobile thiếu các file JavaScript cần thiết (auth.js, cart.js, reservation.js)
- Không có tích hợp API calls cho các chức năng database
- Thiếu xử lý authentication và error handling

## ✅ Giải pháp đã triển khai

### 1. Cập nhật tất cả trang mobile với JavaScript dependencies

**Files đã sửa:**
- `mobile-Index-new.html` - Thêm auth.js, cart.js, cart-integration.js
- `mobile-Menu-new.html` - Thêm auth.js, cart.js, cart-integration.js + chức năng addToCart
- `mobile-thanhtoan.html` - Thêm auth.js, cart.js + hệ thống thanh toán
- `mobile-DanhSachDatBan.html` - Thêm auth.js, reservation.js + quản lý đặt bàn
- `mobile-DanhSachHoaDon.html` - Thêm auth.js + quản lý hóa đơn
- `mobile-admin-login.html` - Thêm auth.js, admin-auth.js + đăng nhập admin

### 2. Tích hợp chức năng Database cho từng trang

#### 📱 **mobile-Menu-new.html**
- ✅ Load menu từ API thực tế
- ✅ Chức năng addToCart với database integration
- ✅ Search và filter món ăn
- ✅ Hiển thị stock và availability

#### 💳 **mobile-thanhtoan.html**
- ✅ Load cart data từ CartManager
- ✅ Authentication check trước khi thanh toán
- ✅ API call để tạo order
- ✅ Clear cart sau khi thanh toán thành công
- ✅ Redirect đến danh sách hóa đơn

#### 📋 **mobile-DanhSachDatBan.html**
- ✅ Load danh sách đặt bàn từ API
- ✅ Authentication check
- ✅ Hiển thị trạng thái đặt bàn (pending, confirmed, completed, cancelled)
- ✅ Chức năng hủy đặt bàn
- ✅ Xem chi tiết đặt bàn
- ✅ Pull-to-refresh để làm mới danh sách

#### 🧾 **mobile-DanhSachHoaDon.html**
- ✅ Load danh sách hóa đơn từ API
- ✅ Authentication check
- ✅ Hiển thị chi tiết hóa đơn trong modal
- ✅ Chức năng "Đặt lại" (reorder) - thêm món cũ vào giỏ hàng
- ✅ Hiển thị trạng thái đơn hàng

#### 🔐 **mobile-admin-login.html**
- ✅ Admin login với API
- ✅ Form validation
- ✅ Token storage và session management
- ✅ Redirect sau khi đăng nhập thành công
- ✅ Password visibility toggle

### 3. File test toàn diện

**File mới:** `mobile-database-test.html`
- 🧪 Test tất cả chức năng database
- 🔍 Kiểm tra API configuration
- 🔐 Test authentication system
- 🛒 Test cart system
- 📋 Test reservation system
- 🧾 Test order system
- 📱 Test mobile utilities

## 🚀 Cách sử dụng

### Từ PC:
1. Mở `mobile-qr-access.html`
2. Quét QR code bằng điện thoại
3. Hoặc copy URL và gửi cho điện thoại

### Từ Mobile:
1. Truy cập: `your-domain.com/mobile-Index-new.html`
2. Đăng nhập để sử dụng đầy đủ chức năng
3. Test các chức năng tại: `mobile-database-test.html`

## 📋 Chức năng Database đã hoạt động

### ✅ Authentication System
- Đăng nhập khách hàng
- Đăng nhập admin/staff
- Session management
- Token refresh
- Auto logout

### ✅ Menu System
- Load menu từ API
- Search và filter
- Add to cart
- Stock management
- Image loading với fallback

### ✅ Cart System
- Add/remove items
- Update quantities
- Persistent storage
- Integration với API data
- Cart badge updates

### ✅ Reservation System
- Load danh sách đặt bàn
- Hiển thị trạng thái
- Cancel reservation
- View details
- Real-time updates

### ✅ Order System
- Load danh sách hóa đơn
- View order details
- Reorder functionality
- Order status tracking
- Payment integration

### ✅ Payment System
- Process payments
- Multiple payment methods
- Order creation
- Cart clearing
- Success handling

## 🔍 Testing

### Chạy test suite:
```
Mở: mobile-database-test.html
Click: "Run All Tests"
Xem kết quả real-time
```

### Test từng chức năng:
1. **API Config:** Test connection và configuration
2. **Authentication:** Test login/logout
3. **Menu API:** Test menu loading và search
4. **Cart System:** Test add/remove items
5. **Reservations:** Test load và cancel
6. **Orders:** Test load và reorder
7. **Mobile Utils:** Test toast, vibration, storage

## 📊 API Endpoints được sử dụng

### Authentication:
- `POST /api/khach_hang/login` - Customer login
- `POST /api/admin/login` - Admin login
- `GET /api/health` - Health check

### Menu:
- `GET /api/foods/search` - Search foods
- `GET /api/foods` - Get all foods

### Cart & Orders:
- `POST /api/orders` - Create order
- `GET /api/orders/khach_hang/:id` - Get customer orders
- `GET /api/orders/:id` - Get order details

### Reservations:
- `GET /api/dat_ban/khach_hang/:id` - Get customer reservations
- `PUT /api/dat_ban/:id/cancel` - Cancel reservation

## 🛠️ Troubleshooting

### Nếu chức năng database không hoạt động:

1. **Kiểm tra Console:**
   ```javascript
   // Mở Developer Tools > Console
   console.log('API URL:', window.API_BASE_URL);
   console.log('Auth Manager:', window.authManager);
   console.log('Cart Manager:', window.cartManager);
   ```

2. **Test API Connection:**
   ```javascript
   window.appConfig.testConnection().then(result => {
       console.log('API Connected:', result);
   });
   ```

3. **Kiểm tra Authentication:**
   ```javascript
   console.log('Is Authenticated:', window.authManager?.isAuthenticated);
   console.log('User:', window.authManager?.user);
   ```

4. **Test Cart System:**
   ```javascript
   console.log('Cart Items:', window.cartManager?.getItems());
   console.log('Cart Total:', window.cartManager?.getTotal());
   ```

### Lỗi thường gặp:

1. **"AuthManager not found"**
   - Kiểm tra file auth.js đã load chưa
   - Refresh trang và thử lại

2. **"API connection failed"**
   - Kiểm tra network connection
   - Kiểm tra API server có chạy không

3. **"Cart not working"**
   - Kiểm tra localStorage có bị block không
   - Clear cache và thử lại

4. **"Login failed"**
   - Kiểm tra email/password
   - Kiểm tra API endpoint

## 🎯 Kết quả

✅ **Tất cả chức năng database đã hoạt động trên mobile:**
- Authentication ✅
- Menu loading ✅
- Add to cart ✅
- Payment processing ✅
- Reservation management ✅
- Order history ✅
- Admin functions ✅

✅ **Performance:**
- Fast loading với fallback data
- Offline support
- Error handling
- User feedback (toast, vibration)

✅ **User Experience:**
- Responsive design
- Touch-friendly interface
- Loading states
- Error messages
- Success confirmations

**🎉 Chế độ mobile giờ đây đã có đầy đủ chức năng database như desktop!**
