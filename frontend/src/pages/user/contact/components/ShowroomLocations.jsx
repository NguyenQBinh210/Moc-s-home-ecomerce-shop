import React from "react";
import Icon from "../../../../components/AppIcon";
import Button from "../../../../components/ui/Button";

const ShowroomLocations = () => {
  const locations = [
    {
      id: 1,
      name: "Mộc's Home Quận 1",
      address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
      phone: "028 3822 1234",
      hours: "8:00 - 22:00 (Thứ 2 - Chủ nhật)",
      features: ["Showroom chính", "Tư vấn thiết kế", "Kho hàng lớn"],
      lat: "10.7769",
      lng: "106.7009",
    },
    {
      id: 2,
      name: "Mộc's Home Quận 7",
      address: "456 Đường Nguyễn Thị Thập, Quận 7, TP.HCM",
      phone: "028 3822 5678",
      hours: "9:00 - 21:00 (Thứ 2 - Chủ nhật)",
      features: ["Showroom phụ", "Trưng bày nội thất", "Dịch vụ giao hàng"],
      lat: "10.7411",
      lng: "106.7200",
    },
    {
      id: 3,
      name: "Mộc's Home Hà Nội",
      address: "789 Phố Huế, Hai Bà Trưng, Hà Nội",
      phone: "024 3822 9012",
      hours: "8:30 - 21:30 (Thứ 2 - Chủ nhật)",
      features: ["Showroom miền Bắc", "Tư vấn chuyên sâu", "Workshop DIY"],
      lat: "21.0285",
      lng: "105.8542",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary mb-4">
            Hệ Thống Showroom
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Ghé thăm showroom để trải nghiệm trực tiếp các sản phẩm nội thất cao
            cấp và nhận tư vấn từ chuyên gia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {locations?.map((location) => (
            <div
              key={location?.id}
              className="bg-card rounded-xl overflow-hidden shadow-warm hover-lift shadow-xl"
            >
              {/* Map */}
              <div className="h-48 bg-surface relative overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title={location?.name}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${location?.lat},${location?.lng}&z=14&output=embed`}
                  className="border-0"
                />
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  {location?.id === 1 ? "Showroom chính" : "Chi nhánh"}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-playfair text-xl font-bold text-primary mb-3">
                  {location?.name}
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-3">
                    <Icon
                      name="MapPin"
                      size={16}
                      className="text-primary mt-0.5 flex-shrink-0"
                    />
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {location?.address}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Icon
                      name="Phone"
                      size={16}
                      className="text-primary flex-shrink-0"
                    />
                    <p className="text-sm text-text-secondary">
                      {location?.phone}
                    </p>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Icon
                      name="Clock"
                      size={16}
                      className="text-primary mt-0.5 flex-shrink-0"
                    />
                    <p className="text-sm text-text-secondary">
                      {location?.hours}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-text-primary mb-3 text-sm">
                    Dịch vụ tại showroom:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {location?.features?.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Navigation"
                    iconPosition="left"
                    className="flex-1"
                  >
                    Chỉ đường
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Calendar"
                    iconPosition="left"
                    className="flex-1"
                  >
                    Đặt lịch
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-surface rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Car" size={24} className="text-primary" />
              </div>
              <h3 className="font-playfair text-lg font-semibold text-primary mb-2">
                Miễn Phí Đỗ Xe
              </h3>
              <p className="text-sm text-text-secondary">
                Tất cả showroom đều có bãi đỗ xe rộng rãi, miễn phí cho khách
                hàng
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Coffee" size={24} className="text-primary" />
              </div>
              <h3 className="font-playfair text-lg font-semibold text-primary mb-2">
                Khu Vực Nghỉ Ngơi
              </h3>
              <p className="text-sm text-text-secondary">
                Không gian thoải mái với đồ uống miễn phí trong quá trình tư vấn
              </p>
            </div>

            <div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={24} className="text-primary" />
              </div>
              <h3 className="font-playfair text-lg font-semibold text-primary mb-2">
                Tư Vấn Chuyên Nghiệp
              </h3>
              <p className="text-sm text-text-secondary">
                Đội ngũ chuyên gia thiết kế nội thất với nhiều năm kinh nghiệm
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowroomLocations;
