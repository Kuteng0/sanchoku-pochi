// 注文履歴一覧ページ
'use client';

import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import OrderCard from '@/components/order/OrderCard';
import Link from 'next/link';
import type { Order } from '@/types';

// ダミー注文データ
const MOCK_ORDERS: Order[] = [
  {
    id: 'order-001', orderNumber: 20240601, status: '配達完了',
    totalPrice: { amount: '5460', currencyCode: 'JPY' },
    lineItems: [
      { title: '北海道産 グリーンアスパラガス 1kg', variantTitle: '2kg', quantity: 1, image: '', price: { amount: '3500', currencyCode: 'JPY' } },
      { title: '青森県産 サンふじりんご 5kg', variantTitle: '5kg', quantity: 1, image: '', price: { amount: '2980', currencyCode: 'JPY' } },
    ],
    createdAt: '2024-06-10T08:00:00Z',
    trackingInfo: { carrier: 'ヤマト運輸', trackingNumber: '1234-5678-9012', trackingUrl: 'https://track.yamato', status: '配達完了', estimatedDelivery: '2024-06-14' },
  },
  {
    id: 'order-002', orderNumber: 20240615, status: '発送済',
    totalPrice: { amount: '3980', currencyCode: 'JPY' },
    lineItems: [
      { title: '新潟県産 魚沼コシヒカリ 5kg', variantTitle: '5kg', quantity: 1, image: '', price: { amount: '3980', currencyCode: 'JPY' } },
    ],
    createdAt: '2024-06-15T12:00:00Z',
    trackingInfo: { carrier: '佐川急便', trackingNumber: '9876-5432-1098', trackingUrl: 'https://track.sagawa', status: '配送中', estimatedDelivery: '2024-06-20' },
  },
  {
    id: 'order-003', orderNumber: 20240620, status: '確認済',
    totalPrice: { amount: '11860', currencyCode: 'JPY' },
    lineItems: [
      { title: '長野県産 シャインマスカット 1房', variantTitle: '1房', quantity: 2, image: '', price: { amount: '4980', currencyCode: 'JPY' } },
      { title: '静岡県産 深蒸し茶 100g', variantTitle: '100g', quantity: 1, image: '', price: { amount: '1580', currencyCode: 'JPY' } },
    ],
    createdAt: '2024-06-20T15:30:00Z',
  },
];

export default function OrdersPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get('success');

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <span className="text-5xl">🔐</span>
        <p className="mt-4 text-stone-700 font-medium">注文履歴を見るにはログインが必要です</p>
        <Link href="/auth/signin" className="btn-primary mt-4 inline-block">ログインする</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
      <h1 className="text-xl md:text-2xl font-bold text-stone-800 mb-6">注文履歴</h1>

      {/* 注文完了通知 */}
      {isSuccess === 'true' && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="font-bold text-green-800">ご注文が完了しました！</p>
            <p className="text-sm text-green-600">確認メール / LINEメッセージをお送りしました。発送まで今しばらくお待ちください。</p>
          </div>
        </div>
      )}

      {/* 注文一覧 */}
      {MOCK_ORDERS.length > 0 ? (
        <div className="space-y-4">
          {MOCK_ORDERS.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <span className="text-5xl">📭</span>
          <p className="mt-4 text-stone-500">注文履歴がありません。</p>
          <Link href="/products" className="btn-primary mt-4 inline-block">商品を探す</Link>
        </div>
      )}
    </div>
  );
}
