# 🚀 セットアップガイド

このガイドでは、仕事モンスター診断アプリをローカル環境で起動する手順を説明します。

## 📋 前提条件

以下がインストールされている必要があります：

- **Node.js**: v18.17.0 以上
- **npm**: v9.0.0 以上（Node.jsに付属）

### Node.jsのインストール確認

```bash
node --version
npm --version
```

もしインストールされていない場合は、[Node.js公式サイト](https://nodejs.org/)からダウンロードしてください。

## 🛠️ セットアップ手順

### 1. プロジェクトディレクトリに移動

```bash
cd /Users/kodaiseta/work-monster-quiz
```

### 2. 依存パッケージをインストール

```bash
npm install
```

このコマンドで以下のパッケージがインストールされます：
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

インストールには数分かかる場合があります。

### 3. 開発サーバーを起動

```bash
npm run dev
```

成功すると、以下のようなメッセージが表示されます：

```
  ▲ Next.js 14.2.0
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.3s
```

### 4. ブラウザで確認

ブラウザで以下のURLを開いてください：

```
http://localhost:3000
```

## 🎯 動作確認

正常に動作している場合、以下の画面が表示されます：

1. **ホーム画面**: 紫のグラデーション背景に「仕事モンスター診断」のタイトル
2. **診断開始ボタン**: クリックすると質問画面に遷移
3. **質問画面**: 1問ずつ表示される質問に回答
4. **結果画面**: 診断結果とキャラクター詳細が表示

## 🔧 トラブルシューティング

### ポート3000が使用中

別のアプリが3000番ポートを使用している場合：

```bash
# 別のポートで起動
PORT=3001 npm run dev
```

### 依存関係のエラー

node_modulesを削除して再インストール：

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### TypeScriptのエラー

型定義ファイルを再生成：

```bash
npm run build
```

### Tailwind CSSが適用されない

以下を確認：
1. `app/globals.css` が正しくインポートされているか
2. `tailwind.config.ts` のcontentパスが正しいか
3. PostCSSが正しく設定されているか

```bash
# 開発サーバーを再起動
# Ctrl+C で停止後、再度起動
npm run dev
```

## 📦 本番ビルド

本番環境用にビルドする場合：

```bash
# 最適化されたビルドを作成
npm run build

# ビルドしたアプリを起動
npm run start
```

ビルド完了後、`http://localhost:3000` でアクセスできます。

## 🌐 デプロイ

### Vercelにデプロイ（最も簡単）

1. [Vercel](https://vercel.com) にアカウント作成
2. GitHubリポジトリをVercelに接続
3. 自動的にビルド＆デプロイ

または、Vercel CLIを使用：

```bash
npm install -g vercel
vercel
```

### その他のプラットフォーム

- **Netlify**: `npm run build` → `.next` フォルダをデプロイ
- **自前サーバー**: Node.js環境で `npm run start`

## 📝 開発時のTips

### ホットリロード

ファイルを編集すると自動的にブラウザが更新されます。

### ログ確認

開発サーバーのターミナルでエラーやログを確認できます。

### 型チェック

TypeScriptの型エラーをチェック：

```bash
npx tsc --noEmit
```

### Lintチェック

コードスタイルをチェック：

```bash
npm run lint
```

## 🎨 カスタマイズ

### カラーテーマの変更

[tailwind.config.ts](tailwind.config.ts:11-20) を編集：

```typescript
colors: {
  primary: {
    500: '#8b5cf6', // ← ここを変更
  }
}
```

### キャラクターデータの編集

[data/characters.json](data/characters.json) を編集：

```json
{
  "code": "IGYS",
  "name": "新しいモンスター名",
  // ...
}
```

### 質問データの編集

[data/questions.json](data/questions.json) を編集：

```json
{
  "id": 1,
  "question": "新しい質問？",
  "options": [...]
}
```

## 💡 よくある質問

### Q: Node.jsのバージョンはどれを使えばいい？
A: LTS版（v18以上）を推奨します。

### Q: yarnやpnpmは使える？
A: はい、どちらも使用可能です。

```bash
yarn install
yarn dev

# または
pnpm install
pnpm dev
```

### Q: データベースは必要？
A: いいえ、完全にフロントエンドのみで動作します。

### Q: 環境変数は必要？
A: 現在は不要です。将来的に機能追加する場合は `.env.local` を作成してください。

## 📞 サポート

問題が解決しない場合：

1. [GitHub Issues](https://github.com/your-repo/issues) で報告
2. README.mdの詳細ドキュメントを確認
3. Next.js公式ドキュメントを参照

---

Happy Coding! 🎉
