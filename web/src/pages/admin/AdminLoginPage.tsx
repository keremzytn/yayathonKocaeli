import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import { API_BASE_URL } from '../../lib/api'

export function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('adminToken', data.token)
        navigate('/admin')
      } else {
        setError('Geçersiz kullanıcı adı veya şifre')
      }
    } catch (err) {
      setError('Sunucuya bağlanılamadı.')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-bg-muted/30 dark:bg-bg px-4 py-8">
      <div className="w-full max-w-sm bg-bg-elevated rounded-3xl border border-border shadow-xl p-8 md:p-10 relative overflow-hidden">
        {/* Decorative background element matched to the site's accent gradients */}
        <div className="absolute top-0 right-0 -m-8 h-32 w-32 rounded-full bg-accent-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -m-8 h-32 w-32 rounded-full bg-accent-500/10 blur-3xl" />
        
        <div className="relative z-10">
          <h2 className="text-3xl font-display font-bold text-center mb-8 text-fg tracking-tight">Admin Girişi</h2>
          
          {error && (
            <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl flex items-center gap-3 text-sm font-medium">
              <AlertTriangle size={18} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-fg mb-1.5">Kullanıcı Adı</label>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-bg-muted/50 border border-border text-fg rounded-xl focus:ring-2 focus:ring-accent-600 focus:outline-none transition-all placeholder:text-muted"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-fg mb-1.5">Şifre</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-bg-muted/50 border border-border text-fg rounded-xl focus:ring-2 focus:ring-accent-600 focus:outline-none transition-all placeholder:text-muted"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-accent-600 hover:bg-accent-500 text-white font-semibold rounded-xl transition-all shadow-sm hover:shadow mt-4"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
