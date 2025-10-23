import React from "react";
import Icon from "../../../../components/AppIcon";
import Image from "../../../../components/AppImage";

const Team = () => {
  const teamMembers = [
    {
      name: "Nguyễn Quốc Bình",
      position: "Người sáng lập & CEO",
      description:
        "Với hơn 15 năm kinh nghiệm trong ngành nội thất, anh Tuấn đã dẫn dắt Mộc's HOME trở thành thương hiệu hàng đầu.",
      image: "src/assets/img/CEO.png",
      expertise: [
        "Chiến lược kinh doanh",
        "Thiết kế sản phẩm",
        "Quản lý thương hiệu",
      ],
      social: { linkedin: "#", email: "tuan@Mộc's HOME.vn" },
    },
    {
      name: "Lê Thị Mai",
      position: "Giám đốc Thiết kế",
      description:
        "Chuyên gia thiết kế với bằng cấp quốc tế, đã tạo ra hơn 500 mẫu nội thất được yêu thích.",
      image:
        "https://studiochupanhdep.com/Upload/Images/Album/Vest-doanh-nhan-06.jpg",
      expertise: [
        "Thiết kế nội thất",
        "Xu hướng màu sắc",
        "Trải nghiệm người dùng",
      ],
      social: { linkedin: "#", email: "mai@Mộc's HOME.vn" },
    },
    {
      name: "Trần Văn Hùng",
      position: "Giám đốc Sản xuất",
      description:
        "Kỹ sư cơ khí với chuyên môn sâu về quy trình sản xuất và kiểm soát chất lượng.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      expertise: [
        "Quản lý sản xuất",
        "Kiểm soát chất lượng",
        "Tối ưu hóa quy trình",
      ],
      social: { linkedin: "#", email: "hung@Mộc's HOME.vn" },
    },
    {
      name: "Phạm Thị Lan",
      position: "Giám đốc Marketing",
      description:
        "Chuyên gia marketing số với kinh nghiệm xây dựng thương hiệu và phát triển cộng đồng.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
      expertise: ["Marketing số", "Xây dựng thương hiệu", "Quản lý cộng đồng"],
      social: { linkedin: "#", email: "lan@Mộc's HOME.vn" },
    },
  ];

  return (
    <section className="py-6 bg-muted">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary mb-4">
            Đội ngũ lãnh đạo
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Những con người tài năng và đam mê đứng sau thành công của Mộc's
            HOME
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {teamMembers?.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-warm hover-lift"
            >
              <div className="aspect-square overflow-hidden">
                <Image
                  src={member?.image}
                  alt={member?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="font-playfair text-lg font-semibold text-primary mb-1">
                    {member?.name}
                  </h3>
                  <div className="text-accent font-medium text-sm mb-2">
                    {member?.position}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {member?.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-medium text-primary mb-2">
                      Chuyên môn:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {member?.expertise?.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <a
                      href={member?.social?.linkedin}
                      className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-warm"
                    >
                      <Icon
                        name="Linkedin"
                        size={16}
                        color="var(--color-primary)"
                      />
                    </a>
                    <a
                      href={`mailto:${member?.social?.email}`}
                      className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-warm"
                    >
                      <Icon
                        name="Mail"
                        size={16}
                        color="var(--color-primary)"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Company Culture */}
        <div className="bg-white rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="font-playfair text-2xl lg:text-3xl font-semibold text-primary mb-4">
              Văn hóa doanh nghiệp
            </h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Môi trường làm việc sáng tạo, đoàn kết và phát triển bền vững
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "Users",
                title: "Đội ngũ đoàn kết",
                description:
                  "Làm việc nhóm hiệu quả với tinh thần hỗ trợ lẫn nhau",
              },
              {
                icon: "Lightbulb",
                title: "Sáng tạo không giới hạn",
                description: "Khuyến khích ý tưởng mới và tư duy đột phá",
              },
              {
                icon: "TrendingUp",
                title: "Phát triển bản thân",
                description: "Cơ hội học hỏi và thăng tiến nghề nghiệp",
              },
            ]?.map((culture, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon
                    name={culture?.icon}
                    size={24}
                    color="var(--color-primary)"
                  />
                </div>
                <h4 className="font-semibold text-primary mb-2">
                  {culture?.title}
                </h4>
                <p className="text-text-secondary text-sm">
                  {culture?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
