import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Megaphone, Users } from 'lucide-react'

export function AdminDashboardPage() {
  const [stats, setStats] = useState({ messages: 0, announcements: 0, visits: 104 })

  useEffect(() => {
    // Basic fetch just to count items for dashboard
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('adminToken')
        const hdrs = { Authorization: `Bearer ${token}` }

        const [msgRes, annRes] = await Promise.all([
          fetch('http://localhost:5144/api/contactmessages', { headers: hdrs }),
          fetch('http://localhost:5144/api/announcements'),
        ])
        
        let messages = 0
        let announcements = 0

        if (msgRes.ok) {
          const m = await msgRes.json()
          messages = m.length
        }
        if (annRes.ok) {
          const a = await annRes.json()
          announcements = a.length
        }

        setStats(prev => ({ ...prev, messages, announcements }))
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold mb-8 text-fg tracking-tight">Kontrol Paneli</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/messages" className="bg-bg-elevated p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between group">
          <div>
            <h3 className="text-sm font-medium text-fg-muted mb-1">Gelen Mesajlar</h3>
            <p className="text-4xl font-display font-bold text-fg group-hover:text-accent-600 transition-colors">{stats.messages}</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-accent-500/10 flex items-center justify-center text-accent-600">
            <MessageSquare size={24} />
          </div>
        </Link>
        
        <Link to="/admin/announcements" className="bg-bg-elevated p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between group">
          <div>
            <h3 className="text-sm font-medium text-fg-muted mb-1">Duyuru Yönetimi</h3>
            <p className="text-4xl font-display font-bold text-fg group-hover:text-accent-600 transition-colors">{stats.announcements}</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-accent-500/10 flex items-center justify-center text-accent-600">
            <Megaphone size={24} />
          </div>
        </Link>

        <div className="bg-bg-elevated p-6 rounded-2xl border border-border shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-fg-muted mb-1">Ziyaretçiler</h3>
            <p className="text-4xl font-display font-bold text-fg">{stats.visits}</p>
          </div>
          <div className="h-12 w-12 rounded-xl bg-accent-500/10 flex items-center justify-center text-accent-600">
            <Users size={24} />
          </div>
        </div>
      </div>
    </div>
  )
}
