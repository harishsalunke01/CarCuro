import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ServicesGrid from '../components/services/ServicesGrid'
import styles from './Services.module.css'
import contactImg from '../assets/Contact Us.avif'

function Services() {
  const location = useLocation()

  useEffect(() => {
    const hash = location.hash?.replace('#', '')
    if (hash) {
      const el = document.getElementById(`service-${hash}`)
      if (el) {
        // Use a timeout to ensure the layout is stable before scrolling
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 500) // 500ms delay for animations to settle
      }
    }
  }, [location])

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.hero}>
        <div className={styles.heroOverlay} />
        <img src={contactImg} alt="Professional car detailing studio" className={styles.heroBg} />
        <div className={styles.heroContent}>
          <h1 className={styles.pageTitle}>Our Services</h1>
          <p className={styles.pageSubtitle}>
            Dedicated to perfection, we offer a comprehensive suite of detailing and protection services.
          </p>
        </div>
      </header>

      <section className={styles.root}>
        <ServicesGrid />
      </section>
    </div>
  )
}

export default Services