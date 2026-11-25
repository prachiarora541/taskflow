import { useState } from 'react'
import { ArrowRight, Check, ChevronRight, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice, products } from '../data/products'
import EmptyState from '../components/EmptyState'
import CartSummary from '../components/CartSummary'

export default function CheckoutPage({ cart, toast }) {
  const [couponInput, setCouponInput] = useState('')
  const [coupon, setCoupon] = useState(false)
  const [payment, setPayment] = useState('cod')
  const [submitted, setSubmitted] = useState(false)
  const items = cart.map((entry) => ({ ...entry, product: products.find((product) => product.id === entry.id) })).filter((entry) => entry.product)
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const discount = coupon ? Math.min(Math.round(subtotal * 0.1), 5000) : 0
  const applyCoupon = (event) => {
    event.preventDefault()
    if (couponInput.trim().toUpperCase() === 'SONA10') {
      setCoupon(true)
      toast('Your SONA10 saving has been applied')
    } else toast('That code did not work. Try SONA10.')
  }
  const placeOrder = (event) => {
    event.preventDefault()
    if (payment === 'razorpay') {
      toast('Online payments are unavailable until the secure payment service is configured.')
      return
    }
    setSubmitted(true)
  }

  if (!items.length) return <div className="page-wrap simple-page"><EmptyState title="Your bag is waiting" text="Add something lovely before heading to checkout." action="Explore jewellery" to="/shop" /></div>
  if (submitted) return <div className="page-wrap order-success"><div className="success-mark"><Check size={30} /></div><span className="eyebrow">CHECKOUT PREVIEW</span><h1>Your details are <em>ready.</em></h1><p>This storefront preview is not connected to an order service, so no order has been placed and no customer details have been stored. Connect a secure backend before accepting orders.</p><Link to="/shop" className="button button-dark">Keep exploring <ArrowRight size={15} /></Link></div>

  return (
    <div className="page-wrap checkout-page">
      <div className="breadcrumbs"><Link to="/">Home</Link><ChevronRight size={13} /><Link to="/cart">Your bag</Link><ChevronRight size={13} /> Checkout</div>
      <span className="eyebrow">THE LOVELY LAST STEP</span><h1>Make it <em>yours.</em></h1>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={placeOrder}>
          <section className="checkout-section"><div className="checkout-section-heading"><span>01</span><div><h2>Your details</h2><p>Where may we reach you?</p></div></div><div className="form-grid"><label className="full-field">Email address<input type="email" placeholder="you@example.com" required autoComplete="email" /></label><label>First name<input type="text" placeholder="First name" required autoComplete="given-name" /></label><label>Last name<input type="text" placeholder="Last name" required autoComplete="family-name" /></label><label className="full-field">Phone number<input type="tel" placeholder="+91 98765 43210" required pattern="[+0-9 ()-]{8,18}" autoComplete="tel" /></label></div></section>
          <section className="checkout-section"><div className="checkout-section-heading"><span>02</span><div><h2>Where it’s going</h2><p>Insured delivery, right to your door.</p></div></div><div className="form-grid"><label className="full-field">Address<input type="text" placeholder="House no., street, area" required autoComplete="street-address" /></label><label>City<input type="text" placeholder="City" required autoComplete="address-level2" /></label><label>State<input type="text" placeholder="State" required autoComplete="address-level1" /></label><label>PIN code<input type="text" placeholder="6-digit PIN" required pattern="[0-9]{6}" inputMode="numeric" autoComplete="postal-code" /></label><label>Country<select defaultValue="India"><option>India</option></select></label></div></section>
          <section className="checkout-section"><div className="checkout-section-heading"><span>03</span><div><h2>How would you like to pay?</h2><p>Choose your preferred payment method.</p></div></div><div className="payment-options"><label className={payment === 'cod' ? 'payment-option selected' : 'payment-option'}><input type="radio" name="payment" checked={payment === 'cod'} onChange={() => setPayment('cod')} /><span><strong>Cash on delivery</strong><small>Pay when your jewellery arrives</small></span><span className="payment-badge">AVAILABLE</span></label><label className={payment === 'razorpay' ? 'payment-option selected' : 'payment-option disabled'}><input type="radio" name="payment" checked={payment === 'razorpay'} onChange={() => setPayment('razorpay')} /><span><strong>Online payment</strong><small>UPI · Cards · Net banking · Wallets</small></span><span className="payment-badge muted-badge">SETUP REQUIRED</span></label></div><p className="payment-disclaimer"><ShieldCheck size={14} /> Online payments will be enabled when secure server-side payment verification is configured.</p></section>
          <button className="button button-dark place-order" type="submit">{payment === 'cod' ? 'Place COD order' : 'Continue to secure payment'} <ArrowRight size={16} /></button>
        </form>
        <aside className="checkout-aside"><div className="checkout-items"><h2>Your pieces <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span></h2>{items.map(({ id, size, quantity, product }) => <div className="checkout-item" key={`${id}-${size}`}><div className="checkout-item-image"><img src={product.images[0]} alt="" /><span>{quantity}</span></div><div><strong>{product.name}</strong><span>{product.metal}{size === 'One size' ? '' : ` · Size ${size}`}</span></div><b>{formatPrice(product.price * quantity)}</b></div>)}</div>
          <form className="coupon-form" onSubmit={applyCoupon}><label htmlFor="coupon-code">A little something off?</label><div><input id="coupon-code" value={couponInput} onChange={(event) => setCouponInput(event.target.value)} placeholder="Enter code" /><button type="submit">{coupon ? 'Applied' : 'Apply'}</button></div><small>Try <strong>SONA10</strong> for 10% off (up to ₹5,000).</small></form><CartSummary subtotal={subtotal} discount={discount} compact /></aside>
      </div>
    </div>
  )
}
