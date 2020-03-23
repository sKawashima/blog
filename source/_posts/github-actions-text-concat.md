---
title: GitHub Actions で文字列連結
tags:
  - GitHub Actions
date: 2020-03-23 19:13:43
category: Development
---

GitHub Actionsが便利すぎて個人開発で重宝してるんですが、そいえば文字列連結ーー変数と特定の文字の連結処理はできるのかな？と今更思ってやってみたらあっさりできたのでメモ。

<!-- more -->

---

## 目次

<!-- toc -->

## やりかた

```
hoge: ${{'constant '}}${{variable}}
fuga: ${{'*うまくやればスタイルも'}}${{variable}}${{'あてられますね*'}}
```

これだけ。
`${{}}` で囲むことで、その要素を計算後につなぐ処理が発生します。
ただ、生の文字列と `${{}}` を連結させようとするとエラーが出るので、変動しない文字列も囲ってあげて計算対象にしてしまえば連結できます。

### 参考
[Context and expression syntax for GitHub Actions - GitHub ヘルプ](https://help.github.com/ja/actions/reference/context-and-expression-syntax-for-github-actions)

## 所管

じわじわですが、GitHub Actionsの理解が進んでーーDockerやらインフラ周りの知見も溜まってきて居るのを感じます。
昔はサッパリわからなかったことがふと「できるのでは？」と思って挑戦できるようになってきた感じです。
こういう成長を感じる瞬間は良いですね…
ではまた。
