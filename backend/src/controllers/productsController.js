import SanPham from '../models/Products.js';
import DanhMuc from '../models/DanhMuc.js';
import NhaCungCap from '../models/NhaCungCap.js';

// Lấy tất cả sản phẩm với filter và pagination
export const getAllProducts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 6, 
      search = '', 
      category = '', 
      supplier = '',
      minPrice = '',
      maxPrice = '',
      status = ''
    } = req.query;

    const filter = {};
    if (search) {
      filter.ten_san_pham = { $regex: search, $options: 'i' };
    }
    
    if (category) {
      filter.ma_danh_muc = category;
    }
    
    if (supplier) {
      filter.ma_nha_cung_cap = supplier;
    }
    
    if (minPrice || maxPrice) {
      filter.gia = {};
      if (minPrice) filter.gia.$gte = parseFloat(minPrice);
      if (maxPrice) filter.gia.$lte = parseFloat(maxPrice);
    }
    
    if (status) {
      filter.trang_thai = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const products = await SanPham.find(filter)
      .populate('ma_danh_muc', 'ten_danh_muc')
      .populate('ma_nha_cung_cap', 'ten_nha_cung_cap')
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await SanPham.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ 
      success: false,
      message: "Lỗi server khi lấy danh sách sản phẩm" 
    });
  }
};

// Lấy sản phẩm theo ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await SanPham.findById(id)
      .populate('ma_danh_muc', 'ten_danh_muc')
      .populate('ma_nha_cung_cap', 'ten_nha_cung_cap dia_chi so_dien_thoai');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm"
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ 
      success: false,
      message: "Lỗi server khi lấy thông tin sản phẩm" 
    });
  }
};

// Tạo sản phẩm mới
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
      hinh_anh,
      _id
    } = req.body;

    // Validation
    if (!ten_san_pham || !gia || !so_luong) {
      return res.status(400).json({
        success: false,
        message: "Tên sản phẩm, giá và số lượng là bắt buộc"
      });
    }

    // Kiểm tra danh mục tồn tại
    if (ma_danh_muc) {
      const category = await DanhMuc.findById(ma_danh_muc);
      if (!category) {
        return res.status(400).json({
          success: false,
          message: "Danh mục không tồn tại"
        });
      }
    }

    // Kiểm tra nhà cung cấp tồn tại
    if (ma_nha_cung_cap) {
      const supplier = await NhaCungCap.findById(ma_nha_cung_cap);
      if (!supplier) {
        return res.status(400).json({
          success: false,
          message: "Nhà cung cấp không tồn tại"
        });
      }
    }

    // Kiểm tra ID đã tồn tại (nếu có cung cấp ID thủ công)
    if (_id) {
      const existingId = await SanPham.findById(_id);
      if (existingId) {
        return res.status(400).json({
          success: false,
          message: "ID đã tồn tại"
        });
      }
    }

    // Tạo sản phẩm mới
    const newProduct = new SanPham({
      ten_san_pham,
      mo_ta: mo_ta || '',
      gia: parseFloat(gia),
      so_luong: parseInt(so_luong),
      trang_thai: trang_thai || 'còn hàng',
      ma_danh_muc: ma_danh_muc || null,
      ma_nha_cung_cap: ma_nha_cung_cap || null,
      hinh_anh: hinh_anh || [],
      ...(_id && { _id }) // Thêm ID thủ công nếu có
    });

    const savedProduct = await newProduct.save();
    
    // Populate để trả về thông tin đầy đủ
    const populatedProduct = await SanPham.findById(savedProduct._id)
      .populate('ma_danh_muc', 'ten_danh_muc')
      .populate('ma_nha_cung_cap', 'ten_nha_cung_cap');

    res.status(201).json({
      success: true,
      message: "Tạo sản phẩm thành công",
      data: populatedProduct
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ 
      success: false,
      message: "Lỗi server khi tạo sản phẩm" 
    });
  }
};

// Cập nhật sản phẩm
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const existingProduct = await SanPham.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm"
      });
    }

    if (updateData.ma_danh_muc) {
      const category = await DanhMuc.findById(updateData.ma_danh_muc);
      if (!category) {
        return res.status(400).json({
          success: false,
          message: "Danh mục không tồn tại"
        });
      }
    }

    if (updateData.ma_nha_cung_cap) {
      const supplier = await NhaCungCap.findById(updateData.ma_nha_cung_cap);
      if (!supplier) {
        return res.status(400).json({
          success: false,
          message: "Nhà cung cấp không tồn tại"
        });
      }
    }

    if (updateData.gia) updateData.gia = parseFloat(updateData.gia);
    if (updateData.so_luong) updateData.so_luong = parseInt(updateData.so_luong);

    const updatedProduct = await SanPham.findByIdAndUpdate(
      id,
      { ...updateData, updated_at: new Date() },
      { new: true, runValidators: true }
    ).populate('ma_danh_muc', 'ten_danh_muc')
     .populate('ma_nha_cung_cap', 'ten_nha_cung_cap');

    res.status(200).json({
      success: true,
      message: "Cập nhật sản phẩm thành công",
      data: updatedProduct
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ 
      success: false,
      message: "Lỗi server khi cập nhật sản phẩm" 
    });
  }
};

// Xóa sản phẩm
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await SanPham.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm"
      });
    }

    await SanPham.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Xóa sản phẩm thành công"
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ 
      success: false,
      message: "Lỗi server khi xóa sản phẩm" 
    });
  }
};