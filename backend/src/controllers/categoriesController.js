import DanhMuc from '../models/DanhMuc.js';

// Lấy tất cả danh mục
export const getAllCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", all } = req.query;
    
    if (all === "true") {
      const allCategories = await DanhMuc.find().sort({ ten_danh_muc: 1 });
      return res.status(200).json({
        success: true,
        data: allCategories,
      });
    }
    
    const filter = {};
    if (search) {
      filter.ten_danh_muc = { $regex: search, $options: 'i' };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const categories = await DanhMuc.find(filter)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await DanhMuc.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: categories,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ 
      success: false,
      message: "Lỗi server khi lấy danh sách danh mục" 
    });
  }
};

// Lấy danh mục theo ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const category = await DanhMuc.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh mục"
      });
    }

    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ 
      success: false,
      message: "Lỗi server khi lấy thông tin danh mục" 
    });
  }
};

// Tạo danh mục mới
export const createCategory = async (req, res) => {
  try {
    const { ten_danh_muc, _id } = req.body;

    if (!ten_danh_muc) {
      return res.status(400).json({
        success: false,
        message: "Tên danh mục là bắt buộc"
      });
    }

    const existingCategory = await DanhMuc.findOne({ 
      ten_danh_muc: { $regex: new RegExp(`^${ten_danh_muc}$`, 'i') } 
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Danh mục đã tồn tại"
      });
    }
    if (_id) {
      const existingId = await DanhMuc.findById(_id);
      if (existingId) {
        return res.status(400).json({
          success: false,
          message: "ID đã tồn tại"
        });
      }
    }

    const newCategory = new DanhMuc({
      ten_danh_muc,
      ...(_id && { _id }) 
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Tạo danh mục thành công",
      data: savedCategory
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ 
      success: false,
      message: "Lỗi server khi tạo danh mục" 
    });
  }
};

// Cập nhật danh mục
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { ten_danh_muc } = req.body;
    const existingCategory = await DanhMuc.findById(id);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh mục"
      });
    }

    if (ten_danh_muc) {
      const duplicateCategory = await DanhMuc.findOne({ 
        ten_danh_muc: { $regex: new RegExp(`^${ten_danh_muc}$`, 'i') },
        _id: { $ne: id }
      });

      if (duplicateCategory) {
        return res.status(400).json({
          success: false,
          message: "Tên danh mục đã tồn tại"
        });
      }
    }

    const updatedCategory = await DanhMuc.findByIdAndUpdate(
      id,
      { ten_danh_muc },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Cập nhật danh mục thành công",
      data: updatedCategory
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ 
      success: false,
      message: "Lỗi server khi cập nhật danh mục" 
    });
  }
};

// Xóa danh mục
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await DanhMuc.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy danh mục"
      });
    }

    const SanPham = (await import('../models/Products.js')).default;
    const productsUsingCategory = await SanPham.countDocuments({ ma_danh_muc: id });

    if (productsUsingCategory > 0) {
      return res.status(400).json({
        success: false,
        message: `Không thể xóa danh mục. Có ${productsUsingCategory} sản phẩm đang sử dụng danh mục này.`
      });
    }

    await DanhMuc.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Xóa danh mục thành công"
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ 
      success: false,
      message: "Lỗi server khi xóa danh mục" 
    });
  }
};
