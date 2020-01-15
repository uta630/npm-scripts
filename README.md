## Welcome👋
npm scriptsの環境を作りました
|使用しているもの|
|:-----------|
| ejs        |
| scss       |
| webpack    |
| TypeScript |
| eslint     |
| stylelint  |
| Jest       |

---

## インストール
```sh
npm i
```

## 構成
| ディレクトリ | 用途 |
|:-----------|:----|
| src        | 作業 |
| dist       | 出力 |
※公開ファイルの生成もdistにされます

## 使い方
```sh
# 開発環境の監視
npm run watch:all

# 開発環境のコード整形 : eslint/stylelint
npm run format:all

# jsファイルのテスト : Jest
npm run test

# 公開ファイルの生成 : distに出力したcss/jsを圧縮してmapを削除
npm run prepare:all
```

## その他
watchファイル以外にもdistに出力したいファイルは `cpx` を導入して設定する。
```sh
# パッケージのインストール
npm i cpx -D
```
sitemap.xmlやrobots.txtなどに利用できる。
```sh
# スクリプト
"scripts": {
    "copy:sitemapxml": "cpx \"src/sitemap.xml\" dist/",
    "copy:robotstxt": "cpx \"src/robots.txt\" dist/"
}
```