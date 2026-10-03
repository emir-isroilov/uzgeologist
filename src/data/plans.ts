import type { L10n } from '../i18n/translations'

/**
 * OBUNA TARIFLARI
 * `price` — oylik narx (masalan "99 000 so'm"). null bo'lsa "Narxi tez orada" ko'rinadi.
 * Diqqat: tariflar va imkoniyatlar namunaviy — o'zingiznikiga moslang.
 */

export type Plan = {
  id: string
  name: L10n
  price: L10n | null
  period?: L10n
  description: L10n
  features: L10n[]
  highlighted?: boolean
}

const month: L10n = { uz: '/ oy', en: '/ month', ru: '/ мес' }

export const plans: Plan[] = [
  {
    id: 'free',
    name: { uz: 'Bepul', en: 'Free', ru: 'Бесплатный' },
    price: { uz: "0 so'm", en: '0 UZS', ru: '0 сум' },
    period: month,
    description: {
      uz: 'Platforma bilan tanishish uchun',
      en: 'To get to know the platform',
      ru: 'Для знакомства с платформой',
    },
    features: [
      { uz: 'Asosiy tutoriallar', en: 'Basic tutorials', ru: 'Базовые туториалы' },
      { uz: 'Dasturlarning sinov versiyalari', en: 'Trial versions of the programs', ru: 'Пробные версии программ' },
      { uz: 'AI yordamchi', en: 'AI assistant', ru: 'AI-помощник' },
    ],
  },
  {
    id: 'pro',
    name: { uz: 'Pro', en: 'Pro', ru: 'Pro' },
    price: null,
    period: month,
    highlighted: true,
    description: {
      uz: 'Mutaxassislar uchun',
      en: 'For professionals',
      ru: 'Для специалистов',
    },
    features: [
      { uz: 'Osmon, Zamin va Usturlob — to\'liq versiyalar', en: 'Osmon, Zamin and Usturlob — full versions', ru: 'Osmon, Zamin и Usturlob — полные версии' },
      { uz: 'Barcha tutoriallar', en: 'All tutorials', ru: 'Все туториалы' },
      { uz: 'Barcha yangilanishlar', en: 'All updates', ru: 'Все обновления' },
      { uz: 'Tezkor texnik yordam', en: 'Priority support', ru: 'Приоритетная поддержка' },
    ],
  },
  {
    id: 'enterprise',
    name: { uz: 'Korporativ', en: 'Enterprise', ru: 'Корпоративный' },
    price: null,
    description: {
      uz: 'Kompaniya va tashkilotlar uchun',
      en: 'For companies and organisations',
      ru: 'Для компаний и организаций',
    },
    features: [
      { uz: "Pro'dagi hamma narsa", en: 'Everything in Pro', ru: 'Всё из Pro' },
      { uz: "Bir nechta foydalanuvchi litsenziyasi", en: 'Multi-user licences', ru: 'Многопользовательские лицензии' },
      { uz: "Jamoa uchun o'quv mashg'ulotlari", en: 'Team training sessions', ru: 'Обучение для команды' },
      { uz: 'Shaxsiy menejer', en: 'Dedicated manager', ru: 'Персональный менеджер' },
    ],
  },
]
