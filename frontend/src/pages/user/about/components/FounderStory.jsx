import React from "react";
import Image from "../../../../components/AppImage";

const FounderStory = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative ">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-warm-lg shadow-xl">
              <Image
                src="src\assets\img\CEO.png"
                alt="Người sáng lập FurniCraft"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-50 left-2 text-center translate-52 bg-primary text-red-600 p-4 rounded-xl">
              <div className="text-lg font-medium">Nguyễn Quốc Bình</div>
              <div className="text-xs opacity-90">Người sáng lập & CEO</div>
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary">
                Tầm nhìn của người sáng lập
              </h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                "Tôi tin rằng nội thất không chỉ là những vật dụng chức năng, mà
                là nền tảng cho những khoảnh khắc ý nghĩa nhất trong cuộc sống."
              </p>
            </div>
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-6">
                <h3 className="font-semibold text-lg text-primary mb-2">
                  Sứ mệnh cá nhân
                </h3>
                <p className="text-text-secondary">
                  Mang đến sự xa xỉ dễ tiếp cận, nghệ thuật chế tác bền vững và
                  niềm tin rằng mọi không gian đều có tiềm năng trở nên phi
                  thường. Chúng tôi phục vụ những người coi không gian sống như
                  canvas để thể hiện bản thân.
                </p>
              </div>
              <div className="border-l-4 border-accent pl-6">
                <h3 className="font-semibold text-lg text-primary mb-2">
                  Triết lý thiết kế
                </h3>
                <p className="text-text-secondary">
                  Mỗi sản phẩm được tạo ra với tình yêu và sự tận tâm, kết hợp
                  giữa kỹ thuật truyền thống và công nghệ hiện đại để mang lại
                  những trải nghiệm sống đặc biệt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderStory;
