import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { products } from '../../data/products'

const pageTitles = {
  '/': 'Samridhhi Jewellers | Handcrafted Gold Jewellery',
  '/shop': 'Shop Gold Jewellery | Samridhhi Jewellers',
  '/wishlist': 'Your Wishlist | Samridhhi Jewellers',
  '/cart': 'Your Bag | Samridhhi Jewellers',
  '/checkout': 'Checkout | Samridhhi Jewellers',
  '/about': 'Our Story | Samridhhi Jewellers',
  '/contact': 'Contact Us | Samridhhi Jewellers',
  '/faq': 'Frequently Asked Questions | Samridhhi Jewellers',
  '/privacy': 'Privacy | Samridhhi Jewellers',
  '/terms': 'Terms | Samridhhi Jewellers',
  '/shipping': 'Shipping & Returns | Samridhhi Jewellers',
}

const defaultTitle = 'Samridhhi Jewellers | Handcrafted Gold Jewellery'
const defaultDescription =
  'Discover handcrafted gold jewellery from Samridhhi Jewellers. Thoughtful heirlooms, made by hand and made to be yours.'
const defaultImage =
  'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=85'

export default function PageMetadata() {
  const location = useLocation()

  useEffect(() => {
    const productId = location.pathname.startsWith('/product/')
      ? decodeURIComponent(location.pathname.slice('/product/'.length))
      : ''
    const product = products.find((item) => item.id === productId)
    const title = product
      ? `${product.name} | Samridhhi Jewellers`
      : pageTitles[location.pathname] || defaultTitle
    const description = product
      ? `${product.description} Shop ${product.name} at Samridhhi Jewellers.`
      : defaultDescription

    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:image"]')?.setAttribute(
      'content',
      product?.images[0] || defaultImage,
    )
    document.querySelector('link[rel="canonical"]')?.setAttribute(
      'href',
      `${window.location.origin}${location.pathname}`,
    )
  }, [location.pathname])

  return null
}
