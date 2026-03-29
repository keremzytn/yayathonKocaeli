import { useEffect, useState } from 'react'
import { Trash2, FileCheck2, Loader2 } from 'lucide-react'

type ContactMessage = {
  id: number
  name: string
  email: string
  message: string
  createdAt: string
  isRead: boolean
}

export function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5144/api/contactmessages', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      })
      if (res.ok) {
        setMessages(await res.json())
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const markAsRead = async (id: number) => {
    try {
      await fetch(`http://localhost:5144/api/contactmessages/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      })
      fetchMessages()
    } catch (err) {
      console.error(err)
    }
  }

  const deleteMessage = async (id: number) => {
    if (!confirm('Bu mesajı silmek istediğinize emin misiniz?')) return
    try {
      await fetch(`http://localhost:5144/api/contactmessages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
      })
      fetchMessages()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold mb-6 text-fg tracking-tight border-b border-border pb-4">Gelen Mesajlar</h1>

      {loading ? (
        <div className="flex justify-center p-12"><Loader2 className="animate-spin text-muted" size={32} /></div>
      ) : messages.length === 0 ? (
        <p className="text-muted text-center py-8">Henüz mesaj bulunmuyor.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`p-5 rounded-2xl border transition-colors ${msg.isRead ? 'bg-bg-muted/30 border-border opacity-75' : 'bg-bg-elevated border-l-4 border-l-accent-500 border-y-border border-r-border shadow-sm'}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-display font-semibold text-lg text-fg">{msg.name}</h3>
                  <a href={`mailto:${msg.email}`} className="text-sm font-medium text-accent-600 hover:text-accent-500 transition-colors pointer-events-auto hover:underline">{msg.email}</a>
                </div>
                <div className="text-sm font-medium text-muted text-right bg-surface-900/5 px-3 py-1 rounded-full">
                  {new Date(msg.createdAt).toLocaleString('tr-TR')}
                </div>
              </div>
              <p className="text-fg-muted whitespace-pre-wrap leading-relaxed">{msg.message}</p>
              
              <div className="mt-5 flex gap-3 border-t border-border/50 pt-4">
                {!msg.isRead && (
                  <button onClick={() => markAsRead(msg.id)} className="flex items-center gap-1.5 text-sm font-semibold bg-accent-500/10 text-accent-600 px-4 py-2 rounded-xl hover:bg-accent-500/20 transition-colors">
                    <FileCheck2 size={16} /> Okundu İşaretle
                  </button>
                )}
                <button onClick={() => deleteMessage(msg.id)} className="flex items-center gap-1.5 text-sm font-semibold bg-red-500/10 text-red-600 px-4 py-2 rounded-xl hover:bg-red-500/20 transition-colors">
                  <Trash2 size={16} /> Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
