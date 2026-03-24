import { useEffect } from 'react'
import { siteMeta } from '../content/siteContent'

export function usePageTitle(title: string) {
  useEffect(() => {
    const prev = document.title
    document.title = `${title} | ${siteMeta.title.split(' | ')[0]}`
    return () => {
      document.title = prev
    }
  }, [title])
}
