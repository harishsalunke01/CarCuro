import { Link } from 'react-router-dom'
import styles from './ServicesGrid.module.css'

// Import images
import detailingImg from '../../assets/Washing 1.avif'
import polymerImg from '../../assets/Washing 2.avif'
import ceramicImg from '../../assets/Studio 2.avif'
import ppfImg from '../../assets/Studio 4.avif'
import grapheneImg from '../../assets/Studio 5.webp'
import sunControlImg from '../../assets/About.jpg'
import accessoriesImg from '../../assets/Client Img.png'


type Service = {
  id: string
  imgSrc: string
  title: string
  description: string
  isFeatured?: boolean
}

const services: Service[] = [
  {
    id: 'ppf',
    imgSrc: ppfImg,
    title: 'Paint Protection Film (PPF)',
    description:
      "Protect your car’s beauty with CarCuro Paint Protection Film (PPF). It safeguards your vehicle from scratches, stone chips, UV damage, and daily wear, keeping the showroom shine intact. A smart investment today ensures your car looks newer for longer.",
    isFeatured: true,
  },
  {
    id: 'ceramic',
    imgSrc: ceramicImg,
    title: 'Ceramic Coating',
    description:
      'Give your car long-lasting shine with CarCuro Ceramic Coating. It creates a strong protective layer against dust, UV rays, water spots, and minor scratches while enhancing the gloss. With CarCuro, your vehicle stays cleaner, shinier, and protected for years.',
    isFeatured: true,
  },
  {
    id: 'graphene',
    imgSrc: grapheneImg,
    title: 'Graphene Coating',
    description:
      'Upgrade to the next level of protection with CarCuro Graphene Coating. It offers superior durability, extreme water repellency, anti-static properties, and unmatched resistance to heat and scratches. CarCuro ensures your car stays glossy, cooler, and protected for the long run.',
    isFeatured: true,
  },
  {
    id: 'detailing',
    imgSrc: detailingImg,
    title: 'Full Service Detailing',
    description:
      'CarCuro Full Service Detailing – complete care for your car. Our expert detailers restore every corner, inside and out, removing dirt, stains, and imperfections. Experience that fresh, showroom-new feel with CarCuro’s meticulous attention to detail. 🚘✨'
  },
  {
    id: 'polymer',
    imgSrc: polymerImg,
    title: 'Polymer Sealant',
    description:
      'Protect and shine with CarCuro Polymer Sealant. Our advanced formula shields your car’s paint from harsh elements while enhancing depth and gloss. Enjoy long-lasting protection and a showroom finish with CarCuro’s professional care. 🚘✨'
  },
  {
    id: 'sun',
    imgSrc: sunControlImg,
    title: 'Sun Control Filming',
    description:
      'Stay cool and protected with CarCuro Sun Control Films. They block harmful UV rays, reduce cabin heat, and enhance privacy without compromising visibility. CarCuro ensures a safer, more comfortable, and stylish drive every time. 🚘✨'
  },
  
]

const featuredServices = services.filter(s => s.isFeatured)
const standardServices = services.filter(s => !s.isFeatured)

function ServicesGrid() {
  return (
    <div className={styles.wrapper}>
      {/* Featured Services Section */}
      <h2 className={styles.sectionTitle}>Premium Protection</h2>
      <div className={styles.featuredGrid}>
        {featuredServices.map((s) => (
          <article key={s.id} className={styles.featuredCard} id={`service-${s.id}`}>
            <div className={styles.featuredImageWrap}>
              <img src={s.imgSrc} alt={s.title} className={styles.image} />
            </div>
            <div className={styles.featuredContent}>
              <span className={styles.badge}>Premium</span>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.text}>{s.description}</p>
              <Link className={styles.cta} to={`/services#${s.id}`}>Learn More</Link>
            </div>
          </article>
        ))}
      </div>

      {/* Standard Services Section */}
      <h2 className={`${styles.sectionTitle} ${styles.standardTitle}`}>Detailing & Enhancements</h2>
      <div className={styles.standardList}>
        {standardServices.map((s) => (
          <article key={s.id} className={styles.serviceRow} id={`service-${s.id}`}>
            <div className={styles.serviceImageWrap}>
              <img src={s.imgSrc} alt={s.title} className={styles.image} />
            </div>
            <div className={styles.serviceContent}>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.text}>{s.description}</p>
              <Link className={styles.cta} to={`/services#${s.id}`}>View Details</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default ServicesGrid