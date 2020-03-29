---
title: Parcel+Hyperappでマークダウンエディタを作る
tags:
  - hyperapp
  - Marked
  - highlight.js
  - Parcel
  - JavaScript
date: 2018-04-24 17:07:59
category: Development
---

> この記事はQiitaに書いていた自身の記事のコピーです。

色々と雑ですがお付き合いください。また、解説は自分のリポジトリのものと少し違います（Linter系バッサリ吹き飛んでます）。

こちら、[結果リポジトリ](https://github.com/sKawashima/markdown-editor_withHyperapp)と[公開したもの](https://skawashima.github.io/markdown-editor_withHyperapp/)です。

<!-- more -->

---

## 目次

<!-- toc -->

### 基本情報

- Parcelとは
  - 思考停止で（何の設定もなしに）モジュールをバンドルしてくれるマン。
- Hyperappとは
  - 超軽量データバインドマン。
- Markdownとは
  - Qiita書くときに使うやつ。

## 書いていきます

とりあえず必要なものを`yarn add`(`npm install`)します。

```shell:terminal
yarn global add parcel-bundler
yarn add hyperapp marked node-sass
# これらは以下とほぼ同義です
# npm i -g parcel-bundler
# npm i hyperapp marked node-sass
```

`parcel`と`hyperapp`は先に書いたとおりです。

- marked
  - Markdown→HTML変換器くん。

- node-sass
  - Sass/SCSS→CSS変換器くん。

### index.htmlをつくる

最低限のもののみ、HTML5で省略推奨されているタグは含めていません。

```html:index.html
<!DOCTYPE html>
<title>markdown-editor with Hyperapp</title>
<body>
  <script src='app.js'></script>
</body>
```

ここで、app.jsという空ファイルを作っちゃいます。
その後、

```shell:terminal
parcel index.html
```

で`localhost:1234`を開くととりあえずタイトルが「*markdown-editor with Hyperapp*」の真っ白のWebページが見えました。
Parcelのすごいところは、**とりあえずindex.htmlを引数にして実行すればそこからsrcしてるファイルが全て自動でコンパイル＆ブラウザ側でライブリロードされる**点ですね。

### hello Hyperapp

では、app.jsを編集します。

```javascript:app.js
import { h, app } from 'hyperapp'

const state = {
  'output': 'hello, Hyperapp'
}

const actions = {
}

const view = (state, actions) => (
  <main id='app'>
    {state.output}
  </main>
)

app(state, actions, view, document.body)
```

1行目はモジュールのインポートですね。`h`はどうやら`app`の実行に必要なようなので一緒に入れてます（1回エラー見ました）。
次に、Hyperappでは`state`と`actions`と`view`と`それらを適用させる場所(app)`が初期化で求められるので、それらを書いてます。

stateは一言で言うと変数です。
actionはそれを編集するためのメソッド、関数を記述します。
viewは表示する中身をほぼそのまんま書いていきます。中身は`JSX`記法と呼ばれるもので、**`{}`で変数の中身を表示できます**。

ので、これを保存した頃にはブラウザ側では「*hello, Hyperapp*」と表示されているはずです。

### textareaの中身をリアルタイムで表示する

流れとしては、viewを編集して`<textarea>`タグを追加、それが編集されたらactionからメソッドを呼んでstateのoutputをいじって表示する感じです。

で、ハマったのはtextareaの中身をどうやって取得するかです。Vue.jsだと、`v-model`とか便利なものがあるんですが、Hyperappに似たようなものがあるかと思ったんだが。

見つかりませんでしたので、生Javascriptで書いてます。誰か知ってたら教えてください。
**先程書いたコードの一部を書き換えていくような形**で書いていきます。

```javascript:app.js
const view = (state, actions) => (
  <main id='app'>
    <textarea id='editor' oninput={e => actions.setOutput(document.getElementById('editor').value)} />
    <div>{state.output}</div>
  </main>
)
```

`oninput`で入力を感知したら、`document.getElementById('editor').value`で得られた文字列(=textareaの内容)を引数に`actions.setOutput`を実行します。
では、`actions.setOutput`を定義します。

```javascript:app.js
const actions = {
  setOutput: (input) => state => ({ output: input })
}
```

[アロー関数式`=>`](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/arrow_functions)を使っているので混乱させてしまったら申し訳ないですが、つまり引数を`input`として扱って`state.output`を変更するというものです。

この状態で、ブラウザに表示されているtextareaに文字を入れたとき、その内容がそのまま表示されていれば成功です。

### textareaの中身でリアルタイム**HTMLプレビュー**する

さっきまでの文字列はあくまで文字列として扱われ、HTMLタグはプレビューできてません。
上で話した通り、モジュール「marked」はMarkdownをHTMLに変換するため、HTMLプレビューが必要でした。

この変更はviewを編集するだけで秒解決です。ただ、Vue.jsで言うところの`v-html`のような機能も見当たらなかったので、直書きします。

```javascript:app.js
const view = (state, actions) => (
  <main id='app'>
    <textarea id='editor' oninput={e => actions.setOutput(document.getElementById('editor').value)}　/>
    <div id='preview' innerHTML={state.output}></div>
  </main>
)
```

`innerHTML`に入れたら解決しました。やったぜ。

### 仕上げの時間だ。Markdownプレビューしますよ

さて、もうここまでくるとoutputの中にmarkdownから変換されたHTMLを代入する**だけ**ですね。
上に書いたとおり、Markdown→HTML変換器くんのmarkedを使います。

まずmarkedのimport文の追加。

```javascript:app.js
import marked from 'marked'
```

で、actionの編集。

```javascript:app.js
const actions = {
  setOutput: (input) => state => ({ output: marked(input) })
}
```

marked超便利。marked超便利。marked超便利。
はい、これでとりあえず終了ですね。

## 見栄えをどうにかする

これに関しては最初に`node-sass`を導入してるのでSCSSやSass、もしくはCSSを書いて下さい。僕の場合はこんな感じでした。
今回はJavascriptの解説だったので、あえてこの解説は省きます。

style.sass

```sass:style.sass
html, body
  height: 100%
  width: 100%
  margin: 0

#app
  display: flex
  height: 100%

textarea, #preview
  flex: 1 1 0
  overflow-y: scroll

textarea
  padding: 1em
  font-size: 12px
  background-color: #eee
  line-height: 1.5em
  font-family: courier, monospace
  border: 0

#preview
  padding: 1em

pre
  padding: 15px
  background-color: #282c34
  color: #EEE
  margin-right: 10px

@media print
  textarea
    display: none
  #preview
    overflow-y: visible
```

で、それをimportします。

```javascript:app.js
import './style.sass'
```

### おまけ：Highlight.jsでcodeをいい感じに表示する

Highlight.jsはcodeタグ内の各種コードをいい感じの色にしてくれるものです。

yarn add(npm install)

```shell:terminal
yarn add highlight.js
```

```javascript:app.js
import highlight from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

marked.setOptions({
  highlight: function (code, lang) {
    return highlight.highlightAuto(code, [lang]).value
  }
})
```

```sass:style.sass
.hljs
  all: unset
```

## 以上です。お疲れ様でした

一分説明が雑になってしまったので申し訳ないですが、以上になります。
**Parcelは設定ファイルを作成しなくて良い**、**Hyperappは非常に少ないコードで書ける**というそれぞれの強みが有ります。
逆に、これらは細かい設定が出来ない、複雑なものが作りにくいという弱みに直結しますが、**使えるところでは使える**ということを体感して頂けたら幸いです。

あ、Parcelで静的データ書き出ししちゃいましょう。

```shell:terminal
parcel build src/index.pug --public-url ./
```

これで`dist`の中に公開できる状態のデータが生成されているはず。
はやい。
かんたん。
Parcelだいすき。
何か質問、ご指摘等有りましたらなんでもお願いします。
では。

### 修正・補足

- 180322
  - parcel-bundlerをグローバルインストールに変更しました。グローバルを汚したくない人はnpm scriptsをよしなに書いて下さい。
