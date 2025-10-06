import React from "react";
import Icon from "../../../../components/AppIcon";

const SupportPolicies = () => {
  const policies = [
    {
      id: 1,
      title: "Chính Sách Bảo Hành",
      icon: "Shield",
      description: "Cam kết bảo hành toàn diện cho mọi sản phẩm",
      details: [
        "Bảo hành 2-5 năm tùy theo sản phẩm",
        "Miễn phí sửa chữa, thay thế linh kiện",
        "Hỗ trợ bảo trì định kỳ",
        "Dịch vụ khách hàng 24/7",
      ],
      color: "text-success",
    },
    {
      id: 2,
      title: "Chính Sách Đổi Trả",
      icon: "RotateCcw",
      description: "Đổi trả dễ dàng trong 30 ngày đầu",
      details: [
        "Đổi trả miễn phí trong 30 ngày",
        "Hoàn tiền 100% nếu không hài lòng",
        "Hỗ trợ vận chuyển đổi trả",
        "Quy trình đơn giản, nhanh chóng",
      ],
      color: "text-warning",
    },
    {
      id: 3,
      title: "Chính Sách Vận Chuyển",
      icon: "Truck",
      description: "Giao hàng nhanh chóng và an toàn",
      details: [
        "Miễn phí giao hàng trong bán kính 50km",
        "Đội ngũ lắp đặt chuyên nghiệp",
        "Bảo hiểm hàng hóa 100%",
        "Theo dõi đơn hàng real-time",
      ],
      color: "text-primary",
    },
    {
      id: 4,
      title: "Chính Sách Bảo Mật",
      icon: "Lock",
      description: "Bảo vệ thông tin khách hàng tuyệt đối",
      details: [
        "Mã hóa SSL 256-bit",
        "Không chia sẻ thông tin cá nhân",
        "Thanh toán an toàn 100%",
        "Tuân thủ GDPR và luật Việt Nam",
      ],
      color: "text-accent",
    },
  ];

  const certifications = [
    {
      name: "ISO 9001:2015",
      description: "Chứng nhận hệ thống quản lý chất lượng",
      icon: "Award",
    },
    {
      name: "FSC Certified",
      description: "Chứng nhận gỗ bền vững",
      icon: "Leaf",
    },
    {
      name: "CE Marking",
      description: "Chứng nhận an toàn châu Âu",
      icon: "CheckCircle",
    },
    {
      name: "Vietnam Green Label",
      description: "Nhãn xanh Việt Nam",
      icon: "Eco",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary mb-4">
            Chính Sách & Cam Kết
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Mộc's Home cam kết mang đến trải nghiệm mua sắm an toàn, tin cậy với
            các chính sách minh bạch và dịch vụ chất lượng cao.
          </p>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {policies?.map((policy) => (
            <div
              key={policy?.id}
              className="bg-card rounded-xl p-6 shadow-warm hover-lift"
            >
              <div className="text-center mb-6">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4`}
                >
                  <Icon
                    name={policy?.icon}
                    size={24}
                    className={policy?.color}
                  />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-primary mb-2">
                  {policy?.title}
                </h3>
                <p className="text-sm text-text-secondary">
                  {policy?.description}
                </p>
              </div>

              <div className="space-y-3">
                {policy?.details?.map((detail, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Icon
                      name="Check"
                      size={16}
                      className="text-success mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm text-text-secondary leading-relaxed">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-surface rounded-xl p-8">
          <div className="text-center mb-8">
            <h3 className="font-playfair text-2xl font-bold text-primary mb-4">
              Chứng Nhận & Giải Thưởng
            </h3>
            <p className="text-text-secondary">
              Mộc's Home tự hào với các chứng nhận quốc tế về chất lượng và bền
              vững môi trường.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications?.map((cert, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 text-center shadow-warm hover-lift"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={cert?.icon} size={20} className="text-primary" />
                </div>
                <h4 className="font-semibold text-text-primary mb-2">
                  {cert?.name}
                </h4>
                <p className="text-sm text-text-secondary">
                  {cert?.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Rights */}
        <div className="mt-16 bg-card rounded-xl p-8 shadow-warm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-playfair text-2xl font-bold text-primary mb-4">
                Quyền Lợi Khách Hàng
              </h3>
              <p className="text-text-secondary mb-6 leading-relaxed">
                Tại Mộc's Home, quyền lợi của khách hàng luôn được đặt lên hàng
                đầu. Chúng tôi cam kết bảo vệ và tôn trọng mọi quyền lợi chính
                đáng của bạn.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Icon
                    name="UserCheck"
                    size={20}
                    className="text-primary mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">
                      Quyền được tư vấn miễn phí
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Nhận tư vấn chuyên nghiệp từ đội ngũ thiết kế nội thất
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Icon
                    name="Eye"
                    size={20}
                    className="text-primary mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">
                      Quyền xem trước sản phẩm
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Sử dụng công nghệ AR/VR để xem sản phẩm trong không gian
                      thực
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Icon
                    name="CreditCard"
                    size={20}
                    className="text-primary mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">
                      Quyền thanh toán linh hoạt
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Đa dạng hình thức thanh toán, hỗ trợ trả góp 0% lãi suất
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Icon
                    name="Headphones"
                    size={20}
                    className="text-primary mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">
                      Quyền được hỗ trợ 24/7
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Dịch vụ chăm sóc khách hàng hoạt động liên tục
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-warm rounded-xl p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Heart" size={32} className="text-primary" />
                </div>
                <h4 className="font-playfair text-xl font-bold text-primary mb-4">
                  Cam Kết Hài Lòng 100%
                </h4>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  Nếu bạn không hoàn toàn hài lòng với sản phẩm hoặc dịch vụ,
                  chúng tôi cam kết hoàn tiền 100% trong vòng 30 ngày.
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-primary" />
                    <span>30 ngày</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon
                      name="DollarSign"
                      size={16}
                      className="text-primary"
                    />
                    <span>100% hoàn tiền</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportPolicies;
