---
title: Svelteで双方向のデータバインディングをしようとしてハマって解決するまでの記事
tags:
  - Svelte
date: 2019-12-29 19:14:50
category: Development
---

Svelteで双方向のデータバインディングをしようとして若干ハマりました。
つまり、親←→子で常に同じデータを持っておこうとしてうまく行かなかったわけです。
解決したので、そのあたりをさらっと紹介します。
Svelteとは？みたいなところには触れません。

<!-- more -->

---

## 目次

<!-- toc -->

## 何をしようとしたのか

`input` フォームのコンポーネントからそれを呼び出す親のコンポーネントで入力されたデータを扱おうとしました。

``` Input.svelte
<script>
  export let value = 'value'
</script>

<input bind:value={value} />
```

``` Form.svelte
<script>
  import Input from '../atoms/Input.svelte'
  let data = 'test'
</script>

<Input value={data} />
```

こんな感じのファイル更生で、Form.svelteを描写した際に表示する瞬間はinputタグにdataの内容である `test` と表示されますが、inputタグの中身を編集してから再度dataの内容を参照して見ると `test` から変わっていない！

つまり、親（Form.svelte）→子（Input.svelte）のデータバインディングは出来ているが、子→親方向にデータがバインディングされていない！という状態です。

## 解決方法

変数に対してデータの更新を受け付けるようにするには、子であるInput.svelteでもやってるのと同様に `bind:` を加えます。
これを親であるForm.svelteでやるだけです。

具体例です。
解決済みのForm.svelteはこんな感じ。

``` Form.svelte
<script>
  import Input from '../atoms/Input.svelte'
  let data = 'test'
</script>

<Input bind:value={data} />
```

引数（今回は `value` ）を送るときに `bind:` をつけると、変更を受け付けて適宜更新してくれるようになります。
なるほど、理解してしまえばわかりやすくて良いですね！

## 今回の学び

### 双方向データバインディングは英語で「Two way data binding」

今回のでハマったときに `svelte data binding` みたいな調べ方をしてたら一番上に「 **Two way data binding** 」がでてきて「あっこれかぁ」となったりしました。
が、それが双方向のデータバインディングを指していると気づかずに若干右往左往したので、同じような人に向けて記事を書いています。

### Svelte、コードの記述料が少なく済んでいいカンジ

Svelte、動作速度から記述方法まで僕の「好み」だったので、ひたすら孤独に推しています。
Svelteの良さを紹介している記事を貼っておくので、興味のある方は是非！

{% linkPreview https://qiita.com/so99ynoodles/items/a8144ced1a21467c6300 %}
