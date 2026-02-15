# 📸 シェア画像生成機能ガイド

このガイドでは、診断結果のSNSシェア用画像生成機能について説明します。

## 🎨 機能概要

診断結果をSNS（X/Twitter、Instagram、Facebookなど）でシェアする際に、以下のような美しい画像が自動生成されます：

- **サイズ**: 1200x630px（OGP推奨サイズ）
- **内容**: キャラクタータイプ、名前、サブタイトル
- **デザイン**: 紫のグラデーション背景、キャラクターアイコン

## 🚀 使い方

### 1. 結果画面でのシェア

診断結果画面に以下のボタンがあります：

#### 📱 画像付きでシェア
- モバイル/デスクトップのネイティブシェア機能を使用
- 画像ファイルとテキストを同時にシェア
- 対応アプリ: LINE、Instagram、Facebook、Twitter など

#### 🐦 X でシェア
- X（旧Twitter）専用のシェアボタン
- 画像URLとテキストをツイートに含める
- 新しいタブでX投稿画面が開く

#### 💾 結果画像をダウンロード
- PNG形式で画像をローカルに保存
- ファイル名: `work-monster-{タイプコード}.png`
- SNS投稿や保存用に利用可能

### 2. API エンドポイント

画像は以下のAPIエンドポイントで生成されます：

```
GET /api/og-image?code={タイプコード}&name={キャラ名}&subtitle={サブタイトル}
```

#### パラメータ

- `code`: キャラクタータイプコード（例: `IGYS`）
- `name`: キャラクター名（例: `起業家ライオン`）
- `subtitle`: サブタイトル（例: `俺についてこい系迷惑上司`）

#### 使用例

```
https://your-domain.com/api/og-image?code=IGYS&name=起業家ライオン&subtitle=俺についてこい系迷惑上司
```

## 🛠️ 技術仕様

### 使用ライブラリ

- **satori**: React コンポーネントをSVGに変換
- **@resvg/resvg-js**: SVGをPNGに変換
- **Edge Runtime**: 高速なレスポンス生成

### 画像生成フロー

1. クライアントから画像リクエスト
2. パラメータを受け取る（タイプコード、名前、サブタイトル）
3. Reactコンポーネント（JSX）でレイアウトを定義
4. satoriがReactコンポーネントをSVGに変換
5. resvg-jsがSVGをPNGに変換
6. PNGバイナリをレスポンスとして返す

### キャッシュ

```typescript
'Cache-Control': 'public, immutable, no-transform, max-age=31536000'
```

- 生成された画像は1年間キャッシュされます
- 同じパラメータの画像は再生成されません
- CDN/ブラウザキャッシュで高速配信

## 🎨 デザインカスタマイズ

### 背景グラデーションの変更

[app/api/og-image/route.tsx](app/api/og-image/route.tsx) を編集：

```typescript
background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
// ↓ 例: 赤系グラデーション
background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
```

### フォントの追加

```typescript
const svg = await satori(
  <div>...</div>,
  {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Noto Sans JP',
        data: fontData, // フォントバイナリデータ
        weight: 700,
        style: 'normal',
      },
    ],
  }
)
```

### レイアウトの変更

JSXを編集してレイアウトをカスタマイズ：

```typescript
<div style={{ display: 'flex', ... }}>
  {/* カスタムレイアウト */}
</div>
```

## 📱 SNS別シェア方法

### X (Twitter)

```typescript
const text = `診断結果のテキスト`
const imageUrl = `/api/og-image?code=...`
const tweetUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text + '\n\n' + imageUrl)}`
window.open(tweetUrl, '_blank')
```

### Instagram

Instagram APIは画像URLのみのシェアに非対応のため：
1. 「結果画像をダウンロード」ボタンで画像を保存
2. Instagram アプリで手動投稿

### LINE

Web Share API経由で画像を共有：

```typescript
await navigator.share({
  title: '診断結果',
  text: 'テキスト',
  files: [imageFile],
})
```

### Facebook

Open Graphメタタグを設定（動的ページの場合）：

```html
<meta property="og:image" content="https://your-domain.com/api/og-image?..." />
<meta property="og:title" content="仕事モンスター診断" />
<meta property="og:description" content="診断結果" />
```

## 🔧 トラブルシューティング

### 画像が生成されない

**症状:** 画像URLにアクセスすると500エラー

**原因と解決策:**

1. **Edge Runtimeの問題**
   ```typescript
   export const runtime = 'edge' // この行があるか確認
   ```

2. **依存関係の不足**
   ```bash
   npm install satori @resvg/resvg-js
   ```

3. **メモリ不足**
   - Vercelの場合: Function設定でメモリを増やす
   - ローカルの場合: Node.jsのメモリ制限を増やす

### 画像が文字化けする

**原因:** フォントが埋め込まれていない

**解決策:**
1. Google Fonts などから日本語フォントをダウンロード
2. フォントバイナリを読み込んで設定

```typescript
import fs from 'fs'

