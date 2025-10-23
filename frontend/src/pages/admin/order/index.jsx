import React, { useState, useEffect, useCallback } from "react";
import {
  ShoppingCart,
  Search,
  Eye,
  Trash2,
  X,
  FileText,
  Package,
  Truck,
  CheckCircle,
  Clock,
} from "lucide-react";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3000/api";

const OrderManagementPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const showToast = (message) => {
    toast(message);
  };

  const fetchOrders = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      showToast("Vui lòng đăng nhập", "error");
      return;
    }

    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        search: searchTerm,
        trang_thai: filterStatus,
      });

      const response = await fetch(`${API_URL}/orders?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (data.success) {
        setOrders(data.data);
        setPagination(data.pagination);
      } else {
        throw new Error(data.message || "Không thể tải danh sách đơn hàng");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, filterStatus]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1);
  };

  const handleViewDetails = async (orderId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (data.success) {
        setSelectedOrder(data.data);
        setShowDetailModal(true);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trang_thai: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        showToast("Cập nhật trạng thái thành công!", "success");
        setSelectedOrder(data.data);
        fetchOrders();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/orders/${orderId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (data.success) {
        showToast("Xóa đơn hàng thành công!", "success");
        setShowDetailModal(false);
        fetchOrders();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  const handleExportInvoice = (order) => {
    const invoiceContent = generateInvoiceHTML(order);
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write(invoiceContent);
    printWindow.document.close();
    printWindow.print();
  };

  const generateInvoiceHTML = (order) => {
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(amount);
    };

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Hóa Đơn - ${order._id}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: 'Arial', sans-serif; 
            padding: 40px; 
            background: white;
          }
          .invoice-container { 
            max-width: 800px; 
            margin: 0 auto; 
            border: 2px solid #333;
            padding: 30px;
          }
          .header { 
            text-align: center; 
            border-bottom: 3px solid #333;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 { 
            font-size: 32px; 
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
          }
          .header p { 
            font-size: 14px; 
            color: #666;
          }
          .info-section { 
            display: flex; 
            justify-content: space-between;
            margin-bottom: 30px;
          }
          .info-box { 
            width: 48%;
          }
          .info-box h3 { 
            font-size: 16px; 
            margin-bottom: 10px;
            border-bottom: 2px solid #333;
            padding-bottom: 5px;
          }
          .info-box p { 
            font-size: 14px; 
            line-height: 1.8;
            color: #333;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0;
          }
          th { 
            background: #333; 
            color: white; 
            padding: 12px; 
            text-align: left;
            font-size: 14px;
          }
          td { 
            padding: 12px; 
            border-bottom: 1px solid #ddd;
            font-size: 14px;
          }
          tr:hover { 
            background: #f9f9f9;
          }
          .text-right { 
            text-align: right;
          }
          .total-section { 
            margin-top: 30px; 
            text-align: right;
          }
          .total-row { 
            display: flex; 
            justify-content: flex-end; 
            padding: 8px 0;
            font-size: 16px;
          }
          .total-row.grand-total { 
            font-size: 20px; 
            font-weight: bold;
            border-top: 3px double #333;
            margin-top: 10px;
            padding-top: 15px;
          }
          .total-label { 
            width: 200px; 
            text-align: right; 
            padding-right: 20px;
          }
          .total-value { 
            width: 150px; 
            text-align: right;
            font-weight: bold;
          }
          .footer { 
            margin-top: 50px; 
            text-align: center; 
            font-size: 12px;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 20px;
          }
          .status-badge {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            margin-top: 10px;
          }
          .status-processing { background: #fef3c7; color: #92400e; }
          .status-shipping { background: #dbeafe; color: #1e40af; }
          .status-completed { background: #d1fae5; color: #065f46; }
          @media print {
            body { padding: 0; }
            .invoice-container { border: none; }
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="header">
            <h1>HÓA ĐƠN BÁN HÀNG</h1>
            <p>INVOICE</p>
          </div>

          <div class="info-section">
            <div class="info-box">
              <h3>THÔNG TIN CỬA HÀNG</h3>
              <p><strong>Tên cửa hàng:</strong> Môc's HOME</p>
              <p><strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP.HCM</p>
              <p><strong>Điện thoại:</strong> 0123 456 789</p>
              <p><strong>Email:</strong> contact@sieuthiabc.com</p>
            </div>

            <div class="info-box">
              <h3>THÔNG TIN ĐƠN HÀNG</h3>
              <p><strong>Mã đơn:</strong> #${order._id
                .slice(-8)
                .toUpperCase()}</p>
              <p><strong>Ngày đặt:</strong> ${new Date(
                order.ngay_dat
              ).toLocaleString("vi-VN")}</p>
              <p><strong>Khách hàng:</strong> ${
                order.user?.ten_hoc_ten || "N/A"
              }</p>
              <p><strong>SĐT:</strong> ${order.user?.so_dien_thoai || "N/A"}</p>
              <span class="status-badge status-${
                order.trang_thai === "đang xử lý"
                  ? "processing"
                  : order.trang_thai === "đang giao"
                  ? "shipping"
                  : "completed"
              }">
                ${order.trang_thai.toUpperCase()}
              </span>
            </div>
          </div>

          <div class="info-box">
            <h3>ĐỊA CHỈ GIAO HÀNG</h3>
            <p>${order.dia_chi_giao_hang || "Chưa có địa chỉ"}</p>
            ${
              order.ghi_chu
                ? `<p><strong>Ghi chú:</strong> ${order.ghi_chu}</p>`
                : ""
            }
          </div>

          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên sản phẩm</th>
                <th class="text-right">Đơn giá</th>
                <th class="text-right">SL</th>
                <th class="text-right">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              ${order.chi_tiet
                .map(
                  (item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${item.ten_san_pham}</td>
                  <td class="text-right">${formatCurrency(item.gia)}</td>
                  <td class="text-right">${item.so_luong}</td>
                  <td class="text-right">${formatCurrency(item.thanh_tien)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>

          <div class="total-section">
            <div class="total-row">
              <div class="total-label">Tạm tính:</div>
              <div class="total-value">${formatCurrency(order.tong_tien)}</div>
            </div>
            <div class="total-row">
              <div class="total-label">Phí vận chuyển:</div>
              <div class="total-value">0₫</div>
            </div>
            <div class="total-row grand-total">
              <div class="total-label">TỔNG CỘNG:</div>
              <div class="total-value">${formatCurrency(order.tong_tien)}</div>
            </div>
          </div>

          <div class="footer">
            <p>Cảm ơn quý khách đã mua hàng!</p>
            <p>Hotline: 0123 456 789 | Email: support@sieuthiabc.com</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "đang xử lý":
        return <Clock className="w-4 h-4" />;
      case "đang giao":
        return <Truck className="w-4 h-4" />;
      case "giao thành công":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "đang xử lý":
        return "bg-yellow-100 text-yellow-800";
      case "đang giao":
        return "bg-blue-100 text-blue-800";
      case "giao thành công":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <ShoppingCart className="w-7 h-7" /> Quản lý Đơn Hàng
      </h1>

      {/* Filter & Search */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2 flex-1">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Tìm kiếm theo địa chỉ, ghi chú..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Tìm
          </button>
        </form>

        <div className="flex gap-2">
          <button
            onClick={() => handleFilterChange("")}
            className={`px-4 py-2 rounded-lg transition ${
              !filterStatus
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-300"
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => handleFilterChange("đang xử lý")}
            className={`px-4 py-2 rounded-lg transition ${
              filterStatus === "đang xử lý"
                ? "bg-yellow-600 text-white"
                : "bg-white border border-gray-300"
            }`}
          >
            Đang xử lý
          </button>
          <button
            onClick={() => handleFilterChange("đang giao")}
            className={`px-4 py-2 rounded-lg transition ${
              filterStatus === "đang giao"
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-300"
            }`}
          >
            Đang giao
          </button>
          <button
            onClick={() => handleFilterChange("giao thành công")}
            className={`px-4 py-2 rounded-lg transition ${
              filterStatus === "giao thành công"
                ? "bg-green-600 text-white"
                : "bg-white border border-gray-300"
            }`}
          >
            Hoàn thành
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-10 text-center">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Không tìm thấy đơn hàng nào</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Mã ĐH
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Khách hàng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Ngày đặt
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Tổng tiền
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono font-medium text-gray-900">
                          #{order._id.slice(-8)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.user?.ten_hoc_ten || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.user?.so_dien_thoai}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.ngay_dat).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">
                          {formatCurrency(order.tong_tien)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                            order.trang_thai
                          )}`}
                        >
                          {getStatusIcon(order.trang_thai)}
                          {order.trang_thai}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <button
                          onClick={() => handleViewDetails(order._id)}
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-900 transition"
                          title="Xem chi tiết"
                        >
                          <Eye size={18} />
                          <span>Chi tiết</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {pagination.totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Hiển thị {orders.length} / {pagination.totalItems} đơn hàng
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  ← Trước
                </button>
                <span className="px-4 py-2 bg-white border border-gray-300 rounded-lg">
                  Trang {currentPage} / {pagination.totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(pagination.totalPages, prev + 1)
                    )
                  }
                  disabled={currentPage === pagination.totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  Sau →
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal Chi Tiết Đơn Hàng */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">
                Chi Tiết Đơn Hàng #{selectedOrder._id.slice(-8).toUpperCase()}
              </h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {/* Thông tin khách hàng */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Thông tin khách hàng
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">Họ tên:</span>{" "}
                      <span className="font-medium">
                        {selectedOrder.user?.ten_hoc_ten || "N/A"}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-600">Email:</span>{" "}
                      <span className="font-medium">
                        {selectedOrder.user?.email || "N/A"}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-600">SĐT:</span>{" "}
                      <span className="font-medium">
                        {selectedOrder.user?.so_dien_thoai || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Thông tin đơn hàng
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-600">Ngày đặt:</span>{" "}
                      <span className="font-medium">
                        {new Date(selectedOrder.ngay_dat).toLocaleString(
                          "vi-VN"
                        )}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-600">Trạng thái:</span>
                      <span
                        className={`ml-2 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(
                          selectedOrder.trang_thai
                        )}`}
                      >
                        {getStatusIcon(selectedOrder.trang_thai)}
                        {selectedOrder.trang_thai}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-600">Tổng tiền:</span>{" "}
                      <span className="font-bold text-lg text-blue-600">
                        {formatCurrency(selectedOrder.tong_tien)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Địa chỉ giao hàng */}
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Địa chỉ giao hàng
                </h3>
                <p className="text-sm text-gray-700">
                  {selectedOrder.dia_chi_giao_hang || "Chưa có địa chỉ"}
                </p>
                {selectedOrder.ghi_chu && (
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Ghi chú:</span>{" "}
                    {selectedOrder.ghi_chu}
                  </p>
                )}
              </div>

              {/* Danh sách sản phẩm */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Sản phẩm đã đặt
                </h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">
                          Sản phẩm
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">
                          Đơn giá
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">
                          SL
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-700">
                          Thành tiền
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {selectedOrder.chi_tiet.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              {item.hinh_anh && (
                                <img
                                  src={item.hinh_anh}
                                  alt={item.ten_san_pham}
                                  className="w-12 h-12 object-cover rounded"
                                />
                              )}
                              <div>
                                <p className="font-medium text-sm">
                                  {item.ten_san_pham}
                                </p>
                                <p className="text-xs text-gray-500">
                                  Mã: {item.ma_san_pham}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right text-sm">
                            {formatCurrency(item.gia)}
                          </td>
                          <td className="px-4 py-3 text-right text-sm">
                            {item.so_luong}
                          </td>
                          <td className="px-4 py-3 text-right font-medium text-sm">
                            {formatCurrency(item.thanh_tien)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td
                          colspan="3"
                          className="px-4 py-3 text-right font-bold"
                        >
                          TỔNG CỘNG:
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-lg text-blue-600">
                          {formatCurrency(selectedOrder.tong_tien)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Cập nhật trạng thái */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Cập nhật trạng thái
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {selectedOrder.trang_thai === "đang xử lý" && (
                    <button
                      onClick={() =>
                        handleUpdateStatus(selectedOrder._id, "đang giao")
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                    >
                      <Truck size={18} />
                      Chuyển sang Đang giao
                    </button>
                  )}
                  {selectedOrder.trang_thai === "đang giao" && (
                    <button
                      onClick={() =>
                        handleUpdateStatus(selectedOrder._id, "giao thành công")
                      }
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                    >
                      <CheckCircle size={18} />
                      Chuyển sang Giao thành công
                    </button>
                  )}
                  {selectedOrder.trang_thai === "giao thành công" && (
                    <p className="text-green-600 font-medium flex items-center gap-2">
                      <CheckCircle size={18} />
                      Đơn hàng đã hoàn thành
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => handleExportInvoice(selectedOrder)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                >
                  <FileText size={18} />
                  Xuất hóa đơn
                </button>
                <button
                  onClick={() => handleDeleteOrder(selectedOrder._id)}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                >
                  <Trash2 size={18} />
                  Xóa đơn hàng
                </button>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagementPage;
