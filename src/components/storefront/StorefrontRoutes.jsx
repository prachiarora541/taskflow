import { Route, Routes } from 'react-router-dom'
import AboutPage from '../../pages/AboutPage'
import CartPage from '../../pages/CartPage'
import CheckoutPage from '../../pages/CheckoutPage'
import ContactPage from '../../pages/ContactPage'
import FaqPage from '../../pages/FaqPage'
import Home from '../../pages/Home'
import NotFound from '../../pages/NotFound'
import PolicyPage from '../../pages/PolicyPage'
import ProductPage from '../../pages/ProductPage'
import Shop from '../../pages/Shop'
import WishlistPage from '../../pages/WishlistPage'

export default function StorefrontRoutes(props) {
  return (
    <Routes>
      <Route path="/" element={<Home {...props} />} />
      <Route path="/shop" element={<Shop {...props} />} />
      <Route path="/product/:id" element={<ProductPage {...props} />} />
      <Route path="/wishlist" element={<WishlistPage {...props} />} />
      <Route path="/cart" element={<CartPage {...props} />} />
      <Route path="/checkout" element={<CheckoutPage {...props} />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage toast={props.toast} />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/privacy" element={<PolicyPage type="privacy" />} />
      <Route path="/terms" element={<PolicyPage type="terms" />} />
      <Route path="/shipping" element={<PolicyPage type="shipping" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
