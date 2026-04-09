'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <span className="w-5 h-5" />
      </button>
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
        isDark
          ? 'bg-gray-700 hover:bg-gray-600 text-white'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
      }`}
      aria-label={isDark ? 'Activer le mode jour' : 'Activer le mode nuit'}
      title={isDark ? 'Mode jour' : 'Mode nuit'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  )
}
