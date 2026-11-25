import StorefrontLayout from './storefront/StorefrontLayout'
import StorefrontRoutes from './storefront/StorefrontRoutes'

export default function Storefront(props) {
  return (
    <StorefrontLayout cart={props.cart} wishlist={props.wishlist}>
      <StorefrontRoutes {...props} />
    </StorefrontLayout>
  )
}
