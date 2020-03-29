---
title: npmでsimplemdeを使う
tags:
  - JavaScript
  - npm
  - simplemde
date: 2019-05-06 17:50:02
category: Development
---

> この記事はQiitaに書いていた自身の記事のコピーです。

* [SimpleMDE - Markdown Editor](https://github.com/sparksuite/simplemde-markdown-editor)

[簡単に組み込めるマークダウンエディタとして紹介されてる記事](http://unitopi.com/markdown-editor/)がいくつか上がってるライブラリ。
便利そうです。


<!-- more -->

---

## 目次

<!-- toc -->

## npm経由で使おうとした

```shell
$ npm i simplemde
```

```app.js
import SimpleMDE from 'simplemde'

const simplemde = new SimpleMDE()
```

ら、
![x](oops.png)
崩れた。

どうみてもスタイルがあたってない。

## 対処：直接CSSをimportする

```app.js
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'

const simplemde = new SimpleMDE()
```

![o](success.png)
本当に一瞬で実装できました。
esaあたりで見覚えあるこの画面。

おすすめです。
