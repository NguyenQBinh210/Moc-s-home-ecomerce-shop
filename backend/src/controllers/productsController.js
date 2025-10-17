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

export const getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 8,
      search = "",
      category = "",
      supplier = "",
      sort = " newest",
    } = req.query;

    const filter = {};
    if (search) {
      filter.ten_san_pham = { $regex: search, $options: "i" };
    }

    if (category) {
      const categoryIds = category.split(",");
      filter.ma_danh_muc = { $in: categoryIds };
    }

    if (supplier) {
      const supplierIds = supplier.split(",");
      filter.ma_nha_cung_cap = { $in: supplierIds };
    }
    let sortOption = {};
    switch (sort) {
      case "price-low-high":
        sortOption = { gia: 1 };
        break;
      case "price-high-low":
        sortOption = { gia: -1 };
        break;
      case "name-a-z":
        sortOption = { ten_san_pham: 1 };
        break;
      case "name-z-a":
        sortOption = { ten_san_pham: -1 };
        break;
      case "newest":
      default: 
        sortOption = { created_at: -1 };
        break;
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await SanPham.countDocuments(filter);

    const products = await SanPham.find(filter)
      .populate("ma_danh_muc", "ten_danh_muc")
      .populate("ma_nha_cung_cap", "ten_nha_cung_cap")
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy danh sách sản phẩm",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await SanPham.findById(id)
      .populate("ma_danh_muc", "ten_danh_muc")
      .populate("ma_nha_cung_cap", "ten_nha_cung_cap");

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy sản phẩm" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy chi tiết sản phẩm",
    });
  }
};

export const createProduct = async (req, res) => {
  try {
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
