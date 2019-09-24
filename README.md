## Welcome👋

Gulpを簡単に始められるようまとめました

---

## インストール

```sh
npm i
```

## 使い方

```sh
# 開発ファイルの生成
npm run start
npm run dev

# 開発環境を監視
npm run watch

# 公開用ファイルの生成
npm run prod
```

## 作業ディレクトリ
| ディレクトリ | 用途                |
|:----------:|:------------------:|
| src        | 作業用ディレクトリ    |
| dist       | 開発ファイルの生成箇所 |
| prod       | 公開ファイルの生成箇所 |

## 環境設定
```js
/* gulpfile.js */
const config = {
  development: { // 開発用
    root: 'dist',
    path: {
      absolute: '絶対パス',
      relative: '相対パス',
    }
  },
  production : { // 公開用
    root: 'prod',
    path: {
      absolute: '絶対パス',
      relative: '相対パス',
    }
  }
};
```