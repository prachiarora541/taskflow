import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Storefront from './components/Storefront'
import Toast from './components/Toast'
import { useLocalStorage } from './hooks/useLocalStorage'
import './App.css'

export default function App() {
  const [cart, setCart] = useLocalStorage('samridhhi-cart', [])
  const [wishlist, setWishlist] = useLocalStorage('samridhhi-wishlist', [])
  const [notice, setNotice] = useState('')
  const [noticeId, setNoticeId] = useState(0)

  const toast = (message) => {
    setNotice(message)
    setNoticeId((id) => id + 1)
  }

  const addToCart = (product, size = 'One size') => {
    setCart((current) => {
      const item = current.find((entry) => entry.id === product.id && entry.size === size)
      return item
        ? current.map((entry) =>
            entry.id === product.id && entry.size === size ? { ...entry, quantity: entry.quantity + 1 } : entry,
          )
        : [...current, { id: product.id, size, quantity: 1 }]
    })
    toast(`${product.name} added to your bag`)
  }

  const toggleWishlist = (product) => {
    const saved = wishlist.includes(product.id)
    setWishlist((current) =>
      saved ? current.filter((id) => id !== product.id) : [...current, product.id],
    )
    toast(saved ? 'Removed from your wishlist' : 'Saved to your wishlist')
  }

  const updateQuantity = (id, size, change) =>
    setCart((current) =>
      current
        .map((entry) =>
          entry.id === id && entry.size === size
            ? { ...entry, quantity: entry.quantity + change }
            : entry,
        )
        .filter((entry) => entry.quantity > 0),
    )

  const removeFromCart = (id, size) =>
    setCart((current) => current.filter((entry) => entry.id !== id || entry.size !== size))

  return (
    <BrowserRouter>
      <Storefront
        cart={cart}
        wishlist={wishlist}
        addToCart={addToCart}
        toggleWishlist={toggleWishlist}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        toast={toast}
      />
      {notice && <Toast key={noticeId} message={notice} onClose={() => setNotice('')} />}
    </BrowserRouter>
  )
}
