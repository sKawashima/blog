---
title: Promiseでの処理順指定の最低限メモ
tags:
  - JavaScript
date: 2018-07-27 17:23:17
category: Development
---

> この記事はQiitaに書いていた自身の記事のコピーです。
とにかく最低限。説明も最低限。

<!-- more -->

---

## 目次

<!-- toc -->

## Promiseとは

非同期なJSの処理をしっかり順番指定してやるためのやつです。きれいにかけます。

## もっと簡単なPromiseの使い方

180727追記です。

```javascript
// 上から順番に実行するやつ
Promise.resolve()
    .then(実行したい関数名) // 関数名がaならa()ではなくaとだけ書く
    .then(実行したい関数名)
    .then(実行したい関数名)
    .then(() => {
      console.log('ここで宣言もできる')
    })
```

## Promise使い方

関数A→B→Cの順番で処理をするなら。

```javascript
new Promise((resolve, reject) => {
  // 処理A
  resolve(引き継ぐ情報（なかったら適当に）)
}).then((いわゆるreturn値が入る変数名(なかったら省略可)) => {
  // 処理B
  // resolveとrejectは引き続き使える
}
```

関数で置きたいなら。

```javascript
const funcA = () => {
  return new Promise((resolve, reject) => {
    resolve()
  })
}

funcA().then(() => {})
```
