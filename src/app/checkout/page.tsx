// チェックアウト（注文確認）ページ
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCartStore } from '@/hooks/useStore';
import { formatJPY, formatDateJP } from '@/lib/utils';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, itemCount, clearCart } = useCartStore();
  const [shippingInfo, setShippingInfo] = useState({
    lastName: '', firstName: '',
    zip: '', province: '', city: '', address1: '', address2: '',
    phone: '', email: '',
  });
  const [deliveryDate, setDeliveryDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [submitting, setSubmitting] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const shipping = subtotal >= 5000 ? 0 : 880;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // 実際はShopify Checkout APIを呼び出す
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    router.push('/orders?success=true');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <span className="text-5xl">📋</span>
        <p className="mt-4 text-stone-500">カートが空です。</p>
        <Link href="/products" className="btn-primary mt-4 inline-block">商品を探す</Link>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <span className="text-5xl">🔐</span>
        <p className="mt-4 text-stone-700 font-medium">ご注文にはログインが必要です</p>
        <Link href="/auth/signin" className="btn-primary mt-4 inline-block">ログインする</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-10">
      <h1 className="text-xl md:text-2xl font-bold text-stone-800 mb-6">ご注文手続き</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 左：配送先・支払い */}
          <div className="lg:col-span-2 space-y-6">
            {/* 配送先 */}
            <div className="card p-5 md:p-6">
              <h2 className="font-bold text-stone-800 mb-4">📍 お届け先</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-stone-600 block mb-1">姓 <span className="text-red-500">*</span></label>
                  <input type="text" required className="input-field" value={shippingInfo.lastName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm text-stone-600 block mb-1">名 <span className="text-red-500">*</span></label>
                  <input type="text" required className="input-field" value={shippingInfo.firstName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm text-stone-600 block mb-1">郵便番号 <span className="text-red-500">*</span></label>
                  <input type="text" required className="input-field" placeholder="123-4567" value={shippingInfo.zip}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm text-stone-600 block mb-1">都道府県 <span className="text-red-500">*</span></label>
                  <select required className="input-field" value={shippingInfo.province}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, province: e.target.value })}>
                    <option value="">選択してください</option>
                    {['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'].map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-sm text-stone-600 block mb-1">市区町村・番地 <span className="text-red-500">*</span></label>
                  <input type="text" required className="input-field" value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })} />
                </div>
                <div className="col-span-2">
                  <label className="text-sm text-stone-600 block mb-1">建物名・部屋番号</label>
                  <input type="text" className="input-field" value={shippingInfo.address1}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address1: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm text-stone-600 block mb-1">電話番号 <span className="text-red-500">*</span></label>
                  <input type="tel" required className="input-field" value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm text-stone-600 block mb-1">メールアドレス <span className="text-red-500">*</span></label>
                  <input type="email" required className="input-field" value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })} />
                </div>
              </div>
            </div>

            {/* お届け日時 */}
            <div className="card p-5 md:p-6">
              <h2 className="font-bold text-stone-800 mb-4">📅 お届け希望日</h2>
              <input type="date" className="input-field max-w-xs" value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)} />
              <p className="text-xs text-stone-400 mt-2">※ 天候や収穫状況によりご希望に沿えない場合がございます。</p>
            </div>

            {/* お支払い方法 */}
            <div className="card p-5 md:p-6">
              <h2 className="font-bold text-stone-800 mb-4">💳 お支払い方法</h2>
              <div className="space-y-3">
                {[
                  { value: 'credit_card', label: 'クレジットカード（Visa/Mastercard/JCB/AMEX）' },
                  { value: 'convenience', label: 'コンビニ決済' },
                  { value: 'paypay', label: 'PayPay' },
                  { value: 'line_pay', label: 'LINE Pay' },
                  { value: 'cod', label: '代金引換（手数料330円）' },
                ].map((method) => (
                  <label key={method.value} className="flex items-center gap-3 p-3 border border-stone-200 rounded-lg cursor-pointer hover:border-primary-300 transition-colors">
                    <input type="radio" name="payment" value={method.value} checked={paymentMethod === method.value}
                      onChange={(e) => setPaymentMethod(e.target.value)} className="accent-primary-600" />
                    <span className="text-sm text-stone-700">{method.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 右：注文サマリー */}
          <div className="lg:col-span-1">
            <div className="card p-5 sticky top-24">
              <h2 className="font-bold text-stone-800 mb-4">ご注文内容</h2>

              {/* 商品一覧（簡易） */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.variantId} className="flex justify-between text-sm">
                    <span className="text-stone-700 truncate flex-1 mr-2">{item.title}</span>
                    <span className="text-stone-500 flex-shrink-0">×{item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-200 pt-3 space-y-2 text-sm">
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
                {paymentMethod === 'cod' && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">代引手数料</span>
                    <span className="text-stone-800">{formatJPY(330)}</span>
                  </div>
                )}
                <div className="border-t border-stone-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-stone-800">合計（税込）</span>
                    <span className="text-xl font-bold text-accent-600">
                      {formatJPY(total + (paymentMethod === 'cod' ? 330 : 0))}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full mt-5 py-3 text-base disabled:opacity-60"
              >
                {submitting ? '処理中...' : '注文を確定する'}
              </button>

              <p className="text-xs text-stone-400 mt-3 text-center leading-relaxed">
                注文確定後、ご登録のLINEまたはメールに確認メッセージをお送りします。
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
