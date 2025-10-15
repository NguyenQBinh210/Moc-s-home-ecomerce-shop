import React, { useState, useEffect, useCallback } from "react";
// SỬA LẠI: Import từ "react-router-dom"
import { useSearchParams } from "react-router";
import FilterSidebar from "./components/FilterSidebar";
import SearchBar from "./components/SearchBar";
import SortingControls from "./components/SortingControls";
import ProductGrid from "./components/ProductGrid";
import QuickViewModal from "./components/QuickViewModal";
import Pagination from "./components/Pagination";
import Button from "../../../components/ui/Button";

const API_URL = "http://localhost:3000";

const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // --- STATE MANAGEMENT ---
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  // State cho UI
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // State cho việc lọc, sắp xếp, tìm kiếm
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "relevance");
  const [filters, setFilters] = useState({
    categories: [],
    suppliers: [],
  });

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const [productsPerPage] = useState(8);
  const [paginationInfo, setPaginationInfo] = useState({});

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: productsPerPage,
        search: searchQuery,
        sort: sortBy,
        category: filters.categories.join(","),
        supplier: filters.suppliers.join(","),
      });

      const response = await fetch(`${API_URL}/products?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
        setPaginationInfo(data.pagination);
      }
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, productsPerPage, searchQuery, sortBy, filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const fetchFilterData = async () => {
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
        console.error("Lỗi khi tải dữ liệu bộ lọc:", error);
      }
    };
    fetchFilterData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (sortBy !== "relevance") params.set("sort", sortBy);
    if (currentPage !== 1) params.set("page", currentPage.toString());
    setSearchParams(params, { replace: true });
  }, [searchQuery, sortBy, currentPage, setSearchParams]);

  // --- EVENT HANDLERS ---
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      suppliers: [],
      priceRange: { min: "", max: "" },
    });
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToWishlist = (product) =>
    console.log("Added to wishlist:", product.ten_san_pham);
  const handleAddToCart = (product) =>
    console.log("Added to cart:", product.ten_san_pham);
  const handleCompare = (product) =>
    console.log("Added to compare:", product.ten_san_pham);

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-16">
        <div className="bg-gradient-warm py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-text-primary mb-6">
              Khám Phá Bộ Sưu Tập Nội Thất
            </h1>
            <SearchBar onSearch={handleSearch} searchQuery={searchQuery} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex">
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            categories={categories}
            suppliers={suppliers}
          />

          <main className="flex-1 min-w-0">
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

            <SortingControls
              sortBy={sortBy}
              onSortChange={handleSortChange}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              totalProducts={paginationInfo.totalItems || 0}
              currentPage={currentPage}
              productsPerPage={productsPerPage}
            />

            <div className="p-6">
              <ProductGrid
                products={products}
                viewMode={viewMode}
                loading={isLoading}
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
                onQuickView={handleQuickView}
                onCompare={handleCompare}
              />
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={paginationInfo.totalPages || 1}
              onPageChange={setCurrentPage}
              totalProducts={paginationInfo.totalItems || 0}
              productsPerPage={productsPerPage}
            />
          </main>
        </div>
      </div>

      <QuickViewModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />
    </div>
  );
};

export default Product;
