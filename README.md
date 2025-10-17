# 🪵 Mộc's HOME - Website Thương mại Điện tử Nội thất

## 📋 Tổng Quan
**Mộc's HOME** là một website thương mại điện tử hiện đại chuyên cung cấp các sản phẩm nội thất. Ứng dụng được xây dựng trên nền tảng **MERN stack** (MongoDB, Express.js, React, Node.js), mang đến trải nghiệm mua sắm mượt mà cho người dùng và hệ thống quản trị mạnh mẽ cho quản trị viên.

---

## 🎯 Tính Năng Chính

### 👤 Dành cho Người dùng (Khách hàng)
- **Xác thực & Phân quyền**: Đăng ký, đăng nhập, đăng xuất. Tự động điều hướng đến đúng trang sau khi đăng nhập.
- **Xem sản phẩm**:
  - Danh sách sản phẩm với phân trang phía server.
  - Tìm kiếm, lọc theo danh mục và nhà cung cấp.
  - Sắp xếp theo giá, tên, độ mới.
  - Xem chi tiết sản phẩm, hình ảnh và sản phẩm liên quan.
- **Quản lý giỏ hàng**:
  - Thêm từ danh sách hoặc chi tiết sản phẩm.
  - Giỏ hàng lưu trên database, đồng bộ theo tài khoản.
  - Cập nhật số lượng, xóa sản phẩm.
- **Thanh toán & Đặt hàng**:
  - Tự động điền thông tin người dùng.
  - Tạo đơn hàng và xóa giỏ hàng sau khi đặt thành công.

### 👨‍💼 Dành cho Quản trị viên (Admin)
- **Bảo vệ Route**: Chỉ tài khoản admin mới truy cập được trang quản trị.
- **Giao diện quản lý**: Dashboard riêng với sidebar và header.
- **Quản lý sản phẩm (CRUD)**:
  - Thêm, sửa, xóa sản phẩm.
  - Upload hình ảnh lên Cloudinary.
- **Quản lý đơn hàng**: Xem danh sách đơn hàng đã đặt.
- **Quản lý danh mục & nhà cung cấp**: Thêm, sửa, xóa.

---

## 🎨 Giao Diện & Trải Nghiệm
- **Responsive Design**: Tối ưu cho Desktop, Tablet, Mobile.
- **Hiệu ứng & Chuyển động**: Hover, chuyển trang mượt mà, modal tinh tế.
- **Trải nghiệm người dùng (UX)**:
  - Hiển thị trạng thái loading.
  - Thông báo tức thì (toast).
  - Form nhập liệu có validation.

---

# 💾 Cấu trúc Cơ sở dữ liệu (Database Schema)


---

## 📋 Danh sách Collections

