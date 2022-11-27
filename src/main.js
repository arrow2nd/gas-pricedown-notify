const config = PropertiesService.getScriptProperties().getProperties();

function main() {
  const notify = new Notify();

  const minPrices = fetchMinPriceList();
  const wishList = fetchWishList();

  const newMinPrices = wishList.map((item) => {
    const priceListIdx = minPrices.findIndex((e) => String(e[0]) === item.id);

    // 存在しない場合は新規作成して終了
    if (priceListIdx === -1) {
      console.log(`[ADD] ${item.title} ${item.price}`);
      return [item.id, item.price];
    }

    let minPrice = minPrices[priceListIdx][1];

    // 現在の価格と比較
    if (minPrice > item.price) {
      console.log(`[UPDATE] ${item.title} ${minPrice}->${item.price}`);
      notify.addItem(item, minPrice);
      minPrice = item.price;
    }

    return [item.id, minPrice];
  });

  // 通知を送信
  notify.send();

  // 書き込む
  writeMinPriceList(newMinPrices);

  console.log("[SUCCESS]");
}
