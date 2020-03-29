---
title: ParcelでPWA化する最速の方法
tags:
  - JavaScript
  - PWA
  - Parcel
date: 2018-07-25 17:30:50
category: Development
---

> この記事はQiitaに書いていた自身の記事のコピーです。

PWAに必要なもの、こと（最低限）は以下の通り。

- PWA化するWebサイト、Webアプリケーション
- service-worker設定ファイル（js）
- manifest設定ファイル（json）
- それらをHTMLファイルから参照するlinkタグの追記

<!-- more -->

---

## 目次

<!-- toc -->

## 最速の方法

### 1. parcel-plugin-sw-precacheの導入

```shell
npm i -D parcel-plugin-sw-precache
# =yarn add -D parcel-plugin-sw-precache
```

`parcel-plugin-sw-precache`は、service-worker設定ファイルとHTMLからのリンクを*いいカンジ*に生成してくれるプラグインです。
一応細かい設定もできますが、基本的にはこれを入れてParcelを動かすだけで大丈夫です。

- [parcel-plugin-sw-precache - npm](https://www.npmjs.com/package/parcel-plugin-sw-precache)

### 2. manifest.webmanifestの作成

GoogleによるManifest Documentでは、`manifest.json`というファイル名での記述を指定していますが、このファイル名ではParcelがファイル名を改変してしまい、上手く動作しません。

そこで、MDNが指定している`manifest.webmanifest`というファイル名で記述し、

```html
<link rel="manifest" href="/manifest.webmanifest">
```

のようにHTMLファイルから参照します。こちらは手動です。

`manifest.webmanifest`の中身は`manifest.json`と同じです。[MDNによるドキュメント](https://developer.mozilla.org/en-US/docs/Web/Manifest)に記載されている例をコピペしていじればすぐに作成できます。

```json:Example_manifest(MDN_Webサイトより)
{
  "name": "HackerWeb",
  "short_name": "HackerWeb",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#fff",
  "description": "A simply readable Hacker News app.",
  "icons": [{
    "src": "images/touch/homescreen48.png",
    "sizes": "48x48",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen72.png",
    "sizes": "72x72",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen96.png",
    "sizes": "96x96",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen144.png",
    "sizes": "144x144",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen168.png",
    "sizes": "168x168",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen192.png",
    "sizes": "192x192",
    "type": "image/png"
  }],
  "related_applications": [{
    "platform": "play",
    "url": "https://play.google.com/store/apps/details?id=cheeaun.hackerweb"
  }]
}
```

## 以上です。

この記事を書いた理由は主に２つあります。

- `parcel-plugin-sw-precache`を初めて知ったため
- `manifest.json`でハマったため

もし、これらより簡単な方法があればぜひ教えてください。
では。
