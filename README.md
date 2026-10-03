# UzGeologist

**uzgeologist.uz** — geologlar uchun video darslar, dasturlar va ularning versiyalari jamlangan platforma.

## Imkoniyatlar
- 3 til: o'zbek (standart), ingliz, rus — tanlov brauzerda eslab qolinadi
- Video darslar (kategoriya bo'yicha filtr, video oynasi)
- Dasturlar va versiyalar tarixi (yuklab olish havolalari bilan)
- Ro'yxatdan o'tish / kirish / shaxsiy kabinet (Supabase, sozlanmaguncha demo rejim)
- Pastki o'ng burchakda AI chat (Claude, Netlify Function orqali)
- Qidiruv, aloqa formasi (Netlify Forms), telefon uchun moslashgan dizayn

## Kontentni tahrirlash
| Nima | Fayl |
|---|---|
| Video darslar | `src/data/courses.ts` |
| Dasturlar va versiyalar | `src/data/software.ts` |
| Saytdagi barcha matnlar (3 tilda) | `src/i18n/translations.ts` |
| Ranglar va dizayn | `src/styles.css` (`:root` bo'limi) |

Yangi versiya qo'shish: `software.ts` da kerakli dasturning `versions` ro'yxati **boshiga** yangi yozuv qo'shing.
Video qo'shish: kursga `youtubeId: "VIDEO_ID"` yozing.

## Ishga tushirish
```bash
npm install
npm run dev      # lokal: http://localhost:5173
npm run build    # tayyor fayllar dist/ papkasida
```

## Netlify'ga joylash (bepul)
1. netlify.com → **Add new site → Import from GitHub** → shu repozitoriyani tanlang. Sozlamalar `netlify.toml` dan avtomatik olinadi.
2. **Site settings → Environment variables** ga qo'shing:
   - `ANTHROPIC_API_KEY` — AI chat uchun (console.anthropic.com)
   - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` — haqiqiy ro'yxatdan o'tish uchun (supabase.com, bepul)
3. **Forms** bo'limida form detection'ni yoqing (aloqa formasi uchun).
4. **Domain management → Add domain** → `uzgeologist.uz`, so'ng ahost.uz panelida Netlify ko'rsatgan DNS yozuvlarini kiriting.

## O'zgarishlar tarixi
- **0.1.0** — Birinchi versiya: portal ko'rinishi, 3 til, darslar, dasturlar, auth, AI chat.
