import { Suspense } from 'react'
import { searchPokemon } from '@/lib/pokeapi'
import PokemonCard from '@/components/PokemonCard'
import Pagination from '@/components/Pagination'
import Loading from '@/components/Loading'
import SearchForm from '@/components/SearchForm'
import BackToListButton from '@/components/BackToListButton'

interface PageProps {
  searchParams: Promise<{
    q?: string
    page?: string
  }>
}

async function SearchResults({ query, page }: { query: string; page: number }) {
  const { pokemon, pagination } = await searchPokemon(query, page, 10)

  if (pokemon.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">
          「{query}」に一致するポケモンが見つかりませんでした。
        </p>
        <p className="text-gray-400 text-sm mt-2">
          別のキーワードで検索してみてください。
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6">
        <p className="text-gray-600">
          「{query}」の検索結果: {pokemon.length}件見つかりました
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
        {pokemon.map((poke) => (
          <PokemonCard key={poke.id} pokemon={poke} />
        ))}
      </div>
      
      <Pagination 
        pagination={pagination} 
        basePath="/search"
        searchParams={{ q: query }}
      />
    </>
  )
}

export default async function SearchPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  const query = resolvedSearchParams.q || ''
  const page = parseInt(resolvedSearchParams.page || '1', 10)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ポケモン検索
        </h1>
        <p className="text-gray-600 mb-6">
          ポケモンの名前で検索できます（日本語・英語対応）
        </p>
        
        <SearchForm />
      </div>

      {query && (
        <Suspense fallback={<Loading message="検索中..." />}>
          <SearchResults query={query} page={page} />
        </Suspense>
      )}

      {!query && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            上の検索フォームにポケモンの名前を入力してください
          </p>
        </div>
      )}

      <BackToListButton />
    </div>
  )
}
