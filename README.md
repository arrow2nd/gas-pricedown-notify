# gas-pricedown-notify

Amazon のほしい物リスト内の値下げを Slack に通知する Bot

![スクリーンショット](https://user-images.githubusercontent.com/44780846/149143236-eeb12f18-8a57-4511-b223-1aac4d6e2aa9.png)

## 用意するもの

- [clasp](https://github.com/google/clasp) のインストール・ログイン
- Slack の [WebHookURL](https://slack.com/intl/ja-jp/help/articles/115005265063-Slack-%E3%81%A7%E3%81%AE-Incoming-Webhook-%E3%81%AE%E5%88%A9%E7%94%A8)
- 公開済みの Amazon のほしい物リスト

## 使い方メモ

<details>
<summary>開く</summary>

### 1. スプレッドシートとスクリプトを作成

```txt
cd gas-pricedown-notify
  
clasp create
? Create which script?
  standalone
  docs
❯ sheets <- これを選択
  slides
  forms
  webapp
  api
```

### 2. .clasp.json を編集

```jsonc
{
  ...
  "rootDir": "./src", // 変更
  ...
}
```

### 3. コードを push

```sh
# 不要なので削除
rm appsscript.json

clasp push
```

### 4. スクリプトのプロパティを設定

`clasp open` でブラウザでスクリプトエディタを開く。

次に、 `ファイル > プロジェクトのプロパティ` でモーダルを開き

![プロパティの設定](https://user-images.githubusercontent.com/44780846/149145199-4cfd8786-bd74-4895-a9d4-07df78e7f77c.png)

- `AMAZON_WISHLIST_URL` にほしい物リストの URL
- `SLACK_WEBHOOK_URL` に Slack の WebHook URL

を設定する。

### 5. トリガーを設定する

![トリガー設定](https://user-images.githubusercontent.com/44780846/149146689-d6e3064b-837a-4185-ac27-04be13f2ffe1.png)

実行する関数を `main` にし、他をいい感じに設定したら完了。

</details>
