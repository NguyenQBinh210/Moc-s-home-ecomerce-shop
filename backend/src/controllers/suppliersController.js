import NhaCungCap from '../models/NhaCungCap.js';

// Lấy tất cả nhà cung cấp
export const getAllSuppliers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", all } = req.query;

    if (all === "true") {
      const allSuppliers = await NhaCungCap.find().sort({
        ten_nha_cung_cap: 1,
      });
      return res.status(200).json({
        success: true,
        data: allSuppliers,
      });
    }
    
    const filter = {};
    if (search) {
      filter.$or = [
        { ten_nha_cung_cap: { $regex: search, $options: 'i' } },
        { dia_chi: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const suppliers = await NhaCungCap.find(filter)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await NhaCungCap.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: suppliers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    res.status(500).json({ 
      success: false,
      message: "Lỗi server khi lấy danh sách nhà cung cấp" 
    });
  }
};

// Lấy nhà cung cấp theo ID
export const getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const supplier = await NhaCungCap.findById(id);

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy nhà cung cấp"
      });
    }

    res.status(200).json({
      success: true,
      data: supplier
    });
  } catch (error) {
    console.error("Error fetching supplier:", error);
    res.status(500).json({ 
      success: false,
      message: "Lỗi server khi lấy thông tin nhà cung cấp" 
    });
  }
};

// Tạo nhà cung cấp mới
export const createSupplier = async (req, res) => {
  try {
    const { ten_nha_cung_cap, dia_chi, so_dien_thoai, _id } = req.body;

    // Validation
    if (!ten_nha_cung_cap) {
      return res.status(400).json({
        success: false,
        message: "Tên nhà cung cấp là bắt buộc"
      });
    }

    const existingSupplier = await NhaCungCap.findOne({ 
      ten_nha_cung_cap: { $regex: new RegExp(`^${ten_nha_cung_cap}$`, 'i') } 
    });

    if (existingSupplier) {
      return res.status(400).json({
        success: false,
        message: "Nhà cung cấp đã tồn tại"
      });
    }

    if (_id) {
      const existingId = await NhaCungCap.findById(_id);
      if (existingId) {
        return res.status(400).json({
          success: false,
          message: "ID đã tồn tại"
        });
      }
    }

    const newSupplier = new NhaCungCap({
      ten_nha_cung_cap,
      dia_chi: dia_chi || '',
      so_dien_thoai: so_dien_thoai || '',
      ...(_id && { _id })
    });

    const savedSupplier = await newSupplier.save();

    res.status(201).json({
      success: true,
      message: "Tạo nhà cung cấp thành công",
      data: savedSupplier
    });
  } catch (error) {
    console.error("Error creating supplier:", error);
    res.status(500).json({ 
      success: false,
      message: "Lỗi server khi tạo nhà cung cấp" 
    });
  }
};

// Cập nhật nhà cung cấp
export const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const existingSupplier = await NhaCungCap.findById(id);
    if (!existingSupplier) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy nhà cung cấp"
      });
    }

    if (updateData.ten_nha_cung_cap) {
      const duplicateSupplier = await NhaCungCap.findOne({ 
        ten_nha_cung_cap: { $regex: new RegExp(`^${updateData.ten_nha_cung_cap}$`, 'i') },
        _id: { $ne: id }
      });

      if (duplicateSupplier) {
        return res.status(400).json({
          success: false,
          message: "Tên nhà cung cấp đã tồn tại"
        });
      }
    }

    const updatedSupplier = await NhaCungCap.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Cập nhật nhà cung cấp thành công",
      data: updatedSupplier
    });
  } catch (error) {
    console.error("Error updating supplier:", error);
    res.status(500).json({ 
      success: false,
      message: "Lỗi server khi cập nhật nhà cung cấp" 
    });
  }
};

// Xóa nhà cung cấp
export const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const supplier = await NhaCungCap.findById(id);
    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy nhà cung cấp"
      });
    }

    const SanPham = (await import('../models/Products.js')).default;
    const productsUsingSupplier = await SanPham.countDocuments({ ma_nha_cung_cap: id });

    if (productsUsingSupplier > 0) {
      return res.status(400).json({
        success: false,
        message: `Không thể xóa nhà cung cấp. Có ${productsUsingSupplier} sản phẩm đang sử dụng nhà cung cấp này.`
      });
    }

    await NhaCungCap.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Xóa nhà cung cấp thành công"
    });
  } catch (error) {
    console.error("Error deleting supplier:", error);
    res.status(500).json({ 
      success: false,
      message: "Lỗi server khi xóa nhà cung cấp" 
    });
  }
};
