import ProductCard from './ProductCard'

export default function ProductGrid({ products: items, addToCart, toggleWishlist, wishlist }) {
  return (
    <div className="product-grid">
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          saved={wishlist.includes(product.id)}
          onWishlist={() => toggleWishlist(product)}
          onAdd={() => addToCart(product)}
        />
      ))}
    </div>
  )
}
