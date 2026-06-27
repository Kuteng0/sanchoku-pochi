// フィルターバーコンポーネント
'use client';

import { useFilterStore } from '@/hooks/useStore';

const ORIGINS = [
  '', '北海道', '青森', '岩手', '宮城', '秋田', '山形', '福島',
  '茨城', '栃木', '群馬', '埼玉', '千葉', '東京', '神奈川',
  '新潟', '富山', '石川', '福井', '山梨', '長野', '岐阜',
  '静岡', '愛知', '三重', '滋賀', '京都', '大阪', '兵庫',
  '奈良', '和歌山', '鳥取', '島根', '岡山', '広島', '山口',
  '徳島', '香川', '愛媛', '高知', '福岡', '佐賀', '長崎',
  '熊本', '大分', '宮崎', '鹿児島', '沖縄',
];

const SORT_OPTIONS = [
  { value: 'recommended', label: 'おすすめ順' },
  { value: 'price_asc', label: '価格が安い順' },
  { value: 'price_desc', label: '価格が高い順' },
  { value: 'newest', label: '新着順' },
];

export default function FilterBar() {
  const {
    selectedOrigin,
    setSelectedOrigin,
    sortBy,
    setSortBy,
    resetFilters,
  } = useFilterStore();

  return (
    <div className="bg-white border-b border-stone-200 sticky top-14 md:top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-1 scrollbar-none">
          {/* 産地フィルター */}
          <select
            value={selectedOrigin}
            onChange={(e) => setSelectedOrigin(e.target.value)}
            className="flex-shrink-0 text-xs md:text-sm px-3 py-1.5 rounded-full border border-stone-300 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer"
          >
            <option value="">🌏 すべての産地</option>
            {ORIGINS.filter(Boolean).map((origin) => (
              <option key={origin} value={origin}>{origin}</option>
            ))}
          </select>

          {/* 並び替え */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex-shrink-0 text-xs md:text-sm px-3 py-1.5 rounded-full border border-stone-300 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          {/* リセット */}
          {(selectedOrigin || sortBy !== 'recommended') && (
            <button
              onClick={resetFilters}
              className="flex-shrink-0 text-xs md:text-sm px-3 py-1.5 rounded-full text-stone-500 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              リセット
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
