---
title: i-learn-git-tag
tags:
  - Git
date: 2019-12-13 16:31:17
category: Development
---

むしろ今まで知らなかったんかい、というお話。

<!-- more -->

---

## 目次

<!-- toc -->

## GitHubのReleaseを使ってみたかった

バージョン切って公開できるの便利そう

## GitHub Actionで自動化しようとした

`actions/create-release@v1.0.0`と`actions/upload-release-asset@v1.0.1`使えば簡単そうに見えた

## このタイミングで初めてGit Tagを知った

```
on:
  push:
    tags:
      - 'v*'
```

あっふーん。