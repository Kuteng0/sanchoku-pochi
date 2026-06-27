// カートページ
'use client';

import Link from 'next/link';
import { useCartStore } from '@/hooks/useStore';
import { formatJPY } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, itemCount } = useCartStore();

  const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const shipping = subtotal >= 5000 ? 0 : 880;
  const total = subtotal + shipping;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
      <h1 className="text-xl md:text-2xl font-bold text-stone-800 mb-6">ショッピングカート</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl">🛒</span>
          <p className="mt-4 text-stone-500">カートに商品がありません。</p>
          <Link href="/products" className="btn-primary mt-6 inline-block">商品を探す</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 商品リスト */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.variantId} className="card p-4 flex gap-4">
                <div className="w-24 h-24 bg-stone-100 rounded-lg flex-shrink-0 overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-stone-800 truncate">{item.title}</p>
                  <p className="text-sm text-stone-500 mt-0.5">{item.variantTitle} / {item.unit}</p>
                  <p className="font-bold text-stone-900 mt-1">{formatJPY(item.price)}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-stone-300 rounded-lg">
                      <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="px-3 py-1 hover:bg-stone-100">−</button>
                      <span className="px-4 py-1 text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="px-3 py-1 hover:bg-stone-100">+</button>
                    </div>
                    <button onClick={() => removeItem(item.variantId)} className="text-sm text-red-500 hover:text-red-700">削除</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 注文サマリー */}
          <div className="lg:col-span-1">
            <div className="card p-5 sticky top-24">
              <h2 className="font-bold text-stone-800 mb-4">注文内容</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">商品点数</span>
                  <span className="text-stone-800">{itemCount}点</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">小計</span>
                  <span className="text-stone-800">{formatJPY(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">送料</span>
                  <span className="text-stone-800">{shipping === 0 ? '無料' : formatJPY(shipping)}</span>
                </div>
                <div className="border-t border-stone-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-stone-800">合計（税込）</span>
                    <span className="text-lg font-bold text-accent-600">{formatJPY(total)}</span>
                  </div>
                </div>
              </div>
              {subtotal < 5000 && subtotal > 0 && (
                <p className="text-xs text-stone-400 mt-3">
                  あと {formatJPY(5000 - subtotal)} で送料無料になります
                </p>
              )}
              <Link href="/checkout" className="btn-primary w-full mt-5 text-center block py-3">
                レジに進む
              </Link>
              <Link href="/products" className="block text-center text-sm text-primary-600 mt-3 hover:text-primary-700">
                買い物を続ける
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
