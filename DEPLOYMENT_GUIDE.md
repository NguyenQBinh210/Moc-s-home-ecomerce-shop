# Hướng dẫn Deploy Dự án Moc-s-home-ecomerce-shop

Tài liệu này hướng dẫn bạn cách triển khai (deploy) dự án Website Thương mại điện tử của bạn lên môi trường internet miễn phí và ổn định.

Chúng ta sẽ sử dụng:
-   **Frontend**: [Vercel](https://vercel.com/) (Tối ưu cho React/Vite).
-   **Backend**: [Render](https://render.com/) (Hỗ trợ Node.js miễn phí tốt).
-   **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas/database) (Dịch vụ Cloud Database).

---

## 1. Chuẩn bị (Pre-requisites)

Đảm bảo bạn đã:
1.  Đẩy toàn bộ code lên **GitHub** (cả folder `backend` và `frontend` nên nằm chung trong một repo hoặc 2 repos riêng biệt. Hướng dẫn này giả sử bạn để chung 1 repo).
2.  Đã có tài khoản GitHub, Vercel, Render và MongoDB Atlas.
3.  Cập nhật file `.env` ở local (để nhớ các biến cần config trên server).

---

## 2. Deploy Database (MongoDB Atlas)

Nếu bạn chưa có Cloud Database:
1.  Đăng ký/Đăng nhập [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Tạo một **Cluster** mới (M0 Sandbox - Miễn phí).
3.  Trong phần **Database Access**, tạo một User (Lưu lại Username/Password).
4.  Trong phần **Network Access**, chọn "Allow Access from Anywhere" (0.0.0.0/0) để Backend trên Render có thể kết nối.
5.  Lấy **Connection String**: Connect -> Drivers -> Copy chuỗi kết nối (dạng `mongodb+srv://<username>:<password>@cluster0...`).

---

## 3. Deploy Backend (Render)

1.  Đăng nhập [Render](https://dashboard.render.com/).
2.  Chọn **New +** -> **Web Service**.
3.  Kết nối với Repository GitHub của bạn.
4.  Điền thông tin:
    -   **Name**: Tên dịch vụ (ví dụ: `moc-shop-backend`).
    -   **Root Directory**: `backend` (Rất quan trọng vì code backend nằm trong thư mục con).
    -   **Environment**: `Node`.
    -   **Build Command**: `npm install` (Render sẽ chạy lệnh này để cài dependencies).
    -   **Start Command**: `npm run start` (hoặc `node src/server.js` tùy vào `package.json` của bạn. Trong file `backend/package.json` bạn đang có script `"start": "node src/server.js"` nên dùng `npm start` là ổn).
5.  **Environment Variables** (Kéo xuống dưới mục Advanced):
    Thêm các biến giống trong file `.env` local của bạn, ví dụ:
    -   `PORT`: `10000` (Render thường dùng port này mặc định hoặc tự cấp).
    -   `MONGODB_URI`: Dán chuỗi kết nối MongoDB Atlas đã lấy ở bước 2 vào.
    -   `JWT_SECRET`: Secret key cho JWT.
    -   `CLOUDINARY_XXX`: Các biến config Cloudinary nếu có.
6.  Bấm **Create Web Service**.
7.  Đợi deploy xong, bạn sẽ nhận được một URL của backend (ví dụ: `https://moc-shop-backend.onrender.com`). **Copy URL này**.

---

## 4. Deploy Frontend (Vercel)

1.  Đăng nhập [Vercel](https://vercel.com/dashboard).
2.  Bấm **Add New ...** -> **Project**.
3.  Import Repository GitHub của bạn.
4.  Tại màn hình "Configure Project":
    -   **Framework Preset**: Vite (Vercel thường tự nhận diện).
    -   **Root Directory**: Bấm `Edit` và chọn thư mục `frontend`.
5.  **Environment Variables**:
    -   Thêm biến môi trường để trỏ về Backend vừa deploy.
    -   Ví dụ trong code React bạn dùng `VITE_BACKEND_URL`, hãy đặt giá trị là URL Backend Render (ví dụ: `https://moc-shop-backend.onrender.com`).
    *Lưu ý: Nếu hardcode localhost trong code, bạn cần sửa lại code để dùng biến môi trường trước khi deploy.*
6.  Bấm **Deploy**.
7.  Đợi Vercel build xong, bạn sẽ có domain frontend (ví dụ: `moc-shop-frontend.vercel.app`).

---

## 5. Cấu hình lại (Cross-Origin Resource Sharing - CORS)

Sau khi có domain Frontend, quay lại Backend (trên Render hoặc sửa code rồi push lên GitHub):
1.  Mở `backend/src/server.js` (hoặc file cấu hình CORS).
2.  Đảm bảo config CORS cho phép domain Frontend, ví dụ:
    ```javascript
    app.use(cors({
        origin: ["https://moc-shop-frontend.vercel.app", "http://localhost:5173"],
        credentials: true
    }));
    ```
    *(Nếu bạn để `origin: "*"` thì có thể bỏ qua bước này, nhưng để security tốt nên chỉ định domain cụ thể)*.
3.  Nếu thay đổi code, hãy commit và push lên GitHub. Render sẽ tự động redeploy backend.

## Lưu ý quan trọng
-   **Cold Start**: Bản miễn phí của Render sẽ "ngủ" nếu không ai truy cập trong 15 phút. Lần truy cập lại đầu tiên có thể mất ~30 giây để server khởi động.
-   **Biến môi trường**: Đảm bảo tên biến môi trường (Environment Variables) trên Vercel phải bắt đầu bằng `VITE_` nếu dùng Vite.
