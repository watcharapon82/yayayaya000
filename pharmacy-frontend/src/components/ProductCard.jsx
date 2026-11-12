import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function ProductCard({ product }) {
  const { addToCart } = useAuth();
  const inStock = product.stock > 0;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
      <img
        src={product.image_url || 'https://placehold.co/400x300/e2e8f0/1e293b?text=Medicine'}
        alt={product.name}
        className="w-full h-44 object-cover bg-slate-100"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
            {product.category_name || 'ยาสามัญ'}
          </span>
          <Link to={`/products/${product.id}`}>
            <h3 className="mt-2 font-bold text-slate-800 hover:text-emerald-700 line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {product.description || 'ไม่มีคำอธิบายเพิ่มเติม'}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-emerald-700">฿{Number(product.price).toLocaleString()}</p>
            <p className="text-[11px] text-slate-400">คงเหลือ {product.stock} ชิ้น</p>
          </div>
          <button
            disabled={!inStock}
            onClick={() => addToCart(product)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              inStock
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {inStock ? '+ ใส่ตะกร้า' : 'สินค้าหมด'}
          </button>
        </div>
      </div>
    </div>
  );
}
