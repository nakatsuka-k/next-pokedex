# ポケモン図鑑 (Pokemon Pokedex)

NextJS、TypeScript、Tailwind CSS、shadcn/uiを使用して作成したポケモン図鑑アプリです。

https://next-pokedex-vert.vercel.app/

<img width="1528" height="540" alt="image" src="https://github.com/user-attachments/assets/e7dffd3d-5122-43ff-8fe4-eb7b7ba7dcf4" />

## 🚀 機能

### 主要機能
- **ポケモン一覧表示**: 1ページあたり20体のポケモンを表示
- **ポケモン検索**: 日本語（ひらがな・カタカナ）と英語での部分一致検索（1ページあたり10体表示）
- **ポケモン詳細表示**: `/pokemon/[id]`パスでの詳細情報表示
- **ポケモン進化系統**: `/evolution/[id]`IDに対応するポケモンの進化前/進化後のポケモン、進化に必要な条件を表示
- **ナビゲーション**: 前後のポケモンへの矢印ナビゲーション

### 表示情報
- No、名前（日本語優先）、分類、タイプ、高さ（m表記）、重さ（kg表記）、特性
- 特性の説明（日本語優先、なければ「説明なし」）
- 分類がない場合は「分類なし」と表示

## 🛠️ 技術スタック

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **API**: PokéAPI (https://pokeapi.co/)

## 🚀 使用方法

1. 依存関係をインストール:
```bash
npm install
```

2. 開発サーバーを起動:
```bash
npm run dev
```

3. ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

4. プロダクションビルド:
```bash
npm run build
npm start
```

## 📁 プロジェクト構成

```
src/
├── app/
│   ├── page.tsx              # ホームページ
│   ├── pokemon/
│   │   ├── page.tsx          # ポケモン一覧ページ
│   │   └── [id]/
│   │       └── page.tsx      # ポケモン詳細ページ
│   └── search/
│       └── page.tsx          # 検索ページ
├── components/
│   ├── BackToListButton.tsx  # 一覧戻るボタン
│   ├── Header.tsx           # ヘッダーナビゲーション
│   ├── Loading.tsx          # ローディングコンポーネント
│   ├── Pagination.tsx       # ページネーション
│   ├── PokemonCard.tsx      # ポケモンカード
│   ├── SearchForm.tsx       # 検索フォーム
│   └── ui/                  # shadcn/uiコンポーネント
└── lib/
    ├── pokeapi.ts          # APIリクエスト関数
    ├── types.ts            # 型定義
    └── utils.ts            # ユーティリティ関数
```

## 🙏 謝辞

- [PokéAPI](https://pokeapi.co/) - ポケモンデータを提供
- [shadcn/ui](https://ui.shadcn.com/) - UIコンポーネント  
- [Lucide](https://lucide.dev/) - アイコンライブラリ
