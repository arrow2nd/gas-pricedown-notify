/**
 * Amazonのほしいものリストを取得
 * @returns {Array} 商品リスト
 */
function fetchWishList() {
  const url = config.AMAZON_WISHLIST_URL
  const html = UrlFetchApp.fetch(url).getContentText('UTF-8')

  // 商品と価格を取得
  const prices = Parser.data(html).from('data-price="').to('"').iterate()
  const items = Parser.data(html)
    .from('<a class="a-link-normal"')
    .to('</a>')
    .iterate()

  // データ数が合わないならエラー
  if (prices.length !== items.length) {
    throw new Error(
      `商品データと価格データの数が合いません items=${items} prices=${prices}`
    )
  }

  // 商品リストを作成
  const results = items.map((itm, idx) => {
    const href = itm.match(/href="(.*?)"/)?.[1] ?? ''

    const id = href.match(/dp\/(.+)\//)?.[1] ?? ''
    const title = itm.match(/title="(.*?)"/)?.[1] ?? ''
    const img = itm.match(/src="(.*?)"/)?.[1] ?? ''

    return {
      id,
      title,
      price: parseInt(prices[idx]),
      url: id ? `https://www.amazon.co.jp/dp/${id}` : href,
      img
    }
  })

  return results
}
