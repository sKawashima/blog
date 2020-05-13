---
title: Slack BotのフレームワークBoltで開発〜Herokuにデプロイまでやってみた
tags:
  - Slack
  - Bot
  - Bolt
  - Heroku
date: 2020-03-21 15:46:58
category: Development
---

Slack Botの開発経験は虚無だったんですが、「そういえば作りたいな」と思い至って3連休1日目にいじってみました。

Slack Botの開発は虚無と言っても、Scrapboxとの連携でincomming webhookを使う程度の経験はありました。

では、始めます。

<!-- more -->

---

## 目次

<!-- toc -->

## 使ってみてわかったこと

Boltでの開発のイメージを持つために、先に使ってみてわかったことを並べておきます。
たった一日いじっただけでの所感なので、間違い等あれば容赦なくTwitterなどで教えて下さい。

### BoltはSlack内のきっかけに反応するBotのためのフレームワーク

ちょっと前に「Slackが公式フレームワークとしてBoltを出したぞ」というニュースを見てから全く触れていなかったのでそれすらわかってなかったんですが、 **BoltはSlack内のきっかけに反応するBotのためのフレームワーク** です。
例えば、 **Slackで誰かが発言したら〜、Slackで誰かがコマンドを使ったら〜**、 のような感じです。
このきっかけ一覧については [公式ドキュメント](https://api.slack.com/events) を参照すると良いでしょう。

つまるところ、Boltでは一定期間ごとに実行するようなBotは開発できません。
毎週の祝日情報を垂れ流すBotなどは、その確認ロジックをサーバー側で行った後にWebhookなどで発言すると良いでしょう。

## やったこと

といっても、公式のHello Worldドキュメントが優秀なのでそれに沿って作業しました。

{% linkPreview https://slack.dev/bolt/ja-jp/tutorial/getting-started %}

### Bolt Init

initBolt.ts

``` typescript
import { App } from "@slack/bolt"
import * as dotenv from "dotenv"

dotenv.config()

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
})

export default app
```

index.ts

``` typescript
import app from './initBolt'

(async () => {
  await app.start(process.env.PORT || 3000)
  console.log('⚡️ Bolt app is running')
})()
```

もはやJavaScriptよりTypeScriptのほうが慣れていたのでTSを採用。
init処理は他の処理とは別のファイルに分けました。

### initにおけるセミコロンの謎ハマり

しれっと別のファイルに分けたと言いましたが、これは実はやむを得ずです。
というのも、上のコードではもちろんinitできますし、下のコードでもinitできました。

index.ts

```typescript
import { App } from "@slack/bolt";
import * as dotenv from "dotenv";

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
})(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("⚡️ Bolt app is running");
})();
```

しかし、次のコードではエラーが出てしまいまして…。

index.ts

```typescript
import { App } from "@slack/bolt"
import * as dotenv from "dotenv"

dotenv.config()

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
})(async () => {
  await app.start(process.env.PORT || 3000)
  console.log("⚡️ Bolt app is running")
})()
```

セミコロンの有無、だけでエラーがでる。
ファイルを切り出せばセミコロンがなくてもエラーが出ない。

この現象の細かい要因はわかっていません。

誰か知ってたら教えて下さい。

### とりあえずいくつかやってみた

index.ts

```typescript
import app from './initBolt'

(async () => {
  await app.start(process.env.PORT || 3000)
  console.log('⚡️ Bolt app is running')
})()

app.event("app_home_opened", async ({ event, say }) => {
  say(":de-su:")
})

app.message("デス", async ({ message, say }) => {
  say(":de-su:")
})

app.command("/say", async ({ command, ack, say }) => {
  ack()

  say(`${command.text}:desu:`)
})
```

さっくり、3種類の「きっかけ」に応じた処理をやってみました。
細かく見ていきます。

#### event発火

```typescript
app.event("app_home_opened", async ({ event, say }) => {
  say(":de-su:")
})
```

使うイベントはSlackのBot設定画面から有効化したものを使います。
例えば↑の場合だと、BotのHomeを開くとBotが発言する、というシンプルなものです。
使えるイベント一覧は [公式ドキュメント](https://api.slack.com/events) を参照。

#### message発火

```typescript
app.message("デス", async ({ message, say }) => {
  say(":de-su:")
})
```

誰かの発言の中に特定の文字列が含まれていると発火します。
「デス」が含まれるメッセージを検知するとBotが発言します。
Slackbotのカスタムレスポンスとは違い、文字列の中に紛れている状態でも発火します。
優秀。

#### command発火

```typescript
app.command("/say", async ({ command, ack, say }) => {
  ack()

  say(`${command.text}:desu:`)
})
```

コマンドを打たれると発火します。
この場合はコマンドの後ろにつけられた引数(?)を若干加工して返すだけのシンプルなものです。

### めっちゃ簡単…

見ての通り、数行書けばとりあえず動きます。
いい感じ。

### デプロイはHeroku

開発中はローカルでサーバーを立てて `ngrok` でglobal化しながら開発してました。
が、公開するとなるとそうもいかないので、方法を検討しました。

今回は、基本設定の簡単さと環境変数設定の簡単さを考慮してherokuにしました。
Node.jsがデプロイできればいいのでdocker周りの複雑さもないプロジェクトだからこそできるとも言える。

Slack APIの各種tokenやkeyの情報は環境変数として持たせました。
Terminalでサラッと設定できて良いですね。

```shell
heroku config:set SLACK_BOT_TOKEN=xoxb-xxxxxxxxxxxxxxxxx
```

## 以上

便利です。

本当はGoとか使ってイマドキっぽくいろいろ弄りたかったんですが、時間が無くとりあえずできそうな慣れた言語での実装になりました。

また今度、Goでも挑戦してみます。

ていうか、よく考えたら定期実行系のタスクはGoに切り出しても良いのか。
考えよう。

それから、そろそろデザイン周りの記事も書きかけてるやつ公開しないと。

ではまた。
