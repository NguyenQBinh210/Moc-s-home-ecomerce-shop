import React from 'react';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  DollarSign,
  TrendingUp,
  BarChart3
} from 'lucide-react';

const AdminHome = () => {
  const stats = [
    {
      title: 'Tổng sản phẩm',
      value: '1,234',
      change: '+12%',
      changeType: 'positive',
      icon: Package,
      color: 'blue'
    },
    {
      title: 'Đơn hàng hôm nay',
      value: '89',
      change: '+5%',
      changeType: 'positive',
      icon: ShoppingBag,
      color: 'green'
    },
    {
      title: 'Khách hàng mới',
      value: '45',
      change: '+8%',
      changeType: 'positive',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Doanh thu tháng',
      value: '2.5M VNĐ',
      change: '+15%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'amber'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Chào mừng bạn đến với trang quản trị Moc's Home</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <p className={`text-sm mt-1 ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change} so với tháng trước
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    stat.color === 'blue' ? 'bg-blue-100' :
                    stat.color === 'green' ? 'bg-green-100' :
                    stat.color === 'purple' ? 'bg-purple-100' :
                    'bg-amber-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      stat.color === 'blue' ? 'text-blue-600' :
                      stat.color === 'green' ? 'text-green-600' :
                      stat.color === 'purple' ? 'text-purple-600' :
                      'text-amber-600'
                    }`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Package className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="font-medium text-gray-900">Quản lý sản phẩm</p>
                  <p className="text-sm text-gray-500">Thêm, sửa, xóa sản phẩm</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <ShoppingBag className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Quản lý đơn hàng</p>
                  <p className="text-sm text-gray-500">Xem và xử lý đơn hàng</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Báo cáo doanh thu</p>
                  <p className="text-sm text-gray-500">Xem thống kê và báo cáo</p>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Đơn hàng mới #1234</p>
                  <p className="text-xs text-gray-500">5 phút trước</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Sản phẩm mới được thêm</p>
                  <p className="text-xs text-gray-500">1 giờ trước</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Cập nhật tồn kho</p>
                  <p className="text-xs text-gray-500">2 giờ trước</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
