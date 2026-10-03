import type { L10n } from '../i18n/translations'

/**
 * VIDEO DARSLAR
 * Yangi kurs qo'shish uchun ro'yxatga yangi obyekt qo'shing.
 * `youtubeId` — YouTube video havolasidagi ID (masalan https://youtu.be/ABC123 -> "ABC123").
 * Bo'sh qoldirilsa "Video tez orada" ko'rsatiladi.
 */

export type CategoryId = 'geology' | 'geophysics' | 'hydro' | 'gis' | 'mining'
export type Level = 'beginner' | 'intermediate' | 'advanced'

export const categories: { id: CategoryId; name: L10n }[] = [
  { id: 'geology', name: { uz: 'Umumiy geologiya', en: 'General geology', ru: 'Общая геология' } },
  { id: 'geophysics', name: { uz: 'Geofizika', en: 'Geophysics', ru: 'Геофизика' } },
  { id: 'hydro', name: { uz: 'Gidrogeologiya', en: 'Hydrogeology', ru: 'Гидрогеология' } },
  { id: 'gis', name: { uz: 'GIS va xaritalash', en: 'GIS & mapping', ru: 'ГИС и картография' } },
  { id: 'mining', name: { uz: 'Kon geologiyasi', en: 'Mining geology', ru: 'Горная геология' } },
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
    id: 'intro-geology',
    category: 'geology',
    level: 'beginner',
    lessons: 12,
    hours: 6,
    isNew: true,
    title: { uz: 'Geologiyaga kirish', en: 'Introduction to geology', ru: 'Введение в геологию' },
    description: {
      uz: "Yer tuzilishi, tog' jinslari turlari va geologik jarayonlar haqida asosiy tushunchalar.",
      en: 'Earth structure, rock types and geological processes — the essentials.',
      ru: 'Строение Земли, типы горных пород и геологические процессы — основы.',
    },
  },
  {
    id: 'mineralogy',
    category: 'geology',
    level: 'intermediate',
    lessons: 10,
    hours: 5,
    title: { uz: 'Mineralogiya amaliyoti', en: 'Practical mineralogy', ru: 'Практическая минералогия' },
    description: {
      uz: "Minerallarni dala sharoitida va mikroskop ostida aniqlash usullari.",
      en: 'Identifying minerals in the field and under the microscope.',
      ru: 'Определение минералов в полевых условиях и под микроскопом.',
    },
  },
  {
    id: 'geophysics-basics',
    category: 'geophysics',
    level: 'intermediate',
    lessons: 14,
    hours: 8,
    isNew: true,
    title: { uz: 'Amaliy geofizika asoslari', en: 'Applied geophysics basics', ru: 'Основы прикладной геофизики' },
    description: {
      uz: "Seysmik, elektr va magnit qidiruv usullari hamda natijalarni talqin qilish.",
      en: 'Seismic, electrical and magnetic survey methods and interpreting results.',
      ru: 'Сейсмические, электрические и магнитные методы разведки и интерпретация данных.',
    },
  },
  {
    id: 'hydrogeology',
    category: 'hydro',
    level: 'beginner',
    lessons: 9,
    hours: 4,
    title: { uz: 'Gidrogeologiya: yer osti suvlari', en: 'Hydrogeology: groundwater', ru: 'Гидрогеология: подземные воды' },
    description: {
      uz: "Suvli qatlamlar, filtratsiya va quduq sinovlari bo'yicha amaliy kurs.",
      en: 'A practical course on aquifers, filtration and well testing.',
      ru: 'Практический курс по водоносным горизонтам, фильтрации и опытным откачкам.',
    },
  },
  {
    id: 'qgis-geologists',
    category: 'gis',
    level: 'beginner',
    lessons: 16,
    hours: 7,
    isNew: true,
    title: { uz: 'Geologlar uchun QGIS', en: 'QGIS for geologists', ru: 'QGIS для геологов' },
    description: {
      uz: "Geologik xarita tuzish, qatlamlar bilan ishlash va ma'lumotlarni eksport qilish.",
      en: 'Building geological maps, working with layers and exporting data.',
      ru: 'Построение геологических карт, работа со слоями и экспорт данных.',
    },
  },
  {
    id: '3d-modeling',
    category: 'gis',
    level: 'advanced',
    lessons: 11,
    hours: 9,
    title: { uz: '3D geologik modellashtirish', en: '3D geological modelling', ru: '3D геологическое моделирование' },
    description: {
      uz: "Burg'ulash ma'lumotlaridan 3D model qurish va ruda tanalarini tasvirlash.",
      en: 'Building 3D models from drillhole data and visualising ore bodies.',
      ru: 'Построение 3D-моделей по данным бурения и визуализация рудных тел.',
    },
  },
  {
    id: 'resource-estimation',
    category: 'mining',
    level: 'advanced',
    lessons: 13,
    hours: 10,
    title: { uz: 'Zaxiralarni hisoblash', en: 'Resource estimation', ru: 'Подсчёт запасов' },
    description: {
      uz: "Geostatistika, kriging va zaxiralarni toifalarga ajratish asoslari.",
      en: 'Geostatistics, kriging and resource classification fundamentals.',
      ru: 'Основы геостатистики, кригинга и классификации запасов.',
    },
  },
  {
    id: 'core-logging',
    category: 'mining',
    level: 'beginner',
    lessons: 8,
    hours: 3,
    title: { uz: "Kernni tavsiflash (core logging)", en: 'Core logging', ru: 'Документация керна' },
    description: {
      uz: "Burg'ulash kernini to'g'ri tavsiflash, fotosuratga olish va hujjatlashtirish.",
      en: 'Describing, photographing and documenting drill core correctly.',
      ru: 'Правильное описание, фотодокументация и учёт керна.',
    },
  },
]
