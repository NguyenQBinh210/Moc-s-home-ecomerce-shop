import React from "react";
import { Link } from "react-router";
import Icon from "../../../../components/AppIcon";
import Image from "../../../../components/AppImage";
import Button from "../../../../components/ui/Button";

const RoomNavigation = () => {
  const rooms = [
    {
      id: 1,
      name: "Phòng khách",
      description: "Tạo không gian tiếp khách ấm cúng và sang trọng",
      image:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      icon: "Sofa",
      productCount: 245,
      popular: ["Sofa", "Bàn cà phê", "Kệ tivi", "Thảm"],
    },
    {
      id: 2,
      name: "Phòng ngủ",
      description: "Thiết kế không gian nghỉ ngơi thư giãn và riêng tư",
      image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      icon: "Bed",
      productCount: 189,
      popular: ["Giường", "Tủ đồ", "Kệ sách", "Đèn ngủ"],
    },
    {
      id: 3,
      name: "Phòng ăn",
      description: "Không gian dùng bữa ấm áp cho gia đình",
      image:
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      icon: "UtensilsCrossed",
      productCount: 156,
      popular: ["Bàn ăn", "Ghế ăn", "Tủ chén", "Đèn chùm"],
    },
    {
      id: 4,
      name: "Phòng làm việc",
      description: "Tối ưu hóa năng suất với nội thất văn phòng",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      icon: "Monitor",
      productCount: 98,
      popular: ["Bàn gỗ", "Sofa", "Kệ sách", "Đèn bàn"],
    },
    {
      id: 5,
      name: "Phòng bếp",
      description: "Nội thất bếp hiện đại và tiện nghi",
      image:
        "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: "ChefHat",
      productCount: 134,
      popular: ["Tủ bếp", "Bàn đảo", "Ghế bar", "Kệ gia vị"],
    },
    {
      id: 6,
      name: "Sân vườn",
      description: "Nội thất ngoài trời cho không gian thư giãn",
      image:
        "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: "Trees",
      productCount: 87,
      popular: ["Sân vườn", "Ô dù", "Xích đu", "Chậu cây"],
    },
  ];

  return (
    <section className=" bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center text-center gap-3">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Mua sắm theo phòng
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto pb-5">
            Tìm kiếm nội thất phù hợp cho từng không gian trong ngôi nhà của bạn
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms?.map((room) => (
            <div
              key={room?.id}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-lg transition-warm hover-lift"
            >
              {/* Room Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={room?.image}
                  alt={room?.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Room Icon */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Icon name={room?.icon} size={24} className="text-primary" />
                </div>

                {/* Product Count */}
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {room?.productCount} sản phẩm
                </div>

                {/* Room Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-playfair text-2xl font-bold mb-2">
                    {room?.name}
                  </h3>
                  <p className="text-white/90 mb-4">{room?.description}</p>
                </div>
              </div>

              {/* Popular Items */}
              <div className="p-6 shadow-inner">
                <h4 className="font-semibold text-text-primary">
                  Sản phẩm phổ biến:
                </h4>
                <div className="flex flex-wrap gap-2 py-2">
                  {room?.popular?.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-surface text-text-secondary text-sm rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <Link to="/product">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                    fullWidth
                    className="group-hover:bg-primary group-hover:bg-amber-500  group-hover:text-white group-hover:border-primary"
                  >
                    Khám phá {room?.name?.toLowerCase()}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomNavigation;
