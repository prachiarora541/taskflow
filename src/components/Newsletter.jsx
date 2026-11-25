import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const submit = (event) => { event.preventDefault(); setSubmitted(true) }
  return <section className="newsletter"><span className="newsletter-sparkle">✳</span><div><span className="eyebrow">A NOTE FROM US, NOW AND THEN</span><h2>A little golden <em>something.</em></h2><p>New pieces, thoughtful stories and the occasional lovely surprise. No noise, ever.</p></div><form onSubmit={submit}>{submitted ? <div className="newsletter-success"><Check size={17} /> Preview only — mailing list not connected.</div> : <><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" required placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} /><button type="submit" aria-label="Subscribe to newsletter"><ArrowRight size={18} /></button><small>By subscribing, you agree to our <Link to="/privacy">privacy policy</Link>.</small></>}</form></section>
}
