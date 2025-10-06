import React, { useState } from "react";
import Icon from "../../../../components/AppIcon";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const inquiryTypes = [
    { value: "product", label: "Tư vấn sản phẩm" },
    { value: "design", label: "Thiết kế nội thất" },
    { value: "warranty", label: "Bảo hành sản phẩm" },
    { value: "delivery", label: "Vận chuyển & Lắp đặt" },
    { value: "return", label: "Đổi trả sản phẩm" },
    { value: "other", label: "Khác" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      inquiryType: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div className="bg-card rounded-xl p-8 shadow-warm shadow-2xl">
            <div className="mb-8">
              <h2 className="font-playfair text-3xl font-bold text-primary mb-4">
                Gửi Tin Nhắn
              </h2>
              <p className="text-text-secondary">
                Điền thông tin bên dưới và chúng tôi sẽ liên hệ với bạn sớm nhất
                có thể.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Họ và tên"
                  type="text"
                  name="name"
                  placeholder="Nhập họ và tên"
                  value={formData?.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Số điện thoại"
                  type="tel"
                  name="phone"
                  placeholder="Nhập số điện thoại"
                  value={formData?.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="Nhập địa chỉ email"
                value={formData?.email}
                onChange={handleInputChange}
                required
              />

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Loại yêu cầu
                </label>
                <select
                  name="inquiryType"
                  value={formData?.inquiryType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-text-primary"
                >
                  <option value="">Chọn loại yêu cầu</option>
                  {inquiryTypes?.map((type) => (
                    <option key={type?.value} value={type?.value}>
                      {type?.label}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Tiêu đề"
                type="text"
                name="subject"
                placeholder="Nhập tiêu đề tin nhắn"
                value={formData?.subject}
                onChange={handleInputChange}
                required
              />

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Nội dung tin nhắn
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Mô tả chi tiết yêu cầu của bạn..."
                  value={formData?.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-input text-text-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="default"
                size="lg"
                fullWidth
                loading={isSubmitting}
                iconName="Send"
                iconPosition="right"
              >
                {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-card rounded-xl p-8 shadow-warm">
              <h3 className="font-playfair text-2xl font-bold text-primary mb-6">
                Thông Tin Liên Hệ
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="MapPin" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">
                      Địa chỉ showroom
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      123 Đường Nguyễn Huệ, Quận 1<br />
                      Thành phố Hồ Chí Minh, Việt Nam
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">
                      Giờ làm việc
                    </h4>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      Thứ 2 - Thứ 6: 8:00 - 18:00
                      <br />
                      Thứ 7 - Chủ nhật: 9:00 - 17:00
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Globe" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">
                      Mạng xã hội
                    </h4>
                    <div className="flex space-x-3 mt-2">
                      <button className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-warm">
                        <Icon name="Facebook" size={16} />
                      </button>
                      <button className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-warm">
                        <Icon name="Instagram" size={16} />
                      </button>
                      <button className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-warm">
                        <Icon name="Youtube" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-8 shadow-warm">
              <h3 className="font-playfair text-2xl font-bold text-primary mb-4">
                Cam Kết Dịch Vụ
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-text-secondary">
                    Phản hồi trong 24 giờ
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-text-secondary">
                    Tư vấn miễn phí
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-text-secondary">
                    Hỗ trợ sau bán hàng
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-text-secondary">
                    Bảo hành chính hãng
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
