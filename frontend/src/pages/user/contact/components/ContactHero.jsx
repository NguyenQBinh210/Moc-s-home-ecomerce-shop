import React from "react";
import Icon from "../../../../components/AppIcon";

const ContactHero = () => {
  return (
    <section className="bg-gradient-warm py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-playfair text-4xl lg:text-6xl font-bold text-primary mb-6">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-lg lg:text-xl text-text-secondary mb-8 leading-relaxed">
            Đội ngũ chuyên gia thiết kế nội thất của Mộc's Home luôn sẵn sàng hỗ
            trợ bạn tạo ra không gian sống hoàn hảo. Hãy để chúng tôi đồng hành
            cùng bạn trong hành trình biến đổi ngôi nhà của bạn.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-text-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span>Phản hồi trong 24 giờ</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-primary" />
              <span>Tư vấn miễn phí</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span>Chuyên gia giàu kinh nghiệm</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
