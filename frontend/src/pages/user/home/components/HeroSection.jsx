import React from "react";
import { Link } from "react-router";
import { ChevronDown, Play, ArrowRight, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background image */}
      <img
        src="https://img4.thuthuatphanmem.vn/uploads/2020/12/26/anh-noi-that-phong-khach_052105313.jpg"
        alt="Hero background"
        className="min-w-screen h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-4">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-primary/90 rounded-full text-xl font-medium mb-6">
            <Star className="mr-2 w-4 h-4" />
            New collection
          </div>

          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Nội thất sang trọng
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Khám phá bộ sưu tập nội thất cao cấp với thiết kế hiện đại và chất
            lượng bền vững
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/product">
              <button className="px-8 py-4 rounded-lg bg-primary hover:bg-primary/90 text-white text-lg font-medium flex items-center justify-center gap-2 transition">
                Khám phá ngay
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <button className="px-6 py-3 rounded-lg border cursor-pointer border-white text-white text-lg font-medium flex items-center justify-center gap-2 hover:bg-white hover:text-amber-500 transition">
              <a href="https://www.youtube.com/watch?v=Jvd7x0xuNdE" className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Xem video
              </a>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 text-white animate-bounce">
        <ChevronDown size={24} />
      </div>
    </section>
  );
};

export default HeroSection;
