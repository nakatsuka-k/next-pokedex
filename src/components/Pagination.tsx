import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PaginationInfo } from '@/lib/types'

interface PaginationProps {
  pagination: PaginationInfo
  basePath: string
  searchParams?: Record<string, string>
}

export function Pagination({ pagination, basePath, searchParams = {} }: PaginationProps) {
  const { currentPage, totalPages, hasNext, hasPrev } = pagination

  // Create URL with search parameters
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    return `${basePath}?${params.toString()}`
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const delta = 2 // Number of pages to show on each side of current page
    const range = []
    const rangeWithDots = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Previous button */}
      {hasPrev ? (
        <Link href={createPageUrl(currentPage - 1)}>
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            前へ
          </Button>
        </Link>
      ) : (
        <Button variant="outline" size="sm" disabled>
          <ChevronLeft className="h-4 w-4 mr-1" />
          前へ
        </Button>
      )}

      {/* Page numbers */}
      <div className="flex space-x-1">
        {getPageNumbers().map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <Link href={createPageUrl(page as number)}>
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  className="min-w-[40px]"
                >
                  {page}
                </Button>
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Next button */}
      {hasNext ? (
        <Link href={createPageUrl(currentPage + 1)}>
          <Button variant="outline" size="sm">
            次へ
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      ) : (
        <Button variant="outline" size="sm" disabled>
          次へ
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      )}
    </div>
  )
}

export default Pagination
