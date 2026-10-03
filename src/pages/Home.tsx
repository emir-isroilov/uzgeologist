import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/LanguageContext'
import { useAuth } from '../auth/AuthContext'
import { courses, type Course } from '../data/courses'
import { software } from '../data/software'
import { CourseCard, SoftwareMark, VideoModal } from '../components/Cards'
import { Icon, type IconName } from '../components/Icon'

export default function Home() {
  const { t, tr } = useI18n()
  const { user } = useAuth()
  const [open, setOpen] = useState<Course | null>(null)

  const releases = software
    .flatMap((sw) => sw.versions.map((v) => ({ sw, v })))
    .sort((a, b) => b.v.date.localeCompare(a.v.date))
    .slice(0, 4)

  const tiles: { to: string; icon: IconName; title: string; text: string }[] = [
    { to: '/learning', icon: 'play', title: t.nav.learning, text: t.home.qLearning },
    { to: '/software', icon: 'box', title: t.nav.software, text: t.home.qSoftware },
    { to: '/contact', icon: 'mail', title: t.nav.contact, text: t.home.qSupport },
  ]

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-text">
          <h1>{user ? t.home.greetUser.replace('{name}', user.name.split(' ')[0]) : t.home.greetGuest}</h1>
          <p>{t.home.lead}</p>
          <div className="hero-actions">
            {!user && <Link to="/register" className="btn btn-primary btn-lg">{t.home.ctaStart}</Link>}
            <Link to="/learning" className={`btn btn-lg ${user ? 'btn-primary' : 'btn-light'}`}>{t.home.ctaCourses}</Link>
          </div>
        </div>
        <svg className="hero-art" viewBox="0 0 600 300" preserveAspectRatio="xMaxYMax slice" aria-hidden="true">
          <path d="M0 150 C120 110 240 190 360 140 S540 100 600 130 V300 H0Z" fill="#ffffff" opacity=".05" />
          <path d="M0 190 C140 160 260 220 400 180 S560 160 600 175 V300 H0Z" fill="#d07a3a" opacity=".35" />
          <path d="M0 230 C150 210 280 250 420 220 S560 210 600 222 V300 H0Z" fill="#d07a3a" opacity=".55" />
          <path d="M0 265 C160 255 300 280 440 262 S560 255 600 262 V300 H0Z" fill="#9c5523" opacity=".9" />
          <line x1="470" y1="60" x2="470" y2="250" stroke="#f0b27a" strokeWidth="5" />
          <path d="M452 60 H488 L480 42 H460Z" fill="#f0b27a" />
          <circle cx="470" cy="250" r="8" fill="#fff" />
        </svg>
      </section>

      <section className="stats">
        <div><b>{courses.length}+</b><span>{t.home.stats.courses}</span></div>
        <div><b>{software.length}</b><span>{t.home.stats.programs}</span></div>
        <div><b>3</b><span>{t.home.stats.langs}</span></div>
        <div><b>100%</b><span>{t.home.stats.free}</span></div>
      </section>

      <h2 className="section-title">{t.home.quick}</h2>
      <section className="tiles">
        {tiles.map((x) => (
          <Link key={x.to} to={x.to} className="card tile">
            <span className="tile-icon"><Icon name={x.icon} size={22} /></span>
            <div>
              <h3>{x.title}</h3>
              <p>{x.text}</p>
            </div>
            <span className="tile-arrow">→</span>
          </Link>
        ))}
      </section>

      <div className="section-row">
        <h2 className="section-title">{t.home.newCourses}</h2>
        <Link to="/learning" className="link">{t.home.viewAll}</Link>
      </div>
      <section className="grid-3">
        {courses.filter((c) => c.isNew).slice(0, 3).map((c) => (
          <CourseCard key={c.id} course={c} onOpen={setOpen} />
        ))}
      </section>

      <div className="section-row">
        <h2 className="section-title">{t.home.latestReleases}</h2>
        <Link to="/software" className="link">{t.home.viewAll}</Link>
      </div>
      <section className="card release-list">
        {releases.map(({ sw, v }) => (
          <Link key={sw.id + v.version} to={`/software/${sw.id}`} className="release">
            <SoftwareMark sw={sw} size={38} />
            <div className="release-main">
              <b>{sw.name} <span className="ver">v{v.version}</span></b>
              <small>{tr(v.notes)}</small>
            </div>
            <time>{v.date}</time>
          </Link>
        ))}
      </section>

      {open && <VideoModal course={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
