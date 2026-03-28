import { type ComponentPropsWithoutRef, type ElementType, type ReactNode, useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type RevealOwnProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  rootMargin?: string
  once?: boolean
  /** Görünür olunca geçiş gecikmesi (ms); `staggerStep` yoksa kullanılır */
  delayMs?: number
  /**
   * `calc(staggerStep * var(--ui-reveal-stagger))` — çoğul kartlarda gecikmeyi CSS ile sabitler.
   * `delayMs` ile birlikte verilirse `staggerStep` önceliklidir.
   */
  staggerStep?: number
}

export type RevealProps = RevealOwnProps &
  Omit<ComponentPropsWithoutRef<'div'>, keyof RevealOwnProps | 'as'>

export function Reveal({
  children,
  className,
  as: Component = 'div',
  rootMargin = '0px 0px -10% 0px',
  once = true,
  delayMs = 0,
  staggerStep,
  style,
  ...rest
}: RevealProps) {
  const reducedMotion = usePrefersReducedMotion()
  const [visible, setVisible] = useState(reducedMotion)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (reducedMotion) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.disconnect()
          } else if (!once) {
            setVisible(false)
          }
        }
      },
      { root: null, rootMargin, threshold: 0.08 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [reducedMotion, once, rootMargin])

  const show = reducedMotion || visible

  let transitionDelay: string | undefined
  if (show && !reducedMotion) {
    if (staggerStep !== undefined) {
      if (staggerStep > 0) transitionDelay = `calc(${staggerStep} * var(--ui-reveal-stagger))`
    } else if (delayMs > 0) {
      transitionDelay = `${delayMs}ms`
    }
  }

  return (
    <Component
      ref={ref as never}
      className={clsx(
        'reveal-target',
        !reducedMotion && 'transition-[opacity,transform] ease-out duration-[var(--ui-reveal-duration)]',
        show ? 'opacity-100 translate-y-0' : 'translate-y-4 opacity-0',
        className,
      )}
      style={{
        ...style,
        transitionDelay,
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}
