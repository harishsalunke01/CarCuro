import styles from './About.module.css'
import aboutImg from '../assets/About.jpg'
import clientsImg from '../assets/Client Img.png'
import studio1 from '../assets/Studio 1.avif'
import studio2 from '../assets/Studio 2.avif'
import studio3 from '../assets/Studio 3.avif'
import studio4 from '../assets/Studio 4.avif'
import studio5 from '../assets/Studio 5.webp'
import { useEffect, useMemo, useRef, useState } from 'react'

type StudioProps = { images: string[]; title: string; address: string }

function StudioCard({ images, title, address }: StudioProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className={styles.studioCard}>
      <div className={styles.studioImageContainer}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${title} - Image ${index + 1}`}
            className={`${styles.studioImage} ${index === currentImageIndex ? styles.active : ''}`}
          />
        ))}
      </div>
      <div className={styles.studioAddress}>{address}</div>
    </div>
  )
}

function About() {
  const statsRef = useRef<HTMLDivElement | null>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const element = statsRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  function useCountUp(target: number, durationMs: number, shouldStart: boolean): number {
    const [value, setValue] = useState(0)
    const startTimestampRef = useRef<number | null>(null)

    useEffect(() => {
      if (!shouldStart) return
      let rafId = 0
      const step = (timestamp: number) => {
        if (startTimestampRef.current === null) startTimestampRef.current = timestamp
        const elapsed = timestamp - startTimestampRef.current
        const progress = Math.min(1, elapsed / durationMs)
        setValue(Math.floor(progress * target))
        if (progress < 1) rafId = requestAnimationFrame(step)
      }
      rafId = requestAnimationFrame(step)
      return () => cancelAnimationFrame(rafId)
    }, [target, durationMs, shouldStart])

    return value
  }

  const yearTarget = 2015
  const studiosTarget = 5
  const customersTarget = 100000

  const yearValue = useCountUp(yearTarget, 1200, animate)
  const studiosValue = useCountUp(studiosTarget, 900, animate)
  const customersValue = useCountUp(customersTarget, 1600, animate)

  const customersDisplay = useMemo(() => {
    const formatter = new Intl.NumberFormat('en-IN')
    return formatter.format(customersValue) + (customersValue >= customersTarget ? '+' : '')
  }, [customersValue])

  return (
    <section className={styles.aboutSection}>
      <div
        className={styles.banner}
        style={{ backgroundImage: `url(${aboutImg})` }}
      >
        <div className={styles.overlay} />
        <div className={styles.bannerContent}>
          <h1 className={styles.title}>Our Story</h1>
          <p className={styles.paragraph}>
            Established in 2015, CarCuro was founded upon a profound passion for transforming
            vehicles into definitive works of art. With our unwavering commitment to excellence,
            we&apos;ve meticulously serviced tens of thousands of cars, supported by a dedicated
            team renowned for their expertise and professionalism, garnering praise and trust
            from countless satisfied clients across the years.
          </p>
        </div>
      </div>

      <div ref={statsRef} className={styles.statsRibbon}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{yearValue}</div>
            <div className={styles.statLabel}>In the industry since</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{studiosValue}</div>
            <div className={styles.statLabel}>Number of studios</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{customersDisplay}</div>
            <div className={styles.statLabel}>Customers served</div>
          </div>
        </div>
      </div>

      <section className={styles.clientsSection}>
        <div className={styles.clientsCard}>
          <img
            src={clientsImg}
            alt="CarCuro leadership and client network"
            className={styles.clientsImage}
            loading="lazy"
          />
          <div className={`${styles.leaderBadge} ${styles.leaderLeft}`}>
            <div className={styles.leaderName}>Mr. Rohit Titwane</div>
            <div className={styles.leaderRole}>Director</div>
          </div>
          <div className={`${styles.leaderBadge} ${styles.leaderRight}`}>
            <div className={styles.leaderName}>Mr. Amit Charanwar</div>
            <div className={styles.leaderRole}>Director</div>
          </div>
        </div>
      </section>

      <section className={styles.studiosSection} aria-labelledby="studios-heading">
        <h2 id="studios-heading" className={styles.studiosTitle}>Our Studios</h2>
        <div className={styles.studiosGrid}>
          <StudioCard 
            images={[studio1, studio2, studio3]} 
            title="Studio - Sinhagad Road" 
            address="Nawalewada Chowk, Dmart Rd, Kale Padar, Hadapsar, Pune, Maharashtra 411028" 
          />
          <StudioCard 
            images={[studio2, studio3, studio4]} 
            title="Studio - Kondhwa" 
            address="KALUBAI CHOWK, Solapur Rd, Near FATIMA NAGAR JUNCTION, Opposite CROMA, Wanowrie, Pune, Maharashtra 411022" 
          />
          <StudioCard 
            images={[studio3, studio4, studio5]} 
            title="Studio - Deccan" 
            address="FVMJ+9V9, Bibwewadi Kondhwa Rd, Parsi Colony, Block A, Kondhwa, Pune, Maharashtra 411040" 
          />
          <StudioCard 
            images={[studio4, studio5, studio1]} 
            title="Studio - New Location" 
            address="New Studio Address, Pune, Maharashtra" 
          />
        </div>
      </section>
    </section>
  )
}

export default About

