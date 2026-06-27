// 注文カードコンポーネント
'use client';

import Link from 'next/link';
import { formatJPY, formatDateJP, getOrderStatusColor, getOrderStatusLabel } from '@/lib/utils';
import type { Order } from '@/types';

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="card p-4 md:p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-stone-500">注文番号</p>
          <p className="text-sm font-bold text-stone-800">#{order.orderNumber}</p>
        </div>
        <span className={`badge ${getOrderStatusColor(order.status)}`}>
          {getOrderStatusLabel(order.status)}
        </span>
      </div>

      <div className="border-t border-stone-100 pt-3 space-y-2">
        {order.lineItems.slice(0, 3).map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className="w-12 h-12 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
              {item.image ? (
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-stone-800 truncate">{item.title}</p>
              <p className="text-xs text-stone-400">{item.variantTitle} × {item.quantity}</p>
            </div>
          </div>
        ))}
        {order.lineItems.length > 3 && (
          <p className="text-xs text-stone-400 pl-14">
            他 {order.lineItems.length - 3} 点
          </p>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-100">
        <div>
          <p className="text-xs text-stone-500">
            {formatDateJP(order.createdAt)}
          </p>
          {order.trackingInfo && (
            <p className="text-xs text-primary-600 mt-0.5">
              📦 {order.trackingInfo.carrier}: {order.trackingInfo.trackingNumber}
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-xs text-stone-400">合計</p>
          <p className="text-sm font-bold text-stone-900">
            {formatJPY(order.totalPrice.amount)}
          </p>
        </div>
      </div>

      <Link
        href={`/orders/${order.id}`}
        className="block mt-3 text-center text-sm text-primary-600 hover:text-primary-700 font-medium"
      >
        注文詳細を見る →
      </Link>
    </div>
  );
}
