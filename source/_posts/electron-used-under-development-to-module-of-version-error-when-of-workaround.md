---
title: Electronを使った開発中に「このモジュール、バージョン合ってねえ！」って怒られたときの対処
tags:
  - Node.js
  - Electron
date: 2018-11-27 17:39:13
category: Development
---

> この記事はQiitaに書いていた自身の記事のコピーです。

これを解決します。

```shell
App threw an error during load
Error: The module '/Users/******/node_modules/serialport/build/Release/serialport.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION 57. This version of Node.js requires
NODE_MODULE_VERSION 64. Please try re-compiling or re-installing
the module (for instance, using `npm rebuild` or `npm install`).
    at process.module.(anonymous function) [as dlopen] (ELECTRON_ASAR.js:166:20)
    at Object.Module._extensions..node (internal/modules/cjs/loader.js:740:18)
    at Object.module.(anonymous function) [as .node] (ELECTRON_ASAR.js:166:20)
    at Module.load (internal/modules/cjs/loader.js:620:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:559:12)
    at Function.Module._load (internal/modules/cjs/loader.js:551:3)
    at Module.require (internal/modules/cjs/loader.js:658:17)
    at require (internal/modules/cjs/helpers.js:20:18)
    at bindings (/Users/skawashima/Works/Research/arduino/test-j5/node_modules/bindings/bindings.js:81:44)
    at Object.<anonymous> (/Users/skawashima/Works/Research/arduino/test-j5/node_modules/serialport/lib/bindings/darwin.js:2:36)
```

<!-- more -->

---

## 目次

<!-- toc -->

## 本編

注目すべきは、

```shell
was compiled against a different Node.js version using
NODE_MODULE_VERSION 57. This version of Node.js requires
```

このへん。
「このモジュール、バージョン合ってねえ！」ってことですね。

## 対処法

とあるGitHub issueにて、[ありがたいコメント](https://github.com/atom/node-keytar/issues/77#issuecomment-385841834)が有りました。

### ① `electron-rebuild`をインストール

```shell
$ yarn add electron-rebuild
# npm userであれば
$ npm install electron-rebuild
```

### ② `electron-rebuild`を実行

```shell
$ yarn electron-rebuild
# npm userであれば
# $ npx electron-rebuild
# (だっけ？)
```

## 解決

これだけで、Electronとバージョンが合ってないモジュールを自動でリコンパイルしてくれました。

やったぜ。
