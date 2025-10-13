import React, { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";

const ProductForm = ({
  isOpen,
  onClose,
  onSubmit,
  product = null,
  categories = [],
  suppliers = [],
  isEditing = false,
}) => {
  const initialFormState = {
    ten_san_pham: "",
    mo_ta: "",
    gia: "",
    so_luong: "",
    trang_thai: "còn hàng",
    ma_danh_muc: "",
    ma_nha_cung_cap: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (product && isEditing) {
        setFormData({
          ten_san_pham: product.ten_san_pham || "",
          mo_ta: product.mo_ta || "",
          gia: product.gia || "",
          so_luong: product.so_luong || "",
          trang_thai: product.trang_thai || "còn hàng",
          ma_danh_muc: product.ma_danh_muc?._id || product.ma_danh_muc || "",
          ma_nha_cung_cap:
            product.ma_nha_cung_cap?._id || product.ma_nha_cung_cap || "",
        });
        setImages(
          product.hinh_anh
            ? product.hinh_anh.map((url) => ({
                id: url,
                preview: url,
                isUrl: true,
              }))
            : []
        );
      } else {
        setFormData(initialFormState);
        setImages([]);
      }
    }
  }, [product, isEditing, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      isUrl: false,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (imageId) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionData = new FormData();
    for (const key in formData) {
      submissionData.append(key, formData[key]);
    }

    const existingImagesUrls = images
      .filter((img) => img.isUrl)
      .map((img) => img.preview);
    submissionData.append("existingImages", JSON.stringify(existingImagesUrls));

    images.forEach((image) => {
      if (!image.isUrl && image.file) {
        submissionData.append("hinh_anh", image.file);
      }
    });

    try {
      await onSubmit(submissionData, product?._id);
      onClose();
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;
 console.log("Dữ liệu cho form:", { categories, suppliers });
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditing ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {/* Tên & Trạng thái */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tên sản phẩm *
              </label>
              <input
                type="text"
                name="ten_san_pham"
                value={formData.ten_san_pham}
                onChange={handleInputChange}
                className="mt-1 w-full input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Trạng thái
              </label>
              <select
                name="trang_thai"
                value={formData.trang_thai}
                onChange={handleInputChange}
                className="mt-1 w-full input"
              >
                <option value="còn hàng">Còn hàng</option>
                <option value="hết hàng">Hết hàng</option>
              </select>
            </div>
          </div>

          {/* Danh mục & Nhà cung cấp */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Danh mục *
              </label>
              {/* Bỏ class "input" và thêm các class của Tailwind nếu muốn tùy chỉnh thêm */}
              <select
                name="ma_danh_muc"
                value={formData.ma_danh_muc}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
                required
              >
                <option value="">Chọn danh mục</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.ten_danh_muc}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nhà cung cấp
              </label>
              <select
                name="ma_nha_cung_cap"
                value={formData.ma_nha_cung_cap}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
              >
                <option value="">Chọn nhà cung cấp</option>
                {suppliers.map((sup) => (
                  <option key={sup._id} value={sup._id}>
                    {sup.ten_nha_cung_cap}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Giá & Tồn kho */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Giá (VNĐ)
              </label>
              <input
                type="number"
                name="gia"
                value={formData.gia}
                onChange={handleInputChange}
                className="mt-1 w-full input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Số lượng tồn kho
              </label>
              <input
                type="number"
                name="so_luong"
                value={formData.so_luong}
                onChange={handleInputChange}
                className="mt-1 w-full input"
              />
            </div>
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mô tả sản phẩm
            </label>
            <textarea
              name="mo_ta"
              value={formData.mo_ta}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 w-full input"
            />
          </div>

          {/* Hình ảnh */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Hình ảnh
            </label>
            <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                id="image-upload"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer text-sm text-amber-600 font-medium"
              >
                Chọn tệp để tải lên
              </label>
            </div>
            {images.length > 0 && (
              <div className="mt-2 grid grid-cols-3 sm:grid-cols-5 gap-2">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.preview}
                      alt="preview"
                      className="w-full h-20 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 text-xs"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={onClose} className="btn-secondary">
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting
                ? "Đang lưu..."
                : isEditing
                ? "Cập nhật"
                : "Thêm sản phẩm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
