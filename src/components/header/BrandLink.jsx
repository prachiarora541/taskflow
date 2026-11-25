import { Link } from 'react-router-dom'

export default function BrandLink({ onClick }) {
  return (
    <Link to="/" className="wordmark" aria-label="Samridhhi Jewellers home" onClick={onClick}>
      <span className="wordmark-symbol">S</span>
      <span className="wordmark-copy">
        <strong>Samridhhi</strong>
        <small>J E W E L L E R S</small>
      </span>
    </Link>
  )
}
