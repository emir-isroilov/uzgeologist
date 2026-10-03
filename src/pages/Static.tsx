import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useI18n } from '../i18n/LanguageContext'
import { useAuth } from '../auth/AuthContext'
import { courses, type Course } from '../data/courses'
import { software } from '../data/software'
import { plans } from '../data/plans'
import { site } from '../data/site'
import { CourseCard, SoftwareCard, VideoModal } from '../components/Cards'
import { Icon, type IconName } from '../components/Icon'

export function About() {
  const { t } = useI18n()
  const blocks: { icon: IconName; title: string; text: string }[] = [
    { icon: 'target', title: t.about.missionT, text: t.about.mission },
    { icon: 'eye', title: t.about.visionT, text: t.about.vision },
    { icon: 'heart', title: t.about.valuesT, text: t.about.values },
  ]
  return (
    <div className="page">
      <header className="page-head">
        <h1>{t.about.title}</h1>
        <p>{t.about.lead}</p>
      </header>
      <section className="grid-3">
        {blocks.map((b) => (
          <div key={b.title} className="card info-card">
            <span className="tile-icon"><Icon name={b.icon} size={22} /></span>
            <h3>{b.title}</h3>
            <p>{b.text}</p>
          </div>
        ))}
      </section>
      <h2 className="section-title">{t.about.teamT}</h2>
      <ul className="card checks">
        {t.about.offer.map((o) => (
          <li key={o}><span className="check"><Icon name="check" size={14} /></span>{o}</li>
        ))}
      </ul>
    </div>
  )
}

type SupportType = keyof ReturnType<typeof useI18n>['t']['support']['types']
const TYPE_ICONS: Record<SupportType, IconName> = {
  suggestion: 'sparkle',
  complaint: 'info',
  technical: 'box',
  subscription: 'card',
  partnership: 'heart',
  other: 'mail',
}

