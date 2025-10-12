import React from "react";
import Icon from "../../../../components/AppIcon";
import Image from "../../../../components/AppImage";

const Values = () => {
  const values = [
    {
      icon: "Heart",
      title: "Tình yêu nghề nghiệp",
      description:
        "Mỗi sản phẩm được tạo ra với tình yêu và sự tận tâm, từ khâu thiết kế đến hoàn thiện cuối cùng.",
      image:
        "https://images.pexels.com/photos/6585759/pexels-photo-6585759.jpeg?w=400&h=300&fit=crop",
    },
    {
      icon: "Leaf",
      title: "Bền vững môi trường",
      description:
        "Cam kết sử dụng 100% gỗ được chứng nhận FSC và quy trình sản xuất thân thiện với môi trường.",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    },

  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary mb-4">
            Giá trị cốt lõi
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Những nguyên tắc định hướng mọi hoạt động của chúng tôi
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {values?.map((value, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-warm hover-lift"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={value?.image}
                  alt={value?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-warm"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon
                      name={value?.icon}
                      size={24}
                      color="var(--color-primary)"
                    />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-primary">
                    {value?.title}
                  </h3>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  {value?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;
