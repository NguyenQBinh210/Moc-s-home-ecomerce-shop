import React from "react";
import Icon from "../../../../components/AppIcon";
import Image from "../../../../components/AppImage";

const Artisans = () => {
  const artisans = [
    {
      name: "Thầy Nguyễn Văn Minh",
      specialty: "Chuyên gia gỗ tự nhiên",
      experience: "25 năm kinh nghiệm",
      description:
        "Bậc thầy trong nghệ thuật chạm khắc và tạo hình gỗ, đã đào tạo hơn 50 thợ thủ công lành nghề.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      skills: ["Chạm khắc gỗ", "Thiết kế cổ điển", "Đào tạo nghề"],
    },
    {
      name: "Cô Trần Thị Hoa",
      specialty: "Nghệ nhân đệm nệm",
      experience: "18 năm kinh nghiệm",
      description:
        "Chuyên gia về kỹ thuật bọc ghế và tạo đệm, mang đến sự thoải mái tối ưu cho người sử dụng.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop",
      skills: ["Bọc ghế sofa", "Thiết kế đệm", "Chọn vải cao cấp"],
    },
    {
      name: "Anh Lê Đức Thành",
      specialty: "Thợ sơn và hoàn thiện",
      experience: "20 năm kinh nghiệm",
      description:
        "Chuyên gia về các kỹ thuật sơn và hoàn thiện bề mặt, tạo nên những sản phẩm hoàn hảo về thẩm mỹ.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      skills: ["Sơn PU cao cấp", "Hoàn thiện bề mặt", "Kiểm soát chất lượng"],
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary mb-4">
            Đội ngũ nghệ nhân
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Những bàn tay tài hoa tạo nên từng sản phẩm hoàn hảo
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {artisans?.map((artisan, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-warm hover-lift"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src={artisan?.image}
                  alt={artisan?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="font-playfair text-xl font-semibold text-primary mb-1">
                    {artisan?.name}
                  </h3>
                  <div className="text-accent font-medium mb-1">
                    {artisan?.specialty}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {artisan?.experience}
                  </div>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {artisan?.description}
                </p>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-primary">
                    Chuyên môn:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {artisan?.skills?.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Craftsmanship Process */}
        <div className="bg-muted rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="font-playfair text-2xl lg:text-3xl font-semibold text-primary mb-4">
              Quy trình chế tác
            </h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Mỗi sản phẩm trải qua 7 bước chế tác tỉ mỉ để đảm bảo chất lượng
              hoàn hảo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Chọn gỗ", icon: "TreePine" },
              { step: "02", title: "Thiết kế", icon: "PenTool" },
              { step: "03", title: "Gia công", icon: "Hammer" },
              { step: "04", title: "Hoàn thiện", icon: "Sparkles" },
            ]?.map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon
                    name={process.icon}
                    size={24}
                    color="var(--color-primary)"
                  />
                </div>
                <div className="text-2xl font-bold text-primary mb-2">
                  {process.step}
                </div>
                <div className="font-medium text-primary">{process.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Artisans;
