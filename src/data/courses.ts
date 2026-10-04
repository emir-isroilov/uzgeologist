import type { L10n } from '../i18n/translations'

/**
 * TUTORIALLAR
 *
 * Tuzilma: YO'NALISH (track) → DARAJA (level) → DARS (course)
 *
 * 1) `tracks` — yo'nalishlar ro'yxati. Ikki guruh bor:
 *      group: 'software' — dasturlar (ArcGIS, ArcGIS Pro, Global Mapper, Osmon, Muhandis)
 *      group: 'science'  — geologiya fanlari (geologiya, geofizika, geokimyo ...)
 *    `levels` — shu yo'nalishda qaysi darajalar bo'lishi.
 *    `locked: true` — yo'nalish yopiq (darslar ko'rinmaydi, "Yopiq" belgisi chiqadi).
 *
 * 2) `courses` — darslar. Yangi dars qo'shish uchun ro'yxatga yangi obyekt qo'shing:
 *      {
 *        id: 'arcgis-pro-layouts',          // takrorlanmas nom (lotin harflarida)
 *        track: 'arcgis-pro',               // qaysi yo'nalishga tegishli
 *        level: 'intermediate',             // 'beginner' | 'intermediate' | 'advanced' | 'pro'
 *        title: { uz: '...', en: '...', ru: '...' },
 *        description: { uz: '...', en: '...', ru: '...' },
 *        youtubeId: 'ABC123',               // ixtiyoriy: https://youtu.be/ABC123 -> "ABC123"
 *        lessons: 8, hours: 3,              // ixtiyoriy
 *        isNew: true,                       // ixtiyoriy: "NEW" belgisi
 *      },
 *
 * Diqqat: quyidagi darslar namunaviy (har yo'nalishda bitta kirish darsi) —
 * haqiqiy darslaringiz bilan almashtiring va to'ldiring.
 */

export type Level = 'beginner' | 'intermediate' | 'advanced' | 'pro'
export const LEVELS: Level[] = ['beginner', 'intermediate', 'advanced', 'pro']

export type TrackGroup = 'software' | 'science'

export type Track = {
  id: string
  group: TrackGroup
  name: L10n
  description: L10n
  /** Rasm uchun ranglar: to'q, o'rta, och */
  palette: [string, string, string]
  levels: Level[]
  locked?: boolean
}

const ALL: Level[] = LEVELS
const n = (s: string): L10n => ({ uz: s, en: s, ru: s })

