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
    <div className="flex h-screen bg-gray-100 flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-gray-900 text-white flex flex-col hidden md:flex">
        <div className="p-4 text-xl font-bold border-b border-gray-800">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin" className={`flex items-center gap-2 block px-4 py-2 rounded ${location.pathname === '/admin' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/admin/messages" className={`flex items-center gap-2 block px-4 py-2 rounded ${location.pathname === '/admin/messages' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}>
            <MessageSquare size={20} /> Mesajlar
          </Link>
          <Link to="/admin/announcements" className={`flex items-center gap-2 block px-4 py-2 rounded ${location.pathname === '/admin/announcements' ? 'bg-gray-800' : 'hover:bg-gray-800'}`}>
            <Megaphone size={20} /> Duyurular
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-800 rounded">
            <LogOut size={20} /> Çıkış Yap
          </button>
        </div>
      </aside>
      
      {/* Mobile nav */}
      <div className="md:hidden bg-gray-900 text-white flex justify-between items-center p-4">
        <div className="font-bold">Admin Panel</div>
        <button onClick={handleLogout}><LogOut size={20} /></button>
      </div>

      <main className="flex-1 overflow-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow min-h-full p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
