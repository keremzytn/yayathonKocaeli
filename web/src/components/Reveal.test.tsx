import { act, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, afterEach } from 'vitest'
import { Reveal } from './Reveal'

describe('Reveal', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('prefers-reduced-motion: reduce iken baştan görünür', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({
        matches: true,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    )

    render(
      <Reveal>
        <p>İçerik</p>
      </Reveal>,
    )

    const wrapper = screen.getByText('İçerik').parentElement
    expect(wrapper).toHaveClass('opacity-100', 'translate-y-0')
  })

  it('IntersectionObserver ile görünür olunca sınıflar güncellenir', async () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn(() => ({
        matches: false,
        media: '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    )

    let callback: IntersectionObserverCallback | undefined
    class MockIO {
      observe = vi.fn()
      disconnect = vi.fn()
      constructor(cb: IntersectionObserverCallback) {
        callback = cb
      }
    }
    vi.stubGlobal('IntersectionObserver', MockIO as unknown as typeof IntersectionObserver)

    render(
      <Reveal>
        <span>Gözlem</span>
      </Reveal>,
    )

    const el = screen.getByText('Gözlem').parentElement
    expect(el).toHaveClass('opacity-0')

    const entry = {
      isIntersecting: true,
      target: el!,
    } as unknown as IntersectionObserverEntry

    await vi.waitFor(() => {
      expect(callback).toBeDefined()
    })

    await act(async () => {
      callback!([entry], {} as IntersectionObserver)
    })

    await waitFor(() => {
      expect(el).toHaveClass('opacity-100', 'translate-y-0')
    })
  })
})