export const tracks: Track[] = [
  /* ---------- Dasturlar ---------- */
  {
    id: 'arcgis',
    group: 'software',
    name: n('ArcGIS'),
    palette: ['#10263a', '#24597f', '#5fa3c7'],
    levels: ALL,
    description: {
      uz: "ArcGIS bilan ishlash: boshlang'ich darajadan professional darajagacha.",
      en: 'Working with ArcGIS, from beginner to professional level.',
      ru: 'Работа в ArcGIS: от начального до профессионального уровня.',
    },
  },
  {
    id: 'arcgis-pro',
    group: 'software',
    name: n('ArcGIS Pro'),
    palette: ['#0f2a33', '#1f6577', '#53aec2'],
    levels: ALL,
    description: {
      uz: "ArcGIS Pro bo'yicha keng qamrovli kurslar: boshlang'ichdan professional darajagacha.",
      en: 'A comprehensive ArcGIS Pro curriculum, from beginner to professional.',
      ru: 'Обширный курс по ArcGIS Pro: от начального до профессионального уровня.',
    },
  },
  {
    id: 'global-mapper',
    group: 'software',
    name: n('Global Mapper'),
    palette: ['#1f2a14', '#4d6b2a', '#97bf5c'],
    levels: ['beginner', 'intermediate'],
    description: {
      uz: "Global Mapper: boshlang'ich va o'rta daraja.",
      en: 'Global Mapper: beginner and intermediate level.',
      ru: 'Global Mapper: начальный и средний уровень.',
    },
  },
  {
    id: 'osmon',
    group: 'software',
    name: n('Osmon'),
    palette: ['#15243a', '#2f5f93', '#6fa3d6'],
    levels: ALL,
    description: {
      uz: "Osmon dasturi: boshlang'ich darajadan professional darajagacha.",
      en: 'The Osmon program, from beginner to professional level.',
      ru: 'Программа Osmon: от начального до профессионального уровня.',
    },
  },
  {
    id: 'muhandis',
    group: 'software',
    name: n('Muhandis'),
    palette: ['#2f2219', '#8a4f26', '#d07a3a'],
    levels: ALL,
    locked: true,
    description: {
      uz: "Muhandis dasturi: noldan professional darajagacha.",
      en: 'The Muhandis program, from zero to professional level.',
      ru: 'Программа Muhandis: с нуля до профессионального уровня.',
    },
  },

  /* ---------- Geologiya fanlari ---------- */
  {
    id: 'geology',
    group: 'science',
    name: { uz: 'Geologiya', en: 'Geology', ru: 'Геология' },
    palette: ['#3a2a1e', '#8c5a32', '#d0904f'],
    levels: ALL,
    description: {
      uz: "Geologiya noldan oxirigacha: asosiy tushunchalardan professional darajagacha.",
      en: 'Geology from zero to the end: from the fundamentals to professional level.',
      ru: 'Геология с нуля и до конца: от основ до профессионального уровня.',
    },
  },
  {
    id: 'geophysics',
    group: 'science',
    name: { uz: 'Geofizika', en: 'Geophysics', ru: 'Геофизика' },
    palette: ['#1d2b3a', '#2f5d7c', '#5fa3c7'],
    levels: ALL,
    description: {
      uz: 'Seysmik, gravimetrik, magnit va elektr qidiruv usullari.',
      en: 'Seismic, gravity, magnetic and electrical survey methods.',
      ru: 'Сейсмо-, грави-, магнито- и электроразведка.',
    },
  },
  {
    id: 'geochemistry',
    group: 'science',
    name: { uz: 'Geokimyo', en: 'Geochemistry', ru: 'Геохимия' },
    palette: ['#14302f', '#2f6f6a', '#69b3a6'],
    levels: ALL,
    description: {
      uz: "Kimyoviy elementlarning Yer qobig'ida tarqalishi va geokimyoviy qidiruv.",
      en: "Distribution of chemical elements in the Earth's crust and geochemical exploration.",
      ru: 'Распределение химических элементов в земной коре и геохимические поиски.',
    },
  },
  {
    id: 'geotectonics',
    group: 'science',
    name: { uz: 'Geotektonika', en: 'Geotectonics', ru: 'Геотектоника' },
    palette: ['#2b1d2e', '#6a3f6e', '#b17fb5'],
    levels: ALL,
    description: {
      uz: "Yer qobig'ining tuzilishi, harakati va rivojlanishi.",
      en: "The structure, movement and evolution of the Earth's crust.",
      ru: 'Строение, движения и развитие земной коры.',
    },
  },
  {
    id: 'mineralogy',
    group: 'science',
    name: { uz: 'Mineralogiya', en: 'Mineralogy', ru: 'Минералогия' },
    palette: ['#24263d', '#4b4f8a', '#8f93d6'],
    levels: ALL,
    description: {
      uz: 'Minerallar, ularning xossalari va aniqlash usullari.',
      en: 'Minerals, their properties and identification methods.',
      ru: 'Минералы, их свойства и методы диагностики.',
    },
  },
  {
    id: 'petrology',
    group: 'science',
    name: { uz: 'Petrologiya', en: 'Petrology', ru: 'Петрология' },
    palette: ['#2f2422', '#7a4b3a', '#c48a63'],
    levels: ALL,
    description: {
      uz: "Magmatik, metamorfik va cho'kindi tog' jinslarining kelib chiqishi.",
      en: 'The origin of igneous, metamorphic and sedimentary rocks.',
      ru: 'Происхождение магматических, метаморфических и осадочных пород.',
    },
  },
  {
    id: 'lithology',
    group: 'science',
    name: { uz: 'Litologiya', en: 'Lithology', ru: 'Литология' },
    palette: ['#2e2a1a', '#7a6a32', '#c9b468'],
    levels: ALL,
    description: {
      uz: "Cho'kindi jinslar: tarkibi, tuzilishi va hosil bo'lish sharoitlari.",
      en: 'Sedimentary rocks: composition, structure and formation conditions.',
      ru: 'Осадочные породы: состав, строение и условия образования.',
    },
  },
]

export type Course = {
  id: string
  track: string
  level: Level
  title: L10n
  description: L10n
  lessons?: number
  hours?: number
  youtubeId?: string
  isNew?: boolean
}

/** Har yo'nalish uchun namunaviy kirish darsi (yopiq yo'nalishlardan tashqari) */
const intro = (t: Track, isNew = false): Course => ({
  id: `${t.id}-intro`,
  track: t.id,
  level: 'beginner',
  isNew,
  title: {
    uz: `${t.name.uz}: kirish`,
    en: `${t.name.en}: introduction`,
    ru: `${t.name.ru}: введение`,
  },
  description: {
    uz: "Yo'nalish bilan tanishuv: asosiy tushunchalar va o'quv rejasi.",
    en: 'Getting to know the track: key concepts and the learning plan.',
    ru: 'Знакомство с направлением: основные понятия и учебный план.',
  },
})

const NEW_IDS = new Set(['arcgis-pro', 'osmon', 'geology'])

export const courses: Course[] = tracks.filter((t) => !t.locked).map((t) => intro(t, NEW_IDS.has(t.id)))

export const trackById = (id: string) => tracks.find((t) => t.id === id)
export const coursesOf = (trackId: string) => courses.filter((c) => c.track === trackId)
