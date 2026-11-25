import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function EmptyState({ title, text, action, to, onClick }) {
  return <div className="empty-state"><div className="empty-icon"><Sparkles size={22} /></div><h2>{title}</h2><p>{text}</p>{to ? <Link to={to} className="button button-dark">{action}<ArrowRight size={15} /></Link> : <button className="button button-dark" onClick={onClick}>{action}<ArrowRight size={15} /></button>}</div>
}
