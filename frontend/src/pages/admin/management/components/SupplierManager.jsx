import React, { useState, useEffect } from "react";
import { suppliersAPI } from "../../../../services/api";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import DataTable from "../../../../components/ui/DataTable";
import ConfirmationModal from "../../../../components/ui/ConfirmationModal";
import { toast, ToastContainer } from "react-toastify";

const SupplierManager = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [formData, setFormData] = useState({
    _id: "",
    ten_nha_cung_cap: "",
    dia_chi: "",
    so_dien_thoai: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 5,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  // Load suppliers
  const loadSuppliers = async (page = pagination.currentPage) => {
    setLoading(true);
    try {
      const response = await suppliersAPI.getAll({
        search: searchTerm,
        page: page,
        limit: pagination.itemsPerPage,
      });
      setSuppliers(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Error loading suppliers:", error);
      toast.error("Lỗi khi tải danh sách nhà cung cấp");
    } finally {
      setLoading(false);
    }
  };

  // Load suppliers với limit cụ thể
  const loadSuppliersWithLimit = async (page, limit) => {
    setLoading(true);
    try {
      const response = await suppliersAPI.getAll({
        search: searchTerm,
        page: page,
        limit: limit,
      });
      setSuppliers(response.data);
      setPagination({
        currentPage: page,
        itemsPerPage: limit,
        totalPages: response.pagination.totalPages,
        totalItems: response.pagination.totalItems,
      });
    } catch (error) {
      console.error("Error loading suppliers:", error);
      toast.error("Lỗi khi tải danh sách nhà cung cấp");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuppliers(1);
  }, [searchTerm]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.ten_nha_cung_cap.trim()) {
      toast.error("Tên nhà cung cấp không được để trống");
      return;
    }

    setLoading(true);
    try {
      if (editingSupplier) {
        // Update supplier
        await suppliersAPI.update(editingSupplier._id, formData);
        toast.success("Cập nhật nhà cung cấp thành công");
      } else {
        // Create supplier
        await suppliersAPI.create(formData);
        toast.success("Tạo nhà cung cấp thành công");
      }

      loadSuppliers();
      resetForm();
    } catch (error) {
      console.error("Error saving supplier:", error);
      toast.error(error.message || "Lỗi khi lưu nhà cung cấp");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit supplier
  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      _id: supplier._id,
      ten_nha_cung_cap: supplier.ten_nha_cung_cap,
      dia_chi: supplier.dia_chi || "",
      so_dien_thoai: supplier.so_dien_thoai || "",
    });
  };

  // Handle delete supplier
  const handleDeleteClick = (supplier) => {
    setSupplierToDelete(supplier);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!supplierToDelete) return;

    setLoading(true);
    try {
      await suppliersAPI.delete(supplierToDelete._id);
      toast.success("Xóa nhà cung cấp thành công");
      loadSuppliers();
      setShowDeleteModal(false);
      setSupplierToDelete(null);
    } catch (error) {
      console.error("Error deleting supplier:", error);
      toast.error(error.message || "Lỗi khi xóa nhà cung cấp");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setSupplierToDelete(null);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      _id: "",
      ten_nha_cung_cap: "",
      dia_chi: "",
      so_dien_thoai: "",
    });
    setEditingSupplier(null);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    loadSuppliers(page);
  };

  // FIX: Hàm xử lý thay đổi số items per page
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    loadSuppliersWithLimit(1, newItemsPerPage);
  };

  // Table columns configuration
  const columns = [
    {
      header: "ID",
      key: "_id",
      className: "font-mono text-gray-900",
    },
    {
      header: "Tên nhà cung cấp",
      key: "ten_nha_cung_cap",
      className: "text-gray-900",
    },
    {
      header: "Địa chỉ",
      key: "dia_chi",
      render: (supplier) => supplier.dia_chi || "-",
      className: "text-gray-900",
    },
    {
      header: "Số điện thoại",
      key: "so_dien_thoai",
      render: (supplier) => supplier.so_dien_thoai || "-",
      className: "text-gray-900",
    },
    {
      header: "Thao tác",
      key: "actions",
      render: (supplier) => (
        <div className="space-x-2">
          <Button
            onClick={() => handleEdit(supplier)}
            variant="outline"
            size="sm"
            className="text-blue-600 hover:text-blue-900"
          >
            Sửa
          </Button>
          <Button
            onClick={() => handleDeleteClick(supplier)}
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-900"
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Xác nhận xóa"
        message={`Bạn có chắc chắn muốn xóa nhà cung cấp "${supplierToDelete?.ten_nha_cung_cap}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isLoading={loading}
        confirmText="Xóa"
        cancelText="Hủy"
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Quản lý Nhà cung cấp
        </h2>
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Tìm kiếm nhà cung cấp..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button
            onClick={resetForm}
            variant="outline"
            size="sm"
            className="text-white bg-green-600 hover:bg-green-700"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {editingSupplier ? "Chỉnh sửa nhà cung cấp" : "Thêm nhà cung cấp mới"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên nhà cung cấp *
              </label>
              <Input
                name="ten_nha_cung_cap"
                value={formData.ten_nha_cung_cap}
                onChange={handleInputChange}
                placeholder="Nhập tên nhà cung cấp"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              <Input
                name="so_dien_thoai"
                value={formData.so_dien_thoai}
                onChange={handleInputChange}
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ
              </label>
              <Input
                name="dia_chi"
                value={formData.dia_chi}
                onChange={handleInputChange}
                placeholder="Nhập địa chỉ"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {loading
                ? "Đang xử lý..."
                : editingSupplier
                ? "Cập nhật"
                : "Tạo mới"}
            </Button>
            {editingSupplier && (
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
        data={suppliers}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        emptyMessage="Không có nhà cung cấp nào"
        loadingMessage="Đang tải..."
      />
    </div>
  );
};

export default SupplierManager;