import React from "react";
import Image from "../../../../components/AppImage";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-warm py-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-playfair text-4xl lg:text-6xl font-bold text-primary leading-tight">
                Câu chuyện của
                <span className="text-gradient-warm block">Mộc's HOME</span>
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                Nơi nghệ thuật chế tác gặp gỡ cuộc sống hiện đại, tạo nên những
                không gian sống đặc biệt phản ánh cá tính và giá trị của bạn.
              </p>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="text-sm text-text-secondary">
                  Năm kinh nghiệm
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-text-secondary">
                  Khách hàng hài lòng
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-text-secondary">Bền vững</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-warm-lg">
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop"
                alt="Xưởng chế tác nội thất Mộc's HOME"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-warm-lg">
              <div className="text-2xl font-bold text-primary">2008</div>
              <div className="text-sm text-text-secondary">Thành lập</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
