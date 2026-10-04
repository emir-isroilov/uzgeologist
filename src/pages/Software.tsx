import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useI18n } from '../i18n/LanguageContext'
import { useAuth } from '../auth/AuthContext'
import { software } from '../data/software'
import { coursesOf, trackById, type Course } from '../data/courses'
import { CourseCard, SoftwareCard, SoftwareMark, VideoModal } from '../components/Cards'
import { Icon } from '../components/Icon'
import NotFound from './NotFound'

export function SoftwareList() {
  const { t } = useI18n()
  return (
    <div className="page">
      <header className="page-head">
        <h1>{t.software.title}</h1>
        <p>{t.software.lead}</p>
      </header>
      <section className="grid-3">
        {software.map((sw) => <SoftwareCard key={sw.id} sw={sw} />)}
      </section>
    </div>
  )
}

export function SoftwareDetail() {
  const { id } = useParams()
  const { t, tr } = useI18n()
  const { user } = useAuth()
  const [open, setOpen] = useState<Course | null>(null)
  const sw = software.find((s) => s.id === id)
  if (!sw) return <NotFound />
  const hasTrack = !!trackById(sw.id) && !trackById(sw.id)?.locked
  const tutorials = hasTrack ? coursesOf(sw.id) : []

  const DownloadBtn = ({ url, primary }: { url?: string; primary?: boolean }) => {
    if (!url) return <span className="btn btn-disabled btn-sm">{t.software.soon}</span>
    if (!user) return <Link to="/login" className="btn btn-ghost btn-sm">{t.software.loginToDownload}</Link>
    return (
      <a href={url} className={`btn btn-sm ${primary ? 'btn-primary' : 'btn-ghost'}`} rel="noopener">
        <Icon name="download" size={16} /> {t.software.download}
      </a>
    )
  }

  return (
    <div className="page">
      <Link to="/software" className="link back">{t.software.back}</Link>
      <header className="card sw-hero">
        <SoftwareMark sw={sw} size={64} />
        <div className="sw-hero-main">
          <span className="eyebrow">{tr(sw.tagline)}</span>
          <h1>{sw.name}</h1>
          <p>{tr(sw.summary)}</p>
          <dl className="facts">
            <div><dt>{t.software.platform}</dt><dd>{sw.platform}</dd></div>
            <div><dt>{t.software.license}</dt><dd>{tr(sw.license)}</dd></div>
            {sw.versions[0] && <div><dt>{t.software.latest}</dt><dd>v{sw.versions[0].version}</dd></div>}
          </dl>
        </div>
        <div className="sw-hero-cta">
          {sw.versions[0]?.downloadUrl ? (
            <DownloadBtn url={sw.versions[0].downloadUrl} primary />
          ) : (
            <Link to="/subscription" className="btn btn-primary">{t.software.getAccess}</Link>
          )}
        </div>
      </header>

      {sw.features.length > 0 && (
        <>
          <h2 className="section-title">{t.software.features}</h2>
          <ul className="card checks feature-list">
            {sw.features.map((f) => (
              <li key={f.uz}><span className="check"><Icon name="check" size={14} /></span>{tr(f)}</li>
            ))}
          </ul>
        </>
      )}

      <h2 className="section-title">{t.software.versions}</h2>
      {sw.versions.length > 0 ? (
        <div className="card table-wrap">
          <table className="versions">
            <thead>
              <tr>
                <th>Version</th>
                <th>{t.software.released}</th>
                <th>{t.software.notes}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {sw.versions.map((v, i) => (
                <tr key={v.version}>
                  <td>
                    <b>v{v.version}</b>
                    {i === 0 && <span className="tag-current">{t.software.current}</span>}
                  </td>
                  <td className="muted">{v.date}</td>
                  <td>{tr(v.notes)}</td>
                  <td className="right"><DownloadBtn url={v.downloadUrl} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card empty-card">
          <Icon name="clock" size={22} />
          <span>{t.software.noVersions}</span>
        </div>
      )}

      {tutorials.length > 0 && (
        <>
          <div className="section-row">
            <h2 className="section-title">{t.software.tutorials}</h2>
            <Link to={`/tutorials/${sw.id}`} className="link">{t.home.viewAll}</Link>
          </div>
          <section className="grid-3">
            {tutorials.map((c) => <CourseCard key={c.id} course={c} onOpen={setOpen} />)}
          </section>
        </>
      )}
      {open && <VideoModal course={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
