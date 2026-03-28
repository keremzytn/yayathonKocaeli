import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, vi, afterEach } from 'vitest'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

describe('usePrefersReducedMotion', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('matchMedia.matches true iken true döner', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        matches: query.includes('prefers-reduced-motion') && query.includes('reduce'),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    )

    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(true)
  })

  it('change olayı state günceller', () => {
    let matches = false
    let changeHandler: (() => void) | undefined

    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => ({
        get matches() {
          return matches && query.includes('prefers-reduced-motion')
        },
        media: query,
        addEventListener: (_: string, cb: () => void) => {
          changeHandler = cb
        },
        removeEventListener: vi.fn(),
      })),
    )

    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(false)

    act(() => {
      matches = true
      changeHandler?.()
    })
    expect(result.current).toBe(true)
  })
})
