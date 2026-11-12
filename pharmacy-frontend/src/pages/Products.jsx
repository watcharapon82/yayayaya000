import React, { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../api/backend';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(Array.isArray(data) ? data : data?.categories || []))
      .catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    getProducts(search, selectedCategory)
      .then((data) => setProducts(Array.isArray(data) ? data : data?.products || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold text-slate-800">รายการยาและเวชภัณฑ์</h1>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="ค้นหาชื่อยา หรืออาการ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-300 rounded-lg px-4 py-2 text-sm w-full md:w-64 focus:outline-emerald-600"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-emerald-600"
          >
            <option value="">ทุกหมวดหมู่</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-500">กำลังโหลดรายการยา...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-slate-500">ไม่พบรายการยาที่ค้นหา</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
