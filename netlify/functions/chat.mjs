// AI chat uchun server funksiyasi (Netlify Functions).
// Netlify sozlamalarida ANTHROPIC_API_KEY o'zgaruvchisini qo'shing.
// Kalit faqat serverda turadi va sayt foydalanuvchilariga ko'rinmaydi.

const MODEL = 'claude-haiku-4-5-20251001'

const LANG_NAME = { uz: "o'zbek (lotin yozuvi)", en: 'English', ru: 'русский' }

const system = (lang) => `You are the AI assistant of UzGeologist (uzgeologist.uz), a platform for geologists in Uzbekistan
that makes its own geological software: Usturlob (an advanced, full-featured successor to LithoSat, the team's first program,
with advanced GIS features), LithoSat Studio, Osmon (currently in development) and Muhandis (mining geology and mine design,
coming soon — share no details beyond that). The site has Software, Tutorials, Subscription and Support sections.
Help with geology, geophysics, GIS, mining geology and how to use the platform. Do not invent specific features, prices
or version numbers of these programs — for such details point users to the Software page or Support. Be concise, accurate and friendly. If you are unsure, say so.
For account or business questions, suggest the Support page.
Always answer in ${LANG_NAME[lang] || LANG_NAME.uz} unless the user clearly writes in another language.`

export default async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return Response.json({ error: 'not_configured' }, { status: 501 })

  let body
  try {
    body = await req.json()
  } catch {
    return Response.json({ error: 'bad_request' }, { status: 400 })
  }

  const messages = (Array.isArray(body.messages) ? body.messages : [])
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }))

  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return Response.json({ error: 'bad_request' }, { status: 400 })
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({ model: MODEL, max_tokens: 800, system: system(body.lang), messages }),
  })

  if (!res.ok) return Response.json({ error: 'upstream' }, { status: 502 })
  const data = await res.json()
  const reply = (data.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('\n').trim()
  return Response.json({ reply })
}
