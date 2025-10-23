import React, { useState } from 'react';
import { 
  Plus, 
  Upload, 
  Download, 
  Trash2, 
  Edit, 
  Eye,
  MoreVertical,
  FileText,
  BarChart3,
  Settings,
  RefreshCw,
  Archive,
  Copy,
  Share2
} from 'lucide-react';

const ProductActions = ({ 
  onAddProduct, 
  onBulkDelete, 
  onExport, 
  onRefresh,
  selectedCount = 0,
  totalProducts = 0,
  onViewAnalytics,
  onBulkEdit
}) => {
  const [showMoreActions, setShowMoreActions] = useState(false);

  const handleExport = () => {
    onExport();
  };

  const handleBulkDelete = () => {
    if (selectedCount > 0) {
      onBulkDelete();
    }
  };

  const handleBulkEdit = () => {
    if (selectedCount > 0) {
      onBulkEdit();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between">
        {/* Left Side - Main Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onAddProduct}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Thêm sản phẩm
          </button>




          <button
            onClick={onRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Làm mới
          </button>
        </div>

        {/* Right Side - Secondary Actions & Stats */}
        <div className="flex items-center gap-3">
          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Tổng: <span className="font-semibold text-gray-900">{totalProducts}</span></span>
            {selectedCount > 0 && (
              <span className="text-amber-600">
                Đã chọn: <span className="font-semibold">{selectedCount}</span>
              </span>
            )}
          </div>

          {/* Bulk Actions */}
          {selectedCount > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkEdit}
                className="flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors text-sm"
              >
                <Edit className="w-4 h-4" />
                Chỉnh sửa hàng loạt
              </button>

              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Xóa đã chọn
              </button>
            </div>
          )}

          {/* More Actions Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowMoreActions(!showMoreActions)}
              className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
              Thêm
            </button>

            {showMoreActions && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="py-1">
                  <button
                    onClick={() => {
                      onViewAnalytics();
                      setShowMoreActions(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Xem thống kê
                  </button>

                  <button
                    onClick={() => {
                      // Handle duplicate products
                      setShowMoreActions(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    Nhân bản sản phẩm
                  </button>

                  <button
                    onClick={() => {
                      setShowMoreActions(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Archive className="w-4 h-4" />
                    Lưu trữ
                  </button>

                  <button
                    onClick={() => {
                      setShowMoreActions(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Chia sẻ
                  </button>

                  <div className="border-t border-gray-200 my-1"></div>

                  <button
                    onClick={() => {
                      setShowMoreActions(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Cài đặt
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Bulk Actions Bar */}
      {selectedCount > 0 && (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                <span className="text-amber-800 font-semibold text-sm">{selectedCount}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-amber-800">
                  {selectedCount} sản phẩm đã được chọn
                </p>
                <p className="text-xs text-amber-600">
                  Chọn thao tác bạn muốn thực hiện
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkEdit}
                className="flex items-center gap-2 px-3 py-1.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm"
              >
                <Edit className="w-4 h-4" />
                Chỉnh sửa
              </button>

              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Xóa
              </button>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                Xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductActions;
