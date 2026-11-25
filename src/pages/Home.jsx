import { ArrowRight, ArrowUpRight, Heart, ShieldCheck, Sparkles, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { collections, products } from '../data/products'
import SectionHeading from '../components/SectionHeading'
import ProductGrid from '../components/ProductGrid'
import Newsletter from '../components/Newsletter'

export default function Home({ addToCart, toggleWishlist, wishlist }) {
  const featured = products.slice(0, 4)
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><span /> MADE TO BECOME YOURS</span>
          <h1>Gold that<br />holds a <em>story.</em></h1>
          <p>Jewels shaped by hand, inspired by heritage, and made to live with you for a lifetime.</p>
          <div className="hero-actions">
            <Link className="button button-gold" to="/shop">Explore the collection <ArrowRight size={16} /></Link>
            <Link className="text-link light-link" to="/about">The Samridhhi story <ArrowUpRight size={15} /></Link>
          </div>
          <div className="hero-proof"><span className="proof-stars">★★★★★</span><span>4.9 / 5 from 1,200+ happy hearts</span></div>
        </div>
        <div className="hero-image" role="img" aria-label="Gold jewellery styled for a special occasion">
          <div className="hero-image-caption"><span>THE HEIRLOOM EDIT</span><strong>For all your always.</strong></div>
          <span className="hero-image-index">01 <i /> 04</span>
        </div>
        <div className="hero-side-note">CRAFTED WITH INTENTION&nbsp; · &nbsp;WORN WITH LOVE</div>
      </section>

      <section className="trust-row" aria-label="Our promises">
        <div><ShieldCheck size={19} /><span>Certified gold, always</span></div>
        <div><Sparkles size={18} /><span>Made by master karigars</span></div>
        <div><Truck size={19} /><span>Insured, thoughtful delivery</span></div>
        <div><Heart size={18} /><span>A lifetime of care</span></div>
      </section>

      <section className="section collection-section">
        <SectionHeading kicker="A WORLD OF YOUR OWN" title={<>Find the piece<br className="desktop-break" /> that feels like <em>you.</em></>} link="/shop" linkText="View all jewellery" />
        <div className="collection-grid">
          {collections.map((collection, index) => (
            <Link className={`collection-card collection-card-${index + 1}`} to={`/shop?category=${encodeURIComponent(collection.name)}`} key={collection.name}>
              <img src={collection.image} alt={`${collection.name} by Samridhhi Jewellers`} loading="lazy" />
              <span className="collection-arrow"><ArrowUpRight size={18} /></span>
              <span className="collection-label"><small>{collection.note}</small><strong>{collection.name}</strong></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section arrivals-section">
        <SectionHeading kicker="THOUGHTFULLY MADE, JUST ARRIVED" title={<>New things to <em>love.</em></>} link="/shop?sort=new" linkText="Shop new arrivals" />
        <ProductGrid products={featured} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} />
      </section>

      <section className="offer-band"><span className="offer-flower">✳</span><div><span className="eyebrow">A LITTLE GOLDEN THANK-YOU</span><h2>A little something for your <em>forever piece.</em></h2><p>Use code <strong>SONA10</strong> at checkout · 10% off, up to ₹5,000</p></div><Link className="button button-gold" to="/shop">Find your piece <ArrowRight size={15} /></Link></section>

      <section className="story-banner">
        <div className="story-image" role="img" aria-label="Artisan carefully crafting a piece of gold jewellery" />
        <div className="story-content">
          <span className="eyebrow">THE HAND BEHIND THE HEIRLOOM</span>
          <h2>Some things<br />are worth <em>making</em><br /><em>slowly.</em></h2>
          <p>In the hands of our karigars, gold becomes more than an adornment. It becomes a memory in the making.</p>
          <Link className="button button-outline-light" to="/about">Meet our makers <ArrowRight size={16} /></Link>
        </div>
        <span className="story-edition">EST. WITH LOVE · INDIA</span>
      </section>

      <section className="section bestsellers-section">
        <SectionHeading kicker="LOVED, WORN, LOVED AGAIN" title={<>The ones you <em>choose.</em></>} link="/shop?sort=popular" linkText="Shop bestsellers" />
        <ProductGrid products={products.slice(4, 8)} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} />
      </section>

      <section className="promise-strip">
        <span className="promise-sparkle">✳</span>
        <div><span className="eyebrow">A LITTLE MORE MEANINGFUL</span><h2>Not just jewellery.<br /><em>A part of your story.</em></h2></div>
        <p>Every Samridhhi piece is BIS-hallmarked, thoughtfully sourced and finished by hand. Because feeling beautiful should feel just as good.</p>
        <Link to="/shipping" className="text-link">Our promise <ArrowRight size={15} /></Link>
      </section>

      <section className="testimonial-section">
        <span className="eyebrow">KIND WORDS, KEPT CLOSE</span>
        <div className="testimonial-stars">★★★★★</div>
        <blockquote>“The craftsmanship is extraordinary, but what I love most is how it feels like it was made just for me. This is the first piece of my daughter's future heirloom collection.”</blockquote>
        <span className="testimonial-author">ANANYA M. <i /> VERIFIED SAMRIDDHI CUSTOMER</span>
      </section>

      <Newsletter />
    </>
  )
}
