import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, Loader2, Save, X } from 'lucide-react'

type Announcement = {
  id: number
  title: string
  content: string
  createdAt: string
  isActive: boolean
}

export function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  const [isEditing, setIsEditing] = useState(false)
  const [currentAnn, setCurrentAnn] = useState<Partial<Announcement>>({})

  const fetchAnnouncements = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:5144/api/announcements')
      if (res.ok) {
        setAnnouncements(await res.json())
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const handleSave = async () => {
    if (!currentAnn.title || !currentAnn.content) return alert('Başlık ve İçerik gereklidir.')
    
    const method = currentAnn.id ? 'PUT' : 'POST'
    const url = currentAnn.id 
      ? `http://localhost:5144/api/announcements/${currentAnn.id}`
      : `http://localhost:5144/api/announcements`
      
    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({
          title: currentAnn.title,
          content: currentAnn.content,
          isActive: currentAnn.isActive ?? true
        }),
      })
      if (res.ok) {
        setIsEditing(false)
        setCurrentAnn({})
        fetchAnnouncements()
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Duyuruyu silmek istediğinize emin misiniz?')) return
    try {
      await fetch(`http://localhost:5144/api/announcements/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      })
      fetchAnnouncements()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Duyurular</h1>
        {!isEditing && (
          <button 
            onClick={() => { setCurrentAnn({ isActive: true }); setIsEditing(true) }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            <Plus size={20} /> Yeni Duyuru
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-gray-50 p-6 rounded-lg border mb-8">
          <h2 className="text-xl font-semibold mb-4">{currentAnn.id ? 'Duyuruyu Düzenle' : 'Yeni Duyuru Ekle'}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Başlık</label>
              <input 
                type="text" 
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                value={currentAnn.title || ''} 
                onChange={e => setCurrentAnn({...currentAnn, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">İçerik</label>
              <textarea 
                rows={5}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                value={currentAnn.content || ''} 
                onChange={e => setCurrentAnn({...currentAnn, content: e.target.value})}
              />
            </div>
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="isActive"
                checked={currentAnn.isActive !== false} 
                onChange={e => setCurrentAnn({...currentAnn, isActive: e.target.checked})}
              />
              <label htmlFor="isActive" className="text-sm font-medium cursor-pointer">Aktif (Sitede Göster)</label>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button onClick={handleSave} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded font-medium transition">
              <Save size={18} /> Kaydet
            </button>
            <button onClick={() => { setIsEditing(false); setCurrentAnn({}) }} className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded font-medium transition">
              <X size={18} /> İptal
            </button>
          </div>
        </div>
      ) : loading ? (
        <div className="flex justify-center p-12"><Loader2 className="animate-spin text-gray-400" size={32} /></div>
      ) : announcements.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Henüz duyuru bulunmuyor.</p>
      ) : (
        <div className="grid gap-4">
          {announcements.map(ann => (
            <div key={ann.id} className="p-5 border rounded-lg bg-white shadow-sm flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{ann.title}</h3>
                  {ann.isActive ? (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded font-medium">Aktif</span>
                  ) : (
                    <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded font-medium">Pasif</span>
                  )}
                </div>
                <p className="text-gray-600 whitespace-pre-wrap">{ann.content}</p>
                <div className="text-xs text-gray-400 mt-3">{new Date(ann.createdAt).toLocaleString('tr-TR')}</div>
              </div>
              <div className="flex items-start gap-2">
                <button onClick={() => { setCurrentAnn(ann); setIsEditing(true) }} className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => handleDelete(ann.id)} className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
