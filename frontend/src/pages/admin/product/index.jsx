import React, { useState, useEffect, useCallback } from "react";
import ProductTable from "./components/ProductTable";
import ProductForm from "./components/ProductForm";
import ProductModal from "./components/ProductModal";
import ProductFilters from "./components/ProductFilters";
import ProductActions from "./components/ProductActions";
import { toast, ToastContainer } from "react-toastify";

const API_URL = "http://localhost:3000";

const ProductManagement = () => {
  // --- STATE MANAGEMENT ---
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // State cho các chức năng của UI
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // State cho bộ lọc, tìm kiếm, sắp xếp
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ category: "", supplier: "" }); 
  const [sortBy, setSortBy] = useState("created_at"); 
  const [sortOrder, setSortOrder] = useState("desc");

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [paginationInfo, setPaginationInfo] = useState({});

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
        category: filters.category,
        supplier: filters.supplier,
        sortBy,
        sortOrder,
      });

      const response = await fetch(`${API_URL}/products?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
        setPaginationInfo(data.pagination);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách sản phẩm:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, searchTerm, filters, sortBy, sortOrder]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [categoriesRes, suppliersRes] = await Promise.all([
          fetch(`${API_URL}/categories?all=true`),
          fetch(`${API_URL}/suppliers?all=true`),
        ]);
        const categoriesData = await categoriesRes.json();
        const suppliersData = await suppliersRes.json();

        if (categoriesData.success) setCategories(categoriesData.data);
        if (suppliersData.success) setSuppliers(suppliersData.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu cho form:", error);
      }
    };
    fetchDropdownData();
  }, []);

  //EVENT HANDLERS 
  const handleOpenForm = (product = null) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingProduct(null);
    setIsFormOpen(false);
  };

  const handleViewProduct = (product) => {
    setViewingProduct(product);
    setIsModalOpen(true);
  };

  const handleSubmitProduct = async (formData, productId) => {
    const isEditing = !!productId;
    const url = isEditing
      ? `${API_URL}/products/${productId}`
      : `${API_URL}/products`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, { method, body: formData });
      const result = await response.json();

      if (result.success) {
        toast(
          isEditing
            ? "Cập nhật sản phẩm thành công!"
            : "Thêm sản phẩm thành công!"
        );
        fetchProducts(); 
        handleCloseForm();
      } else {
        toast(`Lỗi: ${result.message}`);
      }
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
      toast("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        const response = await fetch(`${API_URL}/products/${productId}`, {
          method: "DELETE",
        });
        const result = await response.json();

        if (result.success) {
          alert("Xóa sản phẩm thành công!");
          fetchProducts(); 
        } else {
          alert(`Lỗi: ${result.message}`);
        }
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
      }
    }
  };

  // Handler cho các bộ lọc
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); 
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Quản lý sản phẩm
          </h1>
          <p className="text-gray-600">
            Quản lý danh sách sản phẩm, thêm mới, chỉnh sửa và theo dõi tồn kho.
          </p>
        </div>

        <ProductActions
          onAddProduct={handleOpenForm}
          onRefresh={fetchProducts}
        />

        <ProductFilters
          onSearch={handleSearch}
          onFilter={handleFilterChange}
          categories={categories}
          suppliers={suppliers}
          totalProducts={paginationInfo.totalItems || 0}
        />

        {isLoading ? (
          <div className="text-center py-12">Đang tải dữ liệu...</div>
        ) : (
          <ProductTable
            products={products}
            onEdit={handleOpenForm}
            onDelete={handleDeleteProduct}
            onView={handleViewProduct}
            // Props cho phân trang
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={paginationInfo.totalItems || 0}
            totalPages={paginationInfo.totalPages || 1}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        )}

        {isFormOpen && (
          <ProductForm
            isOpen={isFormOpen}
            onClose={handleCloseForm}
            onSubmit={handleSubmitProduct}
            product={editingProduct}
            isEditing={!!editingProduct}
            categories={categories}
            suppliers={suppliers} 
          />
        )}

        {viewingProduct && (
          <ProductModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            product={viewingProduct}
            onEdit={handleOpenForm}
            onDelete={handleDeleteProduct}
          />
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
