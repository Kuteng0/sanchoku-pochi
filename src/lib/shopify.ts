// Shopify Storefront API クライアント
import Client from 'shopify-buy';

const shopifyClient = Client.buildClient({
  domain: process.env.SHOPIFY_STORE_DOMAIN || '',
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  apiVersion: '2024-04',
});

export default shopifyClient;

// 全商品取得
export async function fetchAllProducts(): Promise<any[]> {
  const products = await shopifyClient.product.fetchAll(50);
  return JSON.parse(JSON.stringify(products));
}

// 商品詳細取得
export async function fetchProductByHandle(handle: string): Promise<any> {
  const product = await shopifyClient.product.fetchByHandle(handle);
  return JSON.parse(JSON.stringify(product));
}

// カート作成
export async function createCart(): Promise<any> {
  const checkout = await shopifyClient.checkout.create();
  return JSON.parse(JSON.stringify(checkout));
}

// カートに追加
export async function addItemToCart(
  checkoutId: string,
  variantId: string,
  quantity: number
): Promise<any> {
  const lineItems = [{ variantId, quantity }];
  const checkout = await shopifyClient.checkout.addLineItems(checkoutId, lineItems);
  return JSON.parse(JSON.stringify(checkout));
}

// カートから削除
export async function removeItemFromCart(
  checkoutId: string,
  lineItemIds: string[]
): Promise<any> {
  const checkout = await shopifyClient.checkout.removeLineItems(checkoutId, lineItemIds);
  return JSON.parse(JSON.stringify(checkout));
}

// カート数量更新
export async function updateItemQuantity(
  checkoutId: string,
  lineItemIds: string[],
  quantities: number[]
): Promise<any> {
  const lineItems = lineItemIds.map((id, i) => ({
    id,
    quantity: quantities[i],
  }));
  const checkout = await shopifyClient.checkout.updateLineItems(checkoutId, lineItems);
  return JSON.parse(JSON.stringify(checkout));
}
