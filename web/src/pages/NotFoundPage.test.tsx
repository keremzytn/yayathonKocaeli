import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { NotFoundPage } from './NotFoundPage'

describe('NotFoundPage', () => {
  it('başlık ve anasayfa bağlantısı gösterir', () => {
    const router = createMemoryRouter([{ path: '*', element: <NotFoundPage /> }], { initialEntries: ['/olmayan-yol'] })
    render(<RouterProvider router={router} />)
    expect(screen.getByRole('heading', { name: /sayfa bulunamadı/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^anasayfa$/i })).toBeInTheDocument()
  })
})
