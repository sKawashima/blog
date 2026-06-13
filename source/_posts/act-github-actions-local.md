---
title: GitHub Actions をローカルで動作検証する方法
tags:
  - GitHub Actions
  - Docker
  - CI
date: 2026-06-13 14:58:49
category: Development
---

GitHub Actions のワークフローは、push してみるまで本当に動くかわからない。
構文を直しては push し、ログを眺めてはまた直す、という往復が地味につらい。

そんなときに使えるのが [`act`](https://github.com/nektos/act) 。
`.github/workflows/` の yml を読み、Docker コンテナ上で GitHub ランナーを再現してワークフローを実行してくれる。
push する前に、手元で挙動を確認できる。

<!-- more -->

---

## 目次

<!-- toc -->

## act とは

`act` は `.github/workflows/` の yml を読み込み、Docker コンテナ上で GitHub ランナーを再現してワークフローを実行する CLI。
push せずに挙動を確認できる。

用途によって使い分けるとよい。

- 構文ミスのような静的なチェックだけなら [`actionlint`](https://github.com/rhysd/actionlint) が軽量で速い
- 実際にジョブを動かして挙動を見たいなら `act`

## 準備

ローカルで **Docker が動いていれば OK**。
act が Docker API を叩いてコンテナを起動する。

```bash
docker info        # これが通れば動く
brew install act
```

初回実行時に使用イメージを聞かれる。
**Medium (`catthehacker/ubuntu:act-latest`)** が無難で、選択した結果は `~/.actrc` に保存される。

### Apple Silicon の設定

amd64 前提の action でコケることがあるので、`~/.actrc` に書いておくと安定する。

```
--container-architecture linux/amd64
-P ubuntu-latest=catthehacker/ubuntu:act-latest
```

## 基本コマンド

```bash
act -l                    # 実行されうるジョブ一覧（まずこれ）
act                       # 引数なしは push がデフォルト
act pull_request          # イベント指定
act -j <job_id>           # 特定ジョブだけ
act -n                    # dry-run（流れだけ確認）
act -v                    # verbose（デバッグ）
```

`act [<event>] [options]` という構造になっている。
イベントを指定しないと `on: push` 扱いになる点だけ覚えておけばよい。

## act は「イベントを発火」するツール

act は cron の時刻を評価するのではなく、**イベントを即座に発火**させる。

定期ジョブ（`on: schedule`）を試したいときは、`schedule` イベントを指定する。

```bash
act schedule              # schedule トリガーを即実行
act schedule -j nightly-build
```

- `cron: '0 9 * * *'` のような**時刻指定は無視され、その場で即実行**される
- 時間が来るのを待つわけではない

## `-j` に渡すのは「ジョブ ID」

`-j` で指定するのは `jobs:` 直下のキー（ID）であって、`name:` の表示名ではない。

```yaml
on:
  schedule:
    - cron: '0 0 * * *'

jobs:
  nightly-build:          # ← これが job ID（-j で指定するのはこっち）
    name: Nightly Build   # ← 表示名（-j では使わない）
    runs-on: ubuntu-latest
    steps:
      - run: echo "hello"
```

```bash
act schedule -j nightly-build   # OK
```

## シークレットと変数

`secrets` や `vars` を使うワークフローでは、値を明示的に渡す必要がある。

```bash
act schedule --secret-file .secrets   # KEY=value 形式のファイル
act schedule -s MY_TOKEN=xxxxx        # 個別指定
act schedule --var-file .vars         # variables (vars.*)
act schedule --env-file .env
```

`secrets.GITHUB_TOKEN` は自動では入らない。
必要なら、手元の `gh` から取得して渡すのが手軽だ。

```bash
act schedule -s GITHUB_TOKEN=$(gh auth token)
```

## 典型的な流れ

実際に試すときは、いきなり本実行せず段階を踏むと事故が少ない。

```bash
act -l schedule           # 1. 何が動くか確認
act schedule -n           # 2. dry-run で構成を見る
act schedule -j nightly-build   # 3. 本実行
```

## 詰まりやすい点

ローカル実行は便利だが、GitHub 上の環境を完全に再現できるわけではない。
以下は実際にハマりやすいポイント。

- デフォルトイメージは軽量で、`docker` コマンドや一部ツールが入っていないことがある。フル再現は `-P ubuntu-latest=catthehacker/ubuntu:full-latest`（ただし重い）
- `actions/cache` はローカルでは no-op になることがある
- matrix は全組み合わせ走る。重ければ `--matrix key:value` で絞る
- `windows-latest` / `macos-latest` ランナーは再現不可（Linux コンテナのみ）

## 所感

push してログを待つループから解放されるだけで、ワークフローを書く心理的なハードルがかなり下がる。
特に `on: schedule` のような「待たないと動かない」ものを即座に発火できるのは大きい。
完全再現ではないという前提さえ押さえておけば、CI を書くときの強力な相棒になる。

### 参考

- [nektos/act（公式リポジトリ）](https://github.com/nektos/act)
- [Introduction to Act | nektos/act | DeepWiki](https://deepwiki.com/nektos/act/1.1-introduction-to-act)
- [act for running GitHub Actions locally — SciPy Manual](https://docs.scipy.org/doc/scipy-1.13.1/dev/contributor/using_act.html)
- [Run GitHub Actions Locally with Act: A Developer's Guide — DEV Community](https://dev.to/tejastn10/run-github-actions-locally-with-act-a-developers-guide-1j33)
- [GitHub Actions Locally with act — Medium](https://medium.com/medialesson/github-actions-locally-with-act-c6f945309276)
