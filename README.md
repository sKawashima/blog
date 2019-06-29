# skawashima.com/blog

![last deploy](https://img.shields.io/github/last-commit/sKawashima/blog/master.svg?label=last%20deploy&style=flat-square)
![twitter](https://img.shields.io/twitter/follow/sk_creator.svg?style=social)

|deploy|build/textlint|
|:-:|:-:|
|[![wercker status](https://app.wercker.com/status/bdfe562be9e172b083555c9875ce44cd/m/master "wercker status")](https://app.wercker.com/project/byKey/bdfe562be9e172b083555c9875ce44cd)|[![wercker status](https://app.wercker.com/status/bdfe562be9e172b083555c9875ce44cd/m/ "wercker status")](https://app.wercker.com/project/byKey/bdfe562be9e172b083555c9875ce44cd)|

それなりに真面目に書く方のブログ

## GitHub運用方針

Networkが見えて幸せなことが殆どないため、2019/6/29に`Squash and merge`に変更

* `master`ブランチへの直コミットは禁止
* `master`ブランチへのマージは`Squash and merge`で行う
* `master`ブランチ以外のブランチへのマージは`Merge pull request`で行う
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
