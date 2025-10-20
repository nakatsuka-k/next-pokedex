import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ポケモン図鑑へようこそ
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          お気に入りのポケモンを探してみましょう！
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-2xl">ポケモン一覧</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              すべてのポケモンを一覧で表示します。画像をクリックして詳細を確認できます。
            </p>
            <Link href="/pokemon">
              <Button className="w-full">
                一覧を見る
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-2xl">ポケモン検索</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              名前で検索してお気に入りのポケモンを見つけましょう。日本語で検索できます。
            </p>
            <Link href="/search">
              <Button className="w-full" variant="outline">
                検索する
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* 機能紹介セクション */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">主な機能</h2>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✅</span>
              ポケモン一覧表示（20体/ページ）
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✅</span>
              ポケモン名での検索機能（日本語・英語対応）
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✅</span>
              ポケモン詳細情報の表示
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✅</span>
              進化系統図の表示（進化条件付き）
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✅</span>
              前後のポケモンへのナビゲーション
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-3">✅</span>
              レスポンシブデザイン対応
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-500">
          このアプリは{' '}
          <a 
            href="https://pokeapi.co/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            PokéAPI
          </a>
          {' '}を使用しています
        </p>
      </div>
    </div>
  );
}
