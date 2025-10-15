import React from "react";
import ProductCard from "./ProductCard";
import Icon from "../../../../components/AppIcon";

const ProductGrid = ({
  products,
  viewMode,
  loading,
  onAddToWishlist,
  onAddToCart,
  onQuickView,
  onCompare,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(12)]?.map((_, index) => (
          <div
            key={index}
            className="bg-card rounded-xl border border-border overflow-hidden animate-pulse"
          >
            <div className="aspect-square bg-surface" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-surface rounded" />
              <div className="h-6 bg-surface rounded" />
              <div className="h-4 bg-surface rounded w-2/3" />
              <div className="h-8 bg-surface rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mb-6">
          <Icon name="Search" size={32} className="text-text-secondary" />
        </div>
        <h3 className="font-playfair text-2xl font-semibold text-text-primary mb-2">
          Không tìm thấy sản phẩm
        </h3>
        <p className="text-text-secondary max-w-md">
          Không có sản phẩm nào phù hợp với tiêu chí tìm kiếm của bạn. Hãy thử
          điều chỉnh bộ lọc hoặc từ khóa tìm kiếm.
        </p>
      </div>
    );
  }

  const gridClasses = {
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
    list: "space-y-6",
  };

  return (
    <div className={gridClasses?.[viewMode]}>
      {products?.map((product) => (
        <ProductCard
          key={product?._id}
          product={product}
          onAddToWishlist={onAddToWishlist}
          onAddToCart={onAddToCart}
          onQuickView={onQuickView}
          onCompare={onCompare}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
