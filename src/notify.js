/**
 * Slackに通知する
 *
 * NOTE: GASはclass構文が使えないっぽい
 */
function Notify() {
  // Block Kit
  const payload = {
    text: '商品の価格が下がりました！',
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🛒 商品の価格が下がりました！',
          emoji: true
        }
      }
    ]
  }

  /**
   * 商品を通知内容に追加
   * @param {Object} item 商品データ
   * @param {Number} prevPrice 以前の価格
   */
  this.addItem = (item, prevPrice) => {
    payload.blocks.push({
      type: 'divider'
    })

    payload.blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*<${item.url}|${item.title}>*\n~¥${prevPrice}~ → *¥${item.price}*`
      },
      accessory: {
        type: 'image',
        image_url: item.img,
        alt_text: item.title
      }
    })
  }

  /**
   * 通知を送信
   */
  this.send = () => {
    // 送信する内容が無い
    if (payload.blocks.length <= 1) {
      return
    }

    const webhook = config.SLACK_WEBHOOK_URL
    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload)
    }

    UrlFetchApp.fetch(webhook, options)
  }
}
