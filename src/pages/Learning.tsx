import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useI18n } from '../i18n/LanguageContext'
import { coursesOf, trackById, tracks, type Course, type TrackGroup } from '../data/courses'
import { CourseCard, CourseThumb, TrackCard, VideoModal } from '../components/Cards'
import { Icon } from '../components/Icon'
import NotFound from './NotFound'

export default function Tutorials() {
  const { t } = useI18n()
  const groups: { id: TrackGroup; title: string; lead: string }[] = [
    { id: 'software', title: t.learning.groupSoftware, lead: t.learning.groupSoftwareLead },
    { id: 'science', title: t.learning.groupScience, lead: t.learning.groupScienceLead },
  ]
  return (
    <div className="page">
      <header className="page-head">
        <h1>{t.learning.title}</h1>
        <p>{t.learning.lead}</p>
      </header>
      {groups.map((g) => (
        <section key={g.id} className="track-group">
          <h2 className="section-title">{g.title}</h2>
          <p className="group-lead">{g.lead}</p>
          <div className="grid-3">
            {tracks.filter((tr) => tr.group === g.id).map((tr) => <TrackCard key={tr.id} track={tr} />)}
          </div>
        </section>
      ))}
    </div>
  )
}

export function TrackPage() {
  const { trackId } = useParams()
  const { t, tr } = useI18n()
  const [open, setOpen] = useState<Course | null>(null)
  const track = trackById(trackId || '')
  if (!track) return <NotFound />
  const list = coursesOf(track.id)

  return (
    <div className="page">
      <Link to="/tutorials" className="link back">{t.learning.back}</Link>
      <header className="card track-hero">
        <div className="track-hero-art"><CourseThumb palette={track.palette} /></div>
        <div className="track-hero-main">
          <span className="eyebrow">{track.group === 'software' ? t.learning.groupSoftware : t.learning.groupScience}</span>
          <h1>{tr(track.name)}</h1>
          <p>{tr(track.description)}</p>
          <div className="level-steps">
            {track.levels.map((l, i) => (
              <span key={l} className="level-step">
                <b>{i + 1}</b> {t.learning.level[l]}
              </span>
            ))}
          </div>
        </div>
      </header>

      {track.locked ? (
        <div className="card locked-card">
          <span className="tile-icon"><Icon name="lock" size={22} /></span>
          <div>
            <b>{t.learning.locked}</b>
            <p>{t.learning.lockedText}</p>
          </div>
        </div>
      ) : (
        track.levels.map((l, i) => {
          const items = list.filter((c) => c.level === l)
          return (
            <section key={l} className="level-section">
              <h2 className="section-title level-title">
                <span className="level-num">{i + 1}</span> {t.learning.level[l]}
              </h2>
              {items.length ? (
                <div className="grid-3">
                  {items.map((c) => <CourseCard key={c.id} course={c} onOpen={setOpen} />)}
                </div>
              ) : (
                <div className="card empty-card">
                  <Icon name="clock" size={20} />
                  <span>{t.learning.levelSoon}</span>
                </div>
              )}
            </section>
          )
        })
      )}
      {open && <VideoModal course={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
