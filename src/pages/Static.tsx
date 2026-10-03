import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useI18n } from '../i18n/LanguageContext'
import { courses, type Course } from '../data/courses'
import { software } from '../data/software'
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

export function Contact() {
  const { t } = useI18n()
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBusy(true)
    const fd = new FormData(e.currentTarget)
    try {
      // Netlify Forms (index.html ichidagi yashirin "contact" formasi orqali aniqlanadi)
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
        <h1>{t.contact.title}</h1>
        <p>{t.contact.lead}</p>
      </header>
      <div className="contact-grid">
        <div className="card contact-info">
          <div><span className="tile-icon"><Icon name="mail" size={20} /></span><div><small>{t.contact.email}</small><b>info@uzgeologist.uz</b></div></div>
          <div><span className="tile-icon"><Icon name="phone" size={20} /></span><div><small>{t.contact.phone}</small><b>+998 __ ___ __ __</b></div></div>
          <div><span className="tile-icon"><Icon name="pin" size={20} /></span><div><small>{t.contact.address}</small><b>{t.contact.addressValue}</b></div></div>
        </div>
        <div className="card form-card">
          {sent ? (
            <div className="success"><Icon name="check" size={22} /> {t.contact.sent}</div>
          ) : (
            <form name="contact" onSubmit={submit} className="form">
              <input type="hidden" name="form-name" value="contact" />
              <label>{t.contact.name}<input name="name" required /></label>
              <label>{t.contact.email}<input name="email" type="email" required /></label>
              <label>{t.contact.message}<textarea name="message" rows={5} required /></label>
              <button className="btn btn-primary" disabled={busy}>{t.contact.send}</button>
            </form>
          )}
        </div>
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
  const ss = software.filter((s) => match(s.name, tr(s.summary)))

  return (
    <div className="page">
      <header className="page-head">
        <h1>“{params.get('q')}”</h1>
      </header>
      {!cs.length && !ss.length && <p className="empty">{t.learning.empty}</p>}
      {cs.length > 0 && (
        <>
          <h2 className="section-title">{t.nav.learning}</h2>
          <section className="grid-3">{cs.map((c) => <CourseCard key={c.id} course={c} onOpen={setOpen} />)}</section>
        </>
      )}
      {ss.length > 0 && (
        <>
          <h2 className="section-title">{t.nav.software}</h2>
          <section className="grid-3">{ss.map((s) => <SoftwareCard key={s.id} sw={s} />)}</section>
        </>
      )}
      {open && <VideoModal course={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
