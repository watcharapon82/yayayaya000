const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || data?.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
  }

  return data;
}

export const loginUser = (credentials) =>
  apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify(credentials) });

export const registerUser = (userData) =>
  apiFetch('/api/auth/register', { method: 'POST', body: JSON.stringify(userData) });

export const getCategories = () => apiFetch('/api/categories');

export const getProducts = (search = '', categoryId = '') => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (categoryId) params.append('category_id', categoryId);
  return apiFetch(`/api/products?${params.toString()}`);
};

export const getProductById = (id) => apiFetch(`/api/products/${id}`);

export const createProduct = (productData) =>
  apiFetch('/api/products', { method: 'POST', body: JSON.stringify(productData) });

export const updateProduct = (id, productData) =>
  apiFetch(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(productData) });

export const deleteProduct = (id) =>
  apiFetch(`/api/products/${id}`, { method: 'DELETE' });
