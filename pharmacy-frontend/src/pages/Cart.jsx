import React from 'react';
import { useAuth } from '../auth/AuthContext';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useAuth();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    alert(`สั่งซื้อสำเร็จ! ยอดชำระทั้งหมด ฿${total.toLocaleString()}`);
    clearCart();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">ตะกร้าสินค้าของคุณ</h1>
      {cart.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border text-center text-slate-500">
          ยังไม่มีสินค้าในตะกร้า
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="divide-y">
            {cart.map((item) => (
              <div key={item.id} className="py-4 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-slate-800">{item.name}</h3>
                  <p className="text-sm text-slate-500">
                    ฿{item.price} x {item.qty} ชิ้น
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-emerald-700">
                    ฿{(item.price * item.qty).toLocaleString()}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    ลบ
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t flex justify-between items-center">
            <span className="text-lg font-bold">ยอดรวมทั้งสิ้น: ฿{total.toLocaleString()}</span>
            <button
              onClick={handleCheckout}
              className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-emerald-700"
            >
              ยืนยันการสั่งซื้อ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
