---
title: NuxtとStorybookでSASSを使う
tags:
  - JavaScript
  - Sass
  - SASS
  - webpack
  - Nuxt
  - Storybook
date: 2019-07-10 17:45:14
category: Development
---

> この記事はQiitaに書いていた自身の記事のコピーです。
Parcelばっかり書いていて、久しぶりのWebpackに戸惑った。

<!-- more -->

---

## 目次

<!-- toc -->

## エラーの経緯

ちゃんと`indentedSyntax`指定しないと`<style lang='sass'>`指定でもエラーが出る。

```webpack.config.js
// 略
config.module.rules.push({
  test: /\.sass$/,
  loaders: [
    'style-loader',
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        indentedSyntax: true
      }
    },
  ],
})
//略
```

## 参考にさせていただいたサイト

- [Nuxt.jsへのStorybookの導入と、Sassの変数や共通CSSを読めるようにする設定 - tacamy--blog](http://tacamy.hatenablog.com/entry/2019/05/27/113131)
