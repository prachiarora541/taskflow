import { useState } from 'react'
import { ArrowRight, ChevronRight, Minus, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function FaqPage() {
  const [open, setOpen] = useState(0)
  const faqs = [
    ['Is your gold certified?', 'Every Samridhhi gold piece is BIS-hallmarked. The hallmark confirms the purity of the gold, and product details include the metal and approximate net weight.'],
    ['How long will delivery take?', 'Ready-to-ship pieces are usually dispatched within 2–4 business days. Personalised and made-to-order pieces can take longer; our team will confirm the timeline before you order.'],
    ['How do I find my ring size?', 'Use our size guide on any product page or visit us in store for a complimentary fitting. If you are between sizes, reach out and our team will be happy to help.'],
    ['Can I return or exchange an item?', 'Please contact us within 7 days of receiving your order. Items must be unused and in their original packaging. Custom-made pieces, earrings and sale items may have different eligibility.'],
    ['How should I care for my jewellery?', 'Store each piece separately in its Samridhhi box, away from moisture, perfume and direct sunlight. Visit us for a professional clean and care check.'],
    ['Do you offer international shipping?', 'Please contact our team before ordering internationally so we can confirm destination availability, insured shipping and any applicable duties.'],
  ]
  return <div className="page-wrap faq-page"><div className="breadcrumbs"><Link to="/">Home</Link><ChevronRight size={13} /> A few good questions</div><div className="faq-intro"><span className="eyebrow">HERE FOR THE LITTLE DETAILS</span><h1>A few good <em>questions.</em></h1><p>Good things feel even better when you know a little more.</p></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${open === index ? 'open' : ''}`} key={question}><button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span><i>0{index + 1}</i>{question}</span>{open === index ? <Minus size={17} /> : <Plus size={17} />}</button>{open === index && <p>{answer}</p>}</div>)}</div><div className="faq-contact">Still wondering? <Link to="/contact" className="text-link">We’re always happy to help <ArrowRight size={14} /></Link></div></div>
}
