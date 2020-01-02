---
title: Svelteでon〇〇の関数にイベントを引数で渡す
tags:
  - Svelte
date: 2020-01-02 21:29:42
category: Development
---

ちょいハマってあっさり解決したのでメモです。
公式ドキュメントはちゃんと読もう、と思いました。
でも、読まなくても勝手になんとなく対処法が見つけられるSvelteは好きです。

ただし、 **ここに書いてる諸々は一部非推奨な内容を含んでいます** 。
理由も添えて書いているので、是非最後まで読んでいただけると幸いです。

<!-- more -->

---

## 目次

<!-- toc -->

## 何をしようとしたのか

`img` タグで読み込み失敗エラー（404エラー）が発生したときには `onerror` に定義した関数を呼ぶように設定できるらしい。

例えば以下のような感じ。

```html
<img src="original.png" alt="title" onerror="this.style.display='none'"/>
```

これをSvelteでしようとして、「 `this` ってどこから持ってこよう？」となったのが本記事のきっかけです。

上記のコードや知見は以下のサイトを参考/引用させていただいております。

{% linkPreview https://tekk.hatenadiary.org/entry/20150131/1422711247 %}

## 解決方法

とりあえず以下のようにかけば、全ていいカンジになります。

```html
<script>
const printEvent = (event) => {
  console.log(event)
}
</script>

<img src='null.jpg' on:error={printEvent}>
```

`console.log` される `event` の中身は以下のような感じ。

```log
Event {
  isTrusted: true,
  type: "error",
  target: img.svelte - 1 kbx16y,
  currentTarget: img.svelte - 1 kbx16y,
  eventPhase: 2,
  …
}
```

一度console.logしてみるとわかりますが、 `event.target` が従来の `this` と同等の要素を持っているのがわかります。
なので、冒頭で触れたような処理をしようとするなら以下のように書くと良いです。

```html
<script>
const printEvent = (event) => {
  event.target.style.display='none'
}
</script>

<img src='null.jpg' on:error={printEvent}>
```

## 今回の学び

### Svelteにおいてはonerror表記でもエラーにならない

解決策の通り、 `on:error` と書くように公式ドキュメントでも触れられていますが、 `onerror` でもコンパイルは出来ます。
ただし、期待する動作はされません。

どうなるかの実例をあげるため、例えば以下をコンパイルしてみます。

```html
<script>
const printEvent = () => {
  console.log('test')
}
</script>

<!-- ↓「:」を消してます -->
<img src='null.jpg' onerror={printEvent}>
```

すると、以下のようにコンパイルされます。

```html
<img src='null.jpg' onerror=() => {
  console.log('test')
}>
```

つまるところ、文字列としてそのまま代入されてしまうんですね…。

逆に言うと、以下のようにすれば動かせます。

```html
<script>
const printEvent = console.log('test')
</script>

<img src='null.jpg' onerror={printEvent}>
```

コンパイルすると、

```html
<img src='null.jpg' onerror=console.log('test')>
```

…まあ動くわな。

ただし、

1. 引数が使えない
2. 複数行のコードが書けない
3. Svelteによっていいカンジにコンパイルされない

などの理由があるので使うメリットが無くデメリットだけが山盛りです。
辞めましょう。

### ていうか、それ本当に要る？をもう一度検討する

根本的に、 **この記事に書いた手法全体には手を出す前に冷静に状況を見直したほうが良い** です。
というか、 **今回の例に限って言えば完全に非推奨** です。

VueやReactなどのライブラリと同じく、 **データバインディング出来るライブラリを使う上でDOM要素を直接いじることは基本的に無いほうが良い** です。
例えば、srcに渡すパスを変数に置く、styleを変数に置くなどすれば全て解決するはずです。

つまるところ、この記事で書いてるやり方は極力しないほうが良い！ということ。
…難しいですなあ。

ただ、それでも `event` の中身で云々する人は居るかも？と思って今回の記事を書きました。
ありがとうございました。
