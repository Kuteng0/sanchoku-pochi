// 型定義 - 産直予約販売アプリ

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  vendor: string;
  availableForSale: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
  priceRange: PriceRange;
  origin?: string;      // 産地
  producer?: string;    // 生産者
  harvestDate?: string; // 収穫日
  season?: string;      // 旬の時期
  farmingMethod?: string; // 栽培方法（有機・減農薬など）
}

export interface ProductImage {
  id: string;
  src: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: MoneyV2;
  compareAtPrice?: MoneyV2;
  selectedOptions: SelectedOption[];
  sku: string;
  weight: number;
  weightUnit: string;
}

export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface PriceRange {
  minVariantPrice: MoneyV2;
  maxVariantPrice: MoneyV2;
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  title: string;
  variantTitle: string;
  image: string;
  quantity: number;
  price: string;
  unit: string; // 例: '1箱', '500g'
}

export interface Order {
  id: string;
  orderNumber: number;
  status: OrderStatus;
  totalPrice: MoneyV2;
  lineItems: OrderLineItem[];
  createdAt: string;
  shippingAddress?: Address;
  trackingInfo?: TrackingInfo;
  reservationDate?: string; // 予約受取日
}

export type OrderStatus =
  | '予約受付'
  | '確認済'
  | '出荷準備中'
  | '発送済'
  | '配達中'
  | '配達完了'
  | 'キャンセル';

export interface OrderLineItem {
  title: string;
  variantTitle: string;
  quantity: number;
  image: string;
  price: MoneyV2;
}

export interface Address {
  address1: string;
  address2?: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  phone?: string;
  lastName: string;
  firstName: string;
}

export interface TrackingInfo {
  carrier: string;      // 配送業者（ヤマト運輸、佐川急便、日本郵便）
  trackingNumber: string;
  trackingUrl: string;
  status: string;       // 配送ステータス
  estimatedDelivery: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone?: string;
  defaultAddress?: Address;
  lineUserId?: string;
}

export interface Reservation {
  id: string;
  productId: string;
  productTitle: string;
  reservationDate: string;
  deliveryDate: string;
  status: '予約中' | '確定' | 'キャンセル';
  quantity: number;
  unit: string;
  price: string;
}

// LINE メッセージ
export interface LinePushMessage {
  userId: string;
  type: 'text' | 'flex';
  text?: string;
  altText?: string;
  contents?: object;
}
