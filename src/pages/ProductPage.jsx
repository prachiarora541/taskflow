import { useState } from 'react'
import { ArrowRight, ChevronRight, Heart, Minus, Plus, ShieldCheck, ShoppingBag, Sparkles, Truck, X } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { formatPrice, products } from '../data/products'
import { sizes } from '../constants/store'
import SectionHeading from '../components/SectionHeading'
import ProductGrid from '../components/ProductGrid'
import SizeGuideRow from '../components/SizeGuideRow'
import NotFound from './NotFound'

export default function ProductPage({ addToCart, toggleWishlist, wishlist }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find((item) => item.id === id)
  const [activeImage, setActiveImage] = useState(0)
  const [size, setSize] = useState('18')
  const [quantity, setQuantity] = useState(1)
  const [zoomed, setZoomed] = useState(false)
  if (!product) return <NotFound />
  const requiresSize = product.category === 'Rings' || product.category === 'Bangles'
  const selectedSize = requiresSize ? size : 'One size'

  const buyNow = () => {
    for (let i = 0; i < quantity; i += 1) addToCart(product, selectedSize)
    navigate('/checkout')
  }

  return (
    <div className="product-detail page-wrap">
      <div className="breadcrumbs"><Link to="/">Home</Link><ChevronRight size={13} /><Link to="/shop">Shop</Link><ChevronRight size={13} />{product.name}</div>
      <div className="product-detail-grid">
        <div className="product-gallery">
          <button className={`product-main-image ${zoomed ? 'zoomed' : ''}`} onClick={() => setZoomed(!zoomed)} aria-label={zoomed ? 'Zoom out' : 'Zoom product image'}>
            <img src={product.images[activeImage]} alt={`${product.name}, view ${activeImage + 1}`} />
            <span className="zoom-hint">{zoomed ? 'Click to zoom out' : 'Click to explore'}</span>
          </button>
          <div className="product-thumbnails">{product.images.map((src, index) => <button className={activeImage === index ? 'active' : ''} key={src} onClick={() => setActiveImage(index)} aria-label={`View product image ${index + 1}`}><img src={src} alt="" /></button>)}</div>
        </div>
        <div className="product-detail-info">
          <span className="eyebrow">{product.category.toUpperCase()} · {product.metal.toUpperCase()}</span>
          <h1>{product.name}</h1>
          <div className="detail-rating"><span>★★★★★</span> {product.rating} <a href="#reviews">({product.reviews} reviews)</a></div>
          <div className="detail-price">{formatPrice(product.price)} {product.originalPrice && <del>{formatPrice(product.originalPrice)}</del>}</div>
          <p className="tax-note">Inclusive of taxes · Complimentary insured delivery over ₹50,000</p>
          <p className="detail-description">{product.description}</p>
          <div className="detail-divider" />
          <div className="detail-spec"><span>METAL</span><strong>{product.metal}</strong></div>
          <div className="detail-spec"><span>NET WEIGHT</span><strong>{product.weight} approx.</strong></div>
          <div className="detail-spec"><span>CRAFT</span><strong>Hand-finished in India</strong></div>
          {requiresSize ? (
            <div className="size-picker"><div className="size-label">Choose size <button onClick={() => document.getElementById('size-guide')?.showModal()}>Size guide</button></div><div className="size-options">{sizes.map((item) => <button className={size === item ? 'selected' : ''} key={item} onClick={() => setSize(item)}>{item}</button>)}</div></div>
          ) : null}
          <div className="detail-availability"><span className="stock-dot" /> Ready to ship <span>·</span> dispatched in 2–4 days</div>
          <div className="purchase-row">
            <div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={14} /></button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}><Plus size={14} /></button></div>
            <button className="button button-dark add-detail" onClick={() => { for (let i = 0; i < quantity; i += 1) addToCart(product, selectedSize) }}>Add to bag <ShoppingBag size={16} /></button>
            <button className={`detail-heart ${wishlist.includes(product.id) ? 'is-saved' : ''}`} onClick={() => toggleWishlist(product)} aria-label="Add to wishlist"><Heart size={19} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} /></button>
          </div>
          <button className="button button-gold buy-now" onClick={buyNow}>Buy now <ArrowRight size={16} /></button>
          <div className="service-notes"><div><ShieldCheck size={17} /> BIS-hallmarked gold</div><div><Truck size={17} /> Insured delivery</div><div><Sparkles size={17} /> Lifetime care promise</div></div>
        </div>
      </div>
      <section className="detail-story"><span className="eyebrow">A CLOSER LOOK</span><h2>Made with meaning.<br /><em>Made to be yours.</em></h2><p>{product.description} Each piece is checked by our in-house artisans before it begins its journey to you.</p></section>
      <section className="review-panel" id="reviews"><div><span className="eyebrow">LOVE NOTES</span><h2>Worn, loved, <em>remembered.</em></h2><div className="review-score"><span>★★★★★</span><strong>{product.rating}</strong><small>Example rating · {product.reviews} sample reviews</small></div></div><article><span className="eyebrow">EXAMPLE CUSTOMER NOTE</span><blockquote>“A beautiful piece with the kind of detail you notice more each time you wear it.”</blockquote><small>Sample review content — connect verified customer reviews before launch.</small></article></section>
      <section className="section related-section"><SectionHeading kicker="A FEW MORE TO LOVE" title={<>You may also <em>adore.</em></>} link="/shop" linkText="Discover all" /><ProductGrid products={products.filter((item) => item.id !== product.id).slice(0, 4)} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} /></section>
      <dialog id="size-guide" className="size-guide"><button className="dialog-close" onClick={() => document.getElementById('size-guide')?.close()} aria-label="Close size guide"><X size={18} /></button><span className="eyebrow">A PERFECT FIT</span><h2>Ring size guide</h2><p>Measure the inside diameter of a ring that fits you comfortably. Our team can help you find your size.</p><div className="size-guide-table"><span>India size</span><span>Diameter</span>{sizes.map((item) => <SizeGuideRow key={item} size={item} />)}</div><Link to="/contact" className="text-link" onClick={() => document.getElementById('size-guide')?.close()}>Need a hand? Talk to us <ArrowRight size={14} /></Link></dialog>
    </div>
  )
}
