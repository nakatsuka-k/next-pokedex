import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { List } from 'lucide-react'

export function BackToListButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link href="/pokemon">
        <Button 
          size="lg" 
          className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
        >
          <List className="h-5 w-5 mr-2" />
          一覧へ
        </Button>
      </Link>
    </div>
  )
}

export default BackToListButton
