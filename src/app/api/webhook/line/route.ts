// LINE Webhook 受信エンドポイント
// Cloudflare Workers / Pages Functions で動作
// POST /api/webhook/line

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const events = body.events || [];

    for (const event of events) {
      if (event.type === 'message' && event.message?.type === 'text') {
        const replyToken = event.replyToken;
        const userMessage = event.message.text;

        // 簡易応答（実際はより高度な処理を実装）
        if (userMessage.includes('注文') || userMessage.includes('予約')) {
          // LINE Messaging API で返信
          await fetch('https://api.line.me/v2/bot/message/reply', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
              replyToken,
              messages: [{
                type: 'text',
                text: 'ご注文・ご予約は産直ポチのWebサイトからお願いします。\nhttps://your-domain.pages.dev/products',
              }],
            }),
          });
        }
      }
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('LINE webhook error:', error);
    return Response.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
