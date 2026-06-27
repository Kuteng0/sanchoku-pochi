// 商品詳細ページ [handle]
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useCartStore } from '@/hooks/useStore';
import { formatJPY, getOriginIcon } from '@/lib/utils';
import Link from 'next/link';

// 簡易ダミーデータ
const SAMPLE_PRODUCT: any = {
  id: '1', handle: 'hokkaido-aspara', title: '北海道産 グリーンアスパラガス 1kg',
  descriptionHtml: '<p>北海道の広大な大地で、有機肥料のみを使用して育てたグリーンアスパラガスです。朝採りしたての新鮮なものを産地直送でお届けします。甘みが強く生でも美味しく召し上がれます。</p><p>生産者：佐藤農園「一本一本手作業で丁寧に収穫しています。春の息吹を感じる旬の味わいをお楽しみください。」</p>',
  images: [{ src: '', altText: '北海道産グリーンアスパラガス' }],
  variants: [
    { id: 'var-1-1', title: '1kg', availableForSale: true, price: { amount: '1980', currencyCode: 'JPY' } },
    { id: 'var-1-2', title: '2kg', availableForSale: true, price: { amount: '3500', currencyCode: 'JPY' } },
    { id: 'var-1-3', title: '3kg（お得用）', availableForSale: true, price: { amount: '4800', currencyCode: 'JPY' } },
  ],
  origin: '北海道', producer: '佐藤農園', tags: ['有機栽培', '朝採り', '旬'], availableForSale: true,
};

export default function ProductDetailPage() {
  const params = useParams();
  const product = SAMPLE_PRODUCT; // 実際は params.handle でAPI取得
  const { addItem, openCart } = useCartStore();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: `${selectedVariant.id}-${Date.now()}`,
      variantId: selectedVariant.id,
      productId: product.id,
      title: product.title,
      variantTitle: selectedVariant.title,
      image: product.images[0]?.src || '',
      quantity,
      price: selectedVariant.price.amount,
      unit: selectedVariant.title,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    openCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
      {/* パンくず */}
      <nav className="text-xs md:text-sm text-stone-400 mb-6">
        <Link href="/" className="hover:text-stone-600">ホーム</Link>
        <span className="mx-2">›</span>
        <Link href="/products" className="hover:text-stone-600">商品一覧</Link>
        <span className="mx-2">›</span>
        <span className="text-stone-600">{product.title}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* 商品画像 */}
        <div className="aspect-square bg-stone-100 rounded-2xl overflow-hidden flex items-center justify-center">
          {product.images[0]?.src ? (
            <img src={product.images[0].src} alt={product.title} className="w-full h-full object-cover" />
          ) : (
            <div className="text-center text-stone-300">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-2 text-sm">商品画像</p>
            </div>
          )}
        </div>

        {/* 商品情報 */}
        <div>
          {/* 産地・生産者 */}
          <div className="flex items-center gap-2 mb-2">
            {product.origin && (
              <span className="badge bg-stone-100 text-stone-600 text-xs">
                {getOriginIcon(product.origin)} {product.origin}産
              </span>
            )}
            {product.tags?.map((tag: string) => (
              <span key={tag} className="badge bg-primary-50 text-primary-700 text-xs">{tag}</span>
            ))}
          </div>

          <h1 className="text-xl md:text-2xl font-bold text-stone-800 leading-snug">{product.title}</h1>
          {product.producer && (
            <p className="text-sm text-stone-500 mt-1">生産者: {product.producer}</p>
          )}

          {/* 価格 */}
          <div className="mt-5 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-accent-600">
              {formatJPY(selectedVariant.price.amount)}
            </span>
            <span className="text-sm text-stone-400">(税込)</span>
          </div>

          {/* バリエーション選択 */}
          <div className="mt-6">
            <p className="text-sm font-medium text-stone-700 mb-3">サイズ・量</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v: any) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  disabled={!v.availableForSale}
                  className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                    selectedVariant.id === v.id
                      ? 'border-primary-500 bg-primary-50 text-primary-700 font-medium'
                      : 'border-stone-300 text-stone-600 hover:border-stone-400'
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  {v.title}
                </button>
              ))}
            </div>
          </div>

          {/* 数量 */}
          <div className="mt-6">
            <p className="text-sm font-medium text-stone-700 mb-3">数量</p>
            <div className="flex items-center border border-stone-300 rounded-lg w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-l-lg transition-colors text-lg"
              >−</button>
              <span className="px-6 py-2 font-medium text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(99, quantity + 1))}
                className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-r-lg transition-colors text-lg"
              >+</button>
            </div>
          </div>

          {/* カートに入れる */}
          <button
            onClick={handleAddToCart}
            disabled={!product.availableForSale}
            className="btn-primary w-full mt-8 py-3.5 text-base"
          >
            {added ? '✓ カートに追加しました' : 'カートに入れる'}
          </button>

          {/* 商品説明 */}
          <div className="mt-8 border-t border-stone-200 pt-6">
            <h3 className="font-bold text-stone-800 mb-3">商品説明</h3>
            <div
              className="text-sm text-stone-600 leading-relaxed space-y-3"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>

          {/* 配送・返品 */}
          <div className="mt-6 bg-stone-50 rounded-xl p-4 space-y-2 text-sm text-stone-600">
            <p>🚚 <span className="font-medium">配送</span>: 全国一律 880円（税込）/ 5,000円以上で送料無料</p>
            <p>⏱ <span className="font-medium">お届け</span>: ご注文から 2〜5 営業日で発送</p>
            <p>🔄 <span className="font-medium">返品</span>: 商品到着後7日以内・未開封に限り返品可能</p>
          </div>
        </div>
      </div>
    </div>
  );
}
