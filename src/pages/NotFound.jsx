import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return <div className="not-found"><span className="eyebrow">A LITTLE DETOUR</span><strong>404</strong><h1>This page wandered <em>off.</em></h1><p>But there are plenty of lovely things waiting to be found.</p><Link to="/shop" className="button button-dark">Find your way to the collection <ArrowRight size={15} /></Link></div>
}
