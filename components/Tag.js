import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

// Tag component (in Tag.js file, for instance)
export default function Tag({ text, onClick }) {
  return (
    <button
      onClick={onClick} // Add this line
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {text}
    </button>
  )
}
