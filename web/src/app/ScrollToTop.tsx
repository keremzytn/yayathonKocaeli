import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Sayfa (route) değişince görünümü en üste alır — SPA’da varsayılan kaydırma konumunu sıfırlar. */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}
