import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const handleClick = () => {
    setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')
    const btn = document.querySelector('.btn-sun')
    btn.classList.toggle('clicked')
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="ml-4 mr-1 h-10 w-10 rounded p-1 sm:ml-4"
      onClick={handleClick}
    >
      <a href="#" className="btn-sun">
        <div className="square square"></div>
        <div className="square square-x"></div>
        <div className="square circle"></div>
        <div className="square circle circle-x"></div>
      </a>
    </button>
  )
}

export default ThemeSwitch
