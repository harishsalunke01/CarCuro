import { Link } from 'react-router-dom'
import styles from './ServicesGrid.module.css'

type Service = {
  id: string
  icon: string
  title: string
  description: string
}

const services: Service[] = [
  {
    id: 'detailing',
    icon: '🚗',
    title: 'Car Detailing',
    description:
      'Our expert detailers give your vehicle the attention it deserves, ensuring it looks its best on the roads.'
  },
  {
    id: 'polymer',
    icon: '🧴',
    title: 'Polymer Coating',
    description:
      'Advanced polymer coating for long‑lasting protection against the elements and enhanced gloss.'
  },
  {
    id: 'ceramic',
    icon: '🏁',
    title: 'Ceramic Coating',
    description:
      'Premium ceramic coating delivering unmatched durability, resistance, and a brilliant glass‑like finish.'
  },
  {
    id: 'ppf',
    icon: '🛡️',
    title: 'Paint Protection Film (PPF)',
    description:
      "Preserve your vehicle's pristine finish with high‑quality PPF, guarding against scratches and stone chips."
  },
  {
    id: 'sun',
    icon: '☀️',
    title: 'Sun Control Filming',
    description:
      'Safeguard your interior from harsh sunlight and enhance privacy with precision sun control filming.'
  },
  {
    id: 'accessories',
    icon: '🧳',
    title: 'Accessories',
    description:
      'Curated selection of automotive accessories enhancing both style and functionality for your drive.'
  }
]

function ServicesGrid() {
  return (
    <section className={styles.root}>
      <div className={styles.grid}>
        {services.map((s) => (
          <article key={s.id} className={styles.card} id={`service-${s.id}`}>
            <div className={styles.icon}>{s.icon}</div>
            <h3 className={styles.title}>{s.title}</h3>
            <p className={styles.text}>{s.description}</p>
            <Link className={styles.cta} to={`/services#${s.id}`}>Know More</Link>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ServicesGrid

