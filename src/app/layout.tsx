// アプリケーションルートレイアウト
import type { Metadata, Viewport } from 'next';
import Providers from '@/components/ui/Providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '産直マルシェ - 全国各地の新鮮野菜・果物を産地直送',
    template: '%s | 産直マルシェ',
  },
  description:
    '日本全国の生産者から新鮮な野菜・果物を産地直送でお届けする予約販売サービス「産直マルシェ」。旬の食材を産地から直接ご自宅へ。',
  keywords: ['産直マルシェ', '産直', '野菜', '果物', '予約販売', '産地直送', 'オーガニック', '新鮮'],
  authors: [{ name: '産直マルシェ' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#16a34a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {/* LINE LIFF SDK */}
        <script
          charSet="utf-8"
          src="https://static.line-scdn.net/liff/edge/2/sdk.js"
          async
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
