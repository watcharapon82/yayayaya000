import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, deleteProduct, getCategories } from '../../api/backend';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    image_url: '',
  });

  const loadData = async () => {
    const [prodData, catData] = await Promise.all([getProducts(), getCategories()]);
    setProducts(Array.isArray(prodData) ? prodData : prodData?.products || []);
    setCategories(Array.isArray(catData) ? catData : catData?.categories || []);
  };

  useEffect(() => {
    loadData().catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
        category_id: parseInt(form.category_id, 10) || 1,
      });
      setForm({ name: '', description: '', price: '', stock: '', category_id: '', image_url: '' });
      loadData();
      alert('เพิ่มรายการยาสำเร็จ');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('ยืนยันการลบรายการยานี้?')) return;
    try {
      await deleteProduct(id);
      loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">จัดการคลังยา (Admin)</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          required
          placeholder="ชื่อยา"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded text-sm"
        />
        <select
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          className="border p-2 rounded text-sm bg-white"
        >
          <option value="">เลือกหมวดหมู่</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input
          required
          type="number"
          placeholder="ราคา (บาท)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 rounded text-sm"
        />
        <input
          required
          type="number"
          placeholder="จำนวนสต็อก"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          className="border p-2 rounded text-sm"
        />
        <input
          placeholder="URL รูปภาพ"
          value={form.image_url}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          className="border p-2 rounded text-sm"
        />
        <input
          placeholder="คำอธิบาย / วิธีใช้"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded text-sm"
        />
        <button type="submit" className="md:col-span-3 bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700">
          + เพิ่มรายการยาใหม่
        </button>
      </form>

      <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-3">ชื่อยา</th>
              <th className="p-3">ราคา</th>
              <th className="p-3">สต็อก</th>
              <th className="p-3 text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-slate-50">
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">฿{p.price}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:underline font-medium"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
