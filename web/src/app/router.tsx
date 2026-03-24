import { createHashRouter } from 'react-router-dom'
import { RootLayout } from './RootLayout'
import { HomePage } from '../pages/HomePage'
import { AboutPage } from '../pages/AboutPage'
import { ParticipatePage } from '../pages/ParticipatePage'
import { ApplyPage } from '../pages/ApplyPage'
import { ProgramPage } from '../pages/ProgramPage'
import { EvaluationPage } from '../pages/EvaluationPage'
import { DesignInspirationPage } from '../pages/DesignInspirationPage'
import { MethodologyPage } from '../pages/MethodologyPage'
import { ResourcesPage } from '../pages/ResourcesPage'
import { FAQPage } from '../pages/FAQPage'
import { ContactPage } from '../pages/ContactPage'

export const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'hakkinda', element: <AboutPage /> },
      { path: 'katilim', element: <ParticipatePage /> },
      { path: 'basvuru', element: <ApplyPage /> },
      { path: 'program', element: <ProgramPage /> },
      { path: 'degerlendirme', element: <EvaluationPage /> },
      { path: 'tasarim', element: <DesignInspirationPage /> },
      { path: 'metodoloji', element: <MethodologyPage /> },
      { path: 'kaynaklar', element: <ResourcesPage /> },
      { path: 'sss', element: <FAQPage /> },
      { path: 'iletisim', element: <ContactPage /> },
    ],
  },
])
