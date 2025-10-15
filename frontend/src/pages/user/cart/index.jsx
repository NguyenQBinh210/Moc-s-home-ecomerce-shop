import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../../slice/cartSlice";
import { Link } from "react-router";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const calculateSubtotal = (item) => {
    return (item.gia * item.quantity).toLocaleString("vi-VN");
  };
  const calculateTotal = () => {
    return items
      .reduce((total, item) => total + item.gia * item.quantity, 0)
      .toLocaleString("vi-VN");
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-24 pb-4">
        <p className="text-gray-400 tracking-wide">
          <Link to="/" className="hover:underline">
            Trang chủ
          </Link>{" "}
          / <span className="text-black">Giỏ hàng</span>
        </p>
      </div>
      <section className="md:mb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="hidden md:grid grid-cols-12 gap-4 p-6 shadow-sm rounded-lg font-medium bg-gray-50 border">
                <div className="col-span-5">Sản phẩm</div>
                <div className="col-span-2 text-center">Giá</div>
                <div className="col-span-3 text-center">Số lượng</div>
                <div className="col-span-2 text-right">Tổng</div>
              </div>
              <div className="space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
                    <p className="text-lg text-gray-500">
                      Giỏ hàng của bạn đang trống.
                    </p>
                    <Link to="/product">
                      <button className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">
                        Tiếp tục mua sắm
                      </button>
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item._id}
                      className="grid grid-cols-12 gap-4 p-4 md:p-6 shadow-sm rounded-lg relative bg-white border"
                    >
                      <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                        <img
                          src={item.hinh_anh?.[0]}
                          alt={item.ten_san_pham}
                          className="w-20 h-20 object-contain rounded-md border"
                        />
                        <span className="font-medium">{item.ten_san_pham}</span>
                      </div>
                      <div className="col-span-4 md:col-span-2 flex items-center justify-center md:justify-center">
                        {item.gia.toLocaleString("vi-VN")} đ
                      </div>
                      <div className="col-span-5 md:col-span-3 flex items-center justify-center md:justify-center">
                        <div className="flex border border-gray-300 rounded-md">
                          <button
                            className="px-3 py-1 hover:bg-gray-100"
                            onClick={() => dispatch(decreaseQuantity(item._id))}
                          >
                            -
                          </button>
                          <span className="w-12 text-center border-gray-300 border-x flex items-center justify-center">
                            {item.quantity}
                          </span>
                          <button
                            className="px-3 py-1 hover:bg-gray-100"
                            onClick={() => dispatch(increaseQuantity(item._id))}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-span-3 md:col-span-2 flex justify-end items-center font-semibold">
                        {calculateSubtotal(item)} đ
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(item._id))}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
                        title="Xóa sản phẩm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
            {items.length > 0 && (
              <div className="space-y-8">
                <div className="border p-6 rounded-lg space-y-6 border-gray-200 bg-white shadow-sm">
                  <h2 className="text-2xl font-bold">Tổng kết giỏ hàng</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Tạm tính:</span>
                      <span>{calculateTotal()} đ</span>
                    </div>
                    <hr />
                    <div className="flex justify-between">
                      <span>Phí vận chuyển:</span>
                      <span>Miễn phí</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Tổng cộng:</span>
                      <span className="text-orange-600">
                        {calculateTotal()} đ
                      </span>
                    </div>
                  </div>
                  <Link to={"/checkout"}>
                    <button className="w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700">
                      Tiến hành thanh toán
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
