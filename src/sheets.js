const ss = SpreadsheetApp.getActiveSheet()
const lastRow = ss.getLastRow() - 1

/**
 * スプレッドシートからリストを取得
 * @return {Array} 最低価格リスト
 */
function fetchMinPriceList() {
  if (lastRow < 1) {
    return []
  }

  return ss.getRange(2, 1, lastRow, 2).getValues()
}

/**
 * リストをスプレッドシートへ書き込む
 * @param {Map<string, number>} list 最低価格リスト
 */
function writeMinPriceList(list) {
  // 元の値を削除
  if (lastRow > 1) {
    ss.getRange(2, 1, lastRow, 2).clearContent()
  }
  // 新しい値を書き込む
  ss.getRange(2, 1, list.length, 2).setValues(list)
}
