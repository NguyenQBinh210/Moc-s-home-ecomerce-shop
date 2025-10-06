import React, { useState, useEffect } from "react";
import Icon from "../../../../components/AppIcon";
import Image from "../../../../components/AppImage";

const CustomerTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Nguyễn Thị Mai",
      location: "Hà Nội",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      content: `Tôi đã mua bộ sofa Scandinavian từ Mộc's Home và cực kỳ hài lòng. Chất lượng vượt mong đợi, thiết kế đẹp và phù hợp hoàn hảo với không gian phòng khách. Dịch vụ giao hàng và lắp đặt rất chuyên nghiệp.`,
      purchasedItem: "Bộ sofa Scandinavian",
      purchaseDate: "Tháng 9, 2024",
      beforeImage:
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      afterImage:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Trần Văn Hùng",
      location: "TP. Hồ Chí Minh",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 5,
      content: `Bàn ăn gỗ sồi tự nhiên mà tôi đặt mua thực sự tuyệt vời. Gỗ chắc chắn, hoàn thiện tỉ mỉ và màu sắc rất đẹp. Gia đình tôi rất thích không gian ăn uống mới này. Sẽ tiếp tục ủng hộ Mộc's Home!`,
      purchasedItem: "Bàn ăn gỗ sồi 6 chỗ",
      purchaseDate: "Tháng 8, 2024",
      beforeImage:
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      afterImage:
        "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: 3,
      name: "Lê Thị Hương",
      location: "Đà Nẵng",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5,
      content: `Tôi đã thiết kế lại toàn bộ phòng ngủ với sự tư vấn của team Mộc's Home. Từ giường, tủ quần áo đến bàn trang điểm, tất cả đều hoàn hảo. Không gian trở nên sang trọng và ấm cúng hơn rất nhiều.`,
      purchasedItem: "Bộ nội thất phòng ngủ",
      purchaseDate: "Tháng 7, 2024",
      beforeImage:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      afterImage:
        "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials?.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials?.length) % testimonials?.length
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={20}
        className={
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }
      />
    ));
  };

  const currentData = testimonials?.[currentTestimonial];

  return (
    <section className=" bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 flex flex-col items-center gap-3">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Khách hàng nói gì về chúng tôi
          </h2>
          <p className="text-xl text-text-secondary max-w-4xl mx-auto pb-4">
            Hàng nghìn khách hàng đã tin tưởng và hài lòng với sản phẩm, dịch vụ
            của Mộc's Home
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative">
          <div className="bg-card rounded-3xl shadow-warm-lg overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Testimonial Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                {/* Rating */}
                <div className="flex items-center mb-6">
                  {renderStars(currentData?.rating)}
                  <span className="ml-3 text-lg font-semibold text-text-primary">
                    {currentData?.rating}/5
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="text-lg lg:text-xl text-text-primary mb-8 leading-relaxed">
                  "{currentData?.content}"
                </blockquote>

                {/* Customer Info */}
                <div className="flex items-center mb-6">
                  <Image
                    src={currentData?.avatar}
                    alt={currentData?.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-text-primary text-lg">
                      {currentData?.name}
                    </h4>
                    <p className="text-text-secondary flex items-center">
                      <Icon name="MapPin" size={16} className="mr-1" />
                      {currentData?.location}
                    </p>
                  </div>
                </div>

                {/* Purchase Info */}
                <div className="bg-surface rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-secondary">Đã mua:</p>
                      <p className="font-semibold text-text-primary">
                        {currentData?.purchasedItem}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-text-secondary">Thời gian:</p>
                      <p className="font-semibold text-text-primary">
                        {currentData?.purchaseDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Before/After Images */}
              <div className="relative h-96 lg:h-auto ">
                <div className="absolute inset-0 grid grid-cols-2 gap-1">
                  <div className="relative overflow-hidden">
                    <Image
                      src={currentData?.beforeImage}
                      alt="Trước khi sử dụng"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      Trước
                    </div>
                  </div>
                  <div className="relative overflow-hidden">
                    <Image
                      src={currentData?.afterImage}
                      alt="Sau khi sử dụng"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                      Sau
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Nút trái phải */}
          <button
            onClick={prevTestimonial}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-warm rounded-full flex items-center justify-center text-text-primary hover:bg-primary hover:text-amber-500 transition-warm z-10"
          >
            <Icon name="ChevronLeft" size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white shadow-warm rounded-full flex items-center justify-center text-text-primary hover:bg-primary hover:text-amber-500 transition-warm z-10"
          >
            <Icon name="ChevronRight" size={24} />
          </button>
        </div>

        <div className="flex justify-center gap-3 pt-8 space-x-2">
          {testimonials?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-warm ${
                index === currentTestimonial ? "bg-gray-600" : "bg-gray-400"
              }`}
            />
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "15,000+", label: "Khách hàng hài lòng", icon: "Users" },
            { number: "4.9/5", label: "Đánh giá trung bình", icon: "Star" },
            { number: "98%", label: "Tỷ lệ hài lòng", icon: "ThumbsUp" },
            { number: "24/7", label: "Hỗ trợ khách hàng", icon: "Headphones" },
          ]?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={stat?.icon} size={24} className="text-primary" />
              </div>
              <div className="font-playfair text-3xl font-bold text-text-primary mb-2">
                {stat?.number}
              </div>
              <div className="text-text-secondary">{stat?.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
