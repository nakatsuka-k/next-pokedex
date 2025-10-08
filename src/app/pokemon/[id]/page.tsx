import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getProcessedPokemon, getAdjacentPokemon } from '@/lib/pokeapi'
import BackToListButton from '@/components/BackToListButton'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PokemonDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const id = parseInt(resolvedParams.id, 10)
  
  if (isNaN(id) || id < 1) {
    notFound()
  }

  try {
    const [pokemon, adjacent] = await Promise.all([
      getProcessedPokemon(id),
      getAdjacentPokemon(id)
    ])

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Navigation arrows */}
        <div className="flex justify-between items-center mb-8">
          {adjacent.prev ? (
            <Link href={`/pokemon/${adjacent.prev.id}`}>
              <Button variant="outline" size="sm" className="md:size-lg">
                <ChevronLeft className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">{adjacent.prev.japaneseName || adjacent.prev.name}</span>
                <span className="sm:hidden">前</span>
              </Button>
            </Link>
          ) : (
            <div></div>
          )}
          
          {adjacent.next ? (
            <Link href={`/pokemon/${adjacent.next.id}`}>
              <Button variant="outline" size="sm" className="md:size-lg">
                <span className="hidden sm:inline">{adjacent.next.japaneseName || adjacent.next.name}</span>
                <span className="sm:hidden">次</span>
                <ChevronRight className="h-4 w-4 ml-1 md:ml-2" />
              </Button>
            </Link>
          ) : (
            <div></div>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">
                  No.{pokemon.id.toString().padStart(3, '0')}
                </p>
                <CardTitle className="text-2xl md:text-3xl mb-4">
                  {pokemon.japaneseName || pokemon.name}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Pokemon Image */}
                <div className="flex justify-center">
                  <div className="relative w-64 h-64 md:w-80 md:h-80">
                    <Image
                      src={pokemon.imageUrl}
                      alt={pokemon.japaneseName || pokemon.name}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* Pokemon Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">基本情報</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">分類:</span>
                        <span>{pokemon.genus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">高さ:</span>
                        <span>{pokemon.height}m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">重さ:</span>
                        <span>{pokemon.weight}kg</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">タイプ</h3>
                    <div className="flex gap-2">
                      {pokemon.types.map((type, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">特性</h3>
                    <div className="space-y-3">
                      {pokemon.abilities.map((ability, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">
                              {ability.japaneseName || ability.name}
                            </span>
                            {ability.isHidden && (
                              <Badge variant="outline" className="text-xs">
                                隠れ特性
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            {ability.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <BackToListButton />
      </div>
    )
  } catch (error) {
    console.error('Error loading Pokemon:', error)
    notFound()
  }
}
