import React, { useState } from "react";
import Image from "../../../../components/AppImage";
import Icon from "../../../../components/AppIcon";
import Button from "../../../../components/ui/Button";

const QuickViewModal = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onAddToWishlist,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

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
          size={16}
          className="text-warning fill-current"
        />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon
          key="half"
          name="StarHalf"
          size={16}
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
          size={16}
          className="text-border"
        />
      );
    }

    return stars;
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product?.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-playfair text-2xl font-bold text-text-primary">
            Xem Nhanh Sản Phẩm
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            className="text-text-secondary hover:text-text-primary"
          />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-surface rounded-xl overflow-hidden">
              <Image
                src={product?.images?.[selectedImageIndex]}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {product?.images?.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product?.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`
                      flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all
                      ${
                        index === selectedImageIndex
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      }
                    `}
                  >
                    <Image
                      src={image}
                      alt={`${product?.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Category & Brand */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary uppercase tracking-wide">
                {product?.category}
              </span>
              <span className="text-sm text-text-secondary">
                {product?.brand}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="font-playfair text-3xl font-bold text-text-primary">
              {product?.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {renderStars(product?.rating)}
              </div>
              <span className="text-text-secondary">
                {product?.rating} ({product?.reviewCount} đánh giá)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(product?.price)}
              </span>
              {product?.originalPrice &&
                product?.originalPrice > product?.price && (
                  <>
                    <span className="text-xl text-text-secondary line-through">
                      {formatPrice(product?.originalPrice)}
                    </span>
                    <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-sm font-medium">
                      -{product?.discountPercentage}%
                    </span>
                  </>
                )}
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none">
              <p className="text-text-secondary leading-relaxed">
                {product?.description}
              </p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-surface rounded-xl">
              <div>
                <span className="text-sm text-text-secondary">Chất liệu:</span>
                <p className="font-medium text-text-primary">
                  {product?.material}
                </p>
              </div>
              <div>
                <span className="text-sm text-text-secondary">Màu sắc:</span>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded-full border border-border"
                    style={{ backgroundColor: product?.color?.hex }}
                  />
                  <span className="font-medium text-text-primary">
                    {product?.color?.name}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm text-text-secondary">Kích thước:</span>
                <p className="font-medium text-text-primary">
                  {product?.dimensions}
                </p>
              </div>
              <div>
                <span className="text-sm text-text-secondary">
                  Trọng lượng:
                </span>
                <p className="font-medium text-text-primary">
                  {product?.weight}
                </p>
              </div>
            </div>

            {/* Stock Status */}
            <div
              className={`flex items-center space-x-2 ${
                product?.stock > 10
                  ? "text-success"
                  : product?.stock > 0
                  ? "text-warning"
                  : "text-destructive"
              }`}
            >
              <Icon
                name={product?.stock > 0 ? "CheckCircle" : "XCircle"}
                size={16}
              />
              <span className="font-medium">
                {product?.stock > 10
                  ? "Còn hàng"
                  : product?.stock > 0
                  ? `Chỉ còn ${product?.stock} sản phẩm`
                  : "Hết hàng"}
              </span>
            </div>

            {/* Quantity Selector */}
            {product?.stock > 0 && (
              <div className="flex items-center space-x-4">
                <span className="text-text-primary font-medium">Số lượng:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    iconName="Minus"
                    className="px-3"
                  />
                  <span className="px-4 py-2 font-medium text-text-primary min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product?.stock}
                    iconName="Plus"
                    className="px-3"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                variant="default"
                onClick={handleAddToCart}
                disabled={product?.stock === 0}
                iconName="ShoppingCart"
                iconPosition="left"
                className="flex-1"
              >
                {product?.stock === 0 ? "Hết Hàng" : "Thêm Vào Giỏ"}
              </Button>
              <Button
                variant="outline"
                onClick={() => onAddToWishlist(product)}
                iconName="Heart"
                iconPosition="left"
                className={
                  product?.isWishlisted
                    ? "text-destructive border-destructive"
                    : ""
                }
              >
                {product?.isWishlisted ? "Đã Yêu Thích" : "Yêu Thích"}
              </Button>
            </div>

            {/* Additional Info */}
            <div className="space-y-3 pt-4 border-t border-border">
              {product?.freeShipping && (
                <div className="flex items-center space-x-2 text-success">
                  <Icon name="Truck" size={16} />
                  <span className="text-sm">Miễn phí vận chuyển</span>
                </div>
              )}
              <div className="flex items-center space-x-2 text-text-secondary">
                <Icon name="Shield" size={16} />
                <span className="text-sm">Bảo hành 2 năm</span>
              </div>
              <div className="flex items-center space-x-2 text-text-secondary">
                <Icon name="RotateCcw" size={16} />
                <span className="text-sm">Đổi trả trong 30 ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
