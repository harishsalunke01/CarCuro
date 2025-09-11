import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './HeroSlider.module.css'

type Slide = {
  src: string
  alt: string
}

type HeroSliderProps = {
  slides: Slide[]
  intervalMs?: number
}

function HeroSlider({ slides, intervalMs = 4000 }: HeroSliderProps) {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, intervalMs)
    return () => window.clearTimeout(timerRef.current)
  }, [index, slides.length, intervalMs])

  const go = (next: number) => {
    setIndex((prev) => (prev + next + slides.length) % slides.length)
  }

  return (
    <div className={styles.sliderRoot}>
      <div className={styles.track} style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((s, i) => (
          <div className={styles.slide} key={i}>
            <img className={styles.image} src={s.src} alt={s.alt} />
          </div>
        ))}
      </div>

      <button className={`${styles.navButton} ${styles.prev}`} onClick={() => go(-1)} aria-label="Previous slide">‹</button>
      <button className={`${styles.navButton} ${styles.next}`} onClick={() => go(1)} aria-label="Next slide">›</button>

      <div className={styles.overlay}>
        <div className={styles.overlayContent}>
          <h2 className={styles.title}>Unveil the beauty of your car</h2>
          <Link to="/about" className={styles.ctaBtn}>Know More</Link>
        </div>
      </div>

      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button key={i} className={`${styles.dot} ${i === index ? styles.dotActive : ''}`} onClick={() => setIndex(i)} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>
    </div>
  )
}

export default HeroSlider

