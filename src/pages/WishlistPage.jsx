import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductGrid from '../components/ProductGrid'
import EmptyState from '../components/EmptyState'

export default function WishlistPage({ wishlist, toggleWishlist, addToCart }) {
  const saved = products.filter((product) => wishlist.includes(product.id))
  return <div className="page-wrap simple-page"><div className="breadcrumbs"><Link to="/">Home</Link><ChevronRight size={13} /> Wishlist</div><span className="eyebrow">SAVED FOR A SPECIAL DAY</span><h1>Your little <em>love list.</em></h1><p className="page-lede">Some things are too lovely not to come back to.</p>{saved.length ? <ProductGrid products={saved} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} /> : <EmptyState title="A little space for something lovely" text="Tap the heart on any piece to save it here for later." action="Explore the collection" to="/shop" />}</div>
}
