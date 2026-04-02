import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, Loader2, Save, X } from 'lucide-react'
import { API_BASE_URL } from '../../lib/api'

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
      const res = await fetch(`${API_BASE_URL}/api/announcements`)
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
      ? `${API_BASE_URL}/api/announcements/${currentAnn.id}`
      : `${API_BASE_URL}/api/announcements`
      
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
      await fetch(`${API_BASE_URL}/api/announcements/${id}`, {
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
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-fg tracking-tight">Duyurular</h1>
        {!isEditing && (
          <button 
            onClick={() => { setCurrentAnn({ isActive: true }); setIsEditing(true) }}
            className="flex items-center gap-2 bg-accent-600 hover:bg-accent-500 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
          >
            <Plus size={20} /> Yeni Duyuru
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-bg-elevated p-6 rounded-2xl border border-border shadow-sm mb-8">
          <h2 className="text-xl font-display font-bold mb-5 text-fg">{currentAnn.id ? 'Duyuruyu Düzenle' : 'Yeni Duyuru Ekle'}</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-fg">Başlık</label>
              <input 
                type="text" 
                className="w-full border border-border bg-bg-muted/50 text-fg p-2.5 rounded-xl focus:ring-2 focus:ring-accent-600 outline-none transition-all placeholder:text-muted" 
                value={currentAnn.title || ''} 
                onChange={e => setCurrentAnn({...currentAnn, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-fg">İçerik</label>
              <textarea 
                rows={5}
                className="w-full border border-border bg-bg-muted/50 text-fg p-2.5 rounded-xl focus:ring-2 focus:ring-accent-600 outline-none transition-all placeholder:text-muted resize-y" 
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
                className="w-4 h-4 rounded text-accent-600 focus:ring-accent-600 accent-accent-600 cursor-pointer"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-fg cursor-pointer select-none">Aktif (Sitede Göster)</label>
            </div>
          </div>
          <div className="mt-8 flex gap-3 border-t border-border pt-5">
            <button onClick={handleSave} className="flex items-center gap-2 bg-accent-600 hover:bg-accent-500 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
              <Save size={18} /> Kaydet
            </button>
            <button onClick={() => { setIsEditing(false); setCurrentAnn({}) }} className="flex items-center gap-2 bg-surface-800 hover:bg-surface-700 text-fg px-6 py-2.5 rounded-xl font-medium transition-colors border border-border">
              <X size={18} /> İptal
            </button>
          </div>
        </div>
      ) : loading ? (
        <div className="flex justify-center p-12"><Loader2 className="animate-spin text-muted" size={32} /></div>
      ) : announcements.length === 0 ? (
        <p className="text-muted text-center py-8">Henüz duyuru bulunmuyor.</p>
      ) : (
        <div className="grid gap-4">
          {announcements.map(ann => (
            <div key={ann.id} className="p-5 border border-border rounded-2xl bg-bg-elevated shadow-sm flex flex-col md:flex-row justify-between gap-4 transition-colors hover:border-border/80">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-display font-semibold text-fg">{ann.title}</h3>
                  {ann.isActive ? (
                    <span className="bg-accent-500/10 border border-accent-500/20 text-accent-600 text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider">Aktif</span>
                  ) : (
                    <span className="bg-surface-800 border border-surface-700 text-muted text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider">Pasif</span>
                  )}
                </div>
                <p className="text-fg-muted whitespace-pre-wrap leading-relaxed">{ann.content}</p>
                <div className="text-xs font-medium text-muted mt-3 bg-bg-muted w-fit px-2.5 py-1 rounded-full">{new Date(ann.createdAt).toLocaleString('tr-TR')}</div>
              </div>
              <div className="flex items-start gap-2 border-t md:border-t-0 border-border pt-4 md:pt-0">
                <button onClick={() => { setCurrentAnn(ann); setIsEditing(true) }} className="flex items-center gap-1.5 p-2 bg-accent-500/10 text-accent-600 rounded-xl hover:bg-accent-500/20 transition-colors font-medium text-sm px-3">
                  <Edit2 size={16} /> Düzenle
                </button>
                <button onClick={() => handleDelete(ann.id)} className="flex items-center gap-1.5 p-2 bg-red-500/10 text-red-600 rounded-xl hover:bg-red-500/20 transition-colors font-medium text-sm px-3">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
