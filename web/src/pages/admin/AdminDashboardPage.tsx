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
          fetch('http://localhost:5000/api/contactmessages', { headers: hdrs }),
          fetch('http://localhost:5000/api/announcements'),
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
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Kontrol Paneli</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/messages" className="bg-blue-50 p-6 rounded-xl border border-blue-100 hover:shadow-md transition cursor-pointer flex items-center justify-between">
          <div>
            <h3 className="text-blue-500 font-semibold mb-1">Gelen Mesajlar</h3>
            <p className="text-4xl font-bold text-gray-800">{stats.messages}</p>
          </div>
          <MessageSquare size={48} className="text-blue-200" />
        </Link>
        
        <Link to="/admin/announcements" className="bg-purple-50 p-6 rounded-xl border border-purple-100 hover:shadow-md transition cursor-pointer flex items-center justify-between">
          <div>
            <h3 className="text-purple-500 font-semibold mb-1">Duyuru Yönetimi</h3>
            <p className="text-4xl font-bold text-gray-800">{stats.announcements}</p>
          </div>
          <Megaphone size={48} className="text-purple-200" />
        </Link>

        <div className="bg-green-50 p-6 rounded-xl border border-green-100 flex items-center justify-between">
          <div>
            <h3 className="text-green-500 font-semibold mb-1">Ziyaretçiler</h3>
            <p className="text-4xl font-bold text-gray-800">{stats.visits}</p>
          </div>
          <Users size={48} className="text-green-200" />
        </div>
      </div>
    </div>
  )
}
