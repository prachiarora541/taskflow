import { useEffect } from 'react'
import { Check, X } from 'lucide-react'

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timeout = window.setTimeout(onClose, 3500)
    return () => window.clearTimeout(timeout)
  }, [message, onClose])

  return <div className="toast-message" role="status" key={message}><span><Check size={15} /></span>{message}<button aria-label="Dismiss notification" onClick={onClose}><X size={15} /></button></div>
}
