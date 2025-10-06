import React from "react";
import Icon from "../../../../components/AppIcon";
import Image from "../../../../components/AppImage";

const TeamProfiles = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Nguyễn Minh Anh",
      position: "Trưởng phòng Chăm sóc Khách hàng",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      experience: "8 năm kinh nghiệm",
      specialties: ["Tư vấn sản phẩm", "Giải quyết khiếu nại", "Chăm sóc VIP"],
      languages: ["Tiếng Việt", "English", "中文"],
      contact: {
        email: "minhanh@Mộc's Home.vn",
        phone: "0901 234 567",
      },
      bio: "Chuyên gia tư vấn nội thất với hơn 8 năm kinh nghiệm, đã hỗ trợ hơn 5000 khách hàng tìm được giải pháp nội thất hoàn hảo.",
    },
    {
      id: 2,
      name: "Trần Đức Thành",
      position: "Chuyên viên Thiết kế Nội thất",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      experience: "6 năm kinh nghiệm",
      specialties: ["Thiết kế 3D", "Phong thủy", "Nội thất hiện đại"],
      languages: ["Tiếng Việt", "English"],
      contact: {
        email: "ducthanh@Mộc's Home.vn",
        phone: "0902 345 678",
      },
      bio: "Kiến trúc sư nội thất tài năng, chuyên về thiết kế không gian hiện đại và ứng dụng phong thủy trong nội thất.",
    },
    {
      id: 3,
      name: "Lê Thị Hương",
      position: "Chuyên viên Bảo hành & Kỹ thuật",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      experience: "5 năm kinh nghiệm",
      specialties: ["Bảo hành sản phẩm", "Hỗ trợ kỹ thuật", "Lắp đặt"],
      languages: ["Tiếng Việt", "English"],
      contact: {
        email: "thihuong@Mộc's Home.vn",
        phone: "0903 456 789",
      },
      bio: "Chuyên gia kỹ thuật với kiến thức sâu về cấu trúc và bảo trì nội thất, đảm bảo sản phẩm luôn trong tình trạng tốt nhất.",
    },
    {
      id: 4,
      name: "Phạm Văn Đức",
      position: "Trưởng nhóm Giao hàng & Lắp đặt",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      experience: "7 năm kinh nghiệm",
      specialties: ["Logistics", "Lắp đặt nội thất", "Quản lý đội nhóm"],
      languages: ["Tiếng Việt"],
      contact: {
        email: "vanduc@Mộc's Home.vn",
        phone: "0904 567 890",
      },
      bio: "Chuyên gia logistics với kinh nghiệm quản lý giao hàng và lắp đặt nội thất cho hàng nghìn khách hàng trên toàn quốc.",
    },
  ];

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary mb-4">
            Đội Ngũ Chuyên Gia
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Gặp gỡ đội ngũ chuyên gia giàu kinh nghiệm của Mộc's Home, luôn sẵn
            sàng hỗ trợ bạn trong mọi vấn đề về nội thất.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers?.map((member) => (
            <div
              key={member?.id}
              className="bg-card rounded-xl overflow-hidden shadow-warm hover-lift shadow-xl"
            >
              {/* Avatar */}
              <div className="relative">
                <Image
                  src={member?.avatar}
                  alt={member?.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="text-white">
                    <h3 className="font-playfair text-lg font-bold mb-1">
                      {member?.name}
                    </h3>
                    <p className="text-sm opacity-90">{member?.position}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Briefcase" size={16} className="text-primary" />
                    <span className="text-sm text-text-secondary">
                      {member?.experience}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {member?.bio}
                  </p>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="font-semibold text-text-primary mb-2 text-sm">
                    Chuyên môn:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {member?.specialties?.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="mb-4">
                  <h4 className="font-semibold text-text-primary mb-2 text-sm">
                    Ngôn ngữ:
                  </h4>
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="Globe"
                      size={14}
                      className="text-text-secondary"
                    />
                    <span className="text-sm text-text-secondary">
                      {member?.languages?.join(", ")}
                    </span>
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Mail" size={14} className="text-primary" />
                    <span className="text-xs text-text-secondary">
                      {member?.contact?.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={14} className="text-primary" />
                    <span className="text-xs text-text-secondary">
                      {member?.contact?.phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="mt-16 bg-card rounded-xl p-8 shadow-warm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={24} className="text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <p className="text-sm text-text-secondary">Chuyên gia tư vấn</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={24} className="text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-sm text-text-secondary">Hỗ trợ khách hàng</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Award" size={24} className="text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <p className="text-sm text-text-secondary">Năm kinh nghiệm</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Heart" size={24} className="text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <p className="text-sm text-text-secondary">Khách hàng hài lòng</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamProfiles;
