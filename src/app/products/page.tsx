// 商品一覧ページ
'use client';

import { useState, useEffect } from 'react';
import { useFilterStore } from '@/hooks/useStore';
import ProductCard from '@/components/product/ProductCard';
import FilterBar from '@/components/product/FilterBar';

// ダミーデータ（実際はShopify APIから取得）
const ALL_PRODUCTS = [
  { id: '1', handle: 'hokkaido-aspara', title: '北海道産 グリーンアスパラガス 1kg', images: [{ src: '' }], priceRange: { minVariantPrice: { amount: '1980', currencyCode: 'JPY' } }, origin: '北海道', producer: '佐藤農園', tags: ['有機栽培', '朝採り'], availableForSale: true },
  { id: '2', handle: 'aomori-apple', title: '青森県産 サンふじりんご 5kg', images: [{ src: '' }], priceRange: { minVariantPrice: { amount: '2980', currencyCode: 'JPY' } }, origin: '青森', producer: '弘前果樹園', tags: ['減農薬'], availableForSale: true },
  { id: '3', handle: 'wakayama-mikan', title: '和歌山県産 有田みかん 3kg', images: [{ src: '' }], priceRange: { minVariantPrice: { amount: '2480', currencyCode: 'JPY' } }, origin: '和歌山', producer: '有田みかん農家', tags: ['露地栽培', '完熟'], availableForSale: true },
  { id: '4', handle: 'niigata-koshihikari', title: '新潟県産 魚沼コシヒカリ 5kg', images: [{ src: '' }], priceRange: { minVariantPrice: { amount: '3980', currencyCode: 'JPY' } }, origin: '新潟', producer: '魚沼農産', tags: ['特別栽培米'], availableForSale: true },
  { id: '5', handle: 'nagano-grape', title: '長野県産 シャインマスカット 1房', images: [{ src: '' }], priceRange: { minVariantPrice: { amount: '4980', currencyCode: 'JPY' } }, origin: '長野', producer: '信州果樹園', tags: ['高級', 'ギフト'], availableForSale: true },
  { id: '6', handle: 'kumamoto-melon', title: '熊本県産 肥後グリーンメロン 1玉', images: [{ src: '' }], priceRange: { minVariantPrice: { amount: '3980', currencyCode: 'JPY' } }, origin: '熊本', producer: '熊本メロン研究会', tags: ['温室栽培'], availableForSale: true },
  { id: '7', handle: 'miyagi-strawberry', title: '宮城県産 もういっこいちご 2パック', images: [{ src: '' }], priceRange: { minVariantPrice: { amount: '1680', currencyCode: 'JPY' } }, origin: '宮城', producer: '仙台いちご園', tags: ['大粒'], availableForSale: true },
  { id: '8', handle: 'chiba-peanut', title: '千葉県産 落花生 煎り豆 500g', images: [{ src: '' }], priceRange: { minVariantPrice: { amount: '1280', currencyCode: 'JPY' } }, origin: '千葉', producer: '八街落花生農園', tags: ['伝統品種'], availableForSale: true },
  { id: '9', handle: 'ehime-mikan', title: '愛媛県産 せとか 2kg', images: [{ src: '' }], priceRange: { minVariantPrice: { amount: '3280', currencyCode: 'JPY' } }, origin: '愛媛', producer: '伊予柑農園', tags: ['柑橘の大トロ', '贈答用'], availableForSale: true },
  { id: '10', handle: 'shizuoka-tea', title: '静岡県産 深蒸し茶 100g', images: [{ src: '' }], priceRange: { minVariantPrice: { amount: '1580', currencyCode: 'JPY' } }, origin: '静岡', producer: '牧之原茶園', tags: ['一番茶', '手摘み'], availableForSale: true },
  { id: '11', handle: 'ibaraki-melon', title: '茨城県産 アンデスメロン 1玉', images: [{ src: '' }], priceRange: { minVariantPrice: { amount: '2480', currencyCode: 'JPY' } }, origin: '茨城', producer: '鉾田メロン組合', tags: ['温室栽培'], availableForSale: true },
  { id: '12', handle: 'fukushima-peach', title: '福島県産 あかつき桃 2kg', images: [{ src: '' }], priceRange: { minVariantPrice: { amount: '3980', currencyCode: 'JPY' } }, origin: '福島', producer: '福島桃生産組合', tags: ['完熟', '大玉'], availableForSale: true },
];

export default function ProductsPage() {
  const { searchQuery, selectedOrigin, sortBy } = useFilterStore();
  const [filtered, setFiltered] = useState(ALL_PRODUCTS);

  useEffect(() => {
    let result = [...ALL_PRODUCTS];

    // 検索フィルター
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.origin?.toLowerCase().includes(q) ||
          p.producer?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    // 産地フィルター
    if (selectedOrigin) {
      result = result.filter((p) => p.origin === selectedOrigin);
    }

    // 並び替え
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => parseFloat(a.priceRange.minVariantPrice.amount) - parseFloat(b.priceRange.minVariantPrice.amount));
        break;
      case 'price_desc':
        result.sort((a, b) => parseFloat(b.priceRange.minVariantPrice.amount) - parseFloat(a.priceRange.minVariantPrice.amount));
        break;
      default:
        break;
    }

    setFiltered(result);
  }, [searchQuery, selectedOrigin, sortBy]);

  return (
    <div>
      <FilterBar />
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* 結果件数 */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-stone-500">
            <span className="font-bold text-stone-800">{filtered.length}</span> 件の商品が見つかりました
          </p>
        </div>

        {/* 商品グリッド */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-5xl">🔍</span>
            <p className="mt-4 text-stone-500">該当する商品が見つかりませんでした。</p>
            <p className="text-sm text-stone-400 mt-1">
              検索条件を変更してお試しください。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
