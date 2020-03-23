---
title: GitHub Actions で文字列連結
tags:
  - GitHub Actions
date: 2020-03-23 19:13:43
category: Development
---

GitHub Actionsが便利すぎて個人開発で重宝してるんですが、そいえば文字列連結ーー変数と特定の文字の連結処理はできるのかな？と思ってやってみたらあっさりできたのでメモ。

<!-- more -->

---

## 目次

<!-- toc -->

## やりかた

```
hoge: ${{'constant '}}${{variable}}
fuga: ${{'*うまくやればスタイルも'}}${{variable}}${{'あてられますね*'}}
piyo: 'envならこの書き方でも{{variable}}いけることがある？'
```

これだけ。

かんたんに解説すると、

```
${{これ}}
```

で囲むことで、変数も文字列もおなじように扱え、ならべて書くことで連結されるようになります。

ただ、生の文字列と変数を連結させようとするとエラーがでるので、変動しない文字列も囲ってあげて計算対象にしてしまえば連結できます。
同じ理由で、括弧と括弧の間に空白が入ってるとエラーがでます。

### 参考

[Context and expression syntax for GitHub Actions - GitHub ヘルプ](https://help.github.com/ja/actions/reference/context-and-expression-syntax-for-github-actions)

## 所管

じわじわですが、GitHub Actionsの理解が進んでーーDockerやらインフラ周りの知見もたまってきているのを感じます。
昔はサッパリわからなかったことがふと「できるのでは？」と思って挑戦できるようになってきた感じです。
こういう成長を感じる瞬間はいいですね…
ではまた。
