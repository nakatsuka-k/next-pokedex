import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { ProcessedPokemon } from '@/lib/types'

interface PokemonCardProps {
  pokemon: ProcessedPokemon
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <Card className="group hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <CardContent className="p-4">
          <div className="aspect-square relative mb-3">
            <Image
              src={pokemon.imageUrl}
              alt={pokemon.japaneseName || pokemon.name}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-200"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">No.{pokemon.id.toString().padStart(3, '0')}</p>
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              {pokemon.japaneseName || pokemon.name}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default PokemonCard
