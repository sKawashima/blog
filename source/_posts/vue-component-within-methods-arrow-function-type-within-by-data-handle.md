---
title: Vue Component内methodsのアロー関数式内でdataを扱う
tags:
  - JavaScript
  - Vue
date: 2020-03-29 17:36:14
category:
---

> この記事はQiitaに書いていた自身の記事のコピーです。
これを解決します。

```js:とある.vueファイル(エラー)
export default {
  data: () => {
    return {
      test: 0
    }
  },
  methods: {
    testfunc: () => {
      this.test++ // エラー
    }
    /*
    testfunc2: function () {
      this.test++ // こちらはうまくいく
    }
     */
  },
  created () {
    this.testfunc() // ここではthisが使えている
  }
}
```

<!-- more -->

---

## 目次

<!-- toc -->

### うまくいかない原因

- アロー演算子`() => {}`内のthisはこのvmを参照していないため

## 対処法

```js:とある.vueファイル
var vm // --①
export default {
  data: () => {
    return {
      test: 0
    }
  },
  methods: {
    testfunc: () => {
      vm.test++ // 👏
    }
  },
  created () {
    vm = this // --②
    this.testfunc()
  }
}
```

### ポイント

1. vm用の変数を確保
2. vm内に`created`か`mounted`を使ってvmを代入

## もやもや

- 出来れば`var`を使わずに書きたい
- 外に仮置きしないで実装する方法は無いんだろうか…

もっときれいに書く方法が有れば、教えていただけるとありがたいです。
