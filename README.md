# RESAS総人口推移グラフ

## 概要
- 株式会社ゆめみのフロントエンドコーディング試験で作成したリポジトリ

## 開発環境
- ビルドツール
    - vite（v3.0.9）
- フレームワーク
    - vue（v3.2.38）

## クローン後
```shell
# パッケージインストール
yarn install

# ローカルサーバー起動
yarn dev

# ビルド
yarn build
```

## ファイル構成
```shell
.
├── README.md
├── env.d.ts
├── package.json
├── public
│   └── favicon.ico
├── resas
│   └── index.html
├── src
│   ├── @types
│   │   └── resas.d.ts
│   ├── App.vue
│   ├── api
│   │   └── resas.ts # RESAS APIの処理をまとめたファイル
│   ├── assets
│   │   └── scss
│   │       └── utility
│   │           ├── _function.scss
│   │           ├── _index.scss
│   │           ├── _mixin.scss
│   │           └── _variables.scss
│   ├── components
│   │   ├── AppHeader.vue
│   │   ├── ChartGraph.vue
│   │   └── PrefList.vue
│   └── main.ts # エントリーポイント
├── tsconfig.config.json
├── tsconfig.json
├── vite.config.ts
└── yarn.lock
```

## 注意
- このリポジトリは試験用のため完全には動作しません

## 著者
- Ryosuke（[@dmpfile](https://github.com/dmpfile)）

