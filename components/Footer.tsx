import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="relative z-20 bg-white/80 backdrop-blur-sm border-t border-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 font-rounded">
            © 2025 ワークモンスター診断
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/terms"
              className="text-xs text-gray-500 hover:text-primary-600 font-rounded transition-colors"
            >
              利用規約
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-gray-500 hover:text-primary-600 font-rounded transition-colors"
            >
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
