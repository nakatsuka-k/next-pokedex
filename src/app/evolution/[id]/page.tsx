import { Suspense } from 'react';
import { getEvolutionChain, getProcessedPokemon } from '@/lib/pokeapi';
import { EvolutionChain } from '@/components/EvolutionChain';
import Loading from '@/components/Loading';
import { BackToListButton } from '@/components/BackToListButton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * 進化系統ページのメタデータ生成
 */
export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  
  try {
    const pokemon = await getProcessedPokemon(id);
    return {
      title: `${pokemon.japaneseName}の進化系統 | ポケモン図鑑`,
      description: `${pokemon.japaneseName}（No.${id.toString().padStart(3, '0')}）の進化前・進化後を進化条件と共に確認できます。`,
      keywords: `ポケモン,${pokemon.japaneseName},${pokemon.name},進化,進化系統,図鑑`,
      openGraph: {
        title: `${pokemon.japaneseName}の進化系統`,
        description: `${pokemon.japaneseName}の進化前・進化後を進化条件と共に確認`,
        images: [pokemon.imageUrl],
      },
    };
  } catch {
    return {
      title: '進化系統 | ポケモン図鑑',
      description: 'ポケモンの進化系統を確認できます。',
    };
  }
}

/**
 * 進化系統ページコンポーネント
 * 指定されたポケモンの進化系統を表示
 */
export default async function EvolutionPage({ params }: Props) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  if (isNaN(id) || id < 1) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            無効なポケモンIDです
          </h1>
          <Button asChild>
            <Link href="/pokemon">一覧に戻る</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Suspense fallback={<Loading message="進化系統を読み込み中..." />}>
        <EvolutionPageContent id={id} />
      </Suspense>
      <BackToListButton />
    </div>
  );
}

/**
 * 進化系統ページの実際のコンテンツ
 */
async function EvolutionPageContent({ id }: { id: number }) {
  try {
    // 並列でポケモン情報と進化系統を取得
    const [pokemon, evolutionChain] = await Promise.all([
      getProcessedPokemon(id),
      getEvolutionChain(id)
    ]);

    return (
      <>
        {/* ページヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {pokemon.japaneseName}の進化系統
          </h1>
          <p className="text-gray-600 mb-4">
            進化前・進化後のポケモンと進化条件を確認できます
          </p>
          
          {/* 詳細ページへのリンク */}
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline">
              <Link href={`/pokemon/${id}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                詳細ページに戻る
              </Link>
            </Button>
          </div>
        </div>

        {/* 進化系統図 */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <EvolutionChain 
              evolutionChain={evolutionChain}
              currentPokemonId={id}
            />
          </div>
        </div>

        {/* 進化系統の説明 */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">
            💡 進化系統について
          </h2>
          <ul className="text-blue-800 space-y-2">
            <li>• 青色でハイライトされているのが現在表示中のポケモンです</li>
            <li>• 矢印の横に表示されているのが進化条件です</li>
            <li>• 各ポケモンをクリックすると詳細ページに移動できます</li>
            <li>• 進化しないポケモンの場合は、そのポケモンのみが表示されます</li>
          </ul>
        </div>
      </>
    );
  } catch (error) {
    console.error(`ポケモンID ${id} の進化系統取得に失敗:`, error);
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          進化系統の取得に失敗しました
        </h1>
        <p className="text-gray-600 mb-6">
          指定されたポケモン（ID: {id}）の進化系統情報を取得できませんでした。
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/pokemon">一覧に戻る</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/pokemon/${id}`}>詳細ページに戻る</Link>
          </Button>
        </div>
      </div>
    );
  }
}
