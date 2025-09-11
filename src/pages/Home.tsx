import styles from './Home.module.css'
import HeroSlider from '../components/slider/HeroSlider'
import washing1 from '../assets/Washing 1.avif'
import washing2 from '../assets/Washing 2.avif'
import washing3 from '../assets/Washing 3.avif'
import AboutPreview from '../components/about/AboutPreview'
import ServicesGrid from '../components/services/ServicesGrid'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import contactImg from '../assets/Reach Out.jpg'
import { Link } from 'react-router-dom'

function Home() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash === '#services') {
      const el = document.getElementById('services')
      if (el) {
        // Defer to ensure layout is ready before scrolling
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 0)
      }
    }
  }, [location])

  return (
    <section className={styles.container}>
      <div className={styles.fullBleed}>
        <HeroSlider
          slides={[
            { src: washing1, alt: 'Car exterior washing' },
            { src: washing2, alt: 'Car cleaning and detailing' },
            { src: washing3, alt: 'Car rinse and finish' }
          ]}
          intervalMs={2400}
        />
      </div>
      <AboutPreview />
      <h2 id="services" className={styles.sectionTitle}>Services</h2>
      <ServicesGrid />

      <div className={styles.fullBleed}>
        <section className={styles.contactSection}>
          <div className={styles.contactInner}>
            <div>
              <h3 className={styles.contactTitle}>Reach out to us</h3>
              <p className={styles.contactSubtitle}>We are here for you. Our team is ready to hear from you.</p>
              <div className={styles.contactActions}>
                <Link to="/contact" className={styles.contactButton}>Contact Us</Link>
              </div>
            </div>
            <div className={styles.contactImageWrapper}>
              <img src={contactImg} alt="Support representative on a call giving thumbs up" className={styles.contactImage} />
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default Home

