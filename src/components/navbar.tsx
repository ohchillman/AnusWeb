'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from '@/lib/theme-context'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Tasks', path: '/tasks' },
  { name: 'Agents', path: '/agents' },
  { name: 'History', path: '/history' },
  { name: 'Config', path: '/config' },
]

export function Navbar() {
  const pathname = usePathname()
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">🍑 ANUS</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === item.path
                      ? 'bg-slate-800 text-white'
                      : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="ml-4 text-gray-300 hover:bg-slate-700 hover:text-white"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
