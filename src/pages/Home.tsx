import styles from './Home.module.css'
import HeroSlider from '../components/slider/HeroSlider'
import studio1 from '../assets/Studio 1.avif'
import studio2 from '../assets/Studio 2.avif'
import studio4 from '../assets/Studio 4.avif'
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
            { 
              src: studio1, 
              alt: 'Car in a professional studio',
              title: 'Paint Protection Films',
              subtitle: 'Shield your vehicle with our premium paint protection films. Advanced technology meets superior craftsmanship.',
              ctaText: 'Explore PPF',
              ctaLink: '/#services'
            },
            { 
              src: studio2, 
              alt: 'Side profile of a polished car',
              title: 'Ceramic Coating',
              subtitle: 'Experience the ultimate in paint protection with our professional ceramic coating services.',
              ctaText: 'Learn More',
              ctaLink: '/#services'
            },
            { 
              src: studio4, 
              alt: 'Car with a high-gloss graphene coating finish',
              title: 'Graphene Coating',
              subtitle: 'Next-generation protection with graphene technology. Unmatched durability and hydrophobic properties.',
              ctaText: 'Discover',
              ctaLink: '/#services'
            }
          ]}
          intervalMs={5000}
        />
      </div>
      <AboutPreview />
      <h2 id="services" className={styles.sectionTitle}>Services</h2>
      <ServicesGrid />

      <div className={styles.fullBleed}>
        <section className={styles.contactSection}>
          <div className={styles.contactInner}>
            <div>
              <h3 className={styles.contactTitle}>Reach Out to Us</h3>
              <p className={styles.contactSubtitle}>We're just a message away! Whether you have questions, need support, or want expert advice, the CarCuro team is ready to help. Friendly, responsive, and always here for you—because your satisfaction drives us. 📞💬</p>
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
