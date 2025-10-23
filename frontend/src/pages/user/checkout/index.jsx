import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);
  const [formData, setFormData] = useState({
    dia_chi: "",
    toa_nha: "",
    tinh_thanh: "",
    so_dien_thoai: "",
    email: "",
    phuong_thuc_thanh_toan: "bank",
    ghi_chu: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [qrUrl, setQrUrl] = useState("");

  const bankId = "BIDV";
  const accountNo = "2171082709";
  const accountName = "Nguyen Quoc Binh";

  const calculateItemSubtotal = (item) => item.gia * item.quantity;
  const subtotal = items.reduce(
    (sum, item) => sum + calculateItemSubtotal(item),
    0
  );
  const total = subtotal;
  const shippingLabel = "Miễn phí";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (items.length === 0) {
      setError("Giỏ hàng của bạn đang trống");
      setLoading(false);
      return;
    }

    try {
      const dia_chi_giao_hang = `${formData.dia_chi}${
        formData.toa_nha ? ", " + formData.toa_nha : ""
      }, ${formData.tinh_thanh}`;

      const ghi_chu = `
        Số điện thoại: ${formData.so_dien_thoai}
        Email: ${formData.email}
        Phương thức thanh toán: ${
          formData.phuong_thuc_thanh_toan === "bank"
            ? "Chuyển khoản ngân hàng"
            : "COD"
        }
        ${formData.ghi_chu ? "Ghi chú: " + formData.ghi_chu : ""}
      `.trim();

      // Nếu chọn chuyển khoản ngân hàng → sinh mã QR
      if (formData.phuong_thuc_thanh_toan === "bank") {
        const description = `Thanh toan don hang ${Date.now()}`;
        const qr = `https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?amount=${total}&addInfo=${encodeURIComponent(
          description
        )}`;
        setQrUrl(qr);
        toast("Vui lòng quét mã QR để thanh toán!");
      } else {
        const response = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            dia_chi_giao_hang,
            ghi_chu,
            items: items,
          }),
        });

        const data = await response.json();
        if (data.success) {
          toast("Đặt hàng thành công!");
          navigate("/product", { state: { order: data.data } });
        } else {
          setError(data.message || "Có lỗi xảy ra khi đặt hàng");
        }
      }
    } catch (err) {
      console.error("Lỗi khi đặt hàng:", err);
      setError("Không thể kết nối đến server. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className="mb-20 mt-10 pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
            <p className="text-lg text-gray-500 mb-4">
              Giỏ hàng của bạn đang trống.
            </p>
            <Link to="/product">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">
                Tiếp tục mua sắm
              </button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-20 mt-10 pt-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-playfair">
              Chi tiết thanh toán
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-gray-500 text-sm font-medium">
                    Địa chỉ*
                  </label>
                  <input
                    type="text"
                    name="dia_chi"
                    value={formData.dia_chi}
                    onChange={handleChange}
                    placeholder="Số nhà và tên đường"
                    required
                    className="w-full bg-gray-100 border-gray-200 px-4 py-2 border rounded-md"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-gray-500 text-sm font-medium">
                    Tên tòa nhà, số tầng... (tùy chọn)
                  </label>
                  <input
                    type="text"
                    name="toa_nha"
                    value={formData.toa_nha}
                    onChange={handleChange}
                    className="w-full bg-gray-100 border-gray-200 px-4 py-2 border rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-gray-500 text-sm font-medium">
                    Tỉnh/Thành phố*
                  </label>
                  <input
                    type="text"
                    name="tinh_thanh"
                    value={formData.tinh_thanh}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-100 border-gray-200 px-4 py-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-500 text-sm font-medium">
                    Số điện thoại*
                  </label>
                  <input
                    type="tel"
                    name="so_dien_thoai"
                    value={formData.so_dien_thoai}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-100 border-gray-200 px-4 py-2 border rounded-md"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="block text-gray-500 text-sm font-medium">
                    Địa chỉ Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border bg-gray-100 border-gray-200 px-4 py-2 rounded-md"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="block text-gray-500 text-sm font-medium">
                    Ghi chú đơn hàng (tùy chọn)
                  </label>
                  <textarea
                    name="ghi_chu"
                    value={formData.ghi_chu}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn"
                    className="w-full bg-gray-100 border-gray-200 px-4 py-2 border rounded-md"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="border p-6 rounded-md h-fit border-gray-200 bg-white">
            <h2 className="text-2xl font-bold font-playfair mb-6">
              Tóm tắt đơn hàng
            </h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center"
                >
                  <span className="flex items-center gap-4">
                    <img
                      src={item.hinh_anh?.[0]}
                      alt={item.ten_san_pham}
                      className="w-14 h-14 object-contain rounded-md border"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{item.ten_san_pham}</span>
                      <span className="text-sm text-gray-500">
                        x{item.quantity}
                      </span>
                    </div>
                  </span>
                  <span>
                    {calculateItemSubtotal(item).toLocaleString("vi-VN")} đ
                  </span>
                </div>
              ))}
              <hr className="my-4" />
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span>{subtotal.toLocaleString("vi-VN")} đ</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span>{shippingLabel}</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-bold">
                <span>Tổng cộng:</span>
                <span className="text-orange-600">
                  {total.toLocaleString("vi-VN")} đ
                </span>
              </div>
            </div>

            <div className="space-y-6 mt-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="phuong_thuc_thanh_toan"
                    id="bank"
                    value="bank"
                    checked={formData.phuong_thuc_thanh_toan === "bank"}
                    onChange={handleChange}
                  />
                  <label htmlFor="bank" className="flex-1">
                    Chuyển khoản ngân hàng
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="phuong_thuc_thanh_toan"
                    id="cod"
                    value="cod"
                    checked={formData.phuong_thuc_thanh_toan === "cod"}
                    onChange={handleChange}
                  />
                  <label htmlFor="cod" className="flex-1">
                    Thanh toán khi nhận hàng (COD)
                  </label>
                </div>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 transition-colors font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Đang xử lý..." : "Đặt hàng"}
              </button>

              {qrUrl && (
                <div className="text-center mt-6">
                  <p className="font-medium mb-2 text-gray-700">
                    Quét mã để thanh toán:
                  </p>
                  <img
                    src={qrUrl}
                    alt="QR Payment"
                    className="mx-auto w-60 h-60 border rounded-lg shadow-sm"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Chủ tài khoản: {accountName} <br />
                    Số tài khoản: {accountNo} ({bankId})
                  </p>

                  {/* Nút tôi đã thanh toán */}
                  <button
                    onClick={async () => {
                      try {
                        setLoading(true);
                        const dia_chi_giao_hang = `${formData.dia_chi}${
                          formData.toa_nha ? ", " + formData.toa_nha : ""
                        }, ${formData.tinh_thanh}`;

                        const ghi_chu = `
                              Số điện thoại: ${formData.so_dien_thoai}
                              Email: ${formData.email}
                              Phương thức thanh toán: Chuyển khoản ngân hàng
                              ${formData.ghi_chu ? "Ghi chú: " + formData.ghi_chu : ""}
                            `.trim();

                        const response = await fetch(
                          "http://localhost:3000/api/orders",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${localStorage.getItem(
                                "token"
                              )}`,
                            },
                            body: JSON.stringify({
                              dia_chi_giao_hang,
                              ghi_chu,
                              items,
                              tong_tien: total,
                            }),
                          }
                        );

                        const data = await response.json();

                        if (data.success) {
                          toast("Đặt hàng thành công!");
                          navigate("/product", { state: { order: data.data } });
                        } else {
                          toast.error(
                            data.message || "Có lỗi xảy ra khi lưu đơn hàng!"
                          );
                        }
                      } catch (err) {
                        console.error("Lỗi khi lưu đơn hàng:", err);
                        toast.error(
                          "Không thể kết nối đến server. Vui lòng thử lại!"
                        );
                      } finally {
                        setLoading(false);
                      }
                    }}
                    disabled={loading}
                    className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition disabled:bg-gray-400"
                  >
                    {loading ? "Đang xác nhận..." : "Tôi đã thanh toán"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
