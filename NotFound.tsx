import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/LanguageContext'

export default function NotFound() {
  const { t } = useI18n()
  return (
    <div className="page center-page">
      <div className="nf-code">404</div>
      <h1>{t.notFound.title}</h1>
      <Link to="/" className="btn btn-primary">{t.notFound.back}</Link>
    </div>
  )
}
