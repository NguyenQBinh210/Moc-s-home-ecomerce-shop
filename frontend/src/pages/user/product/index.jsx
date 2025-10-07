import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import FilterSidebar from "./components/FilterSidebar";
import SearchBar from "./components/SearchBar";
import SortingControls from "./components/SortingControls";
import ProductGrid from "./components/ProductGrid";
import QuickViewModal from "./components/QuickViewModal";
import Pagination from "./components/Pagination";

const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    searchParams?.get("search") || ""
  );
  const [sortBy, setSortBy] = useState(
    searchParams?.get("sort") || "relevance"
  );
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams?.get("page")) || 1
  );
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [comparedProducts, setComparedProducts] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    materials: [],
    colors: [],
    rooms: [],
    brands: [],
    priceRange: { min: "", max: "" },
  });

  const productsPerPage = 20;

  // Mock products data
  const mockProducts = [
    {
      id: 1,
      name: "Ghế Sofa Da Cao Cấp Milano",
      category: "Ghế Sofa",
      brand: "FurniCraft Premium",
      price: 15500000,
      originalPrice: 18500000,
      discountPercentage: 16,
      rating: 4.8,
      reviewCount: 124,
      material: "Da thật + Khung gỗ sồi",
      color: { name: "Nâu đậm", hex: "#8B4513" },
      dimensions: "220 x 95 x 85 cm",
      weight: "85 kg",
      stock: 15,
      isOnSale: true,
      isNew: false,
      freeShipping: true,
      isWishlisted: false,
      description: `Ghế sofa da cao cấp Milano mang đến sự sang trọng và thoải mái tuyệt đối cho không gian phòng khách của bạn. Được làm từ da thật 100% với khung gỗ sồi chắc chắn, sản phẩm đảm bảo độ bền cao và vẻ đẹp lâu dài.`,
      images: [
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=800&fit=crop",
      ],
    },
    {
      id: 2,
      name: "Bàn Làm Việc Gỗ Tự Nhiên Scandinavian",
      category: "Bàn Làm Việc",
      brand: "Modern Home",
      price: 4200000,
      originalPrice: null,
      discountPercentage: 0,
      rating: 4.6,
      reviewCount: 89,
      material: "Gỗ sồi tự nhiên",
      color: { name: "Vàng gỗ tự nhiên", hex: "#DEB887" },
      dimensions: "120 x 60 x 75 cm",
      weight: "25 kg",
      stock: 8,
      isOnSale: false,
      isNew: true,
      freeShipping: true,
      isWishlisted: true,
      description: `Bàn làm việc phong cách Scandinavian với thiết kế tối giản nhưng không kém phần tinh tế. Được chế tác từ gỗ sồi tự nhiên cao cấp, mang lại cảm giác gần gũi với thiên nhiên cho không gian làm việc.`,
      images: [
        "https://images.unsplash.com/photo-1549497538-303791108f95?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop",
      ],
    },
    {
      id: 3,
      name: "Tủ Quần Áo 4 Cánh Hiện Đại",
      category: "Tủ Quần Áo",
      brand: "Urban Style",
      price: 8900000,
      originalPrice: 10500000,
      discountPercentage: 15,
      rating: 4.5,
      reviewCount: 67,
      material: "Gỗ MDF phủ Melamine",
      color: { name: "Trắng", hex: "#FFFFFF" },
      dimensions: "180 x 60 x 220 cm",
      weight: "120 kg",
      stock: 5,
      isOnSale: true,
      isNew: false,
      freeShipping: true,
      isWishlisted: false,
      description: `Tủ quần áo 4 cánh với thiết kế hiện đại, tối ưu hóa không gian lưu trữ. Bên trong được chia ngăn khoa học với thanh treo quần áo, ngăn kéo và kệ để đồ tiện lợi.`,
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1549497538-303791108f95?w=800&h=800&fit=crop",
      ],
    },
    {
      id: 4,
      name: "Giường Ngủ Gỗ Sồi Cao Cấp Queen Size",
      category: "Giường Ngủ",
      brand: "Classic Wood",
      price: 12800000,
      originalPrice: null,
      discountPercentage: 0,
      rating: 4.9,
      reviewCount: 156,
      material: "Gỗ sồi tự nhiên",
      color: { name: "Nâu gỗ tự nhiên", hex: "#8B4513" },
      dimensions: "160 x 200 x 100 cm",
      weight: "95 kg",
      stock: 12,
      isOnSale: false,
      isNew: false,
      freeShipping: true,
      isWishlisted: false,
      description: `Giường ngủ gỗ sồi cao cấp với thiết kế cổ điển sang trọng. Đầu giường được chạm khắc tinh xảo, tạo điểm nhấn đẹp mắt cho phòng ngủ. Kích thước Queen Size phù hợp cho các cặp đôi.`,
      images: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1549497538-303791108f95?w=800&h=800&fit=crop",
      ],
    },
    {
      id: 5,
      name: "Kệ Sách 5 Tầng Đa Năng",
      category: "Kệ Sách",
      brand: "Eco Living",
      price: 2800000,
      originalPrice: 3200000,
      discountPercentage: 13,
      rating: 4.4,
      reviewCount: 92,
      material: "Gỗ thông tự nhiên",
      color: { name: "Nâu nhạt", hex: "#DEB887" },
      dimensions: "80 x 30 x 180 cm",
      weight: "35 kg",
      stock: 20,
      isOnSale: true,
      isNew: true,
      freeShipping: false,
      isWishlisted: true,
      description: `Kệ sách 5 tầng đa năng với thiết kế đơn giản nhưng tiện dụng. Có thể sử dụng để trưng bày sách, đồ trang trí hoặc các vật dụng cá nhân. Chất liệu gỗ thông tự nhiên thân thiện với môi trường.`,
      images: [
        "https://images.unsplash.com/photo-1549497538-303791108f95?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop",
      ],
    },
    {
      id: 6,
      name: "Bàn Ăn Tròn Gỗ Cao Su 6 Chỗ",
      category: "Bàn Ăn",
      brand: "Comfort Zone",
      price: 6500000,
      originalPrice: null,
      discountPercentage: 0,
      rating: 4.7,
      reviewCount: 78,
      material: "Gỗ cao su tự nhiên",
      color: { name: "Nâu vàng", hex: "#CD853F" },
      dimensions: "Ø 140 x 75 cm",
      weight: "45 kg",
      stock: 7,
      isOnSale: false,
      isNew: false,
      freeShipping: true,
      isWishlisted: false,
      description: `Bàn ăn tròn 6 chỗ ngồi với thiết kế ấm cúng, tạo không gian gần gũi cho gia đình. Chân bàn được thiết kế chắc chắn, bề mặt được xử lý chống nước và dễ vệ sinh.`,
      images: [
        "https://images.unsplash.com/photo-1549497538-303791108f95?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop",
      ],
    },
    {
      id: 7,
      name: "Ghế Văn Phòng Ergonomic Premium",
      category: "Ghế Văn Phòng",
      brand: "Modern Home",
      price: 3200000,
      originalPrice: 3800000,
      discountPercentage: 16,
      rating: 4.6,
      reviewCount: 134,
      material: "Lưới + Nhựa ABS",
      color: { name: "Đen", hex: "#000000" },
      dimensions: "65 x 65 x 110-120 cm",
      weight: "18 kg",
      stock: 25,
      isOnSale: true,
      isNew: false,
      freeShipping: true,
      isWishlisted: false,
      description: `Ghế văn phòng ergonomic với thiết kế hỗ trợ tối ưu cho cột sống. Tính năng điều chỉnh độ cao, tựa lưng và tay vịn giúp người dùng có tư thế ngồi thoải mái nhất trong thời gian dài.`,
      images: [
        "https://images.unsplash.com/photo-1549497538-303791108f95?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop",
      ],
    },
    {
      id: 8,
      name: "Tủ Trang Trí Phòng Khách Vintage",
      category: "Tủ Trang Trí",
      brand: "Classic Wood",
      price: 7200000,
      originalPrice: null,
      discountPercentage: 0,
      rating: 4.8,
      reviewCount: 45,
      material: "Gỗ sồi + Kính cường lực",
      color: { name: "Nâu cổ điển", hex: "#8B4513" },
      dimensions: "120 x 40 x 180 cm",
      weight: "65 kg",
      stock: 3,
      isOnSale: false,
      isNew: true,
      freeShipping: true,
      isWishlisted: true,
      description: `Tủ trang trí phong cách vintage với thiết kế cổ điển sang trọng. Kết hợp giữa gỗ sồi tự nhiên và kính cường lực, tạo không gian trưng bày đẹp mắt cho các vật dụng trang trí.`,
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop",
        "https://images.unsplash.com/photo-1549497538-303791108f95?w=800&h=800&fit=crop",
      ],
    },
  ];

  // Filter and sort products
  const getFilteredProducts = () => {
    let filtered = [...mockProducts];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(
        (product) =>
          product?.name?.toLowerCase()?.includes(query) ||
          product?.category?.toLowerCase()?.includes(query) ||
          product?.brand?.toLowerCase()?.includes(query) ||
          product?.material?.toLowerCase()?.includes(query)
      );
    }

    // Apply category filter
    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter((product) =>
        filters?.categories?.some((cat) =>
          product?.category?.toLowerCase()?.includes(cat)
        )
      );
    }

    // Apply material filter
    if (filters?.materials?.length > 0) {
      filtered = filtered?.filter((product) =>
        filters?.materials?.some((mat) =>
          product?.material?.toLowerCase()?.includes(mat)
        )
      );
    }

    // Apply color filter
    if (filters?.colors?.length > 0) {
      filtered = filtered?.filter((product) =>
        filters?.colors?.includes(product?.color?.name?.toLowerCase())
      );
    }

    // Apply brand filter
    if (filters?.brands?.length > 0) {
      filtered = filtered?.filter((product) =>
        filters?.brands?.some((brand) =>
          product?.brand?.toLowerCase()?.includes(brand)
        )
      );
    }

    // Apply price range filter
    if (filters?.priceRange?.min || filters?.priceRange?.max) {
      const min = parseFloat(filters?.priceRange?.min) || 0;
      const max = parseFloat(filters?.priceRange?.max) || Infinity;
      filtered = filtered?.filter(
        (product) => product?.price >= min && product?.price <= max
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case "price-high-low":
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      case "rating":
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case "newest":
        filtered?.sort((a, b) => b?.isNew - a?.isNew);
        break;
      case "popular":
        filtered?.sort((a, b) => b?.reviewCount - a?.reviewCount);
        break;
      case "name-a-z":
        filtered?.sort((a, b) => a?.name?.localeCompare(b?.name, "vi"));
        break;
      case "name-z-a":
        filtered?.sort((a, b) => b?.name?.localeCompare(a?.name, "vi"));
        break;
      default:
        // relevance - keep original order
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  const totalPages = Math.ceil(filteredProducts?.length / productsPerPage);
  const paginatedProducts = filteredProducts?.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params?.set("search", searchQuery);
    if (sortBy !== "relevance") params?.set("sort", sortBy);
    if (currentPage !== 1) params?.set("page", currentPage?.toString());

    setSearchParams(params);
  }, [searchQuery, sortBy, currentPage, setSearchParams]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      materials: [],
      colors: [],
      rooms: [],
      brands: [],
      priceRange: { min: "", max: "" },
    });
    setCurrentPage(1);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handleAddToWishlist = (product) => {
    // Mock wishlist functionality
    console.log("Added to wishlist:", product?.name);
  };

  const handleAddToCart = (product) => {
    // Mock cart functionality
    console.log("Added to cart:", product?.name);
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setShowQuickView(true);
  };

  const handleCompare = (product) => {
    if (
      comparedProducts?.length < 3 &&
      !comparedProducts?.find((p) => p?.id === product?.id)
    ) {
      setComparedProducts((prev) => [...prev, product]);
    }
  };

  const removeFromCompare = (productId) => {
    setComparedProducts((prev) => prev?.filter((p) => p?.id !== productId));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-warm py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-text-primary mb-4">
              Khám Phá Bộ Sưu Tập Nội Thất
            </h1>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Tìm kiếm những món nội thất hoàn hảo để biến ngôi nhà của bạn
              thành không gian sống lý tưởng
            </p>

            {/* Search Bar */}
            <SearchBar
              onSearch={handleSearch}
              searchQuery={searchQuery}
              suggestions={[]}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          {/* Main Content */}
          <div className="flex-1 lg:ml-0">
            {/* Mobile Filter Button */}
            <div className="lg:hidden p-4 border-b border-border">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
                iconName="Filter"
                iconPosition="left"
                className="w-full"
              >
                Bộ Lọc & Sắp Xếp
              </Button>
            </div>

            {/* Sorting Controls */}
            <SortingControls
              sortBy={sortBy}
              onSortChange={handleSortChange}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              totalProducts={filteredProducts?.length}
              currentPage={currentPage}
              productsPerPage={productsPerPage}
            />

            {/* Compare Bar */}
            {comparedProducts?.length > 0 && (
              <div className="bg-accent/10 border-b border-border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Icon name="GitCompare" size={20} className="text-accent" />
                    <span className="font-medium text-text-primary">
                      So sánh ({comparedProducts?.length}/3)
                    </span>
                    <div className="flex space-x-2">
                      {comparedProducts?.map((product) => (
                        <div
                          key={product?.id}
                          className="flex items-center space-x-2 bg-background px-3 py-1 rounded-lg"
                        >
                          <span className="text-sm text-text-primary">
                            {product?.name}
                          </span>
                          <button
                            onClick={() => removeFromCompare(product?.id)}
                            className="text-text-secondary hover:text-destructive"
                          >
                            <Icon name="X" size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button variant="default" size="sm">
                    So Sánh Ngay
                  </Button>
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="p-6">
              <ProductGrid
                products={paginatedProducts}
                viewMode={viewMode}
                loading={loading}
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
                onCompare={handleCompare}
              />
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalProducts={filteredProducts?.length}
              productsPerPage={productsPerPage}
            />
          </div>
        </div>
      </div>
      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />
    </div>
  );
};

export default Product;
