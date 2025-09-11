import { useEffect } from 'react'
import ServicesGrid from '../components/services/ServicesGrid'
import styles from './Services.module.css'

function Services() {
  useEffect(() => {
    const hash = window.location.hash?.replace('#', '')
    if (hash) {
      const el = document.getElementById(`service-${hash}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [])

  return (
    <section className={styles.root}>
      <h1 className={styles.sectionTitle}>Services</h1>
      <ServicesGrid />
    </section>
  )
}

export default Services

