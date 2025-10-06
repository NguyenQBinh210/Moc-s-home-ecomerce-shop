import React, { useState } from "react";
import Icon from "../../../../components/AppIcon";
import Image from "../../../../components/AppImage";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const stylePreferences = [
    { id: "modern", name: "Hiện đại", icon: "Zap" },
    { id: "scandinavian", name: "Scandinavian", icon: "Trees" },
    { id: "minimalist", name: "Tối giản", icon: "Minus" },
    { id: "luxury", name: "Sang trọng", icon: "Crown" },
    { id: "vintage", name: "Vintage", icon: "Clock" },
    { id: "industrial", name: "Công nghiệp", icon: "Wrench" },
  ];

  const benefits = [
    {
      icon: "Mail",
      title: "Ưu đãi độc quyền",
      description:
        "Nhận thông tin về các chương trình khuyến mãi và giảm giá đặc biệt",
    },
    {
      icon: "Lightbulb",
      title: "Ý tưởng thiết kế",
      description:
        "Cập nhật xu hướng nội thất và mẹo trang trí nhà cửa mới nhất",
    },
    {
      icon: "Gift",
      title: "Quà tặng sinh nhật",
      description:
        "Nhận voucher giảm giá đặc biệt trong tháng sinh nhật của bạn",
    },
    {
      icon: "Bell",
      title: "Thông báo sớm",
      description:
        "Được ưu tiên thông báo về sản phẩm mới và bộ sưu tập độc quyền",
    },
  ];

  const toggleStyle = (styleId) => {
    setSelectedStyles((prev) =>
      prev?.includes(styleId)
        ? prev?.filter((id) => id !== styleId)
        : [...prev, styleId]
    );
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (email && selectedStyles?.length > 0) {
      setIsSubmitted(true);
      // Mock API call
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
        setSelectedStyles([]);
      }, 3000);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-16 bg-gradient-to-br from-primary/5 via-surface to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-card rounded-3xl shadow-warm-lg p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={40} className="text-green-600" />
            </div>
            <h2 className="font-playfair text-3xl font-bold text-text-primary mb-4">
              Cảm ơn bạn đã đăng ký!
            </h2>
            <p className="text-xl text-text-secondary mb-6">
              Chúng tôi đã gửi email xác nhận đến <strong>{email}</strong>
            </p>
            <p className="text-text-secondary">
              Bạn sẽ sớm nhận được những thông tin hữu ích về nội thất và ưu đãi
              đặc biệt từ Mộc's Home.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-surface to-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Đăng ký nhận thông tin
              <span className="text-primary"> độc quyền</span>
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              Tham gia cộng đồng Mộc's Home để nhận những ưu đãi đặc biệt, xu
              hướng thiết kế mới nhất và lời khuyên từ các chuyên gia nội thất.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {benefits?.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon
                      name={benefit?.icon}
                      size={20}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">
                      {benefit?.title}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {benefit?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-card rounded-3xl shadow-warm-lg p-8 border shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="font-playfair text-2xl font-bold text-text-primary mb-2">
                  Bắt đầu ngay hôm nay
                </h3>
                <p className="text-text-secondary mb-6">
                  Chọn phong cách yêu thích để nhận nội dung phù hợp
                </p>
              </div>

              {/* Email Input */}
              <Input
                type="email"
                label="Địa chỉ email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e?.target?.value)}
                required
                className="mb-6"
              />

              {/* Style Preferences */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-4">
                  Phong cách yêu thích (chọn ít nhất 1)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {stylePreferences?.map((style) => (
                    <button
                      key={style?.id}
                      type="button"
                      onClick={() => toggleStyle(style?.id)}
                      className={`flex flex-col items-center p-4 rounded-xl border-2 transition-warm ${
                        selectedStyles?.includes(style?.id)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50 text-text-secondary hover:text-primary"
                      }`}
                    >
                      <Icon name={style?.icon} size={24} className="mb-2" />
                      <span className="text-sm font-medium">{style?.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="default"
                size="lg"
                iconName="Mail"
                iconPosition="left"
                fullWidth
                disabled={!email || selectedStyles?.length === 0}
                className="mt-8 bg-primary hover:bg-amber-100/90 "
              >
                Đăng ký nhận thông tin
              </Button>

              {/* Privacy Note */}
              <p className="text-xs text-text-secondary text-center">
                Bằng cách đăng ký, bạn đồng ý với{" "}
                <a href="#" className="text-primary hover:underline">
                  Điều khoản sử dụng
                </a>{" "}
                và{" "}
                <a href="#" className="text-primary hover:underline">
                  Chính sách bảo mật
                </a>{" "}
                của chúng tôi.
              </p>
            </form>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <p className="text-text-secondary mb-6">
            Tham gia cùng hơn <strong>25,000+</strong> khách hàng đã tin tưởng
            Mộc's Home
          </p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            {/* Mock customer logos/avatars */}
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5]?.map((i) => (
                <Image
                  key={i}
                  src={`https://randomuser.me/api/portraits/men/${i + 20}.jpg`}
                  alt={`Customer ${i}`}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <div className="text-sm text-text-secondary">
              <Icon
                name="Star"
                size={16}
                className="inline text-yellow-400 fill-current mr-1"
              />
              4.9/5 từ 2,847 đánh giá
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
