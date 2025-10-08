import { Suspense } from 'react'
import { getProcessedPokemonList } from '@/lib/pokeapi'
import PokemonCard from '@/components/PokemonCard'
import Pagination from '@/components/Pagination'
import Loading from '@/components/Loading'

interface PageProps {
  searchParams: Promise<{
    page?: string
  }>
}

async function PokemonList({ page }: { page: number }) {
  const { pokemon, pagination } = await getProcessedPokemonList(page, 20)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
        {pokemon.map((poke) => (
          <PokemonCard key={poke.id} pokemon={poke} />
        ))}
      </div>
      
      <Pagination 
        pagination={pagination} 
        basePath="/pokemon" 
      />
    </>
  )
}

export default async function PokemonListPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams
  const page = parseInt(resolvedSearchParams.page || '1', 10)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ポケモン一覧
        </h1>
        <p className="text-gray-600">
          画像をクリックして詳細を表示できます
        </p>
      </div>

      <Suspense fallback={<Loading message="ポケモンを読み込み中..." />}>
        <PokemonList page={page} />
      </Suspense>
    </div>
  )
}
