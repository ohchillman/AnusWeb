'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type ThemeContextType = {
  darkMode: boolean
  showJokes: boolean
  toggleDarkMode: () => void
  toggleShowJokes: () => void
  setDarkMode: (value: boolean) => void
  setShowJokes: (value: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false)
  const [showJokes, setShowJokes] = useState(true)

  // Load settings from localStorage on component mount
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode')
    const storedShowJokes = localStorage.getItem('showJokes')
    
    if (storedDarkMode !== null) {
      setDarkMode(storedDarkMode === 'true')
    }
    
    if (storedShowJokes !== null) {
      setShowJokes(storedShowJokes === 'true')
    }
  }, [])

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Save to localStorage
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  // Save joke setting to localStorage
  useEffect(() => {
    localStorage.setItem('showJokes', showJokes.toString())
  }, [showJokes])

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  const toggleShowJokes = () => {
    setShowJokes(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={{ 
      darkMode, 
      showJokes, 
      toggleDarkMode, 
      toggleShowJokes,
      setDarkMode,
      setShowJokes
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
