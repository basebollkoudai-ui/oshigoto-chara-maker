# 🔥 仕事モンスター診断 (Next.js Version)

Next.js (App Router) + Tailwind CSS + TypeScript で作られた「仕事版MBTI」裏診断アプリです。

![Demo](https://via.placeholder.com/800x400/667eea/ffffff?text=Work+Monster+Quiz)

## ✨ 特徴

- 🎨 **モダンなUI**: Tailwind CSS + Framer Motion による洗練されたデザイン
- 🔄 **スムーズなアニメーション**: ページ遷移やインタラクションに滑らかなアニメーション
- 📱 **完全レスポンシブ**: スマホ・タブレット・デスクトップに最適化
- ⚡ **高速**: Next.js 14 App Router による最適化されたパフォーマンス
- 🎯 **16タイプ診断**: 4軸による精密な性格分類
- 🐾 **かわいい動物キャラクター**: koiキャラメーカー風のかわいい動物アイコン（🦁🦊🐻など）
- 📊 **スキル分析レーダーチャート**: 6軸（リーダーシップ、コミュ力、計画性、創造性、チーム力、技術力）のビジュアル表示
- 💼 **適性職種の提案**: あなたに向いている職種を4つ表示
- 💬 **パーソナライズアドバイス**: 16タイプ別の事前定義された辛口アドバイス（ストリーミング表示）
- 💾 **結果保存機能**: 診断結果をデータベースに自動保存（Supabase対応準備済み）
- 📸 **SNSシェア画像生成**: Next.js ImageResponse による美しい結果画像の自動生成（1200x630px OGP対応）
- 🎁 **画像ダウンロード**: 診断結果をPNG画像でダウンロード可能

## 🚀 技術スタック

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Charts**: カスタムSVGレーダーチャート
- **Database**: Supabase (準備済み、現在はモック)
- **Image Generation**: Next.js ImageResponse (next/og)

## 📦 インストール

```bash
# 依存パッケージをインストール
npm install

# または
yarn install

# または
pnpm install
```

### 🤖 AI機能のセットアップ（必須）

AI による超パーソナライズアドバイス機能を使用するには、Anthropic APIキーが必要です。

1. [Anthropic Console](https://console.anthropic.com/) でAPIキーを取得
2. `.env.local` ファイルを作成:

```bash
# .env.local
ANTHROPIC_API_KEY=sk-ant-api03-your-api-key-here
```

詳細は [API_SETUP.md](API_SETUP.md) を参照してください。

## 🛠️ 開発

```bash
# 開発サーバーを起動
npm run dev

# または
yarn dev

# または
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認できます。

## 🏗️ ビルド

```bash
# 本番用ビルド
npm run build

# ビルドした内容を起動
npm run start
```

## 📁 プロジェクト構造

```
work-monster-quiz/
├── app/
│   ├── api/
│   │   ├── generate-advice/  # AI アドバイス生成 API
│   │   │   └── route.ts
│   │   └── save-result/      # 結果保存 API
│   │       └── route.ts
│   ├── layout.tsx          # ルートレイアウト
│   ├── page.tsx            # ホームページ（スタート画面）
│   └── globals.css         # グローバルスタイル
├── components/
│   ├── Quiz.tsx            # クイズメインコンポーネント
│   ├── QuestionCard.tsx    # 質問カード
│   ├── ProgressBar.tsx     # プログレスバー
│   └── Result.tsx          # 結果表示（AI機能含む）
├── data/
│   ├── characters.json     # 16タイプのキャラクターデータ
│   └── questions.json      # 20問の質問データ
├── lib/
│   └── supabase-mock.ts    # Supabase モック（DB保存準備）
├── types/
│   └── quiz.ts             # TypeScript型定義
├── public/                 # 静的ファイル
├── .env.local              # 環境変数（APIキー）
├── API_SETUP.md            # AI機能セットアップガイド
├── tailwind.config.ts      # Tailwind設定
├── tsconfig.json           # TypeScript設定
└── package.json            # 依存関係
```

## 🎮 使い方

1. **ホーム画面**: 「診断を始める」ボタンをクリック
2. **質問画面**: 全20問に直感で回答
3. **結果画面**: あなたの仕事モンスタータイプを確認
4. **シェア**: 結果をSNSでシェア可能

## 🎨 カスタマイズ

### キャラクターを追加・変更

[data/characters.json](data/characters.json) を編集してください。

### 質問を追加・変更

[data/questions.json](data/questions.json) を編集してください。

### デザインのカスタマイズ

[tailwind.config.ts](tailwind.config.ts) でカラーパレットやアニメーションを変更できます。

```typescript
colors: {
  primary: {
    500: '#8b5cf6', // メインカラー
    600: '#7c3aed',
    // ...
  }
}
```

## 🌟 主な機能

### アニメーション

- **ページ遷移**: スムーズなスライドアニメーション
- **要素の登場**: Stagger効果による段階的な表示
- **ホバーエフェクト**: ボタンやカードにインタラクティブなアニメーション
- **プログレスバー**: 進捗に応じたスムーズなアニメーション

### UI/UX

- **1画面1質問**: 集中しやすいステップ形式
- **戻るボタン**: 前の質問に戻って回答を変更可能
- **プログレスバー**: 進捗状況を視覚的に表示
- **レスポンシブ**: あらゆるデバイスに対応

### 結果表示

- **詳細な分析**: 性格、長所、短所、裏の顔、アドバイス
- **視覚的な表現**: アイコンとカラーコーディング
- **シェア機能**: Twitter、一般的なシェア機能に対応

## 🔧 環境変数

現在、環境変数は不要です。将来的にAPI連携などを追加する場合は `.env.local` を作成してください。

## 📱 デプロイ

### Vercel (推奨)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

```bash
# Vercel CLIでデプロイ
npm install -g vercel
vercel
```

### その他のプラットフォーム

- **Netlify**: Next.js対応
- **AWS Amplify**: フルマネージド
- **自前サーバー**: `npm run build && npm run start`

## 🤝 貢献

プルリクエスト大歓迎！以下の手順で貢献できます：

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成

## 📄 ライセンス

MIT License - 自由に使用・改変できます。

## 🙏 謝辞

- デザインインスピレーション: Modern web design trends
- アイコン: [Lucide Icons](https://lucide.dev/)
- アニメーション: [Framer Motion](https://www.framer.com/motion/)

---

**作成日**: 2026-02-15
**バージョン**: 2.0.0
**Framework**: Next.js 14 + TypeScript + Tailwind CSS
