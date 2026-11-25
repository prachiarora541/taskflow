import { Menu, X } from 'lucide-react'

export default function MenuButton({ isOpen, onClick }) {
  return (
    <button
      className="icon-button mobile-menu-trigger"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      onClick={onClick}
    >
      {isOpen ? <X size={21} /> : <Menu size={21} />}
    </button>
  )
}
