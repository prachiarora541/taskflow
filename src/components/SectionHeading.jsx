import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SectionHeading({ kicker, title, link, linkText }) {
  return (
    <div className="section-heading">
      <div><span className="eyebrow">{kicker}</span><h2>{title}</h2></div>
      <Link to={link} className="text-link heading-link">{linkText}<ArrowRight size={15} /></Link>
    </div>
  )
}
