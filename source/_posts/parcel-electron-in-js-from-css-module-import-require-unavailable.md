---
title: Parcel+ElectronではJSからCSSモジュールをimport/require出来ない
tags:
  - JavaScript
  - Electron
  - Parcel
  - CSS
date: 2018-07-15 17:25:57
category: Development
---

> この記事はQiitaに書いていた自身の記事のコピーです。
ハマりレポです。半日吹き飛びました。

<!-- more -->

---

## 目次

<!-- toc -->

## 前提

### 1. Webページ制作における通常のParcel

通常のParcelでは、JS経由でCSSをimport/requireできる。

```html:index.html
<script src='./app.js'>
```

```javascript:app.js
import 'reset-css'
// npmモジュールの「reset-css」をimport
import './style.sass'
// 自分で書いた「style.sass」をimport
```

```shell:出力実行コマンド
parcel index.html
```

### 2. ElectronのためにParcelを使う例

ParcelにはElectron用のモード`-t electron`があるので、それを使います。これを忘れるとエラーがでます。

```text:ファイル構成例
./package.jsonなどは略
./src/app.js
```

```shell:実行コマンド例
parcel build src/app.js -t electron -d ./; electron .
# -t electron: electron mode
# -d ./      : 書き出すフォルダの指定
```

## ハマったこと

```javascript:app.js
import 'reset-css'
import './style.sass'
```

これを、

```shell:実行コマンド例
parcel build src/app.js -t electron -d ./; electron .
```

で呼び出して使おうとするとエラーが出ました。

### わかったこと

どうやら、

```javascript:app.js
import 'reset-css'
```

は出来ないようです。

```javascript:app.js
import './style.sass'
```

は大丈夫でした。

### 一応解決案

Sassファイルからimportしました。

```sass:style.sass
@import 'node_modules/reset-css/sass/reset'
```

## 以上です

これを読んだあなた。どうか~~真相を暴いてください~~。
もっとスマートな解決策があったら教えてください。よろしくおねがいします。
