import React, { useState } from "react";
import { Link } from "react-router";
import Icon from "../../../../components/AppIcon";
import Image from "../../../../components/AppImage";
import Button from "../../../../components/ui/Button";

const PersonalizedRecommendations = () => {
  const [activeTab, setActiveTab] = useState("trending");

  const tabs = [
    { id: "trending", name: "Xu hướng", icon: "TrendingUp" },
    { id: "recommended", name: "Gợi ý cho bạn", icon: "Heart" },
    { id: "bestseller", name: "Bán chạy", icon: "Star" },
    { id: "new", name: "Sản phẩm mới", icon: "Sparkles" },
  ];

  const products = {
    trending: [
      {
        id: 1,
        name: "Sofa góc Scandinavian",
        price: "12.500.000₫",
        originalPrice: "15.000.000₫",
        image:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        rating: 4.8,
        reviews: 156,
        badge: "Giảm 17%",
        isWishlisted: false,
      },
      {
        id: 2,
        name: "Bàn ăn gỗ sồi tự nhiên",
        price: "8.900.000₫",
        originalPrice: null,
        image:
          "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        rating: 4.9,
        reviews: 89,
        badge: "Mới",
        isWishlisted: true,
      },
      {
        id: 3,
        name: "Giường ngủ hiện đại",
        price: "15.200.000₫",
        originalPrice: "18.000.000₫",
        image:
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        rating: 4.7,
        reviews: 234,
        badge: "Bán chạy",
        isWishlisted: false,
      },
      {
        id: 4,
        name: "Tủ quần áo 3 cánh",
        price: "9.800.000₫",
        originalPrice: null,
        image:
          "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.6,
        reviews: 67,
        badge: null,
        isWishlisted: false,
      },
    ],
    recommended: [
      {
        id: 5,
        name: "Ghế thư giãn da thật",
        price: "22.000.000₫",
        originalPrice: "25.000.000₫",
        image:
          "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.9,
        reviews: 45,
        badge: "Cao cấp",
        isWishlisted: true,
      },
      {
        id: 6,
        name: "Bàn làm việc thông minh",
        price: "6.500.000₫",
        originalPrice: null,
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        rating: 4.8,
        reviews: 123,
        badge: "Thông minh",
        isWishlisted: false,
      },
    ],
    bestseller: [
      {
        id: 7,
        name: "Combo phòng khách hiện đại",
        price: "28.500.000₫",
        originalPrice: "35.000.000₫",
        image:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        rating: 4.9,
        reviews: 312,
        badge: "Combo",
        isWishlisted: false,
      },
    ],
    new: [
      {
        id: 8,
        name: "Kệ sách modular",
        price: "4.200.000₫",
        originalPrice: null,
        image:
          "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400",
        rating: 4.7,
        reviews: 28,
        badge: "Mới ra mắt",
        isWishlisted: false,
      },
    ],
  };

  const [wishlist, setWishlist] = useState(new Set([2, 5]));

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist?.has(productId)) {
        newWishlist?.delete(productId);
      } else {
        newWishlist?.add(productId);
      }
      return newWishlist;
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }
      />
    ));
  };

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center flex flex-col ">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Dành riêng cho bạn
          </h2>
          <p className=" text-text-secondary max-w-3xl mx-auto text-lg">
            Khám phá những sản phẩm được tuyển chọn dựa trên xu hướng mua sắm
            của bạn
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-12 ">
          <div className="bg-card flex flex-row rounded-2xl p-2 shadow-warm border border-transparent shadow-2xl">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-warm ${
                  activeTab === tab?.id
                    ? "bg-primary text-amber-500 shadow-warm"
                    : "text-text-secondary hover:text-primary hover:bg-primary/5"
                }`}
              >
                <Icon name={tab?.icon} size={18} />
                <span>{tab?.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products?.[activeTab]?.map((product) => (
            <div
              key={product?.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-lg transition-warm hover-lift border border-gray-200 hover:border-primary"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  className="w-full  h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Badge */}
                {product?.badge && (
                  <div className="absolute top-4 left-4 bg-primary text-red-500 px-3 py-1 rounded-full text-sm font-medium">
                    {product?.badge}
                  </div>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product?.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-warm"
                >
                  <Icon
                    name="Heart"
                    size={18}
                    className={
                      wishlist?.has(product?.id)
                        ? "text-red-500 fill-current"
                        : "text-gray-400"
                    }
                  />
                </button>

                {/* Quick Actions */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      iconName="Eye"
                      className="flex-1 bg-white/90 backdrop-blur-sm hover:bg-white"
                    >
                      Xem nhanh
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      iconName="ShoppingCart"
                      className="flex-1"
                    >
                      Thêm vào giỏ
                    </Button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <Link to="/product-detail">
                  <h3 className="font-semibold text-text-primary mb-2 hover:text-primary transition-warm line-clamp-2">
                    {product?.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center mr-2">
                    {renderStars(product?.rating)}
                  </div>
                  <span className="text-sm text-text-secondary">
                    {product?.rating} ({product?.reviews} đánh giá)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-primary">
                      {product?.price}
                    </span>
                    {product?.originalPrice && (
                      <span className="text-sm text-text-secondary line-through ml-2">
                        {product?.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Plus"
                    className="text-primary hover:bg-primary hover:text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center pt-12">
          <Link to="/product">
            <Button
              variant="outline"
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
              className="px-8"
            >
              Xem thêm sản phẩm
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedRecommendations;
