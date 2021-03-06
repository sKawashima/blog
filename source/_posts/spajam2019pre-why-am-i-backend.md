---
title: デザイナーだがサーバーサイドエンジニアとしてハッカソンに参加しました
tags:
  - Planning proposal
  - Backend
  - SPAJAM2019
  - RAISE UP
  - ryu-g
  - TypeScript
  - MongoDB Atlas
  - Now.sh
date: 2019-06-29 10:00:0
category: Hackathon
---

sKawashimaです。

以前{% post_link 初めてハッカソンに出場して考えたこと SPAJAM2018に出場した時 %}に「もう二度と出たくない」とか言ってましたが、知人からの誘いと思想の転換から再度SPAJAMに参加しました。
参加したのは2019/6/8〜9に開催された**SPAJAM2019 東京予選B会場**です。

{% linkPreview https://spajam.jp/2019/entry/tokyo-b/ %}

最近このブログの更新はハッカソン出場記録ばかりになってきてますが、次以降はいろいろ別のこと書くので今回はご容赦を。

<!-- more -->

---

## 目次

<!-- toc -->

## お誘いと参加表明

さて、今回のチームはこれまでの **!kie** とは異なる **RAISE UP** というチームです。

4月頃に同居人であるryu-gから「今度ハッカソンに出るハッカソンチームに誘われてるけど一緒に来ない？」とお誘いを受けました。
ryu-gを誘ったのは**出身大学ではハッカソンの実績で有名な先輩と同期**です。
ryu-gはデザイナーなので、自分はフロントエンドかなあなどと考えながら「話だけ聞かせて」と答えたところ、 **「サーバーサイドエンジニアやってくんね？」** との依頼をいただきました。

少し悩んだ後に「やるかぁ」と返答して参加を決定しました。
悩んだ点は２つ。
1つ目は、自分は現在本業デザイナーとして活動しており、サーバーサイドは趣味程度であるため、**ハッカソンガチ勢の中で迷惑をかけてしまいそう**という懸念。
2つ目は、会社に入りたての時期で**自分のコンディションがそれについて行けるか不安だった**という懸念。
その上で、1つ目は事前学習、2つ目はノリと雰囲気と勢いで乗り切ろうと思い参加を決意しました。

もう少し真面目な話をすると、自分の活動の判断基準の1つが「今しか出来ないことをする」ことであって、こういった**貴重な機会からは基調な体験と学びを得られると判断して**参加を決意しました。

また、思想の転換として「デザイナーとしてではなくサーバーサイドエンジニアとして参加する」という切り替えがあったので、**「普段とは違うことをする」楽しみ**を見出したのも参加の要因です。

## メンバー紹介

ryu-gがメンバー紹介書いてくれました。

> **イカれたメンバーを紹介するぜ**
>
> ハッカソンの実績で有名な先輩 「iOS書くわ　とりあえず機能の事考えないでデザイン作っていいよ」
> ハッカソンの実績で有名な同期 「こちらにご用意したGPSモジュールで座標を取得しましょう」
> しば（ぼく） 「デザイナーだけどデータベースとAPI作りました」
> ryu-g「なまこの捕食シーン見たことある？」
> ケンタッキー（元!kieメンバー）「熱出たから休むわ」

ryu-gの当日のツイート。

{% twitter https://twitter.com/a3y53/status/1137164611252133889 %}

## サーバーサイドで使った技術とツール

言語環境は `TypeScript`-`ts-node`-`Node.js` という形で`TypeScript`を書きました。
ちゃんと型を書く練習したかったのでちょうどよかったのです。
サーバーのフレームワークは以前勉強してた `Express` を採用し、DBも同じ理由で `MongoDB` を選択しました。
（職場の人から「 `deno` 使わないの？」って言われましたが、せめてバージョン1.0以降に使いたいのとRUSTで書ける気がしないのでスルーしました）

Node.jsのデプロイ先は **[Now.sh](http://now.sh)** を使いました。
なんせ**名前にセンスを感じる**し、**使い勝手も非常に良いと聞いていた**ので使ってみました。
正直使いやすくて**大好き**です。
`MongoDB` に関しては、 **[MongoDB Atlas](https://cloud.mongodb.com/)** を使用しました。
初めて使いましたが、色々使いやすく便利でした。

## 当日の自分の動き

**SPAJAMのアイデアソンは全力で脱力して参加しました**。
チーム全体のほぼ共通認識として、**「このアイデアソンはいらない」**と評価されていたので、「自分だけの認識じゃないんだなあ」と思いながらの判断です。

その後、**チームでのアイデア出しには積極的に参加**し、**昼頃にはアイデアが確定**しました。
今考えると早く確定させすぎた感じもありますが、たまには良いかなと思ってました。
アイデアは**「位置情報の記録、その他能動的な記録ができるレンタル傘」**です。

アイデアが確定次第、僕はデザインをryu-gにまかせてサーバーサイド、APIの開発開始です。
**サーバー側に求められた機能はデータベースに対する単純な `CRUD` の一部だけ** (Create/Read/~~Update~~/~~Delete~~) だったので、引っかかることなくサラサラ開発出来ました。
**DBの設計は本業エンジニア軍勢の二人が作ってくれた**ので助かりました。
正直、まだDB設計はできる気がしていないのです。

ていうか、それなら `Firebase` で良かったやん…というところもありますが、**自分で作ってるからこその工夫や調整ができた**ので満足してます。
あえて言うなら、 `Now` や `MongoDB Atlas` への**デプロイ/連携周りは経験がなかった**ので、当日の試行錯誤でした。

当日の**自分の動きのコンセプトは「常に出せるものを出す」**でした。
最低限 `hello` だけ返すAPIを作って、それを `Now` にデプロイし、 `MongoDB Atlas` とのデータ連携をして…と常に最低限の成果状態を維持するよう意識して動きました。
コレに関しては普段のデザインの仕事や課題解決で意識するようにしている思想で、**松竹梅提案よりも根本的な思想**です。
まあ、**マシュマロ・チャレンジを経験するとコレの価値はわかる**と思います。
とにかく周囲に悪影響が起きないよう、**表層だけでも動く状態を維持**しました。

時間に関しては、**正直途中からやることがない状態だった**ので夜は寝たり起きたりを繰り返したり、**仮データ作成ツールを作ったり**するくらいには余裕でした。
必死になってた先輩には申し訳ない気持ちもあったりします。

そういえば、思ってたより**フロントエンドの技術が活かせた**のが楽しかったです。
iPadにDBの最新の情報を表示するための画面や仮データ作成ツールの制作に結構使いました。
**技術はいくら持っても損はしない**ですね。

## 結果と最優秀賞の印象

結果は、{% post_link spajam2018-first-hackathon 初出場 %}と同じく、**優秀賞**でした。
正直、予想通りでした。
**最優秀賞は発表を聞きながら逃したことを察していました。**

**敬意**を持って、最優秀賞の成果を簡単に紹介します。
**最優秀賞は、チーム「ERAIZA」のpicdoc** 。
成果は「外国人向けピクトグラム写真撮ったら教えてくれるアプリ」です。
**外国人は日本のピクトグラムが理解できない、という問題に対する改善案**でした。

アイデアについて、デザイナーとして「なるほど」となりました。
SPAJAMでは**テーマが一日目の昼前に発表され、二日目の昼に成果発表するという厳しいスケジュール**が組まれています。
その中で、アイデアについて「問題」をリサーチしたのか知っていたのか、少なくとも**問題解決に全面を向けたアイデアづくりだったので素直に「負けた」と感じました**。
エンジニアリングについても、**機械学習を用いた画像認識など、知識と技術有りきの成果**でした。

チーム「ERAIZA」の成果には**素直に負けたと思える気持ちの良い結果だった**と思います。

## チームの中でサーバーサイドエンジニアを経験して思ったこと

**サーバーサイドエンジニアの楽しみとは何なのだろう**、と終始考えていました。
自分は本業がデザイナーであり、趣味でフロントエンドエンジニアもやってますが、**サーバーサイドエンジニアを積極的に仕事にしたことはありませんでした**。

自分なりに考えてみて、見つけた楽しみは3つあります。

1つ目は **「アルゴリズムを考えてプログラムを書くという行為そのもの」**です。
例えばマインクラフトの建築のように、自分で何が求められていて何を作るかを考え、パーツを組み立てていく楽しみです。
エンジニアの楽しみとしてそれを実感したのは何気に初めてだったと思います。

2つ目は **「設計図を使い回して高速に機能が増やせること」**です。
（いや、使い回すようなコードを書くな、という指摘は置いといて）
今回はシンプルなAPI実装がメインだったので、そのシンプルな要素は基本的に使いまわしが効きました。
ので、**実装にかかる時間に対して増えていく機能が多く、それは素直に楽しいと感じました**。

3つ目は **「今まで見えていなかった裏側をほぼ完全に把握し、操れること」**です。
上に「使い回し」という言葉を使いましたが、使い回してでも全部書くということは**そこで起きている事象は全て把握できている**ということです。
「どのURLにどうアクセスされたら、どういう処理をしてどういうデータを返すか」というサーバーサイドエンジニアの責務は、同時に **「裏側を全て掌握して管理する」楽しさであることに気づけました**。
フルスクラッチ開発、してみるのも楽しいんだろうなあ（2つ目と矛盾しますが）。

このように、サーバーサイドエンジニアについての考えを大きく改める良いきっかけになりました。

## ハッカソン運営の方々に関して

最初のアイデアソンで、去年体験した「喜怒哀楽を掘り下げる」の哀にて「以前煽ってきた運営の人がいてげっそり」的なことを書いた結果（しかもそれを僕以外のメンバーも書いていた）、直接その運営の人から謝られるという現象が発生しました。
これにはちょっと申し訳ない気持ちもあったり。
でも、**今回は特に煽られることもなく――というか干渉そのものがない状態でやりやすかったのは事実でした**。

前回のときの煽りは「（周囲と比べて）遅れているチームを急かす」意味合いがあったんだろうなあ、と思いつつ、やはり **「無為に急かすのは良くない」という意見は変わらなかった**です。

それとは別に思ったことと言えば、審査員の中で約一名、**発表の質問タイムにマイクを渡されて「苦労したところはどこですか」しか聞かなかった人がいた**ことが非常に悪い意味で印象的でしたね。
技術者じゃなかったとしても、提案の中身に関する質問が1つもなかったのは流石に「何の審査員なんだ…？」と思ってしまった次第です。
「がんばったで賞」もらえるのかな。

## 終わりに

そんな感じです。
ひとまず、**チームの中でのサーバーサイドエンジニアとしての経験ができたことは少なからず良かった**と思います。
いろいろ、作りたいものを作っていけると良いなあ。

読んでいただきありがとうございます。
いい加減、**1記事/1~2週を維持したい**と思っていますが、どうなることやら…。
なんせ、**作りたいものが無限にある**ので、**仕事以外の時間は読書と開発（と酒）**みたいな生活してるもので。
アウトプットの重要性は実感しているので、ブログ執筆も真面目にやっていきたい所存です。
これからもどうぞよろしく。
ではまた。
