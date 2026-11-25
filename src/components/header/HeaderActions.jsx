import { Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HeaderActions({ cart, wishlist }) {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="header-actions">
      <Link className="header-text-link" to="/contact">Visit us</Link>
      <Link className="icon-button header-icon" to="/wishlist" aria-label={`Wishlist, ${wishlist.length} saved`}>
        <Heart size={19} strokeWidth={1.6} />
        {wishlist.length > 0 && <span className="icon-count">{wishlist.length}</span>}
      </Link>
      <Link className="icon-button header-icon bag-link" to="/cart" aria-label={`Shopping bag, ${cartCount} items`}>
        <ShoppingBag size={19} strokeWidth={1.6} />
        {cartCount > 0 && <span className="icon-count">{cartCount}</span>}
      </Link>
    </div>
  )
}
