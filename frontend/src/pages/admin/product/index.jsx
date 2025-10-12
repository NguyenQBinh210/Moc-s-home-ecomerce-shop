import React, { useState, useEffect } from 'react';
import ProductTable from './components/ProductTable';
import ProductForm from './components/ProductForm';
import ProductModal from './components/ProductModal';
import ProductFilters from './components/ProductFilters';
import ProductActions from './components/ProductActions';

const ProductManagement = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter and search states
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    priceRange: '',
    stockRange: '',
    dateRange: ''
  });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Categories data
  const categories = [
    { id: 1, name: 'Ghế sofa' },
    { id: 2, name: 'Bàn ăn' },
    { id: 3, name: 'Giường ngủ' },
    { id: 4, name: 'Tủ quần áo' },
    { id: 5, name: 'Kệ sách' },
    { id: 6, name: 'Bàn làm việc' },
    { id: 7, name: 'Đèn chiếu sáng' },
    { id: 8, name: 'Thảm trải sàn' }
  ];

  // Sample data for demonstration
  useEffect(() => {
    const sampleProducts = [
      {
        id: 1,
        name: 'Ghế sofa 3 chỗ ngồi hiện đại',
        description: 'Ghế sofa 3 chỗ ngồi với thiết kế hiện đại, chất liệu vải bền đẹp, màu xám sang trọng.',
        price: 15000000,
        category: 'Ghế sofa',
        stock: 25,
        status: 'active',
        images: [
          { id: 1, preview: '/placeholder-sofa.jpg', name: 'sofa-main.jpg' }
        ],
        specifications: 'Kích thước: 220x90x85 cm\nChất liệu: Vải polyester\nMàu sắc: Xám\nTrọng lượng: 45kg',
        weight: '45kg',
        dimensions: '220x90x85 cm',
        material: 'Vải polyester',
        color: 'Xám',
        brand: 'Moc\'s Home',
        createdAt: '2024-01-15',
        views: 1250,
        rating: 4.5,
        sold: 12
      },
      {
        id: 2,
        name: 'Bàn ăn gỗ sồi 6 chỗ',
        description: 'Bàn ăn gỗ sồi tự nhiên, thiết kế tối giản, phù hợp với không gian hiện đại.',
        price: 8500000,
        category: 'Bàn ăn',
        stock: 8,
        status: 'active',
        images: [
          { id: 2, preview: '/placeholder-table.jpg', name: 'table-main.jpg' }
        ],
        specifications: 'Kích thước: 160x90x75 cm\nChất liệu: Gỗ sồi tự nhiên\nMàu sắc: Nâu gỗ\nTrọng lượng: 35kg',
        weight: '35kg',
        dimensions: '160x90x75 cm',
        material: 'Gỗ sồi tự nhiên',
        color: 'Nâu gỗ',
        brand: 'Moc\'s Home',
        createdAt: '2024-01-20',
        views: 890,
        rating: 4.8,
        sold: 5
      },
      {
        id: 3,
        name: 'Giường ngủ gỗ tần bì',
        description: 'Giường ngủ gỗ tần bì với thiết kế đơn giản, chắc chắn và bền đẹp.',
        price: 12000000,
        category: 'Giường ngủ',
        stock: 0,
        status: 'inactive',
        images: [
          { id: 3, preview: '/placeholder-bed.jpg', name: 'bed-main.jpg' }
        ],
        specifications: 'Kích thước: 200x160x25 cm\nChất liệu: Gỗ tần bì\nMàu sắc: Trắng\nTrọng lượng: 60kg',
        weight: '60kg',
        dimensions: '200x160x25 cm',
        material: 'Gỗ tần bì',
        color: 'Trắng',
        brand: 'Moc\'s Home',
        createdAt: '2024-01-10',
        views: 2100,
        rating: 4.3,
        sold: 8
      },
      {
        id: 4,
        name: 'Tủ quần áo 4 cánh',
        description: 'Tủ quần áo 4 cánh với thiết kế hiện đại, nhiều ngăn kéo tiện lợi.',
        price: 18000000,
        category: 'Tủ quần áo',
        stock: 3,
        status: 'active',
        images: [
          { id: 4, preview: '/placeholder-wardrobe.jpg', name: 'wardrobe-main.jpg' }
        ],
        specifications: 'Kích thước: 200x60x220 cm\nChất liệu: Gỗ MDF phủ melamine\nMàu sắc: Trắng\nTrọng lượng: 80kg',
        weight: '80kg',
        dimensions: '200x60x220 cm',
        material: 'Gỗ MDF phủ melamine',
        color: 'Trắng',
        brand: 'Moc\'s Home',
        createdAt: '2024-01-25',
        views: 1560,
        rating: 4.6,
        sold: 3
      },
      {
        id: 5,
        name: 'Kệ sách 5 tầng',
        description: 'Kệ sách 5 tầng với thiết kế mở, phù hợp để trưng bày sách và đồ trang trí.',
        price: 3200000,
        category: 'Kệ sách',
        stock: 15,
        status: 'active',
        images: [
          { id: 5, preview: '/placeholder-bookshelf.jpg', name: 'bookshelf-main.jpg' }
        ],
        specifications: 'Kích thước: 80x30x150 cm\nChất liệu: Gỗ công nghiệp\nMàu sắc: Nâu\nTrọng lượng: 25kg',
        weight: '25kg',
        dimensions: '80x30x150 cm',
        material: 'Gỗ công nghiệp',
        color: 'Nâu',
        brand: 'Moc\'s Home',
        createdAt: '2024-01-30',
        views: 750,
        rating: 4.4,
        sold: 7
      },
      {
        id: 6,
        name: 'Bàn làm việc gỗ óc chó',
        description: 'Bàn làm việc gỗ óc chó cao cấp với thiết kế tối giản, phù hợp cho văn phòng hiện đại.',
        price: 12500000,
        category: 'Bàn làm việc',
        stock: 12,
        status: 'active',
        images: [
          { id: 6, preview: '/placeholder-desk.jpg', name: 'desk-main.jpg' }
        ],
        specifications: 'Kích thước: 140x70x75 cm\nChất liệu: Gỗ óc chó tự nhiên\nMàu sắc: Nâu đậm\nTrọng lượng: 40kg',
        weight: '40kg',
        dimensions: '140x70x75 cm',
        material: 'Gỗ óc chó tự nhiên',
        color: 'Nâu đậm',
        brand: 'Moc\'s Home',
        createdAt: '2024-02-01',
        views: 980,
        rating: 4.7,
        sold: 4
      },
      {
        id: 7,
        name: 'Đèn chùm pha lê cao cấp',
        description: 'Đèn chùm pha lê với thiết kế sang trọng, tạo ánh sáng ấm áp cho không gian phòng khách.',
        price: 6500000,
        category: 'Đèn chiếu sáng',
        stock: 6,
        status: 'active',
        images: [
          { id: 7, preview: '/placeholder-chandelier.jpg', name: 'chandelier-main.jpg' }
        ],
        specifications: 'Kích thước: 60x60x80 cm\nChất liệu: Pha lê, kim loại mạ vàng\nMàu sắc: Vàng đồng\nTrọng lượng: 15kg',
        weight: '15kg',
        dimensions: '60x60x80 cm',
        material: 'Pha lê, kim loại mạ vàng',
        color: 'Vàng đồng',
        brand: 'Moc\'s Home',
        createdAt: '2024-02-05',
        views: 1450,
        rating: 4.9,
        sold: 2
      },
      {
        id: 8,
        name: 'Thảm trải sàn lông cừu',
        description: 'Thảm trải sàn lông cừu tự nhiên, mềm mại và ấm áp, phù hợp cho phòng ngủ.',
        price: 4200000,
        category: 'Thảm trải sàn',
        stock: 18,
        status: 'active',
        images: [
          { id: 8, preview: '/placeholder-rug.jpg', name: 'rug-main.jpg' }
        ],
        specifications: 'Kích thước: 200x300 cm\nChất liệu: Lông cừu tự nhiên\nMàu sắc: Trắng kem\nTrọng lượng: 8kg',
        weight: '8kg',
        dimensions: '200x300 cm',
        material: 'Lông cừu tự nhiên',
        color: 'Trắng kem',
        brand: 'Moc\'s Home',
        createdAt: '2024-02-08',
        views: 680,
        rating: 4.6,
        sold: 6
      },
      {
        id: 9,
        name: 'Ghế đôn gỗ sồi',
        description: 'Ghế đôn gỗ sồi với thiết kế đơn giản, có thể sử dụng làm ghế phụ hoặc bàn cà phê.',
        price: 2800000,
        category: 'Ghế sofa',
        stock: 22,
        status: 'active',
        images: [
          { id: 9, preview: '/placeholder-ottoman.jpg', name: 'ottoman-main.jpg' }
        ],
        specifications: 'Kích thước: 50x50x40 cm\nChất liệu: Gỗ sồi, vải bọc\nMàu sắc: Nâu gỗ\nTrọng lượng: 12kg',
        weight: '12kg',
        dimensions: '50x50x40 cm',
        material: 'Gỗ sồi, vải bọc',
        color: 'Nâu gỗ',
        brand: 'Moc\'s Home',
        createdAt: '2024-02-10',
        views: 420,
        rating: 4.2,
        sold: 9
      },
      {
        id: 10,
        name: 'Tủ bếp gỗ công nghiệp',
        description: 'Tủ bếp gỗ công nghiệp với thiết kế hiện đại, nhiều ngăn kéo và tủ treo tiện lợi.',
        price: 25000000,
        category: 'Tủ quần áo',
        stock: 2,
        status: 'active',
        images: [
          { id: 10, preview: '/placeholder-kitchen.jpg', name: 'kitchen-main.jpg' }
        ],
        specifications: 'Kích thước: 300x60x220 cm\nChất liệu: Gỗ công nghiệp phủ melamine\nMàu sắc: Trắng\nTrọng lượng: 120kg',
        weight: '120kg',
        dimensions: '300x60x220 cm',
        material: 'Gỗ công nghiệp phủ melamine',
        color: 'Trắng',
        brand: 'Moc\'s Home',
        createdAt: '2024-02-12',
        views: 2100,
        rating: 4.8,
        sold: 1
      }
    ];

    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(product => product.status === filters.status);
    }

    // Price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max === 999999999) {
          return product.price >= min;
        }
        return product.price >= min && product.price <= max;
      });
    }

    // Stock range filter
    if (filters.stockRange) {
      const [min, max] = filters.stockRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max === 999999) {
          return product.stock >= min;
        }
        return product.stock >= min && product.stock <= max;
      });
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, searchTerm, filters, sortBy, sortOrder]);

  // Pagination logic
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Event handlers
  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleViewProduct = (product) => {
    setViewingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleToggleStatus = (productId) => {
    setProducts(products.map(p => 
      p.id === productId 
        ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
        : p
    ));
  };

  const handleSubmitProduct = async (formData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...formData, id: editingProduct.id }
          : p
      ));
    } else {
      // Add new product
      const newProduct = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
        views: 0,
        rating: 0,
        sold: 0
      };
      setProducts([...products, newProduct]);
    }

    setIsLoading(false);
    setIsFormOpen(false);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSort = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

  const handleReset = () => {
    setSearchTerm('');
    setFilters({
      category: '',
      status: '',
      priceRange: '',
      stockRange: '',
      dateRange: ''
    });
    setSortBy('name');
    setSortOrder('asc');
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa ${selectedProducts.length} sản phẩm đã chọn?`)) {
      setProducts(products.filter(p => !selectedProducts.includes(p.id)));
      setSelectedProducts([]);
    }
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting products...');
  };

  const handleImport = () => {
    // Implement import functionality
    console.log('Importing products...');
  };

  const handleRefresh = () => {
    // Implement refresh functionality
    console.log('Refreshing products...');
  };

  const handleViewAnalytics = () => {
    // Implement analytics view
    console.log('Viewing analytics...');
  };

  const handleBulkEdit = () => {
    // Implement bulk edit functionality
    console.log('Bulk editing products...');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quản lý sản phẩm</h1>
          <p className="text-gray-600">
            Quản lý danh sách sản phẩm, thêm mới, chỉnh sửa và theo dõi tồn kho
          </p>
        </div>

        {/* Product Actions */}
        <ProductActions
          onAddProduct={handleAddProduct}
          onBulkDelete={handleBulkDelete}
          onExport={handleExport}
          onImport={handleImport}
          onRefresh={handleRefresh}
          selectedCount={selectedProducts.length}
          totalProducts={products.length}
          onViewAnalytics={handleViewAnalytics}
          onBulkEdit={handleBulkEdit}
        />

        {/* Product Filters */}
        <ProductFilters
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
          onReset={handleReset}
          categories={categories}
          totalProducts={products.length}
          filteredCount={filteredProducts.length}
        />

        {/* Product Table */}
        <ProductTable
          products={currentProducts}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onView={handleViewProduct}
          onToggleStatus={handleToggleStatus}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />

        {/* Product Form Modal */}
        <ProductForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleSubmitProduct}
          product={editingProduct}
          categories={categories}
          isEditing={!!editingProduct}
        />

        {/* Product Detail Modal */}
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={viewingProduct}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>
    </div>
  );
};

export default ProductManagement;
