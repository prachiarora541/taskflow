import { Link } from 'react-router-dom'

export default function DesktopNavigation() {
  return (
    <nav className="desktop-nav" aria-label="Main navigation">
      <Link to="/shop">Shop all</Link>
      <Link to="/shop?category=Necklaces">Fine jewellery</Link>
      <Link to="/shop?category=Earrings">The wedding edit</Link>
      <Link to="/about">Our story</Link>
    </nav>
  )
}
