import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n/LanguageContext'
import { useAuth } from '../auth/AuthContext'
import { courses } from '../data/courses'
import { Icon, Logo } from '../components/Icon'

function AuthShell({ mode }: { mode: 'login' | 'register' }) {
  const { t } = useI18n()
  const { user, demo, signIn, signUp } = useAuth()
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to="/account" replace />

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    const res = mode === 'login' ? await signIn(email, password) : await signUp(name, email, password)
    setBusy(false)
    if (res.ok) {
      if (res.needsConfirm) setInfo(t.auth.checkEmail)
      else nav('/account')
    } else {
      setError(
        res.error === 'invalid' ? t.auth.errInvalid
          : res.error === 'exists' ? t.auth.errExists
          : res.error === 'short' ? t.auth.errShort
          : res.message || t.chat.error,
      )
    }
  }

  return (
    <div className="page auth-page">
      <div className="auth-card card">
        <div className="auth-side">
          <Logo />
          <h2>{mode === 'login' ? t.auth.loginTitle : t.auth.registerTitle}</h2>
          <ul>
            {t.auth.perks.map((p) => (
              <li key={p}><span className="check"><Icon name="check" size={14} /></span>{p}</li>
            ))}
          </ul>
        </div>
        <form className="form auth-form" onSubmit={submit}>
          {mode === 'register' && (
            <label>{t.auth.name}<input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" /></label>
          )}
          <label>{t.auth.email}<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" /></label>
          <label>
            {t.auth.password}
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
            {mode === 'register' && <small className="hint">{t.auth.passwordHint}</small>}
          </label>
          {error && <div className="alert">{error}</div>}
          {info && <div className="success">{info}</div>}
          <button className="btn btn-primary btn-block" disabled={busy}>
            {mode === 'login' ? t.auth.submitLogin : t.auth.submitRegister}
          </button>
          <p className="switch">
            {mode === 'login' ? t.auth.noAccount : t.auth.haveAccount}{' '}
            <Link to={mode === 'login' ? '/register' : '/login'} className="link">
              {mode === 'login' ? t.top.register : t.top.login}
            </Link>
          </p>
          {demo && <p className="demo-note"><Icon name="info" size={14} /> {t.auth.demo}</p>}
        </form>
      </div>
    </div>
  )
}

export const Login = () => <AuthShell mode="login" />
export const Register = () => <AuthShell mode="register" />

export function Account() {
  const { t, tr, lang } = useI18n()
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  const since = new Date(user.createdAt).toLocaleDateString(lang === 'en' ? 'en-GB' : lang === 'ru' ? 'ru-RU' : 'uz-UZ')

  return (
    <div className="page">
      <header className="page-head">
        <h1>{t.account.title}</h1>
      </header>
      <div className="account-grid">
        <div className="card profile">
          <div className="avatar avatar-lg">{user.name.slice(0, 1).toUpperCase()}</div>
          <h3>{user.name}</h3>
          <p className="muted">{user.email}</p>
          <dl className="facts">
            <div><dt>{t.account.memberSince}</dt><dd>{since}</dd></div>
          </dl>
        </div>
        <div className="account-main">
          <h2 className="section-title">{t.account.continue}</h2>
          <div className="card release-list">
            {courses.slice(0, 3).map((c) => (
              <Link key={c.id} to="/learning" className="release">
                <span className="tile-icon"><Icon name="play" size={18} /></span>
                <div className="release-main">
                  <b>{tr(c.title)}</b>
                  <div className="progress"><span style={{ width: '0%' }} /></div>
                </div>
                <time>0 / {c.lessons}</time>
              </Link>
            ))}
          </div>
          <h2 className="section-title">{t.account.downloads}</h2>
          <div className="card empty-card">
            <Icon name="download" size={22} />
            <span>{t.account.noDownloads}</span>
            <Link to="/software" className="btn btn-ghost btn-sm">{t.nav.software}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