const fontData = fs.readFileSync('./fonts/NotoSansJP-Bold.ttf')

fonts: [
  {
    name: 'Noto Sans JP',
    data: fontData,
    weight: 700,
  },
]
```

### シェア時に画像が表示されない

**症状:** XやFacebookでシェアしても画像プレビューが出ない

**原因:**
- OGPメタタグが設定されていない
- 画像URLが相対パスになっている
- SNSのキャッシュ

**解決策:**
1. 絶対URLを使用（`https://...`）
2. OGPメタタグを設定
3. SNSのデバッガーでキャッシュをクリア
   - X: https://cards-dev.twitter.com/validator
   - Facebook: https://developers.facebook.com/tools/debug/

### ダウンロードボタンが動かない

**症状:** クリックしても何も起きない

**原因:** ブラウザのセキュリティ設定

**解決策:**
```typescript
// CORSヘッダーを確認
headers: {
  'Content-Type': 'image/png',
  'Access-Control-Allow-Origin': '*', // 追加
}
```

## 📊 パフォーマンス最適化

### 1. 画像サイズの最適化

```typescript
const resvg = new Resvg(svg, {
  fitTo: {
    mode: 'width',
    value: 1200,
  },
  // 圧縮オプション
})
```

### 2. CDN の活用

Vercel / Netlify などのCDNを利用：
- 自動的に画像がエッジにキャッシュされる
- 世界中から高速アクセス可能

### 3. 事前生成（オプション）

人気の高いタイプの画像を事前生成：

```bash
# ビルド時に全タイプの画像を生成
for code in IGYS STAS ITAC ...; do
  curl "http://localhost:3000/api/og-image?code=$code&..." > "public/og/$code.png"
done
```

## 🎯 ベストプラクティス

### 1. 画像サイズ

- **推奨**: 1200x630px（OGP標準）
- **最小**: 600x314px
- **最大**: 1200x630px（これ以上は読み込みが遅い）

### 2. テキスト量

- キャラクター名: 15文字以内
- サブタイトル: 30文字以内
- 説明文: 50文字以内

### 3. コントラスト

- 背景と文字のコントラスト比: 4.5:1以上
- 画像が小さく表示されても読めるように

### 4. ファイルサイズ

- 目標: 300KB以下
- 推奨: 150KB以下（モバイル環境考慮）

## 📱 モバイル対応

### Web Share API

```typescript
if (navigator.share) {
  // モバイル環境: ネイティブシェア
  await navigator.share({
    title: 'タイトル',
    text: 'テキ��ト',
    files: [imageFile],
  })
} else {
  // デスクトップ: ダウンロードまたはURL共有
  downloadImage()
}
```

### レスポンシブ対応

画像は自動的にリサイズされますが、モバイルプレビュー用に小さいバージョンも用意可能：

```
/api/og-image?code=IGYS&size=small  // 600x314px
/api/og-image?code=IGYS&size=large  // 1200x630px (デフォルト)
```

## 🔐 セキュリティ

### XSS対策

パラメータはすべてエスケープ処理：

```typescript
const name = searchParams.get('name') || ''
// satoriが自動的にエスケープ
```

### レート制限

APIエンドポイントにレート制限を実装（推奨）：

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  // IP アドレスごとに 1分間に10リクエストまで
  const ip = request.ip
  // レート制限ロジック
}
```

---

## 📞 サポート

問題が解決しない場合:
- GitHub Issues で報告
- [satori Documentation](https://github.com/vercel/satori)
- [Vercel OG Image Generation](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation)
