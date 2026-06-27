// トップページ (ホーム)
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';

// スタティックなダミーデータ（Shopify API未接続時のフォールバック）
const FEATURED_PRODUCTS = [
  {
    id: '1', handle: 'hokkaido-aspara', title: '北海道産 グリーンアスパラガス 1kg',
    description: '北海道の大地で育った、みずみずしく甘みのあるアスパラガス。',
    images: [{ src: '' }],
    priceRange: { minVariantPrice: { amount: '1980', currencyCode: 'JPY' } },
    origin: '北海道', producer: '佐藤農園', tags: ['有機栽培', '朝採り'],
    availableForSale: true,
  },
  {
    id: '2', handle: 'aomori-apple', title: '青森県産 サンふじりんご 5kg',
    description: '蜜入りで甘さ抜群のサンふじ。青森の寒暖差が生む絶品りんご。',
    images: [{ src: '' }],
    priceRange: { minVariantPrice: { amount: '2980', currencyCode: 'JPY' } },
    origin: '青森', producer: '弘前果樹園', tags: ['減農薬', '贈答用可'],
    availableForSale: true,
  },
  {
    id: '3', handle: 'wakayama-mikan', title: '和歌山県産 有田みかん 3kg',
    description: '温州みかんの最高峰。甘みと酸味のバランスが絶妙。',
    images: [{ src: '' }],
    priceRange: { minVariantPrice: { amount: '2480', currencyCode: 'JPY' } },
    origin: '和歌山', producer: '有田みかん農家', tags: ['露地栽培', '完熟'],
    availableForSale: true,
  },
  {
    id: '4', handle: 'niigata-koshihikari', title: '新潟県産 魚沼コシヒカリ 5kg',
    description: '日本一の米どころ魚沼産。ふっくら甘みのある最高級コシヒカリ。',
    images: [{ src: '' }],
    priceRange: { minVariantPrice: { amount: '3980', currencyCode: 'JPY' } },
    origin: '新潟', producer: '魚沼農産', tags: ['特別栽培米', '新米'],
    availableForSale: true,
  },
  {
    id: '5', handle: 'nagano-grape', title: '長野県産 シャインマスカット 1房',
    description: '種なし・皮ごと食べられる極甘ブドウ。贈答用に最適。',
    images: [{ src: '' }],
    priceRange: { minVariantPrice: { amount: '4980', currencyCode: 'JPY' } },
    origin: '長野', producer: '信州果樹園', tags: ['高級', 'ギフト対応'],
    availableForSale: true,
  },
  {
    id: '6', handle: 'kumamoto-melon', title: '熊本県産 肥後グリーンメロン 1玉',
    description: '肉厚でジューシー、とろける甘さの高級メロン。',
    images: [{ src: '' }],
    priceRange: { minVariantPrice: { amount: '3980', currencyCode: 'JPY' } },
    origin: '熊本', producer: '熊本メロン研究会', tags: ['温室栽培', '完熟出荷'],
    availableForSale: true,
  },
  {
    id: '7', handle: 'miyagi-strawberry', title: '宮城県産 もういっこいちご 2パック',
    description: '甘みと酸味のバランスが良く、大粒で食べ応え抜群。',
    images: [{ src: '' }],
    priceRange: { minVariantPrice: { amount: '1680', currencyCode: 'JPY' } },
    origin: '宮城', producer: '仙台いちご園', tags: ['朝採り', '大粒'],
    availableForSale: true,
  },
  {
    id: '8', handle: 'chiba-peanut', title: '千葉県産 落花生 煎り豆 500g',
    description: '香ばしく甘みの強い千葉半立種。おつまみに最適。',
    images: [{ src: '' }],
    priceRange: { minVariantPrice: { amount: '1280', currencyCode: 'JPY' } },
    origin: '千葉', producer: '八街落花生農園', tags: ['伝統品種', '手煎り'],
    availableForSale: true,
  },
];

const CATEGORIES = [
  { name: '野菜', icon: '🥬', href: '/products?type=野菜', desc: '旬の新鮮野菜' },
  { name: '果物', icon: '🍑', href: '/products?type=果物', desc: '産地直送フルーツ' },
  { name: 'お米', icon: '🍚', href: '/products?type=米', desc: 'ブランド米・特別栽培米' },
  { name: '卵・乳製品', icon: '🥚', href: '/products?type=卵・乳製品', desc: '放し飼い有精卵など' },
];

const FEATURES = [
  { icon: '🚜', title: '産地直送', desc: '生産者から直接お届け。中間マージンをカットし新鮮そのまま。' },
  { icon: '📅', title: '予約販売', desc: '収穫時期に合わせて予約。一番美味しいタイミングでお届け。' },
  { icon: '🔍', title: '生産者情報', desc: '誰がどこでどう育てたか。顔の見える生産者から安心の食材を。' },
  { icon: '📦', title: '追跡可能', desc: 'ご注文から配送まで、いつでもステータスを確認できます。' },
];

export default function HomePage() {
  return (
    <div>
      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
              産地の<span className="text-accent-300">「おいしい」</span>を、
              <br />
              あなたの食卓へ。
            </h1>
            <p className="mt-4 md:mt-6 text-base md:text-lg text-primary-100 leading-relaxed">
              全国各地のこだわり生産者が育てた
              <br className="md:hidden" />
              新鮮な野菜・果物を産地直送でお届け。
              <br />
              収穫時期に合わせた予約販売だから、一番美味しいタイミングで。
            </p>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/products" className="btn-primary bg-white text-primary-700 hover:bg-stone-50 text-center">
                商品を見る
              </Link>
              <Link href="/products" className="btn-secondary border-white/30 text-white hover:bg-white/10 text-center">
                生産者一覧
              </Link>
            </div>
          </div>
        </div>
        {/* 波線装飾 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 30C240 0 480 60 720 30S1200 0 1440 30V60H0V30Z" fill="#fafaf9" />
          </svg>
        </div>
      </section>

      {/* 特徴 */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="text-center p-4">
              <span className="text-3xl md:text-4xl">{f.icon}</span>
              <h3 className="mt-3 text-sm md:text-base font-bold text-stone-800">{f.title}</h3>
              <p className="mt-1 text-xs md:text-sm text-stone-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* カテゴリー */}
      <section className="bg-stone-100/80 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-stone-800 text-center mb-8">
            カテゴリーから探す
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="card p-4 md:p-6 text-center hover:border-primary-300 group"
              >
                <span className="text-4xl md:text-5xl">{cat.icon}</span>
                <h3 className="mt-3 font-bold text-stone-800 group-hover:text-primary-700 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs md:text-sm text-stone-500 mt-1">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* おすすめ商品 */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-stone-800">
            おすすめ商品
          </h2>
          <Link
            href="/products"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            すべて見る →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 生産者募集中 */}
      <section className="bg-stone-800 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-bold">生産者様へ</h2>
          <p className="mt-3 text-stone-300 max-w-xl mx-auto text-sm md:text-base">
            産直ポチでは、一緒に日本の美味しい食材を届ける生産者様を募集しています。
            あなたのこだわりの逸品を、全国のお客様へ。
          </p>
          <button className="btn-primary bg-white text-stone-800 hover:bg-stone-100 mt-6">
            出店について問い合わせる
          </button>
        </div>
      </section>
    </div>
  );
}
