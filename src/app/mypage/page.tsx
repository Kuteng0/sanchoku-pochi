// マイページ
'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function MyPage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <span className="text-5xl">🔐</span>
        <p className="mt-4 text-stone-700 font-medium">マイページを見るにはログインが必要です</p>
        <Link href="/auth/signin" className="btn-primary mt-4 inline-block">ログインする</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
      <h1 className="text-xl md:text-2xl font-bold text-stone-800 mb-6">マイページ</h1>

      {/* ユーザー情報 */}
      <div className="card p-5 md:p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-2xl">
            {session.user?.image ? (
              <img src={session.user.image} alt="" className="w-full h-full rounded-full object-cover" />
            ) : (
              '👤'
            )}
          </div>
          <div>
            <p className="font-bold text-stone-800 text-lg">{session.user?.name || 'ユーザー'}</p>
            <p className="text-sm text-stone-500">{session.user?.email || ''}</p>
            <p className="text-xs text-stone-400 mt-0.5">
              {(session.user as any)?.provider === 'line' ? 'LINEでログイン中' : 'Googleでログイン中'}
            </p>
          </div>
        </div>
      </div>

      {/* メニュー */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link href="/orders" className="card p-5 hover:border-primary-300 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📋</span>
            <div>
              <p className="font-bold text-stone-800">注文履歴</p>
              <p className="text-sm text-stone-500">過去のご注文・配送状況を確認</p>
            </div>
          </div>
        </Link>

        <div className="card p-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏠</span>
            <div>
              <p className="font-bold text-stone-800">お届け先住所</p>
              <p className="text-sm text-stone-500">配送先の登録・変更</p>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">💬</span>
            <div>
              <p className="font-bold text-stone-800">LINE通知設定</p>
              <p className="text-sm text-stone-500">注文・配送の通知を受け取る</p>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">❤️</span>
            <div>
              <p className="font-bold text-stone-800">お気に入り</p>
              <p className="text-sm text-stone-500">生産者・商品をお気に入り登録</p>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">❓</span>
            <div>
              <p className="font-bold text-stone-800">よくある質問</p>
              <p className="text-sm text-stone-500">配送・返品・支払いについて</p>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📧</span>
            <div>
              <p className="font-bold text-stone-800">お問い合わせ</p>
              <p className="text-sm text-stone-500">ご不明点はこちらから</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
