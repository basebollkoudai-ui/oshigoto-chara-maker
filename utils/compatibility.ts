// 相性診断ロジック

export interface CompatibilityResult {
  percentage: number
  message: string
  details: string[]
}

// キャラクタータイプ間の相性マトリクス
const compatibilityMatrix: Record<string, Record<string, number>> = {
  // アクティブリーダー (IGYS)
  'IGYS': {
    'IGYS': 70, // 同じタイプ - ぶつかることもあるが理解しやすい
    'IGYC': 85, // コミュニケーター - お互いを補完
    'IGAC': 80, // クリエイター - 実行力とアイデアの融合
    'IGAS': 75, // オーガナイザー - リーダーシップと計画性の組み合わせ
    'ITYS': 65, // スペシャリスト - アプローチの違いで時々衝突
    'ITYC': 70, // エキスパート - 専門性と行動力のバランス
    'ITAC': 75, // 研究者 - 深い知識と実行力
    'ITAS': 80, // アナリスト - データと行動の良い組み合わせ
    'SGYS': 60, // サポーター - ペースの違いでストレス
    'SGYC': 65, // メディエーター - 慎重さと行動力の違い
    'SGAC': 70, // デザイナー - 創造性と実行力
    'SGAS': 75, // コーディネーター - 計画性がサポート
    'STYS': 55, // 職人 - アプローチが真逆で難しい
    'STYC': 60, // エンジニア - 技術と行動力
    'STAC': 65, // サイエンティスト - 理論と実践
    'STAS': 70, // ストラテジスト - 戦略と実行の組み合わせ
  },
  // コミュニケーター (IGYC)
  'IGYC': {
    'IGYS': 85,
    'IGYC': 80,
    'IGAC': 90,
    'IGAS': 85,
    'ITYS': 70,
    'ITYC': 75,
    'ITAC': 80,
    'ITAS': 85,
    'SGYS': 75,
    'SGYC': 80,
    'SGAC': 85,
    'SGAS': 80,
    'STYS': 60,
    'STYC': 65,
    'STAC': 70,
    'STAS': 75,
  },
  // その他のタイプも同様に設定（簡略化のため一部のみ記載）
}

// デフォルトの相性スコア計算（マトリクスに定義がない場合）
function calculateDefaultCompatibility(code1: string, code2: string): number {
  let compatibility = 50 // ベーススコア

  // 同じ軸の場合は+10
  if (code1[0] === code2[0]) compatibility += 10 // 行動スタイル
  if (code1[1] === code2[1]) compatibility += 10 // 社交スタイル
  if (code1[2] === code2[2]) compatibility += 10 // モチベーション
  if (code1[3] === code2[3]) compatibility += 10 // 思考スタイル

  // 完全一致の場合は少し減点（同じタイプ同士はぶつかりやすい）
  if (code1 === code2) compatibility -= 10

  return Math.min(100, Math.max(0, compatibility))
}

export function getCompatibility(code1: string, code2: string): CompatibilityResult {
  // マトリクスから相性を取得、なければデフォルト計算
  const percentage = compatibilityMatrix[code1]?.[code2] ?? calculateDefaultCompatibility(code1, code2)

  let message = ''
  let details: string[] = []

  if (percentage >= 85) {
    message = '最高の相性！'
    details = [
      'お互いの強みを活かせる素晴らしい組み合わせです',
      '一緒に仕事をすることで相乗効果が期待できます',
      'コミュニケーションもスムーズに取れるでしょう',
    ]
  } else if (percentage >= 70) {
    message = 'とても良い相性'
    details = [
      'お互いを補完し合える良い関係が築けます',
      '少し調整は必要ですが、協力すれば大きな成果を出せます',
      '相手の視点を理解することでさらに良くなります',
    ]
  } else if (percentage >= 55) {
    message = '普通の相性'
    details = [
      '工夫次第で良い関係を築けます',
      'お互いの違いを認め合うことが大切です',
      'コミュニケーションを大切にしましょう',
    ]
  } else {
    message = '努力が必要な相性'
    details = [
      'アプローチの違いを理解し合う必要があります',
      'お互いの強みを認め合うことが重要です',
      '違いを学びの機会と捉えましょう',
    ]
  }

  return {
    percentage,
    message,
    details,
  }
}

// 全16タイプのリスト
export const allCharacterCodes = [
  'IGYS', 'IGYC', 'IGAC', 'IGAS',
  'ITYS', 'ITYC', 'ITAC', 'ITAS',
  'SGYS', 'SGYC', 'SGAC', 'SGAS',
  'STYS', 'STYC', 'STAC', 'STAS',
]
