# skawashima.com/blog

![last deploy](https://img.shields.io/github/last-commit/sKawashima/blog/master.svg?label=last%20deploy&style=flat-square)
![lgtm alart](https://img.shields.io/lgtm/alerts/github/sKawashima/blog?style=flat-square)
[![Node CI Status](https://github.com/sKawashima/blog/workflows/Node%20CI/badge.svg)](https://github.com/sKawashima/blog/actions?workflow=Node+CI)
[![twitter](https://img.shields.io/twitter/follow/_sKawashima.svg?style=social)](https://twitter.com/_sKawashima)

それなりに真面目に書く方のブログ

## 記事投稿先判断基準

当ブログ（Blog/hexo）はあくまでポートフォリオの一部として見せられるようなコンテンツであることを重要視する。
そのため、技術的情報、デザイン的情報、表現的情報を積極的にこちらのブログに記述するものであって、それ以外のものは基本的にBlog/lbに投稿する。

## GitHub運用方針

~~Networkが見えて幸せなことが殆どないため、2019/6/29に`Squash and merge`に変更~~

コミットメッセージを残したくなったので`Create a merge commits`に変更

* `master`ブランチへの直コミットは禁止
* マージは`Create a merge commits`で行う
* マージ済みブランチは`Delete`する
* `dependabot`によるプルリクエストは`Squash and merge`で処理する
  * プルリクエスト番号を残すため

## 記事執筆方針

* サイト外リンク：Markdown
  * プレビュー付きリンク： `{% linkPreview http://c16e.com/1511101558/ %}`
* サイト内リンク： `{% post_link file_name [text] %}`

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
