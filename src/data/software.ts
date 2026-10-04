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
  /** Holat belgisi, masalan "Ishlab chiqilmoqda". Bo'sh bo'lsa ko'rsatilmaydi */
  status?: L10n
  website?: string
  versions: Version[]
}

const license: L10n = { uz: 'Obuna asosida', en: 'Subscription', ru: 'По подписке' }
const inDev: L10n = { uz: 'Ishlab chiqilmoqda', en: 'In development', ru: 'В разработке' }
const comingSoon: L10n = { uz: 'Tez orada', en: 'Coming soon', ru: 'Скоро' }

export const software: Software[] = [
  {
    id: 'osmon',
    name: 'Osmon',
    color: '#2f6fae',
    platform: 'Windows',
    license,
    status: inDev,
    tagline: {
      uz: 'Hozirda ishlab chiqilayotgan yangi dastur',
      en: 'Our new program, currently in development',
      ru: 'Новая программа, сейчас в разработке',
    },
    summary: {
      uz: "Osmon — UzGeologist jamoasining hozirda ishlab chiqilayotgan yangi dasturi. Tafsilotlar tez orada e'lon qilinadi.",
      en: 'Osmon is the UzGeologist team’s new program, currently in development. Details will be announced soon.',
      ru: 'Osmon — новая программа команды UzGeologist, сейчас в разработке. Подробности скоро.',
    },
    features: [],
    versions: [],
  },
  {
    id: 'usturlob',
    name: 'Usturlob',
    color: '#3d8a6e',
    platform: 'Windows',
    license,
    tagline: {
      uz: "LithoSat'ning mukammal, ko'p funksiyali avlodi",
      en: 'The advanced, full-featured successor to LithoSat',
      ru: 'Продвинутый многофункциональный преемник LithoSat',
    },
    summary: {
      uz: "Usturlob — jamoamizning birinchi dasturi LithoSat asosida yaratilgan, ancha mukammal va ko'p funksiyali dastur. Kengaytirilgan GIS imkoniyatlariga ega.",
      en: 'Usturlob builds on LithoSat, our team’s first program, as a far more complete, full-featured tool with advanced GIS capabilities.',
      ru: 'Usturlob создан на основе LithoSat — первой программы нашей команды — как гораздо более совершенный многофункциональный инструмент с расширенными ГИС-возможностями.',
    },
    features: [
      { uz: "Vektor va raster qatlamlar bilan ishlash", en: 'Vector and raster layers', ru: 'Работа с векторными и растровыми слоями' },
      { uz: 'Georeferenslash va koordinata tizimlari', en: 'Georeferencing and coordinate systems', ru: 'Привязка и системы координат' },
      { uz: 'Fazoviy tahlil vositalari', en: 'Spatial analysis tools', ru: 'Инструменты пространственного анализа' },
      { uz: 'Geologik xaritalarni tayyorlash va chop etish', en: 'Geological map layouts and printing', ru: 'Подготовка и печать геологических карт' },
    ],
    versions: [],
  },
  {
    id: 'lithosat',
    name: 'LithoSat Studio',
    color: '#7a5aa6',
    platform: 'Windows',
    license,
    tagline: {
      uz: 'LithoSat oilasidagi dastur',
      en: 'Part of the LithoSat family',
      ru: 'Программа семейства LithoSat',
    },
    summary: {
      uz: "LithoSat Studio — UzGeologist jamoasi yaratgan LithoSat oilasidagi dastur.",
      en: 'LithoSat Studio is a program in the LithoSat family, built by the UzGeologist team.',
      ru: 'LithoSat Studio — программа семейства LithoSat, созданная командой UzGeologist.',
    },
    features: [],
    versions: [],
  },
  {
    id: 'muhandis',
    name: 'Muhandis',
    color: '#b5652b',
    platform: 'Windows',
    license,
    status: comingSoon,
    tagline: {
      uz: 'Kon geologiyasi va loyihalash',
      en: 'Mining geology and mine design',
      ru: 'Горная геология и проектирование',
    },
    summary: {
      uz: "Muhandis — kon geologiyasi va kon ishlarini loyihalash uchun professional dastur. Batafsil ma'lumot tez orada.",
      en: 'Muhandis is a professional program for mining geology and mine design. More details soon.',
      ru: 'Muhandis — профессиональная программа для горной геологии и проектирования. Подробности скоро.',
    },
    features: [],
    versions: [],
  },
]
