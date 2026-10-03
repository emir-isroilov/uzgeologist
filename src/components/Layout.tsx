import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n/LanguageContext'
import { LANGS } from '../i18n/translations'
import { useAuth } from '../auth/AuthContext'
import { Icon, Logo, type IconName } from './Icon'
import { ChatWidget } from './ChatWidget'
import { site } from '../data/site'

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

function SiteFooter() {
  const { t } = useI18n()
  const socials = (Object.entries(site.socials) as [IconName, string][]).filter(([, url]) => url)
  return (
    <footer className="site-foot">
      <div className="foot-grid">
        <div className="foot-brand">
          <Logo />
          <p>{t.footer.tagline}</p>
        </div>
        <div className="foot-col">
          <h4>{t.footer.help}</h4>
          <Link to="/support">{t.nav.support}</Link>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
        <div className="foot-col">
          <h4>{t.footer.legal}</h4>
          <Link to="/terms">{t.footer.terms}</Link>
          <Link to="/privacy">{t.footer.privacy}</Link>
        </div>
        {socials.length > 0 && (
          <div className="foot-col">
            <h4>{t.footer.find}</h4>
            <div className="socials">
              {socials.map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>
                  <Icon name={name} size={19} />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="foot-copy">© {new Date().getFullYear()} UzGeologist. {t.footer.rights}</div>
    </footer>
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
      title: t.nav.sectionPlatform,
      items: [
        { to: '/', icon: 'home', label: t.nav.home },
        { to: '/software', icon: 'box', label: t.nav.software },
        { to: '/tutorials', icon: 'play', label: t.nav.learning },
        { to: '/subscription', icon: 'card', label: t.nav.subscription },
      ],
    },
    {
      title: t.nav.sectionCompany,
      items: [
        { to: '/about', icon: 'info', label: t.nav.about },
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
        <div className="sidebar-bottom">
          <NavLink to="/support" className="nav-item">
            <Icon name="support" size={19} />
            {t.nav.support}
          </NavLink>
        </div>
      </aside>

      <main className="content">
        <Outlet />
        <SiteFooter />
      </main>

      <ChatWidget />
    </div>
  )
}
