'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-xl">
              ポケモン図鑑
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              ホーム
            </Link>
            <Link
              href="/pokemon"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              ポケモン一覧
            </Link>
            <Link
              href="/search"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              ポケモン検索
            </Link>
          </nav>
        </div>
        
        {/* Mobile menu */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="flex items-center space-x-2 md:hidden">
              <span className="font-bold text-lg">ポケモン図鑑</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-1 md:hidden">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              ホーム
            </Link>
            <Link
              href="/pokemon"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              一覧
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              検索
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
