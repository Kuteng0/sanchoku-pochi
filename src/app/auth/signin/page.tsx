// ログインページ
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SignInPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const [loading, setLoading] = useState<string | null>(null);

  const handleSignIn = async (provider: string) => {
    setLoading(provider);
    await signIn(provider, { callbackUrl: '/mypage' });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-5xl">🥬</span>
          <h1 className="text-2xl font-bold text-stone-800 mt-4">産直ポチへようこそ</h1>
          <p className="text-stone-500 mt-2 text-sm">
            ログインして産地直送の新鮮食材を予約しよう
          </p>
        </div>

        {/* エラー表示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-sm text-red-700">
            {error === 'OAuthSignin' && 'ログイン処理を開始できませんでした。'}
            {error === 'OAuthCallback' && 'ログインに失敗しました。もう一度お試しください。'}
            {error === 'AccessDenied' && 'アクセスが拒否されました。'}
            {!['OAuthSignin', 'OAuthCallback', 'AccessDenied'].includes(error) && 'ログイン中にエラーが発生しました。'}
          </div>
        )}

        <div className="space-y-3">
          {/* Google ログイン */}
          <button
            onClick={() => handleSignIn('google')}
            disabled={loading !== null}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border border-stone-300 rounded-xl bg-white hover:bg-stone-50 transition-colors disabled:opacity-50"
          >
            {loading === 'google' ? (
              <span className="text-sm text-stone-500">接続中...</span>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-medium text-stone-700">Googleでログイン</span>
              </>
            )}
          </button>

          {/* LINE ログイン */}
          <button
            onClick={() => handleSignIn('line')}
            disabled={loading !== null}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-[#06C755] hover:bg-[#05b84d] transition-colors disabled:opacity-50 text-white"
          >
            {loading === 'line' ? (
              <span className="text-sm">接続中...</span>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.364 10.162c0-3.992-4.005-7.229-8.944-7.229s-8.944 3.237-8.944 7.229c0 3.573 3.17 6.566 7.45 7.132.29.063.685.192.785.44.09.226.059.58.029.807l-.125.757c-.037.222-.173.868.758.473.932-.395 5.024-2.956 6.856-5.063 1.264-1.411 2.135-2.944 2.135-4.546z"/>
                </svg>
                <span className="font-medium">LINEでログイン</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-stone-400 text-center mt-8 leading-relaxed">
          ログインすることで、<button className="underline">利用規約</button>および<button className="underline">プライバシーポリシー</button>に同意したものとみなします。
        </p>
      </div>
    </div>
  );
}
