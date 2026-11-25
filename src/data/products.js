import { image } from './image'
import product1 from './products/heirloom-polki-necklace'
import product2 from './products/meenakari-bloom-jhumkas'
import product3 from './products/everyday-aura-hoops'
import product4 from './products/sunehri-kundan-choker'
import product5 from './products/lotus-grace-bangle'
import product6 from './products/tara-diamond-pendant'
import product7 from './products/gulabi-polki-ring'
import product8 from './products/saanjh-gold-chain'

export const products = [
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
  product7,
  product8,
]

export const collections = [
  { name: 'Necklaces', note: 'Made for your moment', image: image('photo-1599643478518-a784e5dc4c8f', 900) },
  { name: 'Earrings', note: 'A little light, always', image: image('photo-1635767798638-3665a6a3c5c6', 900) },
  { name: 'Bangles', note: 'Heirlooms in the making', image: image('photo-1611591437281-460bfbe1220a', 900) },
  { name: 'Rings', note: 'The art of saying yes', image: image('photo-1605100804763-247f67b3557e', 900) },
]

export const formatPrice = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
