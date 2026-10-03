import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/LanguageContext'
import { useAuth } from '../auth/AuthContext'
import { plans } from '../data/plans'
import { Icon } from '../components/Icon'

export default function Subscription() {
  const { t, tr } = useI18n()
  const { user } = useAuth()

  return (
    <div className="page">
      <header className="page-head">
        <h1>{t.subscription.title}</h1>
        <p>{t.subscription.lead}</p>
      </header>
      <section className="plans">
        {plans.map((p) => {
          const isCurrent = !!user && p.id === 'free'
          const href = p.id === 'free' ? (user ? '/software' : '/register') : `/support?type=subscription&plan=${p.id}`
          return (
            <div key={p.id} className={`card plan ${p.highlighted ? 'plan-hl' : ''}`}>
              {p.highlighted && <span className="plan-badge">{t.subscription.popular}</span>}
              <h3>{tr(p.name)}</h3>
              <p className="muted">{tr(p.description)}</p>
              <div className="price">
                {p.price ? (
                  <>
                    <b>{tr(p.price)}</b>
                    {p.period && <span>{tr(p.period)}</span>}
                  </>
                ) : (
                  <b className="price-soon">{t.subscription.priceSoon}</b>
                )}
              </div>
              <ul>
                {p.features.map((f) => (
                  <li key={f.uz}><Icon name="check" size={16} />{tr(f)}</li>
                ))}
              </ul>
              {isCurrent ? (
                <span className="btn btn-disabled btn-block">{t.subscription.current}</span>
              ) : (
                <Link to={href} className={`btn btn-block ${p.highlighted ? 'btn-primary' : 'btn-ghost'}`}>
                  {p.price ? t.subscription.choose : t.subscription.contact}
                </Link>
              )}
            </div>
          )
        })}
      </section>
      <p className="plan-note"><Icon name="info" size={16} /> {t.subscription.note} <Link to="/support" className="link">{t.nav.support} →</Link></p>
    </div>
  )
}
