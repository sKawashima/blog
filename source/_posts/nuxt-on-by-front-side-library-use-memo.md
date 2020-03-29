---
title: Nuxt上でフロントサイドライブラリを使うメモ
tags:
  - JavaScript
  - Nuxt
date: 2020-10-15 17:34:09
category: Development
---

> この記事はQiitaに書いていた自身の記事のコピーです。
Nuxt上でTone.jsを使いたかった。
`window is not defined`っておこられた。
ESLintはStandardを使用。

公式ガイドラインにも記述がありますが、一部ハマったりしたのでメモ程度に書いています。

<!-- more -->

---

## 目次

<!-- toc -->

## Tone.js

Web Audio APIを使いやすくするためのライブラリ。

## 対処法


```js:.vueファイル内の読み込み
if (process.browser) {
  var Tone = require('tone')
}
```

```js:vueファイル内の処理
if (process.browser) {
  console.log(Tone.Frequency('A3').toMidi())
}
```


### ポイント

- `if (process.browser)`
  - サーバーサイドで実行しない
- `require('tone')`
  - `import`はインデント上で使えないため`require`を使用する

## もやもや

やっぱり`import`に統一したい。
何かいい手を知ってる方が居たらアドバイスをお願いします。
