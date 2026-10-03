import type { L10n } from '../i18n/translations'

/**
 * TUTORIALLAR
 * Yangi tutorial qo'shish uchun ro'yxatga yangi obyekt qo'shing.
 * `category` — qaysi dasturga tegishli: 'osmon' | 'zamin' | 'usturlob' | 'basics'
 * `youtubeId` — YouTube havolasidagi ID (https://youtu.be/ABC123 -> "ABC123").
 * Bo'sh qoldirilsa "Video tez orada" ko'rsatiladi.
 *
 * Diqqat: quyidagi tutoriallar namunaviy — haqiqiy darslaringiz bilan almashtiring.
 */

export type CategoryId = 'osmon' | 'zamin' | 'usturlob' | 'basics'
export type Level = 'beginner' | 'intermediate' | 'advanced'

export const categories: { id: CategoryId; name: L10n }[] = [
  { id: 'osmon', name: { uz: 'Osmon', en: 'Osmon', ru: 'Osmon' } },
  { id: 'zamin', name: { uz: 'Zamin', en: 'Zamin', ru: 'Zamin' } },
  { id: 'usturlob', name: { uz: 'Usturlob', en: 'Usturlob', ru: 'Usturlob' } },
  { id: 'basics', name: { uz: 'Geologiya asoslari', en: 'Geology basics', ru: 'Основы геологии' } },
]

export type Course = {
  id: string
  category: CategoryId
  level: Level
  lessons: number
  hours: number
  title: L10n
  description: L10n
  youtubeId?: string
  isNew?: boolean
}

export const courses: Course[] = [
  {
    id: 'osmon-start',
    category: 'osmon',
    level: 'beginner',
    lessons: 6,
    hours: 2,
    isNew: true,
    title: { uz: 'Osmon: ishni boshlash', en: 'Osmon: getting started', ru: 'Osmon: начало работы' },
    description: {
      uz: "Dasturni o'rnatish, interfeys bilan tanishish va birinchi loyihani yaratish.",
      en: 'Installing the program, a tour of the interface and creating your first project.',
      ru: 'Установка, знакомство с интерфейсом и создание первого проекта.',
    },
  },
  {
    id: 'zamin-start',
    category: 'zamin',
    level: 'beginner',
    lessons: 8,
    hours: 3,
    isNew: true,
    title: { uz: 'Zamin: ishni boshlash', en: 'Zamin: getting started', ru: 'Zamin: начало работы' },
    description: {
      uz: "Loyiha yaratish va burg'ulash ma'lumotlarini import qilish.",
      en: 'Creating a project and importing drillhole data.',
      ru: 'Создание проекта и импорт данных бурения.',
    },
  },
  {
    id: 'zamin-block-model',
    category: 'zamin',
    level: 'advanced',
    lessons: 10,
    hours: 5,
    title: { uz: 'Zamin: blok model va zaxiralar', en: 'Zamin: block models and resources', ru: 'Zamin: блочная модель и запасы' },
    description: {
      uz: 'Blok model qurish, sifatlarni interpolyatsiya qilish va zaxiralarni hisoblash.',
      en: 'Building a block model, interpolating grades and estimating resources.',
      ru: 'Построение блочной модели, интерполяция содержаний и подсчёт запасов.',
    },
  },
  {
    id: 'usturlob-start',
    category: 'usturlob',
    level: 'beginner',
    lessons: 7,
    hours: 2,
    isNew: true,
    title: { uz: 'Usturlob: ishni boshlash', en: 'Usturlob: getting started', ru: 'Usturlob: начало работы' },
    description: {
      uz: "Qatlamlar qo'shish, koordinata tizimini sozlash va birinchi xaritani tayyorlash.",
      en: 'Adding layers, setting the coordinate system and making your first map.',
      ru: 'Добавление слоёв, настройка системы координат и первая карта.',
    },
  },
  {
    id: 'usturlob-analysis',
    category: 'usturlob',
    level: 'intermediate',
    lessons: 9,
    hours: 4,
    title: { uz: 'Usturlob: fazoviy tahlil', en: 'Usturlob: spatial analysis', ru: 'Usturlob: пространственный анализ' },
    description: {
      uz: 'Bufer, kesishma va raster tahlil vositalaridan amalda foydalanish.',
      en: 'Using buffer, overlay and raster analysis tools in practice.',
      ru: 'Буферы, наложение и растровый анализ на практике.',
    },
  },
  {
    id: 'basics-intro',
    category: 'basics',
    level: 'beginner',
    lessons: 12,
    hours: 6,
    title: { uz: 'Geologiyaga kirish', en: 'Introduction to geology', ru: 'Введение в геологию' },
    description: {
      uz: "Yer tuzilishi, tog' jinslari va geologik jarayonlar haqida asosiy tushunchalar.",
      en: 'Earth structure, rocks and geological processes — the essentials.',
      ru: 'Строение Земли, горные породы и геологические процессы — основы.',
    },
  },
]
