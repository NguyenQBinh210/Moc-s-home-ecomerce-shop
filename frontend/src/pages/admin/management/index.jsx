import React, { useState } from 'react';
import CategoryManager from './components/CategoryManager';
import SupplierManager from './components/SupplierManager';

const ManagementPage = () => {
  const [activeTab, setActiveTab] = useState('categories');

  const tabs = [
    { id: 'categories', name: 'Danh mục', component: CategoryManager },
    { id: 'suppliers', name: 'Nhà cung cấp', component: SupplierManager }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quản lý hệ thống</h1>
          <p className="text-gray-600">
            Quản lý danh mục sản phẩm và nhà cung cấp
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  );
};

export default ManagementPage;
