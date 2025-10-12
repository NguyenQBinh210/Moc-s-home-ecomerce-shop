import React from 'react';
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
  Star,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const ProductModal = ({ isOpen, onClose, product, onEdit, onDelete }) => {
  if (!isOpen || !product) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Hoạt động';
      case 'inactive':
        return 'Tạm dừng';
      case 'draft':
        return 'Bản nháp';
      default:
        return 'Không xác định';
    }
  };

  const getStockStatus = (stock) => {
    if (stock > 10) {
      return { color: 'text-green-600', icon: CheckCircle, text: 'Còn hàng' };
    } else if (stock > 0) {
      return { color: 'text-yellow-600', icon: AlertCircle, text: 'Sắp hết hàng' };
    } else {
      return { color: 'text-red-600', icon: AlertCircle, text: 'Hết hàng' };
    }
  };

  const stockStatus = getStockStatus(product.stock);
  const StockIcon = stockStatus.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
              <p className="text-sm text-gray-500">ID: {product.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(product)}
              className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
              title="Chỉnh sửa"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Xóa"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Images */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Hình ảnh sản phẩm</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {product.images && product.images.length > 0 ? (
                    product.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.preview || image.url}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                          <button className="opacity-0 group-hover:opacity-100 p-2 bg-white rounded-full shadow-lg transition-opacity">
                            <Eye className="w-4 h-4 text-gray-700" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full flex items-center justify-center h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Chưa có hình ảnh</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Mô tả sản phẩm</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description || 'Chưa có mô tả sản phẩm'}
                  </p>
                </div>
              </div>

              {/* Specifications */}
              {product.specifications && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Thông số kỹ thuật</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-gray-700 whitespace-pre-wrap font-sans">
                      {product.specifications}
                    </pre>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin cơ bản</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Giá bán:</span>
                    <span className="font-semibold text-green-600 flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Danh mục:</span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      <Tag className="w-3 h-3" />
                      {product.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tồn kho:</span>
                    <span className={`font-semibold flex items-center gap-1 ${stockStatus.color}`}>
                      <StockIcon className="w-4 h-4" />
                      {product.stock} sản phẩm
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Trạng thái:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {getStatusText(product.status)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Ngày tạo:</span>
                    <span className="text-sm text-gray-900 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(product.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Chi tiết bổ sung</h3>
                <div className="space-y-3">
                  {product.brand && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Thương hiệu:</span>
                      <span className="text-sm font-medium text-gray-900">{product.brand}</span>
                    </div>
                  )}
                  
                  {product.color && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Màu sắc:</span>
                      <span className="text-sm font-medium text-gray-900">{product.color}</span>
                    </div>
                  )}

                  {product.material && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Chất liệu:</span>
                      <span className="text-sm font-medium text-gray-900">{product.material}</span>
                    </div>
                  )}

                  {product.dimensions && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Kích thước:</span>
                      <span className="text-sm font-medium text-gray-900">{product.dimensions}</span>
                    </div>
                  )}

                  {product.weight && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Trọng lượng:</span>
                      <span className="text-sm font-medium text-gray-900">{product.weight}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Thống kê</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Lượt xem:</span>
                    <span className="text-sm font-medium text-gray-900 flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {product.views || 0}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Đánh giá:</span>
                    <span className="text-sm font-medium text-gray-900 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {product.rating || 0}/5
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Đã bán:</span>
                    <span className="text-sm font-medium text-gray-900 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      {product.sold || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => onEdit(product)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Chỉnh sửa sản phẩm
                </button>
                
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    <Share2 className="w-4 h-4" />
                    Chia sẻ
                  </button>
                  <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                    <Download className="w-4 h-4" />
                    Xuất PDF
                  </button>
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
