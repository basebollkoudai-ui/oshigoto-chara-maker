# 🤖 AI機能のセットアップガイド

このガイドでは、Claude 3.5 Sonnetを使用した「超パーソナライズされた裏のアドバイス」機能のセットアップ方法を説明します。

## 📋 前提条件

- Anthropic APIアカウント
- APIキー（無料または有料プラン）

## 🔑 Anthropic APIキーの取得

### 1. アカウント作成

1. [Anthropic Console](https://console.anthropic.com/) にアクセス
2. 「Sign Up」でアカウント作成
3. メール認証を完了

### 2. APIキー発行

1. コンソールにログイン
2. 左メニューから「API Keys」を選択
3. 「Create Key」をクリック
4. キー名を入力（例: "work-monster-quiz"）
5. 生成されたキーをコピー（二度と表示されないので注意！）

### 3. 環境変数に設定

`.env.local` ファイルを編集：

```bash
# .env.local
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxx
```

**重要**: このファイルは絶対にGitにコミットしないでください！（`.gitignore`に含まれています）

## 💰 料金について

### 無料枠

- 新規アカウント: $5の無料クレジット付与
- Claude 3.5 Sonnet: 約1,000リクエスト分（200文字のレスポンス想定）

### 有料プラン

Claude 3.5 Sonnet (2024-10-22) の料金:
- Input: $3 / 1M tokens
- Output: $15 / 1M tokens

1回の診断あたりのコスト（概算）:
- Input: 約500 tokens（質問20問 + プロンプト）→ $0.0015
- Output: 約150 tokens（200文字のアドバイス）→ $0.00225
- **合計: 約$0.004 / 診断** （約0.6円）

1000人の診断で約$4（約600円）程度です。

## 🚀 動作確認

### 1. 開発サーバーを起動

```bash
npm run dev
```

### 2. 診断を実行

1. http://localhost:3000 にアクセス
2. 全20問に回答
3. 結果画面で「AIによる超パーソナライズされた裏のアドバイス」セクションを確認

### 3. 正常動作の確認

**成功時:**
- 「AIが考え中...」のローディング表示
- 文字がストリーミングで徐々に表示される
- 200文字程度の辛口アドバイスが表示される

**失敗時:**
- 「AIアドバイスの生成に失敗しました」のエラーメッセージ
- ブラウザのコンソールにエラーログ

## 🔧 トラブルシューティング

### APIキーが無効

**エラー:** `authentication_error` または `invalid_api_key`

**解決策:**
1. APIキーが正しくコピーされているか確認
2. `.env.local` ファイルの場所が正しいか確認
3. 開発サーバーを再起動（環境変数の再読み込み）

```bash
# サーバーを停止 (Ctrl+C)
npm run dev  # 再起動
```

### レート制限エラー

**エラー:** `rate_limit_error`

**解決策:**
- 無料枠を使い切った可能性
- [Console](https://console.anthropic.com/) で使用量を確認
- 必要に応じて課金設定

### ストリーミングが表示されない

**症状:** AIアドバイスが一度に全部表示される

**原因:** Edge Runtimeの設定ミス

**確認:**
```typescript
// app/api/generate-advice/route.ts
export const runtime = 'edge' // この行があるか確認
```

### タイムアウトエラー

**エラー:** `timeout`

**原因:** Claudeのレスポンスが遅い

**解決策:**
```typescript
// API Route でタイムアウトを延長
export const maxDuration = 60 // 60秒に延長
```

## 🎨 カスタマイズ

### プロンプトの変更

[app/api/generate-advice/route.ts](app/api/generate-advice/route.ts:44-70) を編集：

```typescript
const prompt = `あなたはキャリアコンサルタントであり...

【出力形式】
- 毒舌だが愛のある口調で  // ← ここを変更
- 200文字以内で簡潔に      // ← 文字数を調整
...`
```

### モデルの変更

より高性能なモデルを使用する場合:

```typescript
const stream = await anthropic.messages.stream({
  model: 'claude-opus-4-20250514', // Opus 4に変更（高精度・高コスト）
  max_tokens: 500,
  ...
})
```

モデル比較:
- `claude-3-5-sonnet-20241022`: バランス型（推奨）
- `claude-opus-4-20250514`: 最高性能（高コスト）
- `claude-3-5-haiku-20241022`: 高速・低コスト

### 文字数の調整

```typescript
max_tokens: 500,  // 約200文字
// max_tokens: 1000,  // 約400文字（コスト2倍）
```

## 📊 データベース保存（オプション）

現在、診断結果はモックデータベース（メモリ内）に保存されています。

### Supabaseへの移行（本番環境推奨）

1. [Supabase](https://supabase.com/) でプロジェクト作成
2. [lib/supabase-mock.ts](lib/supabase-mock.ts:144-185) のSQLを実行
3. Supabaseクライアントをインストール:

```bash
npm install @supabase/supabase-js
```

4. `.env.local` に追加:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. [lib/supabase-mock.ts](lib/supabase-mock.ts) の実装を置き換え

詳細は `lib/supabase-mock.ts` のコメントを参照してください。

## 🔐 セキュリティ

### 重要な注意事項

1. **APIキーを公開しない**
   - `.env.local` はGitにコミットしない
   - フロントエンドにAPIキーを含めない
   - 必ずサーバーサイド（API Route）で使用

2. **レート制限の設定**
   - 本番環境ではレート制限を実装
   - 1ユーザーあたりの診断回数を制限

3. **コスト管理**
   - Anthropic Consoleで予算アラートを設定
   - 使用量を定期的に監視

## 📈 監視とログ

### ログ確認

開発環境:
```bash
# ターミナルでログを確認
npm run dev
```

本番環境（Vercel）:
```bash
# Vercel CLIでログを確認
vercel logs
```

### 保存された結果の確認

```typescript
import { getAllDiagnosisResults } from '@/lib/supabase-mock'

// コンソールで確認
const results = await getAllDiagnosisResults(10)
console.log(results)
```

## 🚀 デプロイ

### Vercelへのデプロイ

1. Vercelにプロジェクトをインポート
2. 環境変数を設定:
   - `ANTHROPIC_API_KEY` を追加
3. デプロイ

環境変数の設定方法:
- Vercel Dashboard → Settings → Environment Variables
- `ANTHROPIC_API_KEY` = `sk-ant-api03-...`

## 💡 Tips

- **開発中**: 無料枠を節約するため、テスト時はAI機能をオフにすることも検討
- **本番環境**: キャッシュを実装して同じ回答パターンには同じアドバイスを返す
- **コスト削減**: 人気の高い回答パターンは事前生成してDBに保存

---

ご不明点があれば、[Anthropic API Documentation](https://docs.anthropic.com/) を参照してください。
