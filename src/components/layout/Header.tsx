// ヘッダーコンポーネント
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/hooks/useStore';
import { useFilterStore } from '@/hooks/useStore';

export default function Header() {
  const { data: session } = useSession();
  const { itemCount, openCart } = useCartStore();
  const { searchQuery, setSearchQuery } = useFilterStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-stone-200">
      {/* 上部バー */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* ロゴ */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-2xl">🥬</span>
            <span className="text-lg md:text-xl font-bold text-primary-700 tracking-tight">
              産直ポチ
            </span>
          </Link>

          {/* 検索バー（デスクトップ） */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="野菜・果物・産地を検索..."
                className="input-field pl-10 py-2 text-sm"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* 右側ナビ */}
          <div className="flex items-center space-x-3">
            {/* カート */}
            <button
              onClick={openCart}
              className="relative p-2 rounded-lg hover:bg-stone-100 transition-colors"
              aria-label="カートを開く"
            >
              <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </button>

            {/* ユーザーメニュー（デスクトップ） */}
            <div className="hidden md:flex items-center space-x-2">
              {session ? (
                <>
                  <Link href="/mypage" className="btn-secondary text-sm py-1.5 px-4">
                    マイページ
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="text-sm text-stone-500 hover:text-stone-700 py-1.5 px-2"
                  >
                    ログアウト
                  </button>
                </>
              ) : (
                <Link href="/auth/signin" className="btn-primary text-sm py-1.5 px-4">
                  ログイン
                </Link>
              )}
            </div>

            {/* モバイルメニューボタン */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-stone-100"
            >
              <svg className="w-6 h-6 text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* モバイル検索 + メニュー */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white px-4 py-3 space-y-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="野菜・果物・産地を検索..."
              className="input-field pl-10 py-2 text-sm"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {session ? (
            <>
              <Link href="/mypage" className="block py-2 text-stone-700" onClick={() => setMobileMenuOpen(false)}>
                マイページ
              </Link>
              <button
                onClick={() => { signOut(); setMobileMenuOpen(false); }}
                className="block py-2 text-stone-500 w-full text-left"
              >
                ログアウト
              </button>
            </>
          ) : (
            <Link href="/auth/signin" className="block btn-primary text-center" onClick={() => setMobileMenuOpen(false)}>
              ログイン
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
