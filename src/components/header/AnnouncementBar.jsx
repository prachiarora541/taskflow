import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AnnouncementBar() {
  return (
    <div className="announcement">
      <span>Complimentary insured delivery on orders over ₹50,000</span>
      <Link to="/shipping">Discover the Samridhhi promise <ArrowRight size={13} /></Link>
    </div>
  )
}
