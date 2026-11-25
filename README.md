# Samridhhi Jewellers

A responsive React storefront for Samridhhi Jewellers, built with Vite. The current project is a customer-facing frontend preview; it is not yet connected to a production commerce backend.

## Run locally

```bash
npm install
npm run dev
```

Create a production bundle with `npm run build`, or run the existing ESLint configuration with `npm run lint`.

## Project structure

```text
public/
  robots.txt
  sitemap.xml
src/
  data/
    products.js       Product and collection catalogue for the storefront preview
  hooks/
    useLocalStorage.js
  App.jsx             Storefront routes, page views, and shared shopping state
  App.css             Responsive jewellery storefront design system
  index.css           Document-level styles and focus treatment
  main.jsx            React entry point
index.html            SEO and Open Graph metadata
```

## Storefront preview

- Home, shop, product detail, wishlist, cart, checkout, about, contact, FAQ and policy pages
- Category, material and occasion filters; search and sorting
- Persistent browser-local cart and wishlist
- Quantity controls, an example `SONA10` coupon, shipping estimate and checkout form validation
- Responsive navigation, toasts, empty states, product gallery, size guide and reduced-motion support
- Robots file, sitemap and page-level SEO metadata
- Sample catalogue, prices, stock and review content for preview only

## Before accepting real orders

This frontend does not include a server, database, customer authentication, admin dashboard, email service or payment processing. Browser storage and the checkout preview are not secure order or payment systems. In particular, the online payment option intentionally reports that payment is unavailable: do not enable it or represent an order as placed until a backend creates Razorpay orders, verifies payment signatures server-side, enforces stock and authorization, and persists the verified order.

Before launch, add and deploy a backend with validated APIs, secure authentication and admin authorization, persistent product/inventory/order/payment data, server-side Razorpay verification, configured email notifications, and production-managed secrets. Replace sample contact details, legal copy, catalogue data, image sources, canonical domain and shipping/tax/coupon rules with approved business information. Review privacy, terms, returns and tax details with the appropriate professionals.
