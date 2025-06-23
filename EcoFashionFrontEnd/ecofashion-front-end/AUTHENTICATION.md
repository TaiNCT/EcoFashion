# EcoFashion Frontend - Authentication Setup

## 🔧 Cấu hình Firebase Authentication

### Bước 1: Tạo project Firebase

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Trong phần "Authentication", bật Email/Password authentication

### Bước 2: Lấy config Firebase

1. Vào **Project Settings** > **General** > **Your apps**
2. Chọn **Web app** và copy Firebase config
3. Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

4. Điền thông tin Firebase config vào file `.env`:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### Bước 3: Chạy ứng dụng

```bash
npm install
npm run dev
```

## 🚀 Tính năng Authentication

- ✅ **Đăng ký tài khoản mới** với email/password
- ✅ **Đăng nhập** với email/password
- ✅ **Đăng xuất**
- ✅ **Protected Routes** - Chỉ user đã đăng nhập mới truy cập được Dashboard
- ✅ **Navigation động** - Hiển thị login/register button hoặc user menu
- ✅ **Form validation** với Formik + Yup
- ✅ **Toast notifications** cho feedback
- ✅ **Responsive design** với Material-UI

## 📱 Luồng sử dụng

1. **User chưa đăng nhập**: Thấy buttons "Đăng nhập" và "Đăng ký" trên Navigation
2. **Đăng ký**: Click "Đăng ký" → Điền form → Tự động redirect về Dashboard
3. **Đăng nhập**: Click "Đăng nhập" → Điền form → Redirect về Dashboard
4. **User đã đăng nhập**: Thấy tên user và avatar menu trên Navigation
5. **Dashboard**: Chỉ truy cập được khi đã đăng nhập
6. **Đăng xuất**: Click avatar → "Đăng xuất" → Redirect về trang chủ

## 🎨 UI/UX Features

- **Modern gradient design** theo xu hướng 2024-2025
- **Smooth animations** và hover effects
- **Loading states** khi đang xử lý
- **Error handling** với toast messages
- **Password visibility toggle**
- **Remember me checkbox** (UI only, chưa implement logic)
- **Forgot password link** (UI only, chưa implement)

## 🔒 Bảo mật

- Authentication state được quản lý toàn cục với React Context
- Protected routes tự động redirect về login nếu chưa đăng nhập
- Firebase handles password hashing và security automatically

Hãy đảm bảo cấu hình Firebase đúng cách để authentication hoạt động!
