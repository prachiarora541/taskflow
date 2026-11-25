import { useMemo, useState } from 'react'
import { ChevronDown, ChevronRight, Search, ShieldCheck, SlidersHorizontal, X } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { formatPrice, products } from '../data/products'
import { categories } from '../constants/store'
import ProductGrid from '../components/ProductGrid'
import EmptyState from '../components/EmptyState'

export default function Shop({ addToCart, toggleWishlist, wishlist }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'All jewellery'
  const [category, setCategory] = useState(categories.includes(initialCategory) ? initialCategory : 'All jewellery')
  const [metal, setMetal] = useState('All metals')
  const [occasion, setOccasion] = useState('All occasions')
  const [maxPrice, setMaxPrice] = useState(250000)
  const [sort, setSort] = useState(
    searchParams.get('sort') === 'popular'
      ? 'Bestselling'
      : searchParams.get('sort') === 'new'
        ? 'Newest'
        : 'Featured',
  )
  const [search, setSearch] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let result = products.filter((product) =>
      (category === 'All jewellery' || product.category === category) &&
      (metal === 'All metals' || product.metal.includes(metal)) &&
      (occasion === 'All occasions' || product.occasion === occasion) &&
      product.price <= maxPrice &&
      `${product.name} ${product.category} ${product.metal} ${product.occasion}`.toLowerCase().includes(search.toLowerCase().trim()),
    )
    if (sort === 'Price: low to high') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'Price: high to low') result = [...result].sort((a, b) => b.price - a.price)
    if (sort === 'Bestselling') result = [...result].sort((a, b) => b.reviews - a.reviews)
    if (sort === 'Newest') result = [...result].sort((a, b) => Number(Boolean(b.badge?.includes('New'))) - Number(Boolean(a.badge?.includes('New'))))
    return result
  }, [category, maxPrice, metal, occasion, search, sort])

  const selectCategory = (value) => {
    setCategory(value)
    if (value === 'All jewellery') setSearchParams({})
    else setSearchParams({ category: value })
  }

  return (
    <div className="shop-page page-wrap">
      <div className="breadcrumbs"><Link to="/">Home</Link><ChevronRight size={13} /> Shop</div>
      <div className="shop-intro">
        <span className="eyebrow">THE SAMRIDHHI COLLECTION</span>
        <h1>Jewellery for <em>your always.</em></h1>
        <p>Considered, handcrafted pieces to mark the moments that make you, you.</p>
      </div>
      <div className="shop-toolbar">
        <div className="category-tabs" role="tablist" aria-label="Jewellery categories">
          {categories.map((item) => <button key={item} role="tab" aria-selected={category === item} className={category === item ? 'active' : ''} onClick={() => selectCategory(item)}>{item}</button>)}
        </div>
        <div className="shop-controls">
          <label className="shop-search"><Search size={17} /><input list="product-search-suggestions" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find something lovely" aria-label="Search jewellery" />{search && <button aria-label="Clear search" onClick={() => setSearch('')}><X size={15} /></button>}</label>
          <datalist id="product-search-suggestions">{products.map((product) => <option key={product.id} value={product.name} />)}</datalist>
          <button className={`filter-toggle ${filtersOpen ? 'active' : ''}`} onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={16} /> Filters</button>
          <label className="sort-select"><span>Sort:</span><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products"><option>Featured</option><option>Bestselling</option><option>Newest</option><option>Price: low to high</option><option>Price: high to low</option></select><ChevronDown size={13} /></label>
        </div>
      </div>
      {filtersOpen && (
        <div className="filter-panel">
          <label>Metal<select value={metal} onChange={(event) => setMetal(event.target.value)}><option>All metals</option><option>22K Yellow Gold</option><option>18K Yellow Gold</option><option>18K Rose Gold</option></select></label>
          <label>Occasion<select value={occasion} onChange={(event) => setOccasion(event.target.value)}><option>All occasions</option><option>Everyday</option><option>Festive</option><option>Wedding</option></select></label>
          <label className="price-filter">Up to {formatPrice(maxPrice)}<input type="range" min="25000" max="250000" step="5000" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} aria-label="Maximum price" /></label>
          <span className="filter-note"><ShieldCheck size={15} /> Every piece is BIS-hallmarked</span>
          {(metal !== 'All metals' || occasion !== 'All occasions' || maxPrice !== 250000) && <button className="text-link" onClick={() => { setMetal('All metals'); setOccasion('All occasions'); setMaxPrice(250000) }}>Clear filters <X size={13} /></button>}
        </div>
      )}
      <div className="results-count"><span>{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'} to fall for</span><span>Handcrafted with care, always</span></div>
      {filtered.length
        ? <ProductGrid products={filtered} addToCart={addToCart} toggleWishlist={toggleWishlist} wishlist={wishlist} />
        : <EmptyState title="Nothing here just yet" text="Try another search or clear your filters to see all our handcrafted pieces." action="See all jewellery" onClick={() => { setSearch(''); setMetal('All metals'); setOccasion('All occasions'); setMaxPrice(250000); selectCategory('All jewellery') }} />}
      <div className="shop-end-note"><span>✳</span> Each Samridhhi piece arrives in our signature keepsake box.</div>
    </div>
  )
}
