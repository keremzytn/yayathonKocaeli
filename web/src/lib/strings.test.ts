import { describe, it, expect } from 'vitest'
import { countWords } from './strings'

describe('countWords', () => {
  it('boş dizgide 0 döner', () => {
    expect(countWords('')).toBe(0)
    expect(countWords('   ')).toBe(0)
  })

  it('kelimeleri boşlukla ayırır', () => {
    expect(countWords('bir iki üç')).toBe(3)
    expect(countWords('  tek  ')).toBe(1)
  })
})
