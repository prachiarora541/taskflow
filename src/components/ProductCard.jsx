import { Heart, Plus, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../data/products'

export default function ProductCard({ product, saved, onWishlist, onAdd }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link to={`/product/${product.id}`} className="product-image-link" aria-label={`View ${product.name}`}>
          <img src={product.images[0]} alt={product.name} loading="lazy" />
          {product.badge && <span className="product-badge">{product.badge}</span>}
        </Link>
        <button className={`wishlist-button ${saved ? 'is-saved' : ''}`} onClick={onWishlist} aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}>
          <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <button className="quick-add" onClick={onAdd}>Add to bag <Plus size={15} /></button>
      </div>
      <div className="product-meta">
        <div><Link to={`/product/${product.id}`} className="product-name">{product.name}</Link><span className="product-category">{product.category} · {product.metal}</span></div>
        <div className="product-price">{formatPrice(product.price)}{product.originalPrice && <del>{formatPrice(product.originalPrice)}</del>}</div>
      </div>
      <div className="product-rating"><Star size={12} fill="currentColor" /> {product.rating} <span>({product.reviews})</span></div>
    </article>
  )
}
