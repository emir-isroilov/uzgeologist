import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useI18n } from '../i18n/LanguageContext'
import { Icon } from './Icon'

type Msg = { role: 'user' | 'assistant'; content: string }

const ENDPOINT = '/.netlify/functions/chat'

export function ChatWidget() {
  const { t, lang } = useI18n()
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, busy])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const send = async (text: string) => {
    const content = text.trim()
    if (!content || busy) return
    const next: Msg[] = [...msgs, { role: 'user', content }]
    setMsgs(next)
    setInput('')
    setBusy(true)
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-12), lang }),
      })
      if (res.status === 404 || res.status === 501) throw new Error('offline')
      const data = await res.json()
      if (!res.ok || !data.reply) throw new Error('error')
      setMsgs((m) => [...m, { role: 'assistant', content: data.reply }])
    } catch (e) {
      const offline = (e as Error).message === 'offline'
      setMsgs((m) => [...m, { role: 'assistant', content: offline ? t.chat.offline : t.chat.error }])
    } finally {
      setBusy(false)
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    send(input)
  }

  return (
    <>
      <div className={`chat-panel ${open ? 'open' : ''}`} role="dialog" aria-label={t.chat.title} aria-hidden={!open}>
        <div className="chat-head">
          <div className="chat-badge"><Icon name="sparkle" size={18} /></div>
          <div>
            <b>{t.chat.title}</b>
            <small>{t.chat.subtitle}</small>
          </div>
          <button className="icon-btn" onClick={() => setOpen(false)} aria-label="close"><Icon name="close" size={18} /></button>
        </div>
        <div className="chat-list" ref={listRef}>
          <div className="bubble bot">{t.chat.hello}</div>
          {msgs.length === 0 && (
            <div className="chips">
              {t.chat.suggestions.map((s) => (
                <button key={s} className="chip" onClick={() => send(s)}>{s}</button>
              ))}
            </div>
          )}
          {msgs.map((m, i) => (
            <div key={i} className={`bubble ${m.role === 'user' ? 'me' : 'bot'}`}>{m.content}</div>
          ))}
          {busy && (
            <div className="bubble bot typing"><span /><span /><span /></div>
          )}
        </div>
        <form className="chat-input" onSubmit={onSubmit}>
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            placeholder={t.chat.placeholder}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                send(input)
              }
            }}
          />
          <button className="send" disabled={!input.trim() || busy} aria-label="send"><Icon name="send" size={18} /></button>
        </form>
      </div>
      <button className={`chat-fab ${open ? 'hidden' : ''}`} onClick={() => setOpen(true)} aria-label={t.chat.open}>
        <Icon name="chat" size={24} />
      </button>
    </>
  )
}
