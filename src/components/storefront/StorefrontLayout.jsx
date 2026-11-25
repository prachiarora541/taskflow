import { useLocation } from 'react-router-dom'
import Footer from '../Footer'
import SiteHeader from '../SiteHeader'
import PageMetadata from './PageMetadata'

export default function StorefrontLayout({ cart, wishlist, children }) {
  const location = useLocation()

  return (
    <>
      <PageMetadata />
      <SiteHeader cart={cart} wishlist={wishlist} />
      <main key={location.pathname + location.search}>{children}</main>
      <Footer />
    </>
  )
}
