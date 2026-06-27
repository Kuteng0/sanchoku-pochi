---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: 0dcf3ccd5bea460412b9d9b99b16b17c_a2a89033704b11f1986d525400d9a7a1
    ReservedCode1: lCRexcPCfDJFwTczo8OdjuAJ2OS4a67xTaSa9Z0j5b4Hf40wHJHsERR/9u6Xn/yMDTG0DPfaz1qJRjRR8avE0BDDRjDPGpn26ltdg9X5APu3w8e2t6A8eBX2acigEeMRZ1F3P/2NTxt+oydQiYShwC3aLc+yLNzdTHuyLx0DldQHcUnCdCuAvvwShzU=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: 0dcf3ccd5bea460412b9d9b99b16b17c_a2a89033704b11f1986d525400d9a7a1
    ReservedCode2: lCRexcPCfDJFwTczo8OdjuAJ2OS4a67xTaSa9Z0j5b4Hf40wHJHsERR/9u6Xn/yMDTG0DPfaz1qJRjRR8avE0BDDRjDPGpn26ltdg9X5APu3w8e2t6A8eBX2acigEeMRZ1F3P/2NTxt+oydQiYShwC3aLc+yLNzdTHuyLx0DldQHcUnCdCuAvvwShzU=
---

# 産直ポチ - 産地直送予約販売アプリ

全国各地の生産者から新鮮な野菜・果物を産地直送でお届けする予約販売Webアプリケーションです。

PC・スマートフォン・LINEアプリに対応した完全レスポンシブデザイン。日本語専用。

## 技術スタック

| カテゴリ | 技術 |
|---------|------|
| フレームワーク | Next.js 14 (App Router) + TypeScript |
| スタイリング | Tailwind CSS 3 |
| 認証 | NextAuth.js (Google OAuth + LINE Login) |
| EC/決済 | Shopify Storefront API |
| メッセージ通知 | LINE Messaging API |
| 状態管理 | Zustand |
| デプロイ | Cloudflare Pages |
| データベース | Cloudflare D1 (SQLite) |

## プロジェクト構成

```
sanchoku-pochi/
├── src/
│   ├── app/                    # ページ & API
│   │   ├── page.tsx            # トップページ
│   │   ├── layout.tsx          # ルートレイアウト
│   │   ├── globals.css         # グローバルCSS
│   │   ├── products/           # 商品一覧
│   │   ├── product/[handle]/   # 商品詳細
│   │   ├── cart/               # カート
│   │   ├── checkout/           # 注文手続き
│   │   ├── orders/             # 注文履歴
│   │   ├── mypage/             # マイページ
│   │   ├── auth/signin/        # ログイン
│   │   └── api/                # API ルート
│   │       ├── auth/[...nextauth]/
│   │       └── webhook/
│   │           ├── line/       # LINE Webhook
│   │           └── shopify/    # Shopify Webhook
│   ├── components/
│   │   ├── layout/             # Header, Footer
│   │   ├── product/            # ProductCard, FilterBar
│   │   ├── cart/               # CartDrawer
│   │   ├── order/              # OrderCard
│   │   └── ui/                 # Providers
│   ├── hooks/                  # Zustand Store
│   ├── lib/                    # ユーティリティ
│   │   ├── shopify.ts          # Shopify クライアント
│   │   ├── line.ts             # LINE API クライアント
│   │   ├── auth.ts             # 認証設定
│   │   └── utils.ts            # ヘルパー関数
│   └── types/                  # TypeScript 型定義
├── wrangler.toml               # Cloudflare 設定
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env.example
```

## 主要機能

- **商品検索・絞り込み**: 産地別フィルター、キーワード検索、並び替え
- **カート機能**: ドロワー式カート、数量変更、リアルタイム集計
- **予約注文**: お届け希望日指定、サイズ/数量選択
- **Google/Lineログイン**: OAuth 2.0 認証、JWTセッション管理
- **Shopify連携**: 商品管理・在庫・決済はShopifyが処理
- **LINE通知**: 注文確認、発送完了、予約リマインドをLINEにプッシュ通知
- **注文追跡**: 注文履歴、配送状況、追跡番号の確認
- **完全レスポンシブ**: PC/タブレット/スマホ/LINEアプリ対応

## セットアップ

### 1. 依存関係インストール

```bash
cd sanchoku-pochi
npm install
```

### 2. 環境変数設定

`.env.example` を `.env.local` にコピーし、各値を設定：

```bash
cp .env.example .env.local
```

必須の設定項目：
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - Google Cloud Console で取得
- `LINE_CLIENT_ID` / `LINE_CLIENT_SECRET` - LINE Developers で取得
- `LINE_CHANNEL_ACCESS_TOKEN` / `LINE_CHANNEL_SECRET` - LINE Messaging API
- `SHOPIFY_STORE_DOMAIN` / `SHOPIFY_STOREFRONT_ACCESS_TOKEN` - Shopify管理画面
- `NEXTAUTH_SECRET` - `openssl rand -base64 32` で生成

### 3. Shopify設定

1. Shopify管理画面で「販売チャネル」→「Headless」を有効化
2. Storefront API のアクセストークンを発行
3. Webhook設定: `注文作成` / `発送完了` を `/api/webhook/shopify` に設定

### 4. LINE設定

1. LINE Developers で LINE Login チャネル作成
2. Messaging API チャネル作成（通知用）
3. Webhook URL を `/api/webhook/line` に設定

### 5. Cloudflareデプロイ

```bash
# ビルド
npm run build

# Cloudflare Pages にデプロイ
npx wrangler pages deploy .vercel/output/static

# D1 データベース作成（初回のみ）
npx wrangler d1 create sanchoku-db

# シークレット設定
npx wrangler secret put GOOGLE_CLIENT_ID
npx wrangler secret put GOOGLE_CLIENT_SECRET
npx wrangler secret put LINE_CLIENT_ID
npx wrangler secret put LINE_CLIENT_SECRET
npx wrangler secret put LINE_CHANNEL_ACCESS_TOKEN
npx wrangler secret put SHOPIFY_STOREFRONT_ACCESS_TOKEN
npx wrangler secret put NEXTAUTH_SECRET
```

## 開発

```bash
npm run dev
```

http://localhost:3000 で開発サーバーが起動します。

## ライセンス

Private - All Rights Reserved
*（内容由AI生成，仅供参考）*
