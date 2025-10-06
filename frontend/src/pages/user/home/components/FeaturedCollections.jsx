import React from "react";
import { Link } from "react-router"; // sửa lại cho React Router v6
import { Tag, ArrowRight, Grid3X3 } from "lucide-react"; // thay Icon cho chuẩn
// Bạn có thể thay bằng component Icon riêng nếu muốn

const FeaturedCollections = () => {
  const collections = [
    {
      id: 1,
      name: "Bộ sưu tập Hiện đại",
      description:
        "Thiết kế tối giản với đường nét sắc sảo và chất liệu cao cấp",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      itemCount: 156,
      priceRange: "2.500.000₫ - 15.000.000₫",
      badge: "Bán chạy",
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Phong cách Âu Mỹ",
      description:
        "Nội thất Bắc Âu với tông màu nhẹ nhàng và chất liệu tự nhiên",
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
      itemCount: 89,
      priceRange: "1.800.000₫ - 12.000.000₫",
      badge: "Xu hướng",
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Luxury Collection",
      description: "Dòng sản phẩm cao cấp với chất liệu da thật và gỗ tự nhiên",
      image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
      itemCount: 67,
      priceRange: "8.000.000₫ - 50.000.000₫",
      badge: "Cao cấp",
      color: "bg-amber-500",
    },
    {
      id: 4,
      name: "Eco-Friendly",
      description: "Nội thất thân thiện môi trường từ vật liệu tái chế",
      image:
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
      itemCount: 124,
      priceRange: "1.200.000₫ - 8.000.000₫",
      badge: "Xanh",
      color: "bg-emerald-500",
    },
  ];

  return (
    <section className=" bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center pb-12 flex flex-col items-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 pb-4">
            Bộ sưu tập nổi bật
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto ">
            Khám phá những bộ sưu tập được tuyển chọn kỹ lưỡng, phù hợp với mọi
            phong cách và ngân sách
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="bg-white flex flex-col rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition-all "
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Badge */}
                <div
                  className={`absolute top-4 left-4 px-3 py-1 text-white text-sm font-medium rounded-full ${collection.color}`}
                >
                  {collection.badge}
                </div>

                {/* Item Count */}
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                  {collection.itemCount} sản phẩm
                </div>
              </div>

              {/* Info */}
              <div className="p-6 ">
                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">
                  {collection.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {collection.description}
                </p>

                {/* Price */}
                <div className="flex items-center mb-4">
                  <Tag size={16} className="text-primary mr-2" />
                  <span className="text-sm font-medium text-primary">
                    {collection.priceRange}
                  </span>
                </div>

                {/* Button */}
                <Link to="/product">
                  <button className=" max-w-50 w-full border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-primary hover:text-white hover:bg-amber-500 hover:border-primary transition">
                    Khám phá bộ sưu tập
                    <ArrowRight className="inline-block ml-2 w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link to="/product">
            <button className="inline-flex items-center px-8 py-3 rounded-lg bg-primary text-white text-base font-medium hover:opacity-90 transition">
              <Grid3X3 className="mr-2 w-5 h-5" />
              Xem tất cả bộ sưu tập
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
