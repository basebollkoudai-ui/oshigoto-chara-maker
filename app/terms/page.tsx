import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: '利用規約 | ワークモンスター診断',
  description: 'ワークモンスター診断の利用規約です。',
}

export default function TermsPage() {
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
            利用規約
          </h1>
          <p className="text-sm text-gray-500 mb-8">最終更新日：2025年2月</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">

            <section>
              <h2 className="text-lg font-rounded font-bold text-gray-800 mb-3 pb-2 border-b-2 border-primary-100">
                第1条（サービスの概要）
              </h2>
              <p>
                ワークモンスター診断（以下「本サービス」）は、20問の質問に答えることで仕事上のパーソナリティタイプを診断するエンターテインメント目的のウェブサービスです。個人開発者が提供しています。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-rounded font-bold text-gray-800 mb-3 pb-2 border-b-2 border-primary-100">
                第2条（診断結果の正確性について）
              </h2>
              <p className="mb-3">
                本サービスの診断結果はエンターテインメント目的で提供されるものであり、以下の点についてご了承ください。
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>診断結果の正確性・完全性・信頼性を一切保証しません。</li>
                <li>診断結果は科学的・医学的・心理学的な根拠を持つものではありません。</li>
                <li>診断結果をもとにした就職・転職・人事評価等の重要な意思決定への利用はお勧めしません。</li>
                <li>同じ方が回答しても、回答の内容によって異なる結果が表示される場合があります。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-rounded font-bold text-gray-800 mb-3 pb-2 border-b-2 border-primary-100">
                第3条（免責事項）
              </h2>
              <p className="mb-3">
                本サービスの利用に関して、以下の事項について運営者は一切の責任を負いません。
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>本サービスの利用または利用不能により生じた損害（直接的・間接的損害を含む）</li>
                <li>診断結果の内容に基づいて行ったいかなる行動・判断による結果</li>
                <li>システム障害・メンテナンス等による一時的なサービス停止</li>
                <li>第三者による不正アクセス・改ざん等</li>
                <li>本サービスへのリンクを通じてアクセスした外部サイトの内容</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-rounded font-bold text-gray-800 mb-3 pb-2 border-b-2 border-primary-100">
                第4条（SNSシェアについて）
              </h2>
              <p className="mb-3">
                本サービスでは診断結果のSNSシェアを歓迎しています。シェアの際は以下の点をご確認ください。
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>診断結果の画像・テキストをX（旧Twitter）・LINE・Instagram等でシェアいただけます。</li>
                <li>シェアの際はエンターテインメント目的である旨をご認識の上でご利用ください。</li>
                <li>他者を誹謗中傷する目的、または差別的・不適切な文脈でのシェアはお控えください。</li>
                <li>本サービスの画像・キャラクターデザインの著作権は運営者に帰属します。商業目的での無断使用は禁止します。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-rounded font-bold text-gray-800 mb-3 pb-2 border-b-2 border-primary-100">
                第5条（禁止事項）
              </h2>
              <p className="mb-3">ユーザーは以下の行為を行ってはなりません。</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>本サービスのシステム・コンテンツへの不正アクセス・改ざん・リバースエンジニアリング</li>
                <li>本サービスを利用した商業目的の活動（事前許可がある場合を除く）</li>
                <li>他のユーザーや第三者への迷惑・損害を与える行為</li>
                <li>法令または公序良俗に反する行為</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-rounded font-bold text-gray-800 mb-3 pb-2 border-b-2 border-primary-100">
                第6条（サービスの変更・終了）
              </h2>
              <p>
                運営者は、事前の通知なく本サービスの内容を変更・追加・削除、またはサービスを終了する権利を有します。これにより生じたいかなる損害についても運営者は責任を負いません。
              </p>
            </section>

            <section>
              <h2 className="text-lg font-rounded font-bold text-gray-800 mb-3 pb-2 border-b-2 border-primary-100">
                第7条（規約の変更）
              </h2>
              <p>
                運営者は必要に応じて本利用規約を変更することがあります。変更後の規約はサービス上に掲載した時点で効力を生じるものとします。
              </p>
            </section>

          </div>

          <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-between items-center">
            <Link
              href="/privacy"
              className="text-primary-600 hover:text-primary-700 font-rounded font-bold text-sm transition-colors"
            >
              プライバシーポリシーを見る →
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
