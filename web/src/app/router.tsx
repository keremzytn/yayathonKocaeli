import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from './RootLayout'
import { YayathonLayout } from './YayathonLayout'
import { HomePage } from '../pages/HomePage'
import { CompetitionCreditsPage } from '../pages/CompetitionCreditsPage'
import { EventProcessPage } from '../pages/EventProcessPage'
import { ParticipationConditionsPage } from '../pages/ParticipationConditionsPage'
import { AwardsRulesPage } from '../pages/AwardsRulesPage'
import { CalendarPage } from '../pages/CalendarPage'
import { ApplyPage } from '../pages/ApplyPage'
import { FAQPage } from '../pages/FAQPage'
import { ContactPage } from '../pages/ContactPage'
import { AnnouncementsPage } from '../pages/AnnouncementsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
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
    ],
  },
])
