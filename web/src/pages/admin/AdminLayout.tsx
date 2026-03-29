import { Navigate, Outlet } from 'react-router-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LogOut, MessageSquare, Megaphone, LayoutDashboard } from 'lucide-react'

export function AdminLayout() {
  const token = localStorage.getItem('adminToken')
  const location = useLocation()
  const navigate = useNavigate()

  if (!token && location.pathname !== '/admin/login') {
    return <Navigate to="/admin/login" replace />
  }

  if (location.pathname === '/admin/login') {
    return <Outlet />
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  // Very basic minimal dashboard shell layout
  return (
    <div className="flex h-screen bg-bg flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-bg-elevated border-r border-border flex flex-col hidden md:flex">
        <div className="p-5 text-xl font-display font-bold border-b border-border text-fg tracking-tight">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-1">
          <Link to="/admin" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${location.pathname === '/admin' ? 'bg-accent-600 text-white shadow-sm' : 'text-fg-muted hover:bg-bg-muted hover:text-fg'}`}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/admin/messages" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${location.pathname === '/admin/messages' ? 'bg-accent-600 text-white shadow-sm' : 'text-fg-muted hover:bg-bg-muted hover:text-fg'}`}>
            <MessageSquare size={18} /> Mesajlar
          </Link>
          <Link to="/admin/announcements" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${location.pathname === '/admin/announcements' ? 'bg-accent-600 text-white shadow-sm' : 'text-fg-muted hover:bg-bg-muted hover:text-fg'}`}>
            <Megaphone size={18} /> Duyurular
          </Link>
        </nav>
        <div className="p-4 border-t border-border">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full text-left px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors font-medium text-sm">
            <LogOut size={18} /> Çıkış Yap
          </button>
        </div>
      </aside>
      
      {/* Mobile nav */}
      <div className="md:hidden bg-bg-elevated border-b border-border flex justify-between items-center p-4">
        <div className="font-display font-bold text-fg tracking-tight">Admin Panel</div>
        <div className="flex gap-4 items-center">
          <Link to="/admin" className="text-fg-muted hover:text-fg transition-colors"><LayoutDashboard size={20} /></Link>
          <Link to="/admin/messages" className="text-fg-muted hover:text-fg transition-colors"><MessageSquare size={20} /></Link>
          <Link to="/admin/announcements" className="text-fg-muted hover:text-fg transition-colors"><Megaphone size={20} /></Link>
          <button onClick={handleLogout} className="text-red-500"><LogOut size={20} /></button>
        </div>
      </div>

      <main className="flex-1 overflow-auto p-4 md:p-8 bg-bg-muted/30 dark:bg-bg">
        <div className="max-w-6xl mx-auto min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
