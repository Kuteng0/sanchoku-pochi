// Shopify Webhook 受信エンドポイント
// 注文情報の同期用

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const topic = request.headers.get('x-shopify-topic') || '';

    switch (topic) {
      case 'orders/create':
        // 新規注文: LINE通知を送信
        if (body.line_items && body.customer) {
          const lineUserId = body.note_attributes?.find(
            (attr: any) => attr.name === 'line_user_id'
          )?.value;

          if (lineUserId) {
            await fetch('https://api.line.me/v2/bot/message/push', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
              },
              body: JSON.stringify({
                to: lineUserId,
                messages: [{
                  type: 'text',
                  text: `【ご注文確認】\n注文番号: #${body.order_number}\nありがとうございます。発送準備が整い次第、追跡番号をお知らせします。`,
                }],
              }),
            });
          }
        }
        break;

      case 'orders/fulfilled':
        // 発送完了: 追跡番号をLINE通知
        if (body.fulfillments?.[0]?.tracking_number && body.note_attributes) {
          const lineUserId = body.note_attributes?.find(
            (attr: any) => attr.name === 'line_user_id'
          )?.value;

          if (lineUserId) {
            const tracking = body.fulfillments[0];
            await fetch('https://api.line.me/v2/bot/message/push', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
              },
              body: JSON.stringify({
                to: lineUserId,
                messages: [{
                  type: 'text',
                  text: `【発送完了】\n注文番号: #${body.order_number}\n配送業者: ${tracking.company}\n追跡番号: ${tracking.number}\n${tracking.url || ''}`,
                }],
              }),
            });
          }
        }
        break;
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Shopify webhook error:', error);
    return Response.json({ success: false }, { status: 500 });
  }
}
