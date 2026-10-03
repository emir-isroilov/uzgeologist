import type { L10n } from '../i18n/translations'

/**
 * DASTURLAR VA VERSIYALAR
 * Yangi versiya chiqqanda `versions` ro'yxatining BOSHIGA yangi yozuv qo'shing
 * (eng yangisi birinchi turadi).
 * `downloadUrl` bo'sh bo'lsa, tugma "Tez orada" bo'lib ko'rinadi.
 *
 * Diqqat: UzGeo dasturlari hozircha namunaviy (placeholder) ma'lumot —
 * o'zingizning haqiqiy dasturlaringiz bilan almashtiring.
 * Tijoriy (litsenziyali) dasturlarni egasining ruxsatisiz bu yerga joylamang.
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
  vendor: string
  color: string
  platform: string
  license: L10n
  summary: L10n
  website?: string
  versions: Version[]
}

const own: L10n = { uz: 'Bepul', en: 'Free', ru: 'Бесплатно' }
const openSource: L10n = { uz: 'Ochiq kodli (GPL)', en: 'Open source (GPL)', ru: 'Открытый код (GPL)' }

export const software: Software[] = [
  {
    id: 'uzgeo-field',
    name: 'UzGeo Field',
    vendor: 'UzGeologist',
    color: '#d07a3a',
    platform: 'Android · iOS',
    license: own,
    summary: {
      uz: "Dala ishlari uchun mobil jurnal: nuqtalar, fotosuratlar va qatlam o'lchovlari.",
      en: 'A mobile field notebook: points, photos and structural measurements.',
      ru: 'Мобильный полевой журнал: точки, фото и замеры элементов залегания.',
    },
    versions: [
      {
        version: '1.2.0',
        date: '2026-09-15',
        notes: {
          uz: "Oflayn xaritalar va GPX eksport qo'shildi.",
          en: 'Added offline maps and GPX export.',
          ru: 'Добавлены офлайн-карты и экспорт в GPX.',
        },
      },
      {
        version: '1.1.0',
        date: '2026-06-02',
        notes: { uz: 'Kompas-klinometr rejimi.', en: 'Compass-clinometer mode.', ru: 'Режим горного компаса.' },
      },
      {
        version: '1.0.0',
        date: '2026-03-20',
        notes: { uz: 'Birinchi chiqarilish.', en: 'First release.', ru: 'Первый выпуск.' },
      },
    ],
  },
  {
    id: 'uzgeo-core',
    name: 'UzGeo Core',
    vendor: 'UzGeologist',
    color: '#3f7f8c',
    platform: 'Windows',
    license: own,
    summary: {
      uz: "Burg'ulash kernini tavsiflash va quduq kesimlarini chizish dasturi.",
      en: 'Drill core logging and borehole log plotting.',
      ru: 'Документация керна и построение колонок скважин.',
    },
    versions: [
      {
        version: '2.0.1',
        date: '2026-08-28',
        notes: { uz: 'Xatoliklar tuzatildi, PDF eksport tezlashdi.', en: 'Bug fixes, faster PDF export.', ru: 'Исправления ошибок, ускорен экспорт в PDF.' },
      },
      {
        version: '2.0.0',
        date: '2026-07-10',
        notes: { uz: "Yangi interfeys va Excel'dan import.", en: 'New interface and Excel import.', ru: 'Новый интерфейс и импорт из Excel.' },
      },
      {
        version: '1.4.2',
        date: '2026-02-14',
        notes: { uz: 'Barqarorlik yaxshilandi.', en: 'Stability improvements.', ru: 'Улучшена стабильность.' },
      },
    ],
  },
  {
    id: 'uzgeo-section',
    name: 'UzGeo Section',
    vendor: 'UzGeologist',
    color: '#6a5a9c',
    platform: 'Windows · macOS',
    license: own,
    summary: {
      uz: "Quduq ma'lumotlaridan geologik kesimlar va 3D ko'rinishlar yaratish.",
      en: 'Geological cross-sections and 3D views from drillhole data.',
      ru: 'Геологические разрезы и 3D-виды по данным скважин.',
    },
    versions: [
      {
        version: '0.9.0',
        date: '2026-09-30',
        notes: { uz: 'Beta: 3D ko\'rinish rejimi.', en: 'Beta: 3D view mode.', ru: 'Бета: режим 3D-просмотра.' },
      },
      {
        version: '0.8.0',
        date: '2026-05-18',
        notes: { uz: 'Kesim chizish va eksport.', en: 'Section drawing and export.', ru: 'Построение и экспорт разрезов.' },
      },
    ],
  },
  {
    id: 'qgis',
    name: 'QGIS',
    vendor: 'QGIS.org',
    color: '#589632',
    platform: 'Windows · macOS · Linux',
    license: openSource,
    website: 'https://qgis.org',
    summary: {
      uz: "Bepul va ochiq kodli GIS dasturi — geologik xaritalar uchun eng ommabop vosita.",
      en: 'Free, open-source GIS — the most popular tool for geological maps.',
      ru: 'Бесплатная ГИС с открытым кодом — самый популярный инструмент для геологических карт.',
    },
    versions: [],
  },
  {
    id: 'grass',
    name: 'GRASS GIS',
    vendor: 'OSGeo',
    color: '#4a7a3c',
    platform: 'Windows · macOS · Linux',
    license: openSource,
    website: 'https://grass.osgeo.org',
    summary: {
      uz: "Raster va vektor tahlil uchun kuchli ochiq kodli GIS.",
      en: 'Powerful open-source GIS for raster and vector analysis.',
      ru: 'Мощная ГИС с открытым кодом для растрового и векторного анализа.',
    },
    versions: [],
  },
]
