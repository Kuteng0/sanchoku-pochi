// 商品カードコンポーネント
import Link from 'next/link';
import { formatJPY, getOriginIcon } from '@/lib/utils';

interface ProductCardProps {
  product: {
    id: string;
    handle: string;
    title: string;
    description?: string;
    images: { src: string; altText?: string | null }[];
    priceRange?: { minVariantPrice: { amount: string; currencyCode: string } };
    origin?: string;
    producer?: string;
    tags?: string[];
    availableForSale?: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.src || '';
  const price = product.priceRange?.minVariantPrice;

  return (
    <Link
      href={`/product/${product.handle}`}
      className="card overflow-hidden group block"
    >
      {/* 画像 */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.images?.[0]?.altText || product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* 産地タグ */}
        {product.origin && (
          <span className="absolute top-2 left-2 badge bg-white/90 text-stone-700 shadow-sm">
            {getOriginIcon(product.origin)} {product.origin}産
          </span>
        )}

        {/* 売切れ */}
        {product.availableForSale === false && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="badge bg-white text-stone-700 text-sm px-4 py-1.5 font-medium">
              売り切れ
            </span>
          </div>
        )}
      </div>

      {/* 情報 */}
      <div className="p-3 md:p-4">
        <h3 className="text-sm md:text-base font-bold text-stone-800 line-clamp-2 leading-snug">
          {product.title}
        </h3>

        {/* 生産者 */}
        {product.producer && (
          <p className="text-xs text-stone-500 mt-1 truncate">
            {product.producer}
          </p>
        )}

        {/* タグ */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {product.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="badge bg-primary-50 text-primary-700 text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* 価格 */}
        <div className="mt-3 flex items-baseline">
          {price ? (
            <>
              <span className="text-lg md:text-xl font-bold text-accent-600">
                {formatJPY(price.amount)}
              </span>
              <span className="text-xs text-stone-400 ml-1">(税込)</span>
            </>
          ) : (
            <span className="text-sm text-stone-400">価格未定</span>
          )}
        </div>
      </div>
    </Link>
  );
}
