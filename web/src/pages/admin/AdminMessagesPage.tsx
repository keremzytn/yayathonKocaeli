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
      <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Gelen Mesajlar</h1>

      {loading ? (
        <div className="flex justify-center p-12"><Loader2 className="animate-spin text-gray-400" size={32} /></div>
      ) : messages.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Henüz mesaj bulunmuyor.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`p-5 rounded-lg border ${msg.isRead ? 'bg-gray-50' : 'bg-white border-l-4 border-l-blue-500 shadow-sm'}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{msg.name}</h3>
                  <a href={`mailto:${msg.email}`} className="text-sm text-blue-600 hover:underline">{msg.email}</a>
                </div>
                <div className="text-sm text-gray-500 text-right">
                  {new Date(msg.createdAt).toLocaleString('tr-TR')}
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">{msg.message}</p>
              
              <div className="mt-4 flex gap-3">
                {!msg.isRead && (
                  <button onClick={() => markAsRead(msg.id)} className="flex items-center gap-1 text-sm bg-blue-100 text-blue-700 px-3 py-1.5 rounded hover:bg-blue-200 transition">
                    <FileCheck2 size={16} /> Okundu İşaretle
                  </button>
                )}
                <button onClick={() => deleteMessage(msg.id)} className="flex items-center gap-1 text-sm bg-red-100 text-red-700 px-3 py-1.5 rounded hover:bg-red-200 transition">
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
