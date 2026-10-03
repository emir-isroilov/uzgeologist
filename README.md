# UzGeologist

**uzgeologist.uz** — Osmon, Zamin va Usturlob dasturlari, tutoriallar, obuna va support platformasi.

## Imkoniyatlar
- 3 til: o'zbek (standart), ingliz, rus — tanlov brauzerda eslab qolinadi
- Dasturlar: Osmon, Zamin, Usturlob — imkoniyatlar va versiyalar tarixi
- Tutoriallar (dastur bo'yicha filtr, video oynasi)
- Obuna tariflari
- Support: taklif, shikoyat, texnik yordam, hamkorlik + FAQ
- Footer: yordam, huquqiy sahifalar, ijtimoiy tarmoqlar
- Ro'yxatdan o'tish / kirish / shaxsiy kabinet (Supabase, sozlanmaguncha demo rejim)
- Pastki o'ng burchakda AI chat (Claude, Netlify Function orqali)
- Qidiruv, aloqa formasi (Netlify Forms), telefon uchun moslashgan dizayn

## Kontentni tahrirlash
| Nima | Fayl |
|---|---|
| Tutoriallar | `src/data/courses.ts` |
| Dasturlar va versiyalar | `src/data/software.ts` |
| Obuna tariflari va narxlar | `src/data/plans.ts` |
| Email, telefon, ijtimoiy tarmoqlar | `src/data/site.ts` |
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
3. **Forms** bo'limida form detection'ni yoqing (Support formasi uchun).
4. **Domain management → Add domain** → `uzgeologist.uz`, so'ng ahost.uz panelida Netlify ko'rsatgan DNS yozuvlarini kiriting.

## O'zgarishlar tarixi
- **0.2.0** — Osmon, Zamin, Usturlob; Tutoriallar; Obuna; Support; yangi footer va huquqiy sahifalar.
- **0.1.0** — Birinchi versiya: portal ko'rinishi, 3 til, darslar, dasturlar, auth, AI chat.
