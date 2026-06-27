// LINE Messaging API クライアント
import { messagingApi } from '@line/bot-sdk';
import type { LinePushMessage } from '@/types';

const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.LINE_CHANNEL_SECRET || '',
};

const lineClient = new messagingApi.MessagingApiClient(lineConfig);

// LINE プッシュメッセージ送信
export async function sendLinePush(userId: string, message: string): Promise<void> {
  try {
    await lineClient.pushMessage({
      to: userId,
      messages: [{ type: 'text', text: message }],
    });
  } catch (error) {
    console.error('LINE push failed:', error);
  }
}

// 注文確認メッセージ送信
export async function sendOrderConfirmation(
  userId: string,
  orderNumber: number,
  productName: string,
  deliveryDate: string
): Promise<void> {
  const message = [
    `【ご注文確認】`,
    `注文番号: #${orderNumber}`,
    `商品: ${productName}`,
    `お届け予定日: ${deliveryDate}`,
    ``,
    `ご注文ありがとうございます。`,
    `発送準備が整い次第、追跡番号をお知らせします。`,
  ].join('\n');

  await sendLinePush(userId, message);
}

// 配送通知メッセージ送信
export async function sendShippingNotification(
  userId: string,
  orderNumber: number,
  carrier: string,
  trackingNumber: string,
  trackingUrl: string
): Promise<void> {
  const message = [
    `【発送完了のお知らせ】`,
    `注文番号: #${orderNumber}`,
    `配送業者: ${carrier}`,
    `追跡番号: ${trackingNumber}`,
    ``,
    `配送状況はこちらからご確認いただけます：`,
    trackingUrl,
  ].join('\n');

  await sendLinePush(userId, message);
}

// 予約リマインド送信
export async function sendReservationReminder(
  userId: string,
  productName: string,
  reservationDate: string
): Promise<void> {
  const message = [
    `【予約受取のお知らせ】`,
    `${productName} の受け取り日が近づいています。`,
    `受取予定日: ${reservationDate}`,
    ``,
    `ご都合が悪い場合は、マイページより変更をお願いします。`,
  ].join('\n');

  await sendLinePush(userId, message);
}

export { lineClient };
