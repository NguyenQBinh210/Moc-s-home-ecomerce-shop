const API_BASE_URL =  'http://localhost:3000';
// process.env.REACT_APP_API_URL ||
// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "gọi API thất bại");
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Categories API
export const categoriesAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/categories${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (id) => apiCall(`/categories/${id}`),
  
  create: (data) => apiCall('/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (id, data) => apiCall(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (id) => apiCall(`/categories/${id}`, {
    method: 'DELETE',
  }),
};

// Suppliers API
export const suppliersAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/suppliers${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (id) => apiCall(`/suppliers/${id}`),
  
  create: (data) => apiCall('/suppliers', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  update: (id, data) => apiCall(`/suppliers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (id) => apiCall(`/suppliers/${id}`, {
    method: 'DELETE',
  }),
};

// Products API
export const productsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/products${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (id) => apiCall(`/products/${id}`),
  
  create: (data) => {
    const formData = new FormData();
    
    // Thêm các trường text
    formData.append('ten_san_pham', data.ten_san_pham);
    formData.append('mo_ta', data.mo_ta || '');
    formData.append('gia', data.gia);
    formData.append('so_luong', data.so_luong);
    formData.append('trang_thai', data.trang_thai || 'còn hàng');
    if (data.ma_danh_muc) formData.append('ma_danh_muc', data.ma_danh_muc);
    if (data.ma_nha_cung_cap) formData.append('ma_nha_cung_cap', data.ma_nha_cung_cap);
    if (data._id) formData.append('_id', data._id);
    
    // Thêm ảnh
    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        if (image instanceof File) {
          formData.append('images', image);
        }
      });
    }
    
    return apiCall('/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData,
    });
  },
  
  update: (id, data) => {
    const formData = new FormData();
    
    // Thêm các trường text
    formData.append('ten_san_pham', data.ten_san_pham);
    formData.append('mo_ta', data.mo_ta || '');
    formData.append('gia', data.gia);
    formData.append('so_luong', data.so_luong);
    formData.append('trang_thai', data.trang_thai || 'còn hàng');
    if (data.ma_danh_muc) formData.append('ma_danh_muc', data.ma_danh_muc);
    if (data.ma_nha_cung_cap) formData.append('ma_nha_cung_cap', data.ma_nha_cung_cap);
    
    // Thêm ảnh mới
    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        if (image instanceof File) {
          formData.append('images', image);
        }
      });
    }
    
    return apiCall(`/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData,
    });
  },
  
  delete: (id) => apiCall(`/products/${id}`, {
    method: 'DELETE',
  }),
};

export default apiCall;
