import React, { useState } from "react";
import Icon from "../../../../components/AppIcon";

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set([1]));

  const faqData = [
    {
      id: 1,
      category: "Sản phẩm",
      question:
        "Làm thế nào để biết kích thước nội thất phù hợp với không gian của tôi?",
      answer: `Chúng tôi cung cấp dịch vụ tư vấn thiết kế miễn phí với các chuyên gia nội thất. Bạn có thể:\n\n• Gửi bản vẽ mặt bằng hoặc hình ảnh không gian\n• Đặt lịch tư vấn tại showroom\n• Sử dụng công cụ AR để xem trước sản phẩm trong không gian thực\n• Liên hệ hotline 1900 1234 để được hỗ trợ đo đạc tại nhà`,
    },
    {
      id: 2,
      category: "Bảo hành",
      question: "Chính sách bảo hành của Mộc's Home như thế nào?",
      answer: `Mộc's Home cam kết bảo hành toàn diện cho tất cả sản phẩm:\n\n• Bảo hành 2-5 năm tùy theo loại sản phẩm\n• Miễn phí sửa chữa, thay thế linh kiện\n• Hỗ trợ bảo trì định kỳ\n• Dịch vụ khách hàng 24/7\n• Chính sách đổi trả trong 30 ngày đầu`,
    },
    {
      id: 3,
      category: "Vận chuyển",
      question: "Thời gian giao hàng và lắp đặt mất bao lâu?",
      answer: `Thời gian giao hàng phụ thuộc vào sản phẩm và địa điểm:\n\n• Nội thất có sẵn: 3-7 ngày làm việc\n• Nội thất đặt làm: 15-30 ngày làm việc\n• Miễn phí giao hàng trong bán kính 50km\n• Đội ngũ lắp đặt chuyên nghiệp\n• Hỗ trợ sắp xếp nội thất theo yêu cầu`,
    },
    {
      id: 4,
      category: "Thanh toán",
      question: "Mộc's Home hỗ trợ những hình thức thanh toán nào?",
      answer: `Chúng tôi chấp nhận đa dạng hình thức thanh toán:\n\n• Tiền mặt khi nhận hàng (COD)\n• Chuyển khoản ngân hàng\n• Thẻ tín dụng/ghi nợ (Visa, Mastercard)\n• Ví điện tử (MoMo, ZaloPay, VNPay)\n• Trả góp 0% lãi suất (6-24 tháng)\n• Thanh toán online qua website`,
    },
    {
      id: 5,
      category: "Thiết kế",
      question: "Dịch vụ thiết kế nội thất có mất phí không?",
      answer: `Mộc's Home cung cấp dịch vụ thiết kế linh hoạt:\n\n• Tư vấn cơ bản: Miễn phí\n• Thiết kế 2D: 500.000₫ - 1.000.000₫\n• Thiết kế 3D: 1.000.000₫ - 2.000.000₫\n• Hoàn lại 100% phí thiết kế khi mua sản phẩm ≥ 50.000.000₫\n• Tư vấn phong thủy và màu sắc miễn phí`,
    },
    {
      id: 6,
      category: "Chăm sóc",
      question: "Làm thế nào để bảo quản nội thất gỗ tự nhiên?",
      answer: `Hướng dẫn bảo quản nội thất gỗ tự nhiên:\n\n• Tránh ánh nắng trực tiếp và độ ẩm cao\n• Lau chùi bằng khăn mềm, ẩm nhẹ\n• Sử dụng sản phẩm chăm sóc gỗ chuyên dụng\n• Kiểm tra và bảo dưỡng định kỳ 6 tháng/lần\n• Liên hệ Mộc's Home để được hỗ trợ bảo trì chuyên nghiệp`,
    },
  ];

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems?.has(id)) {
      newOpenItems?.delete(id);
    } else {
      newOpenItems?.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const categories = [...new Set(faqData.map((item) => item.category))];

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-primary mb-4">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="text-lg text-text-secondary">
            Tìm câu trả lời nhanh chóng cho những thắc mắc phổ biến về sản phẩm
            và dịch vụ của chúng tôi.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories?.map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary hover:text-amber-500 transition-warm"
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData?.map((item) => (
            <div
              key={item?.id}
              className="bg-card rounded-xl shadow-warm overflow-hidden border"
            >
              <button
                onClick={() => toggleItem(item?.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-surface/50 transition-warm"
              >
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                    {item?.category}
                  </span>
                  <h3 className="font-semibold text-text-primary">
                    {item?.question}
                  </h3>
                </div>
                <Icon
                  name={openItems?.has(item?.id) ? "ChevronUp" : "ChevronDown"}
                  size={20}
                  className="text-text-secondary flex-shrink-0"
                />
              </button>

              {openItems?.has(item?.id) && (
                <div className="px-6 pb-6">
                  <div className="pl-20">
                    <div className="prose prose-sm max-w-none">
                      {item?.answer?.split("\n")?.map((line, index) => (
                        <p
                          key={index}
                          className="text-text-secondary leading-relaxed mb-2"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