export function Support() {
  const { t, tr } = useI18n()
  const { user } = useAuth()
  const [params] = useSearchParams()
  const initialType = (params.get('type') as SupportType) in TYPE_ICONS ? (params.get('type') as SupportType) : 'suggestion'
  const plan = plans.find((p) => p.id === params.get('plan'))
  const [type, setType] = useState<SupportType>(initialType)
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBusy(true)
    const fd = new FormData(e.currentTarget)
    try {
      // Netlify Forms — murojaatlar Netlify kabinetidagi "Forms" bo'limiga tushadi
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(fd as unknown as Record<string, string>).toString(),
      })
    } catch {
      /* lokal rejimda e'tiborsiz qoldiriladi */
    }
    setBusy(false)
    setSent(true)
  }

  return (
    <div className="page">
      <header className="page-head">
        <h1>{t.support.title}</h1>
        <p>{t.support.lead}</p>
      </header>

      <div className="support-grid">
        <div className="card form-card">
          {sent ? (
            <div className="sent-box">
              <div className="success"><Icon name="check" size={22} /> {t.support.sent}</div>
              <button className="btn btn-ghost" onClick={() => setSent(false)}>{t.support.another}</button>
            </div>
          ) : (
            <form name="support" onSubmit={submit} className="form">
              <input type="hidden" name="form-name" value="support" />
              <input type="hidden" name="type" value={t.support.types[type]} />
              <div>
                <div className="field-label">{t.support.typeLabel}</div>
                <div className="type-grid" role="radiogroup">
                  {(Object.keys(TYPE_ICONS) as SupportType[]).map((k) => (
                    <button
                      type="button"
                      key={k}
                      role="radio"
                      aria-checked={type === k}
                      className={`type-btn ${type === k ? 'active' : ''}`}
                      onClick={() => setType(k)}
                    >
                      <Icon name={TYPE_ICONS[k]} size={18} />
                      {t.support.types[k]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="row-2">
                <label>{t.support.name}<input name="name" required defaultValue={user?.name} /></label>
                <label>{t.support.email}<input name="email" type="email" required defaultValue={user?.email} /></label>
              </div>
              <div className="row-2">
                <label>{t.support.phone}<input name="phone" type="tel" placeholder="+998" /></label>
                <label>
                  {t.support.product}
                  <select name="product" defaultValue="">
                    <option value="">{t.support.productNone}</option>
                    {software.map((s) => <option key={s.id} value={s.name}>{s.name}</option>)}
                  </select>
                </label>
              </div>
              <label>
                {t.support.message}
                <textarea name="message" rows={5} required defaultValue={plan ? `${t.nav.subscription}: ${tr(plan.name)}\n` : ''} />
              </label>
              <button className="btn btn-primary" disabled={busy}>{t.support.send}</button>
            </form>
          )}
        </div>

        <aside className="support-side">
          <div className="card contact-info">
            <h3>{t.support.contactsTitle}</h3>
            <div><span className="tile-icon"><Icon name="mail" size={20} /></span><div><small>{t.support.emailLabel}</small><a href={`mailto:${site.email}`}><b>{site.email}</b></a></div></div>
            <div><span className="tile-icon"><Icon name="phone" size={20} /></span><div><small>{t.support.phoneLabel}</small><b>{site.phone}</b></div></div>
            <div><span className="tile-icon"><Icon name="pin" size={20} /></span><div><small>{t.support.address}</small><b>{t.support.addressValue}</b></div></div>
            <div><span className="tile-icon"><Icon name="clock" size={20} /></span><div><small>{t.support.hours}</small><b>{t.support.hoursValue}</b></div></div>
          </div>
        </aside>
      </div>

      <h2 className="section-title">{t.support.faqTitle}</h2>
      <div className="card faq">
        {t.support.faq.map((f, i) => (
          <div key={f.q} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
              {f.q}
              <span className="faq-sign">{openFaq === i ? '−' : '+'}</span>
            </button>
            {openFaq === i && <p>{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}

export function Legal({ kind }: { kind: 'terms' | 'privacy' }) {
  const { t } = useI18n()
  const title = kind === 'terms' ? t.legal.termsTitle : t.legal.privacyTitle
  const sections = kind === 'terms' ? t.legal.terms : t.legal.privacy
  return (
    <div className="page legal">
      <header className="page-head">
        <h1>{title}</h1>
        <p>{t.legal.updated}: {site.legalUpdated}</p>
      </header>
      <div className="notice"><Icon name="info" size={18} /> {t.legal.draft}</div>
      <div className="card legal-body">
        {sections.map((s, i) => (
          <section key={s.h}>
            <h2>{i + 1}. {s.h}</h2>
            <p>{s.p}</p>
          </section>
        ))}
      </div>
    </div>
  )
}

export function Search() {
  const { t, tr } = useI18n()
  const [params] = useSearchParams()
  const [open, setOpen] = useState<Course | null>(null)
  const q = (params.get('q') || '').toLowerCase()
  const match = (...s: string[]) => s.some((x) => x.toLowerCase().includes(q))
  const cs = courses.filter((c) => match(c.title.uz, c.title.en, c.title.ru, tr(c.description)))
  const ss = software.filter((s) => match(s.name, tr(s.summary), tr(s.tagline)))

  return (
    <div className="page">
      <header className="page-head">
        <h1>“{params.get('q')}”</h1>
      </header>
      {!cs.length && !ss.length && <p className="empty">{t.learning.empty}</p>}
      {ss.length > 0 && (
        <>
          <h2 className="section-title">{t.nav.software}</h2>
          <section className="grid-3">{ss.map((s) => <SoftwareCard key={s.id} sw={s} />)}</section>
        </>
      )}
      {cs.length > 0 && (
        <>
          <h2 className="section-title">{t.nav.learning}</h2>
          <section className="grid-3">{cs.map((c) => <CourseCard key={c.id} course={c} onOpen={setOpen} />)}</section>
        </>
      )}
      {open && <VideoModal course={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