- [Users (Người dùng)](#1-users-người-dùng)
- [Sanphams (Sản phẩm)](#2-sanphams-sản-phẩm)
- [Danhmucs (Danh mục)](#3-danhmucs-danh-mục)
- [Nhacungcaps (Nhà cung cấp)](#4-nhacungcaps-nhà-cung-cấp)
- [Giohangs (Giỏ hàng)](#5-giohangs-giỏ-hàng)
- [Donhangs (Đơn hàng)](#6-donhangs-đơn-hàng)

---

## 1. `users` (Người dùng)

Lưu trữ thông tin tài khoản của người dùng và quản trị viên.

| Tên trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
|------------|--------------|----------|-------|
| `_id` | ObjectId | ✓ | ID duy nhất do MongoDB tự tạo |
| `ten_dang_nhap` | String | ✓ | Tên đăng nhập của người dùng (duy nhất) |
| `email` | String | ✓ | Địa chỉ email của người dùng (duy nhất) |
| `mat_khau` | String | ✓ | Mật khẩu đã được mã hóa bằng bcrypt |
| `ten_hoc_ten` | String | ✓ | Họ và tên đầy đủ của người dùng |
| `so_dien_thoai` | String | ✓ | Số điện thoại liên hệ |
| `dia_chi` | String | | Địa chỉ của người dùng |
| `anh_dai_dien` | String | | URL ảnh đại diện |
| `role` | String | ✓ | Vai trò của tài khoản (`user` hoặc `admin`). Mặc định là `user` |
| `createdAt` | Date | ✓ | Thời gian tạo tài khoản |
| `updatedAt` | Date | ✓ | Thời gian cập nhật thông tin lần cuối |

---

## 2. `sanphams` (Sản phẩm)

Lưu trữ thông tin chi tiết về các sản phẩm nội thất.

| Tên trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
|------------|--------------|----------|-------|
| `_id` | ObjectId | ✓ | ID duy nhất của sản phẩm |
| `ten_san_pham` | String | ✓ | Tên của sản phẩm |
| `mo_ta` | String | | Mô tả chi tiết về sản phẩm |
| `gia` | Number | | Giá bán của sản phẩm |
| `so_luong` | Number | | Số lượng tồn kho |
| `trang_thai` | String | | Trạng thái sản phẩm (vd: "còn hàng") |
| `hinh_anh` | Array[String] | | Mảng chứa các URL hình ảnh của sản phẩm |
| `ma_danh_muc` | String | | ID tham chiếu đến bảng `danhmucs` |
| `ma_nha_cung_cap` | String | | ID tham chiếu đến bảng `nhacungcaps` |
| `created_at` | Date | ✓ | Thời gian sản phẩm được tạo |


---

## 3. `danhmucs` (Danh mục)

Lưu trữ các danh mục sản phẩm.

| Tên trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
|------------|--------------|----------|-------|
| `_id` | String | ✓ | ID duy nhất của danh mục (do bạn tự định nghĩa) |
| `ten_danh_muc` | String | ✓ | Tên của danh mục |


---

## 4. `nhacungcaps` (Nhà cung cấp)

Lưu trữ thông tin các nhà cung cấp.

| Tên trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
|------------|--------------|----------|-------|
| `_id` | String | ✓ | ID duy nhất của nhà cung cấp (do bạn tự định nghĩa) |
| `ten_nha_cung_cap` | String | ✓ | Tên của nhà cung cấp |
| `dia_chi` | String | | Địa chỉ của nhà cung cấp |
| `so_dien_thoai` | String | | Số điện thoại của nhà cung cấp |

---

## 5. `giohangs` (Giỏ hàng)

Lưu trữ giỏ hàng hiện tại của mỗi người dùng. **Mỗi người dùng chỉ có một giỏ hàng.**

| Tên trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
|------------|--------------|----------|-------|
| `ma_khach_hang` | String | ✓ | ID của người dùng (tham chiếu đến `users`) |
| `chi_tiet_gio_hang` | Array[Object] | ✓ | Mảng chứa các sản phẩm trong giỏ |
| `↳ ma_san_pham` | String | ✓ | ID của sản phẩm (tham chiếu đến `sanphams`) |
| `↳ so_luong` | Number | ✓ | Số lượng của sản phẩm đó |

**References:**
- `ma_khach_hang` → `users._id`
- `chi_tiet_gio_hang.ma_san_pham` → `sanphams._id`


## 6. `donhangs` (Đơn hàng)

Lưu trữ lịch sử các đơn hàng đã được khách hàng đặt.

| Tên trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
|------------|--------------|----------|-------|
| `_id` | ObjectId | ✓ | ID duy nhất của đơn hàng |
| `ma_khach_hang` | String | ✓ | ID của người dùng đã đặt hàng |
| `chi_tiet_don_hang` | Array[Object] | ✓ | "Ảnh chụp" các sản phẩm tại thời điểm mua |
| `dia_chi_giao_hang` | String | ✓ | Địa chỉ giao hàng do người dùng nhập |
| `ghi_chu` | String | | Ghi chú của khách hàng cho đơn hàng |
| `tong_tien` | Number | ✓ | Tổng giá trị của đơn hàng |
| `trang_thai` | String | ✓ | Trạng thái đơn hàng (vd: "Chờ xác nhận") |
| `ngay_dat` | Date | ✓ | Ngày đặt hàng |

**References:**
- `ma_khach_hang` → `users._id`

**Các trạng thái đơn hàng:**
- `Chờ xác nhận`
- `Đã xác nhận`
- `Đang giao hàng`
- `Đã giao hàng`
- `Đã hủy`


---

## 📊 Quan hệ giữa các Collections

```
users (1) ──────── (n) giohangs
users (1) ──────── (n) donhangs
danhmucs (1) ───── (n) sanphams
nhacungcaps (1) ── (n) sanphams
giohangs (n) ───── (n) sanphams
donhangs (n) ───── (n) sanphams (snapshot)
```

---



## 🔑 Tài Khoản Thử Nghiệm
### 👨‍💼 Admin
- **Tài khoản**: `admin`
- **Mật khẩu**: `12345`
- **Trang sau đăng nhập**: `/admin`
### 👤 User
- **Tài khoản**: `testuser01`
- **Mật khẩu**: `password123`
- **Trang sau đăng nhập**: `/`
---

## 🛠️ Công Nghệ Sử Dụng

### Frontend
- `React 18.2.0`
- `Vite 4.4.5`
- `Tailwind CSS 3.3.0`
- `React Router DOM`
- `React Context API`
- `Lucide React`
- `React Toastify`

### Backend
- `Node.js`
- `Express.js`
- `MongoDB + Mongoose`
- `JWT`
- `Cloudinary`
- `Bcrypt.js`
- `CORS`

---

## 🚀 Cài Đặt & Chạy Dự Án

### Yêu Cầu
- Node.js `>=16.x`
- MongoDB đang chạy
- Tài khoản Cloudinary

### 1️⃣ Cài đặt Backend

```bash
cd backend
npm install
