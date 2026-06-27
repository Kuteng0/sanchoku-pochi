// 汎用ヘルパー関数

import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';

// 金額フォーマット（日本円）
export function formatJPY(amount: number | string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(num);
}

// 日付フォーマット（日本語）
export function formatDateJP(dateStr: string, pattern: string = 'yyyy年MM月dd日'): string {
  try {
    return format(parseISO(dateStr), pattern, { locale: ja });
  } catch {
    return dateStr;
  }
}

// 注文ステータス表示名
export function getOrderStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    '予約受付': '予約受付',
    '確認済': '確認済',
    '出荷準備中': '出荷準備中',
    '発送済': '発送済',
    '配達中': '配達中',
    '配達完了': '配達完了',
    'キャンセル': 'キャンセル',
  };
  return labels[status] || status;
}

// 注文ステータスカラー
export function getOrderStatusColor(status: string): string {
  const colors: Record<string, string> = {
    '予約受付': 'bg-blue-100 text-blue-800',
    '確認済': 'bg-indigo-100 text-indigo-800',
    '出荷準備中': 'bg-yellow-100 text-yellow-800',
    '発送済': 'bg-orange-100 text-orange-800',
    '配達中': 'bg-purple-100 text-purple-800',
    '配達完了': 'bg-green-100 text-green-800',
    'キャンセル': 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

// セッションストレージラッパー
export function getLocalCart(): { variantId: string; quantity: number }[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('sanchoku_pochicart');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function setLocalCart(items: { variantId: string; quantity: number }[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('sanchoku_pochicart', JSON.stringify(items));
}

export function clearLocalCart(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('sanchoku_pochicart');
}

// 産地タグからアイコン判定
export function getOriginIcon(origin: string): string {
  const icons: Record<string, string> = {
    '北海道': '⛄',
    '青森': '🍎',
    '山形': '🍒',
    '福島': '🍑',
    '茨城': '🥬',
    '千葉': '🥜',
    '長野': '🍇',
    '静岡': '🍵',
    '愛知': '🍆',
    '和歌山': '🍊',
    '熊本': '🍈',
    '宮崎': '🥭',
    '沖縄': '🍍',
  };
  return icons[origin] || '🌱';
}
