import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/LanguageContext'
import { trackById, coursesOf, type Course, type Track } from '../data/courses'
import type { Software } from '../data/software'
import { useAuth } from '../auth/AuthContext'
import { Icon } from './Icon'

const FALLBACK: [string, string, string] = ['#24263d', '#4b4f8a', '#8f93d6']

export function CourseThumb({ course, palette }: { course?: Course; palette?: [string, string, string] }) {
  const [a, b, c] = palette ?? (course && trackById(course.track)?.palette) ?? FALLBACK
  const seed = (course?.id.length ?? 7) * 13
  return (
    <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" className="thumb-svg" aria-hidden="true">
      <rect width="320" height="180" fill={a} />
      <path d={`M0 ${70 + (seed % 20)} C80 ${50 + (seed % 30)} 180 ${100 - (seed % 25)} 320 ${60 + (seed % 15)} V180 H0Z`} fill={b} opacity=".9" />
      <path d={`M0 ${115 + (seed % 10)} C110 ${95 + (seed % 20)} 200 ${140 - (seed % 15)} 320 ${110 + (seed % 12)} V180 H0Z`} fill={c} opacity=".85" />
      <path d={`M0 150 C120 140 220 165 320 150 V180 H0Z`} fill="#000" opacity=".18" />
    </svg>
  )
}

export function CourseCard({ course, onOpen }: { course: Course; onOpen: (c: Course) => void }) {
  const { t, tr } = useI18n()
  const track = trackById(course.track)
  return (
    <button className="card course-card" onClick={() => onOpen(course)}>
      <div className="thumb">
        <CourseThumb course={course} />
        <span className="play"><Icon name="play" size={20} /></span>
        {course.isNew && <span className="badge-new">NEW</span>}
      </div>
      <div className="card-body">
        {track && <span className="eyebrow">{tr(track.name)}</span>}
        <h3>{tr(course.title)}</h3>
        <p>{tr(course.description)}</p>
        <div className="meta">
          {course.lessons != null && <span><Icon name="layers" size={15} /> {course.lessons} {t.learning.lessons}</span>}
          {course.hours != null && <span><Icon name="clock" size={15} /> {course.hours} h</span>}
          <span className={`lvl lvl-${course.level}`}>{t.learning.level[course.level]}</span>
        </div>
      </div>
    </button>
  )
}

export function VideoModal({ course, onClose }: { course: Course; onClose: () => void }) {
  const { t, tr } = useI18n()
  const { user } = useAuth()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-wrap" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={tr(course.title)}>
        <button className="icon-btn modal-close" onClick={onClose} aria-label="close"><Icon name="close" /></button>
        <div className="player">
          {course.youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${course.youtubeId}`}
              title={tr(course.title)}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="player-empty">
              <CourseThumb course={course} />
              <div><Icon name="play" size={28} /><span>{t.learning.videoSoon}</span></div>
            </div>
          )}
        </div>
        <div className="modal-body">
          <h2>{tr(course.title)}</h2>
          <p>{tr(course.description)}</p>
          <div className="meta">
            {course.lessons != null && <span><Icon name="layers" size={15} /> {course.lessons} {t.learning.lessons}</span>}
            {course.hours != null && <span><Icon name="clock" size={15} /> {course.hours} h</span>}
            <span className={`lvl lvl-${course.level}`}>{t.learning.level[course.level]}</span>
          </div>
          {!user && (
            <div className="notice">
              <Icon name="info" size={18} /> {t.learning.loginToWatch}
              <Link to="/login" className="btn btn-primary btn-sm">{t.top.login}</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function SoftwareMark({ sw, size = 44 }: { sw: Software; size?: number }) {
  return (
    <span className="sw-mark" style={{ background: sw.color, width: size, height: size, fontSize: size * 0.36 }}>
      {sw.name.slice(0, 1).toUpperCase()}
    </span>
  )
}

export function SoftwareCard({ sw }: { sw: Software }) {
  const { t, tr } = useI18n()
  const latest = sw.versions[0]
  return (
    <Link to={`/software/${sw.id}`} className="card sw-card">
      <div className="sw-top">
        <SoftwareMark sw={sw} />
        <div>
          <h3>{sw.name}</h3>
          <small>{tr(sw.tagline)}</small>
        </div>
      </div>
      <p>{tr(sw.summary)}</p>
      <div className="sw-foot">
        {latest ? (
          <span className="ver-pill">{t.software.latest}: <b>v{latest.version}</b></span>
        ) : (
          <span className="ver-pill muted">{sw.status ? tr(sw.status) : t.software.soon}</span>
        )}
        <span className="muted small">{sw.platform}</span>
      </div>
    </Link>
  )
}

export function TrackCard({ track }: { track: Track }) {
  const { t, tr } = useI18n()
  const count = coursesOf(track.id).length
  const first = track.levels[0]
  const last = track.levels[track.levels.length - 1]
  return (
    <Link to={`/tutorials/${track.id}`} className={`card track-card ${track.locked ? 'is-locked' : ''}`}>
      <div className="track-thumb">
        <CourseThumb palette={track.palette} />
        <span className="track-name">{tr(track.name)}</span>
        {track.locked && (
          <span className="track-lock"><Icon name="lock" size={14} /> {t.learning.locked}</span>
        )}
      </div>
      <div className="card-body">
        <p>{tr(track.description)}</p>
        <div className="meta">
          <span className="lvl-range">
            {t.learning.level[first]}
            {first !== last && <> → {t.learning.level[last]}</>}
          </span>
          {!track.locked && count > 0 && <span><Icon name="layers" size={15} /> {count} {t.learning.courses}</span>}
        </div>
      </div>
    </Link>
  )
}
