import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function MobileNavigation({ onNavigate }) {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      <Link to="/shop" onClick={onNavigate}>Shop all <ArrowRight size={16} /></Link>
      <Link to="/shop?category=Necklaces" onClick={onNavigate}>Necklaces <ArrowRight size={16} /></Link>
      <Link to="/shop?category=Earrings" onClick={onNavigate}>Earrings <ArrowRight size={16} /></Link>
      <Link to="/about" onClick={onNavigate}>Our story <ArrowRight size={16} /></Link>
      <Link to="/contact" onClick={onNavigate}>Visit us <ArrowRight size={16} /></Link>
    </nav>
  )
}
