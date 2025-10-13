import React from "react";
import {
  X,
  Package,
  DollarSign,
  Tag,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Share2,
  Download,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const ProductModal = ({ isOpen, onClose, product, onEdit, onDelete }) => {
  if (!isOpen || !product) return null;

  // --- HELPER FUNCTIONS ---

  const formatPrice = (price) => {
    if (typeof price !== "number") return "Chưa có giá";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Không xác định";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStockStatus = (stock) => {
    if (stock > 10) {
      return { color: "text-green-600", icon: CheckCircle };
    } else if (stock > 0) {
      return { color: "text-yellow-600", icon: AlertCircle };
    } else {
      return { color: "text-red-600", icon: AlertCircle };
    }
  };

  const stockStatus = getStockStatus(product.so_luong);
  const StockIcon = stockStatus.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {product.ten_san_pham}
              </h2>
              <p className="text-sm text-gray-500">ID: {product._id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(product)}
              className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
              title="Chỉnh sửa"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(product._id)}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
              title="Xóa"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Images */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Hình ảnh sản phẩm
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {product.hinh_anh && product.hinh_anh.length > 0 ? (
                    product.hinh_anh.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imageUrl}
                          alt={`${product.ten_san_pham} ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full flex items-center justify-center h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">
                          Chưa có hình ảnh
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Mô tả sản phẩm
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">
                    {product.mo_ta || "Chưa có mô tả sản phẩm."}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Thông tin cơ bản
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Giá bán:</span>
                    <span className="font-semibold text-green-600 flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {formatPrice(product.gia)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Danh mục:</span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      <Tag className="w-3 h-3" />
                      {product.ma_danh_muc?.ten_danh_muc || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Nhà cung cấp:</span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-medium">
                      <Package className="w-3 h-3" />
                      {product.ma_nha_cung_cap?.ten_nha_cung_cap || "N/A"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tồn kho:</span>
                    <span
                      className={`font-semibold flex items-center gap-1 ${stockStatus.color}`}
                    >
                      <StockIcon className="w-4 h-4" />
                      {product.so_luong} sản phẩm
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Trạng thái:</span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {product.trang_thai}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Ngày tạo:</span>
                    <span className="text-sm text-gray-900 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(product.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
