import { Outlet } from 'react-router-dom'
import { YayathonSidebar } from '../components/YayathonSidebar'

export function YayathonLayout() {
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="self-start lg:sticky lg:top-[72px]">
          <YayathonSidebar />
        </aside>
        <section className="min-w-0">
          <Outlet />
        </section>
      </div>
    </div>
  )
}

