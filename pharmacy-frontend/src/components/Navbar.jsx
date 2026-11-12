import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Navbar() {
  const { user, logout, cart } = useAuth();
  const navigate = useNavigate();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-emerald-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-wide flex items-center gap-2">
          <span>💊</span> PharmaCare
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/products" className="hover:text-emerald-200">รายการยาทั้งหมด</Link>

          {user?.role === 'admin' && (
            <Link to="/admin/products" className="bg-amber-500 text-slate-900 px-3 py-1 rounded font-semibold">
              จัดการหลังร้าน
            </Link>
          )}

          <Link to="/cart" className="relative hover:text-emerald-200">
            ตะกร้าสินค้า
            {totalItems > 0 && (
              <span className="ml-1.5 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-emerald-100">สวัสดี, {user.username || user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-emerald-900 hover:bg-emerald-950 px-3 py-1.5 rounded text-xs"
              >
                ออกจากระบบ
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-white text-emerald-800 px-4 py-1.5 rounded font-semibold hover:bg-emerald-50">
              เข้าสู่ระบบ
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
