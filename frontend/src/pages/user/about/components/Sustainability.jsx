import React from "react";
import Icon from "../../../../components/AppIcon";
import Image from "../../../../components/AppImage";

const Sustainability = () => {
  const certifications = [
    {
      name: "FSC Certified",
      description: "100% gỗ từ rừng được quản lý bền vững",
      icon: "TreePine",
    },
    {
      name: "ISO 14001",
      description: "Hệ thống quản lý môi trường quốc tế",
      icon: "Shield",
    },
    {
      name: "Carbon Neutral",
      description: "Cam kết trung hòa carbon đến 2025",
      icon: "Leaf",
    },
    {
      name: "Zero Waste",
      description: "Tái chế 95% chất thải sản xuất",
      icon: "Recycle",
    },
  ];

  const impactStats = [
    {
      number: "50,000",
      unit: "cây",
      description: "Trồng mới mỗi năm",
    },
    {
      number: "95%",
      unit: "",
      description: "Chất thải được tái chế",
    },
    {
      number: "30%",
      unit: "",
      description: "Giảm phát thải CO2",
    },
    {
      number: "100%",
      unit: "",
      description: "Năng lượng tái tạo",
    },
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary mb-4">
            Cam kết bền vững
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Bảo vệ môi trường là trách nhiệm của chúng tôi với thế hệ tương lai
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-playfair text-2xl font-semibold text-primary">
                Thực hành bền vững
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Từ việc lựa chọn nguyên liệu đến quy trình sản xuất, chúng tôi
                cam kết giảm thiểu tác động đến môi trường và tạo ra những sản
                phẩm có thể tồn tại qua nhiều thế hệ.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {certifications?.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-warm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                      <Icon
                        name={cert?.icon}
                        size={20}
                        color="var(--color-success)"
                      />
                    </div>
                    <h4 className="font-semibold text-primary">{cert?.name}</h4>
                  </div>
                  <p className="text-sm text-text-secondary">
                    {cert?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-warm-lg">
              <Image
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=600&fit=crop"
                alt="Rừng bền vững"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="bg-white rounded-2xl p-8 shadow-warm">
          <h3 className="font-playfair text-2xl font-semibold text-primary text-center mb-8">
            Tác động tích cực
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats?.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-success mb-2">
                  {stat?.number}
                  <span className="text-lg">{stat?.unit}</span>
                </div>
                <div className="text-sm text-text-secondary">
                  {stat?.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;
