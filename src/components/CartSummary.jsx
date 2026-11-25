import { ArrowRight, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../data/products'

export default function CartSummary({ subtotal, discount = 0, compact = false }) {
  const shipping = subtotal === 0 || subtotal >= 50000 ? 0 : 199
  return (
    <aside className={`cart-summary ${compact ? 'compact-summary' : ''}`}>
      <span className="eyebrow">A LITTLE SUMMARY</span><h2>Your total, so far.</h2>
      <div className="summary-line"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
      {discount > 0 && <div className="summary-line discount-line"><span>Special saving</span><strong>−{formatPrice(discount)}</strong></div>}
      <div className="summary-line"><span>Delivery</span><strong>{shipping ? formatPrice(shipping) : 'Complimentary'}</strong></div>
      <div className="summary-tax">Taxes included in the price shown. Final tax invoice provided with your order.</div>
      <div className="summary-total"><span>Total</span><strong>{formatPrice(subtotal - discount + shipping)}</strong></div>
      <Link className="button button-dark checkout-button" to="/checkout">Make it yours <ArrowRight size={15} /></Link>
      {subtotal < 50000 && subtotal > 0 && <p className="shipping-progress">Add {formatPrice(50000 - subtotal)} more for complimentary insured delivery.</p>}
      <div className="secure-note"><ShieldCheck size={15} /> Thoughtful, secure checkout</div>
    </aside>
  )
}
