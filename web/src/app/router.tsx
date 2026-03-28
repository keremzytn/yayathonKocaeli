/* eslint-disable react-refresh/only-export-components -- lazy sayfa yüklemeleri + router dışa aktarımı */
import { lazy } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from './RootLayout'
import { YayathonLayout } from './YayathonLayout'
import { RouteError } from './RouteError'

const HomePage = lazy(() => import('../pages/HomePage').then((m) => ({ default: m.HomePage })))
const CompetitionCreditsPage = lazy(() =>
  import('../pages/CompetitionCreditsPage').then((m) => ({ default: m.CompetitionCreditsPage })),
)
const EventProcessPage = lazy(() => import('../pages/EventProcessPage').then((m) => ({ default: m.EventProcessPage })))
const ParticipationConditionsPage = lazy(() =>
  import('../pages/ParticipationConditionsPage').then((m) => ({ default: m.ParticipationConditionsPage })),
)
const AwardsRulesPage = lazy(() => import('../pages/AwardsRulesPage').then((m) => ({ default: m.AwardsRulesPage })))
const CalendarPage = lazy(() => import('../pages/CalendarPage').then((m) => ({ default: m.CalendarPage })))
const ApplyPage = lazy(() => import('../pages/ApplyPage').then((m) => ({ default: m.ApplyPage })))
const FAQPage = lazy(() => import('../pages/FAQPage').then((m) => ({ default: m.FAQPage })))
const ContactPage = lazy(() => import('../pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const AnnouncementsPage = lazy(() => import('../pages/AnnouncementsPage').then((m) => ({ default: m.AnnouncementsPage })))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      {
        element: <YayathonLayout />,
        children: [
          { path: 'yarismaci-kunyesi', element: <CompetitionCreditsPage /> },
          { path: 'etkinlik-suresi', element: <EventProcessPage /> },
          { path: 'katilim-kosullari', element: <ParticipationConditionsPage /> },
          { path: 'oduller-ve-kurallar', element: <AwardsRulesPage /> },
          { path: 'takvim', element: <CalendarPage /> },
          { path: 'basvuru', element: <ApplyPage /> },
          { path: 'sss', element: <FAQPage /> },
          { path: 'iletisim', element: <ContactPage /> },
          { path: 'duyurular', element: <AnnouncementsPage /> },
          { path: 'hakkinda', element: <Navigate to="/yarismaci-kunyesi" replace /> },
          { path: 'katilim', element: <Navigate to="/katilim-kosullari" replace /> },
          { path: 'program', element: <Navigate to="/takvim" replace /> },
          { path: 'degerlendirme', element: <Navigate to="/oduller-ve-kurallar" replace /> },
          { path: 'tasarim', element: <Navigate to="/etkinlik-suresi" replace /> },
          { path: 'metodoloji', element: <Navigate to="/etkinlik-suresi" replace /> },
          { path: 'kaynaklar', element: <Navigate to="/oduller-ve-kurallar" replace /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
