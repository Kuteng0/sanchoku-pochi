// フッターコンポーネント
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* ブランド */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-2xl">🥬</span>
              <span className="text-lg font-bold text-white">産直ポチ</span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              全国各地の生産者から<br />
              新鮮な野菜・果物を産地直送で<br />
              お届けします。
            </p>
          </div>

          {/* ナビゲーション */}
          <div>
            <h4 className="font-medium text-white mb-3 text-sm">商品を探す</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products?type=野菜" className="hover:text-white transition-colors">野菜</Link></li>
              <li><Link href="/products?type=果物" className="hover:text-white transition-colors">果物</Link></li>
              <li><Link href="/products?type=米" className="hover:text-white transition-colors">お米</Link></li>
              <li><Link href="/products?type=卵・乳製品" className="hover:text-white transition-colors">卵・乳製品</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">すべての商品</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-3 text-sm">ご利用ガイド</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/mypage" className="hover:text-white transition-colors">マイページ</Link></li>
              <li><Link href="/orders" className="hover:text-white transition-colors">注文履歴</Link></li>
              <li><button className="hover:text-white transition-colors">よくある質問</button></li>
              <li><button className="hover:text-white transition-colors">お問い合わせ</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-white mb-3 text-sm">規約</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="hover:text-white transition-colors">利用規約</button></li>
              <li><button className="hover:text-white transition-colors">プライバシーポリシー</button></li>
              <li><button className="hover:text-white transition-colors">特定商取引法に基づく表記</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-700 mt-8 pt-6 text-center text-xs text-stone-500">
          <p>&copy; {new Date().getFullYear()} 産直ポチ All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
