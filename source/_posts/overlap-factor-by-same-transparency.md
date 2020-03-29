---
title: n個の要素を同じ透明度で重ねる
tags:
  - JavaScript
  - CSS
date: 2018-04-05 17:04:00
category: Development
---

> この記事はQiitaに書いていた自身の記事のコピーです。

Webフロントにおいて、例えば青色と赤色のDiv要素を重ねて混色した紫色を作ろうとしたとき、どう `Opacity` を設定すればいいのか、偶然考える機会があったのでまとめました。

<!-- more -->

---

## 目次

<!-- toc -->

## 先に結論から

HTMLは親と重ねたい要素に適当なid,クラスをつけます。

```html
<div id="container">
  <div class="overlaid"></div>
  <div class="overlaid"></div>
  <div class="overlaid"></div>
</div>
```

CSS上では、とりあえず親にサイズ指定とpos-r、重ねたい要素はpos-a使って重なるように設定します。

```css
#container{
  position: relative;
  height: 500px;
  width: 500px;
}
#container .overlaid{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
```

ん？opacity入ってない？
**CSSで解決するのを諦めてJS使いました。**
外から読むかHTMLに埋めるかはどうでもいいとして、次のようになります。

```javascript
let overlaids = document.getElementsByClassName('overlaid');
for (var i = 0; i < overlaid.length; i++) {
  overlaid[i].style.opacity = 1 / i + 1;
}
```

### vue使ってみる

```html
<div id="container">
  <img class="overlaid" v-for='(img, index) in overlaids' v-bind:src='img' v-bind:style="{opacity: 1 / (index + 1)}">
</div>
```

## 以上です

つまるところ、HTML上で半透明な要素を重ねるということは、上に残るものほど濃く残るということですね。
最初、全部 `opacity: .5;` で行けると思ったらダメで焦りました。アホくさ。

今回、Qiita初投稿になります。投稿した理由は、 **とりあえず書いてみたら良いアドバイスを貰えるらしい** という話を知人から聞いたからです。
皆様、もしもっと良い実装方法があれば教えてください！！！！！

では。
