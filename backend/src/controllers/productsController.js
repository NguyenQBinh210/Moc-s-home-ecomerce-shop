import SanPham from "../models/Products.js";
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

const deleteFromCloudinary = (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};

const getPublicIdFromUrl = (url) => {
  try {
    const parts = url.split("/");
    const publicIdWithExt = parts[parts.length - 1];
    return `products/${publicIdWithExt.split(".")[0]}`;
  } catch (e) {
    return null;
  }
};

// --- API CONTROLLERS ---
export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = '', category = '', supplier = '' } = req.query;
    const filter = {};
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Đếm tổng số sản phẩm KHỚP VỚI BỘ LỌC
    const total = await SanPham.countDocuments(filter); // <-- Dòng này quan trọng

    const products = await SanPham.find(filter)
      .populate('ma_danh_muc', 'ten_danh_muc')
      .populate('ma_nha_cung_cap', 'ten_nha_cung_cap')
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        currentPage: parseInt(page),
        // Phép tính này PHẢI DÙNG `total` đã đếm ở trên
        totalPages: Math.ceil(total / parseInt(limit)), // <-- Dòng này quan trọng
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

export const createProduct = async (req, res) => {
  try {
    // Chỉ lấy những trường có trong model mới
    const {
      ten_san_pham,
      mo_ta,
      gia,
      so_luong,
      trang_thai,
      ma_danh_muc,
      ma_nha_cung_cap,
    } = req.body;

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(file.buffer)
      );
      const results = await Promise.all(uploadPromises);
      imageUrls = results.map((result) => result.secure_url);
    }

    const newProduct = new SanPham({
      ten_san_pham,
      mo_ta,
      gia,
      so_luong,
      trang_thai,
      ma_danh_muc,
      ma_nha_cung_cap,
      hinh_anh: imageUrls,
    });

    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Lỗi server khi tạo sản phẩm" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // req.body sẽ chỉ chứa những trường đơn giản
    const data = req.body;

    let existingImages = data.existingImages
      ? JSON.parse(data.existingImages)
      : [];
    let newImageUrls = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(file.buffer)
      );
      const results = await Promise.all(uploadPromises);
      newImageUrls = results.map((result) => result.secure_url);
    }
    data.hinh_anh = [...existingImages, ...newImageUrls];
    delete data.existingImages;

    const updatedProduct = await SanPham.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedProduct)
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy sản phẩm" });

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Lỗi server khi cập nhật" });
  }
};

export const deleteProduct = async (req, res) => {
  // Hàm này không thay đổi
  try {
    const { id } = req.params;
    const product = await SanPham.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy sản phẩm" });

    if (product.hinh_anh && product.hinh_anh.length > 0) {
      const deletePromises = product.hinh_anh
        .map((url) => {
          const publicId = getPublicIdFromUrl(url);
          if (publicId) return deleteFromCloudinary(publicId);
        })
        .filter(Boolean);
      await Promise.all(deletePromises);
    }

    await SanPham.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Xóa sản phẩm thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server khi xóa" });
  }
};
