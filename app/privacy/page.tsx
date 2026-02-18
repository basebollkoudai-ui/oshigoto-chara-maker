import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'プライバシーポリシー | ワークモンスター診断',
  description: 'ワークモンスター診断のプライバシーポリシーです。',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink via-pastel-purple to-pastel-blue py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-pop-lg p-6 sm:p-8 md:p-10">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-rounded font-bold text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              トップに戻る
            </Link>
          </div>

          <h1 className="text-2xl sm:text-3xl font-rounded font-bold text-gray-800 mb-2">
            プライバシーポリシー
          </h1>
          <p className="text-sm text-gray-500 mb-8">最終更新日：2025年2月</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">

            <section>
              <h2 className="text-lg font-rounded font-bold text-gray-800 mb-3 pb-2 border-b-2 border-primary-100">
                1. 基本方針
              </h2>
              <p>
                ワークモンスター診断（以下「本サービス」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。本プライバシーポリシーは、本サービスにおける情報の取り扱いについて説明します。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-rounded font-bold text-gray-800 mb-3 pb-2 border-b-2 border-primary-100">
                2. 収集する情報
              </h2>
              <p className="mb-3">本サービスでは以下の情報を収集する場合があります。</p>

              <h3 className="font-bold text-gray-700 mb-2">■ 診断回答データ</h3>
              <ul className="list-disc list-inside space-y-1 ml-2 mb-4">
                <li>20問の診断質問への回答内容</li>
                <li>選択したMBTIタイプ（任意入力）</li>
                <li>診断結果のタイプコード</li>
              </ul>

              <h3 className="font-bold text-gray-700 mb-2">■ アクセスログ</h3>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>IPアドレス（匿名化処理済み）</li>
                <li>ブラウザの種類・バージョン</li>
                <li>アクセス日時・ページ閲覧履歴</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-rounded font-bold text-gray-800 mb-3 pb-2 border-b-2 border-primary-100">
                3. 個人を特定しない旨
              </h2>
              <div className="bg-primary-50 rounded-xl p-4 mb-3">
                <p className="font-bold text-primary-700">
                  本サービスは、ユーザーの個人を特定する情報（氏名・住所・電話番号・メールアドレス等）を収集しません。
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>会員登録・ログイン機能は存在しないため、ユーザーを個人として識別することはできません。</li>
                <li>収集される診断回答データはいかなる方法によっても特定の個人と結びつけることはできません。</li>
                <li>MBTIタイプの選択は任意であり、入力しなくても診断を受けられます。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-rounded font-bold text-gray-800 mb-3 pb-2 border-b-2 border-primary-100">
                4. 情報の利用目的
              </h2>
              <p className="mb-3">収集した情報は以下の目的のみに使用します。</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>サービスの提供・改善：</strong>診断ロジックの精度向上、バグ修正</li>
                <li><strong>統計的分析：</strong>どの診断結果が多いか等の集計（個人を特定しない形式）</li>
                <li><strong>不正利用の防止：</strong>システムへの攻撃・悪用の検知・対策</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-rounded font-bold text-gray-800 mb-3 pb-2 border-b-2 border-primary-100">
                5. 統計データの活用
              </h2>
              <p className="mb-3">
                収集した診断回答データは、個人を特定できない統計データとして以下の目的に活用する場合があります。
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>「全回答者のうち○%がXXタイプ」等の統計情報の公表</li>
                <li>質問内容・診断アルゴリズムの改善</li>
                <li>サービスに関するブログ記事・報告書等への掲載</li>
              </ul>
              <p className="mt-3 text-sm text-gray-500">
                ※ いずれの場合も個人を特定できる形での公表は行いません。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-rounded font-bold text-gray-800 mb-3 pb-2 border-b-2 border-primary-100">
                6. 第三者への情報提供
              </h2>
              <p className="mb-3">以下の場合を除き、収集した情報を第三者に提供することはありません。</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>法令に基づく開示要求があった場合</li>
                <li>ユーザーの同意がある場合</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-rounded font-bold text-gray-800 mb-3 pb-2 border-b-2 border-primary-100">
                7. アクセス解析ツールの利用
              </h2>
              <p>
                本サービスでは、サービス改善のためにアクセス解析ツール（Google Analytics等）を使用する場合があります。これらのツールはCookieを使用してアクセス情報を収集しますが、個人を特定する情報は収集しません。Cookieの利用はブラウザの設定で無効にできます。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-rounded font-bold text-gray-800 mb-3 pb-2 border-b-2 border-primary-100">
                8. ローカルストレージについて
              </h2>
              <p>
                本サービスでは、過去の診断結果を端末に保存するためにブラウザのローカルストレージを使用します。このデータはユーザーの端末内にのみ保存され、運営者のサーバーには送信されません。ブラウザのデータをクリアすることでいつでも削除できます。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-rounded font-bold text-gray-800 mb-3 pb-2 border-b-2 border-primary-100">
                9. プライバシーポリシーの変更
              </h2>
              <p>
                本プライバシーポリシーは必要に応じて変更する場合があります。変更後のポリシーはサービス上に掲載した時点で効力を生じます。
              </p>
            </section>

          </div>

          <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-between items-center">
            <Link
              href="/terms"
              className="text-primary-600 hover:text-primary-700 font-rounded font-bold text-sm transition-colors"
            >
              利用規約を見る →
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-pink via-primary-500 to-accent-blue text-white font-rounded font-bold py-3 px-6 rounded-full shadow-pop hover:shadow-pop-lg transition-all text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              診断を始める
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
