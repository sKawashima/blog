---
title: Markdownで記述するブログを作ろうとして行き着いたもの
date: 2018-04-05 23:08:24
tags:
  - Hexo
  - Markdown
  - Blog
  - Web Frontend
category: Development
---

コトの発端は、[ポートフォリオサイト](http://skawashima.com)を作った際に、更新していく内容が無いこと、Markdownを書き慣れすぎて[これまでやってたブログ](http://by-sk.blog.jp/)の記事作りが非常に面倒に感じ始めてしまったこと。発端と言いながら２つもあることは一旦置いといて、今回はこのブログを成り立たせている技術と、それに至るまでに触れた技術をざっくり並べようと思う。初めての環境でブログを書いているので、とりあえず口調は自分語り口調で行こうと思う。

## このブログについて

### Hexoでできてます

[公式Webサイト](https://hexo.io/)

- `Node.js` 製のブログジェネレータ。
- コマンドを叩くだけで必要なファイルを生成してくれる。
- テンプレートエンジンは `ejs` 。
- `Grunt` で動いている。ちょっと古いだけにこれだけは心配。

<!-- more -->

### カスタマイズのためにしたこと

したこと、といっても大したことはしていない。

- `themes/landscape/layout/_partial` にある `header.ejs` と `footer.ejs` の編集
- `themes/landscape/source/css/style.styl` の編集
- `_config.yml` の編集

つまり、ヘッダーとフッター以外は初期のまま、 `_config.yml` に関しては項目を埋めただけ。ほかは多分殆どいじっていない。ちなみに、 `ejs` と `stylus` を編集したのは初めてでした。
Hexo便利だ。

## Hexoに至るまでに触れた技術

### processmd

`Markdown` から `HTML` に変換し、 `Markdown` のファイル構成からインデックスを作ることができる。が、**僕の環境ではうまく動かなかった**。
そもそもなんだが、[僕のポートフォリオサイト](http://skawashima.com)は `Nuxt` で作っている。いや、１ページしかないWebページで `Nuxt` を使う意味はあんまりないんだが、その話は今度するとしよう。で、ブログが欲しいとちょうど思っていた頃に、あるQiita記事を知った。

- [Nuxt.js で Markdown ベースのブログを構築する（Markdown 編） - jmblog.jp](https://jmblog.jp/posts/2018-01-17/build-a-blog-with-nuxtjs-and-markdown-1/)

ド直球やんけ。というわけで、使おうとして、使えなくて、困っていた。
それに似たライブラリを探してみたりして、 `blogdown` とか `gitbook` とか、試しては挫折した。

### Ruby on Rails

王道of王道…つって、まだ何かを作ったことがあるわけじゃない。というか、現在勉強中。ただ、悲しいことに[skawashima.com](http://skawashima.com)はサーバーサイドプログラムが動くサーバーにリンクしていない。それから、もうすこし `Node.js` 製の技術に浸かりたい。のでスルー。

### WordPress

王道of王道of王道。考えなかったわけじゃない。ものを作ったこともある。しかし、正直コードが見づらくて嫌いだし、Markdown対応できるかどうかも知らない。ていうか、静的サイトとして書き出したいいし、そっちの技術を調べたい。

### Hexo

実は、1回スルーした。だって、[公式Webサイト](https://hexo.io/)見に行ったら、

```shell
npm install hexo-cli -g
hexo init blog
cd blog
npm install
hexo server
```

てコマンドがあって、 **「ああ、サーバー建てて使うタイプのやつかー」** って勘違いしちゃったんだもん。ド畜生。
しかし、物は試しと使ってみると `hexo generate` というコマンドの存在に気づいて、採用決定したって感じ。

## こんなかんじ

ここ数日間かけて色々と調べた結果がこれでした。なんかしてもしなくてもいい苦労してる気がするよね。
とりあえず、次以降は口調を丁寧系にしようとか考えつつ、ここまでにします。
ではまた。
