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
    const hrefMatch = itm.match(/href="(.*?)"/)
    const href = hrefMatch ? hrefMatch[1] : ''

    const idMatch = href.match(/dp\/(.+)\//)
    const id = idMatch ? idMatch[1] : ''

    const titleMatch = itm.match(/title="(.*?)"/)
    const title = titleMatch ? titleMatch[1] : ''

    const imgMatch = itm.match(/src="(.*?)"/)
    const img = imgMatch ? imgMatch[1] : ''

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
