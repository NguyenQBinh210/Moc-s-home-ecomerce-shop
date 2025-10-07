import React, { useState } from "react";
import { Link } from "react-router";
import Image from "../../../../components/AppImage";
import Icon from "../../../../components/AppIcon";
import Button from "../../../../components/ui/Button";

const ProductCard = ({
  product,
  onAddToWishlist,
  onAddToCart,
  onQuickView,
  onCompare,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      ?.format(price)
      ?.replace("₫", "₫");
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon
          key={i}
          name="Star"
          size={14}
          className="text-warning fill-current"
        />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon
          key="half"
          name="StarHalf"
          size={14}
          className="text-warning fill-current"
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon
          key={`empty-${i}`}
          name="Star"
          size={14}
          className="text-border"
        />
      );
    }

    return stars;
  };

  const handleImageNavigation = (direction, e) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (direction === "next") {
      setCurrentImageIndex((prev) =>
        prev === product?.images?.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product?.images?.length - 1 : prev - 1
      );
    }
  };

  const handleActionClick = (action, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    action();
  };

  return (
    <div
      className="group bg-card rounded-xl border border-border overflow-hidden hover-lift transition-warm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product-detail?id=${product?.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-surface">
          <Image
            src={product?.images?.[currentImageIndex]}
            alt={product?.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Sale Badge */}
          {product?.isOnSale && (
            <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs font-medium">
              -{product?.discountPercentage}%
            </div>
          )}

          {/* New Badge */}
          {product?.isNew && (
            <div className="absolute top-3 right-3 bg-success text-success-foreground px-2 py-1 rounded-md text-xs font-medium">
              Mới
            </div>
          )}

          {/* Image Navigation */}
          {product?.images?.length > 1 && isHovered && (
            <>
              <button
                onClick={(e) => handleImageNavigation("prev", e)}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 hover:bg-background rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
              >
                <Icon
                  name="ChevronLeft"
                  size={16}
                  className="text-text-primary"
                />
              </button>
              <button
                onClick={(e) => handleImageNavigation("next", e)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 hover:bg-background rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
              >
                <Icon
                  name="ChevronRight"
                  size={16}
                  className="text-text-primary"
                />
              </button>
            </>
          )}

          {/* Image Dots */}
          {product?.images?.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
              {product?.images?.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e?.preventDefault();
                    e?.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentImageIndex
                      ? "bg-primary"
                      : "bg-background/60 hover:bg-background/80"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div
            className={`
            absolute top-3 right-3 flex flex-col space-y-2 transition-all duration-300
            ${
              isHovered
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-2"
            }
          `}
          >
            <button
              onClick={(e) =>
                handleActionClick(() => onAddToWishlist(product), e)
              }
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                product?.isWishlisted
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-background/80 hover:bg-background text-text-primary"
              }`}
            >
              <Icon
                name="Heart"
                size={16}
                className={product?.isWishlisted ? "fill-current" : ""}
              />
            </button>
            <button
              onClick={(e) => handleActionClick(() => onQuickView(product), e)}
              className="w-8 h-8 bg-background/80 hover:bg-background rounded-full flex items-center justify-center transition-all duration-200 text-text-primary"
            >
              <Icon name="Eye" size={16} />
            </button>
            <button
              onClick={(e) => handleActionClick(() => onCompare(product), e)}
              className="w-8 h-8 bg-background/80 hover:bg-background rounded-full flex items-center justify-center transition-all duration-200 text-text-primary"
            >
              <Icon name="GitCompare" size={16} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category & Brand */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-secondary uppercase tracking-wide">
              {product?.category}
            </span>
            <span className="text-xs text-text-secondary">
              {product?.brand}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-playfair text-lg font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product?.name}
          </h3>

          {/* Rating & Reviews */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center space-x-1">
              {renderStars(product?.rating)}
            </div>
            <span className="text-sm text-text-secondary">
              ({product?.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-xl font-bold text-primary">
              {formatPrice(product?.price)}
            </span>
            {product?.originalPrice &&
              product?.originalPrice > product?.price && (
                <span className="text-sm text-text-secondary line-through">
                  {formatPrice(product?.originalPrice)}
                </span>
              )}
          </div>

          {/* Material & Color */}
          <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
            <span>{product?.material}</span>
            <div className="flex items-center space-x-1">
              <div
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: product?.color?.hex }}
              />
              <span>{product?.color?.name}</span>
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center justify-between mb-4">
            <div
              className={`flex items-center space-x-1 text-sm ${
                product?.stock > 10
                  ? "text-success"
                  : product?.stock > 0
                  ? "text-warning"
                  : "text-destructive"
              }`}
            >
              <Icon
                name={product?.stock > 0 ? "CheckCircle" : "XCircle"}
                size={14}
              />
              <span>
                {product?.stock > 10
                  ? "Còn hàng"
                  : product?.stock > 0
                  ? `Chỉ còn ${product?.stock}`
                  : "Hết hàng"}
              </span>
            </div>
            {product?.freeShipping && (
              <div className="flex items-center space-x-1 text-sm text-success">
                <Icon name="Truck" size={14} />
                <span>Miễn phí vận chuyển</span>
              </div>
            )}
          </div>
        </div>
      </Link>
      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <Button
          variant="default"
          fullWidth
          disabled={product?.stock === 0}
          onClick={(e) => handleActionClick(() => onAddToCart(product), e)}
          iconName="ShoppingCart"
          iconPosition="left"
          className="transition-all duration-200"
        >
          {product?.stock === 0 ? "Hết Hàng" : "Thêm Vào Giỏ"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
