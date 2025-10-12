import React, { useState, useEffect } from 'react';
import { categoriesAPI } from '../../../../services/api';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import DataTable from '../../../../components/ui/DataTable';
import ConfirmationModal from '../../../../components/ui/ConfirmationModal';
import { toast, ToastContainer } from 'react-toastify';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    _id: '',
    ten_danh_muc: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  // Load categories
  const loadCategories = async (page = pagination.currentPage) => {
    setLoading(true);
    try {
      const response = await categoriesAPI.getAll({ 
        search: searchTerm,
        page: page,
        limit: pagination.itemsPerPage
      });
      setCategories(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Error loading categories:', error);
      toast.error('Lỗi khi tải danh sách danh mục');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories(1); // Reset về trang 1 khi search
  }, [searchTerm]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.ten_danh_muc.trim()) {
      toast.error("Tên danh mục không được để trống");
      return;
    }

    setLoading(true);
    try {
      if (editingCategory) {
        // Update category
        await categoriesAPI.update(editingCategory._id, formData);
        toast.success("Cập nhật danh mục thành công");
      } else {
        // Create category
        await categoriesAPI.create(formData);
        toast.success("Tạo danh mục thành công");
      }
      
      loadCategories();
      resetForm();
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error(error.message || "Lỗi khi lưu danh mục");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit category
  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      _id: category._id,
      ten_danh_muc: category.ten_danh_muc
    });
  };

  // Handle delete category
  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;

    setLoading(true);
    try {
      await categoriesAPI.delete(categoryToDelete._id);
      toast.success("Xóa danh mục thành công");
      loadCategories();
      setShowDeleteModal(false);
      setCategoryToDelete(null);
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error(error.message || "Lỗi khi xóa danh mục");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      _id: '',
      ten_danh_muc: ''
    });
    setEditingCategory(null);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    loadCategories(page);
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setPagination(prev => ({ ...prev, itemsPerPage: newItemsPerPage }));
    loadCategories(1); // Reset về trang 1
  };

  // Table columns configuration
  const columns = [
    {
      header: 'ID',
      key: '_id',
      className: 'font-mono text-gray-900'
    },
    {
      header: 'Tên danh mục',
      key: 'ten_danh_muc',
      className: 'text-gray-900'
    },
    {
      header: 'Thao tác',
      key: 'actions',
      render: (category) => (
        <div className="space-x-2">
          <Button
            onClick={() => handleEdit(category)}
            variant="outline"
            size="sm"
            className="text-blue-600 hover:text-blue-900"
          >
            Sửa
          </Button>
          <Button
            onClick={() => handleDeleteClick(category)}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-900"
          >
            Xóa
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa danh mục "${categoryToDelete?.ten_danh_muc}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isLoading={loading}
        confirmText="Xóa"
        cancelText="Hủy"
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Quản lý Danh mục</h2>
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Tìm kiếm danh mục..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button
            onClick={resetForm}
            variant="outline"
            size="sm"
            className="text-white bg-blue-600 hover:bg-blue-700"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên danh mục *
            </label>
            <Input
              name="ten_danh_muc"
              value={formData.ten_danh_muc}
              onChange={handleInputChange}
              placeholder="Nhập tên danh mục"
              required
            />
          </div>
          
          <div className="flex space-x-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? "Đang xử lý..." : editingCategory ? "Cập nhật" : "Tạo mới"}
            </Button>
            {editingCategory && (
              <Button type="button" onClick={resetForm} variant="outline">
                Hủy
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={categories}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        emptyMessage="Không có danh mục nào"
        loadingMessage="Đang tải..."
      />
    </div>
  );
};

export default CategoryManager;
