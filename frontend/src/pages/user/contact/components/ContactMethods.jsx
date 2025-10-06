import React from "react";
import Icon from "../../../../components/AppIcon";
import Button from "../../../../components/ui/Button";

const ContactMethods = () => {
  const contactMethods = [
    {
      id: 1,
      title: "Hotline Tư Vấn",
      description: "Gọi ngay để được tư vấn trực tiếp từ chuyên gia",
      icon: "Phone",
      value: "1900 1234",
      action: "Gọi ngay",
      available: "24/7",
      color: "text-success",
    },
    {
      id: 2,
      title: "Email Hỗ Trợ",
      description: "Gửi câu hỏi chi tiết, chúng tôi sẽ phản hồi sớm nhất",
      icon: "Mail",
      value: "support@Mộc's Home.vn",
      action: "Gửi email",
      available: "Phản hồi trong 2-4 giờ",
      color: "text-primary",
    },
    {
      id: 3,
      title: "Chat Trực Tuyến",
      description: "Trò chuyện ngay với đội ngũ tư vấn viên",
      icon: "MessageCircle",
      value: "Chat ngay",
      action: "Bắt đầu chat",
      available: "8:00 - 22:00 hàng ngày",
      color: "text-accent",
    },
    {
      id: 4,
      title: "Đặt Lịch Tư Vấn",
      description: "Gặp gỡ chuyên gia thiết kế tại showroom",
      icon: "Calendar",
      value: "Miễn phí",
      action: "Đặt lịch",
      available: "Thứ 2 - Chủ nhật",
      color: "text-warning",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary mb-4">
            Nhiều Cách Để Liên Hệ
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Chọn phương thức liên hệ phù hợp nhất với bạn. Chúng tôi cam kết
            mang đến trải nghiệm hỗ trợ tốt nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods?.map((method) => (
            <div
              key={method?.id}
              className="bg-card rounded-xl p-6 shadow-warm hover-lift border border-border"
            >
              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4`}
                >
                  <Icon
                    name={method?.icon}
                    size={24}
                    className={method?.color}
                  />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-primary mb-2">
                  {method?.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                  {method?.description}
                </p>
                <div className="mb-4">
                  <p className="font-semibold text-text-primary text-lg mb-1">
                    {method?.value}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {method?.available}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  className="transition-warm hover:bg-primary hover:text-white"
                >
                  {method?.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactMethods;
