import type { L10n } from '../i18n/translations'

/**
 * DASTURLAR VA VERSIYALAR
 *
 * Yangi versiya chiqqanda `versions` ro'yxatining BOSHIGA yangi yozuv qo'shing
 * (eng yangisi birinchi turadi). Masalan:
 *   {
 *     version: '1.0.0',
 *     date: '2026-10-15',
 *     notes: { uz: 'Birinchi chiqarilish', en: 'First release', ru: 'Первый выпуск' },
 *     downloadUrl: 'https://.../osmon-setup-1.0.0.exe',
 *   },
 * `downloadUrl` bo'sh bo'lsa, tugma "Tez orada" bo'lib ko'rinadi.
 */

export type Version = {
  version: string
  date: string // YYYY-MM-DD
  notes: L10n
  downloadUrl?: string
}

export type Software = {
  id: string
  name: string
  color: string
  platform: string
  license: L10n
  tagline: L10n
  summary: L10n
  features: L10n[]
  website?: string
  versions: Version[]
}

const license: L10n = { uz: 'Obuna asosida', en: 'Subscription', ru: 'По подписке' }

export const software: Software[] = [
  {
    id: 'osmon',
    name: 'Osmon',
    color: '#2f6fae',
    platform: 'Windows',
    license,
    tagline: {
      uz: 'UzGeologist jamoasining birinchi dasturi',
      en: "The UzGeologist team's first program",
      ru: 'Первая программа команды UzGeologist',
    },
    summary: {
      uz: "Osmon — UzGeologist jamoasi tomonidan yaratilgan birinchi dastur. Geologik ishlarni soddalashtirish uchun mo'ljallangan.",
      en: 'Osmon is the first program built by the UzGeologist team, designed to simplify geological work.',
      ru: 'Osmon — первая программа, созданная командой UzGeologist, для упрощения геологических работ.',
    },
    features: [],
    versions: [],
  },
  {
    id: 'zamin',
    name: 'Zamin',
    color: '#b5652b',
    platform: 'Windows',
    license,
    tagline: {
      uz: 'Kon geologiyasi va resurslarni modellashtirish',
      en: 'Mining geology and resource modelling',
      ru: 'Горная геология и моделирование ресурсов',
    },
    summary: {
      uz: "Zamin — Datamine kabi xorijiy dasturlarga mahalliy alternativa: burg'ulash ma'lumotlaridan geologik model, blok model va zaxiralar hisobi.",
      en: 'Zamin is a local alternative to tools like Datamine: geological models, block models and resource estimates from drillhole data.',
      ru: 'Zamin — отечественная альтернатива программам вроде Datamine: геологические и блочные модели, подсчёт запасов по данным бурения.',
    },
    features: [
      { uz: "Burg'ulash ma'lumotlarini import qilish va tekshirish", en: 'Drillhole data import and validation', ru: 'Импорт и проверка данных бурения' },
      { uz: 'Geologik kesimlar va 3D modellashtirish', en: 'Geological sections and 3D modelling', ru: 'Геологические разрезы и 3D-моделирование' },
      { uz: 'Blok model va zaxiralarni hisoblash', en: 'Block modelling and resource estimation', ru: 'Блочное моделирование и подсчёт запасов' },
      { uz: 'Karyer va kon ishlarini rejalashtirish', en: 'Pit and mine planning', ru: 'Планирование карьеров и горных работ' },
    ],
    versions: [],
  },
  {
    id: 'usturlob',
    name: 'Usturlob',
    color: '#3d8a6e',
    platform: 'Windows',
    license,
    tagline: {
      uz: 'Kengaytirilgan GIS imkoniyatlari',
      en: 'Advanced GIS features',
      ru: 'Расширенные возможности ГИС',
    },
    summary: {
      uz: "Usturlob — geologlar uchun kengaytirilgan GIS dasturi: xaritalar, fazoviy tahlil va geologik ma'lumotlar bilan ishlash.",
      en: 'Usturlob is an advanced GIS program for geologists: maps, spatial analysis and geological data.',
      ru: 'Usturlob — продвинутая ГИС для геологов: карты, пространственный анализ и работа с геоданными.',
    },
    features: [
      { uz: "Vektor va raster qatlamlar bilan ishlash", en: 'Vector and raster layers', ru: 'Работа с векторными и растровыми слоями' },
      { uz: 'Georeferenslash va koordinata tizimlari', en: 'Georeferencing and coordinate systems', ru: 'Привязка и системы координат' },
      { uz: 'Fazoviy tahlil vositalari', en: 'Spatial analysis tools', ru: 'Инструменты пространственного анализа' },
      { uz: 'Geologik xaritalarni tayyorlash va chop etish', en: 'Geological map layouts and printing', ru: 'Подготовка и печать геологических карт' },
    ],
    versions: [],
  },
]
