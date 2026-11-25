import { ArrowLeft, ChevronRight, Minus, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice, products } from '../data/products'
import EmptyState from '../components/EmptyState'
import CartSummary from '../components/CartSummary'

export default function CartPage({ cart, updateQuantity, removeFromCart }) {
  const items = cart.map((entry) => ({ ...entry, product: products.find((product) => product.id === entry.id) })).filter((entry) => entry.product)
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  return (
    <div className="page-wrap cart-page">
      <div className="breadcrumbs"><Link to="/">Home</Link><ChevronRight size={13} /> Your bag</div>
      <span className="eyebrow">A GOOD THING, ON ITS WAY</span><h1>Your bag<span className="bag-item-count"> ({items.reduce((sum, item) => sum + item.quantity, 0)})</span></h1>
      {!items.length ? <EmptyState title="Your bag is taking a little pause" text="Come back when you’ve found the piece that feels like you." action="Explore our jewellery" to="/shop" /> : (
        <div className="cart-layout">
          <div className="cart-lines">
            <div className="cart-table-heading"><span>YOUR SELECTION</span><span>TOTAL</span></div>
            {items.map(({ id, size, quantity, product }) => (
              <div className="cart-line" key={`${id}-${size}`}>
                <Link to={`/product/${product.id}`} className="cart-thumb"><img src={product.images[0]} alt={product.name} /></Link>
                <div className="cart-line-info"><Link to={`/product/${product.id}`} className="product-name">{product.name}</Link><span>{product.metal}</span><span>{product.weight} approx.{size === 'One size' ? '' : ` · Size ${size}`}</span><div className="cart-line-actions"><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => updateQuantity(id, size, -1)}><Minus size={13} /></button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => updateQuantity(id, size, 1)}><Plus size={13} /></button></div><button className="remove-link" onClick={() => removeFromCart(id, size)}>Remove</button></div></div>
                <strong className="cart-line-total">{formatPrice(product.price * quantity)}</strong>
              </div>
            ))}
            <Link to="/shop" className="continue-shopping"><ArrowLeft size={14} /> Continue exploring</Link>
          </div>
          <CartSummary subtotal={subtotal} />
        </div>
      )}
    </div>
  )
}
