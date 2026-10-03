import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n/LanguageContext'
import { LANGS } from '../i18n/translations'
import { useAuth } from '../auth/AuthContext'
import { Icon, Logo, type IconName } from './Icon'
import { ChatWidget } from './ChatWidget'

function LangSwitcher() {
  const { lang, setLang } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const close = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false)
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])
  return (
    <div className="dropdown" ref={ref}>
      <button className="icon-btn lang-btn" onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open}>
        <Icon name="globe" size={18} />
        <span>{LANGS.find((l) => l.code === lang)?.short}</span>
      </button>
      {open && (
        <ul className="menu-pop" role="listbox">
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                role="option"
                aria-selected={l.code === lang}
                className={l.code === lang ? 'active' : ''}
                onClick={() => {
                  setLang(l.code)
                  setOpen(false)
                }}
              >
                <span className="lang-short">{l.short}</span> {l.label}
                {l.code === lang && <Icon name="check" size={16} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function UserMenu() {
  const { user, signOut } = useAuth()
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const nav = useNavigate()
  useEffect(() => {
    const close = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false)
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  if (!user)
    return (
      <div className="auth-btns">
        <Link to="/login" className="btn btn-ghost">{t.top.login}</Link>
        <Link to="/register" className="btn btn-primary hide-sm">{t.top.register}</Link>
      </div>
    )

  return (
    <div className="dropdown" ref={ref}>
      <button className="avatar" onClick={() => setOpen((o) => !o)} aria-label={user.name}>
        {user.name.slice(0, 1).toUpperCase()}
      </button>
      {open && (
        <ul className="menu-pop menu-right">
          <li className="menu-head">
            <b>{user.name}</b>
            <small>{user.email}</small>
          </li>
          <li>
            <button onClick={() => { setOpen(false); nav('/account') }}>
              <Icon name="user" size={16} /> {t.nav.account}
            </button>
          </li>
          <li>
            <button onClick={async () => { setOpen(false); await signOut(); nav('/') }}>
              <Icon name="logout" size={16} /> {t.top.logout}
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}

export function Layout() {
  const { t } = useI18n()
  const { user } = useAuth()
  const [drawer, setDrawer] = useState(false)
  const [q, setQ] = useState('')
  const loc = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    setDrawer(false)
    window.scrollTo(0, 0)
  }, [loc.pathname])

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    if (q.trim()) nav(`/search?q=${encodeURIComponent(q.trim())}`)
  }

  const groups: { title: string; items: { to: string; icon: IconName; label: string }[] }[] = [
    {
      title: t.nav.sectionLearn,
      items: [
        { to: '/', icon: 'home', label: t.nav.home },
        { to: '/learning', icon: 'play', label: t.nav.learning },
      ],
    },
    { title: t.nav.sectionTools, items: [{ to: '/software', icon: 'box', label: t.nav.software }] },
    {
      title: t.nav.sectionCompany,
      items: [
        { to: '/about', icon: 'info', label: t.nav.about },
        { to: '/contact', icon: 'mail', label: t.nav.contact },
        ...(user ? [{ to: '/account', icon: 'user' as IconName, label: t.nav.account }] : []),
      ],
    },
  ]

  return (
    <div className="shell">
      <header className="topbar">
        <button className="icon-btn burger" onClick={() => setDrawer(true)} aria-label={t.top.menu}>
          <Icon name="menu" />
        </button>
        <Link to="/" className="brand"><Logo /></Link>
        <form className="search" onSubmit={onSearch} role="search">
          <Icon name="search" size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.top.search} aria-label={t.top.search} />
        </form>
        <div className="top-actions">
          <LangSwitcher />
          <UserMenu />
        </div>
      </header>

      <div className={`scrim ${drawer ? 'show' : ''}`} onClick={() => setDrawer(false)} />
      <aside className={`sidebar ${drawer ? 'open' : ''}`}>
        <div className="sidebar-head">
          <Logo />
          <button className="icon-btn" onClick={() => setDrawer(false)} aria-label="close"><Icon name="close" /></button>
        </div>
        <nav>
          {groups.map((g) => (
            <div key={g.title} className="nav-group">
              <div className="nav-title">{g.title}</div>
              {g.items.map((it) => (
                <NavLink key={it.to} to={it.to} end={it.to === '/'} className="nav-item">
                  <Icon name={it.icon} size={19} />
                  {it.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-foot">© {new Date().getFullYear()} UzGeologist</div>
      </aside>

      <main className="content">
        <Outlet />
        <footer className="foot">
          <span>© {new Date().getFullYear()} UzGeologist. {t.footer.rights}</span>
          <span className="foot-links">
            <Link to="/about">{t.nav.about}</Link>
            <Link to="/contact">{t.nav.contact}</Link>
          </span>
        </footer>
      </main>

      <ChatWidget />
    </div>
  )
}
