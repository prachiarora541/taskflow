import { useState } from 'react'
import AnnouncementBar from './header/AnnouncementBar'
import BrandLink from './header/BrandLink'
import DesktopNavigation from './header/DesktopNavigation'
import HeaderActions from './header/HeaderActions'
import MenuButton from './header/MenuButton'
import MobileNavigation from './header/MobileNavigation'

export default function SiteHeader({ cart, wishlist }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <AnnouncementBar />
      <header className="site-header">
        <MenuButton isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
        <BrandLink onClick={closeMenu} />
        <DesktopNavigation />
        <HeaderActions cart={cart} wishlist={wishlist} />
        {menuOpen && <MobileNavigation onNavigate={closeMenu} />}
      </header>
    </>
  )
}
