# skawashima.com/blog

|master|working|
|:-:|:-:|
|[![wercker status](https://app.wercker.com/status/d28d247b21e1284dd5741503e17d8f40/s/master "wercker status")](https://app.wercker.com/project/byKey/d28d247b21e1284dd5741503e17d8f40)|[![wercker status](https://app.wercker.com/status/d28d247b21e1284dd5741503e17d8f40/s/ "wercker status")](https://app.wercker.com/project/byKey/d28d247b21e1284dd5741503e17d8f40)|

それなりに真面目に書く方のブログ

## GitHub運用方針

`master`ブランチへの情報の変化は最低限残すが、Networkが複雑になりすぎないようにするために定めた。

* `master`ブランチへの直コミットは禁止
* `master`ブランチへのマージは`Merge pull request`で行う
* `master`ブランチ以外のブランチへのマージは`Squash and merge`で行う
* マージ済みブランチは`Delete`する
* `dependabot`によるプルリクエストは`Squash and merge`で処理する
  * プルリクエスト番号を残すため

## new

```shell
hexo new [layout] <title>
```

Creates a new article. If no layout is provided, Hexo will use the default_layout from _config.yml. If the title contains spaces, surround it with quotation marks.

## generate

```shell
hexo generate
```

Generates static files.
