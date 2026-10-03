import { useState } from 'react'
import { useI18n } from '../i18n/LanguageContext'
import { categories, courses, type CategoryId, type Course } from '../data/courses'
import { CourseCard, VideoModal } from '../components/Cards'

export default function Learning() {
  const { t, tr } = useI18n()
  const [cat, setCat] = useState<CategoryId | 'all'>('all')
  const [open, setOpen] = useState<Course | null>(null)
  const list = cat === 'all' ? courses : courses.filter((c) => c.category === cat)

  return (
    <div className="page">
      <header className="page-head">
        <h1>{t.learning.title}</h1>
        <p>{t.learning.lead}</p>
      </header>
      <div className="chips filter">
        <button className={`chip ${cat === 'all' ? 'active' : ''}`} onClick={() => setCat('all')}>{t.learning.all}</button>
        {categories.map((c) => (
          <button key={c.id} className={`chip ${cat === c.id ? 'active' : ''}`} onClick={() => setCat(c.id)}>
            {tr(c.name)}
          </button>
        ))}
      </div>
      {list.length ? (
        <section className="grid-3">
          {list.map((c) => <CourseCard key={c.id} course={c} onOpen={setOpen} />)}
        </section>
      ) : (
        <p className="empty">{t.learning.empty}</p>
      )}
      {open && <VideoModal course={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
