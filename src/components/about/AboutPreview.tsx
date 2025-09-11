import { Link } from 'react-router-dom'
import styles from './AboutPreview.module.css'
import washing1 from '../../assets/Washing 1.avif'
import washing2 from '../../assets/Washing 2.avif'
import washing3 from '../../assets/Washing 3.avif'

function AboutPreview() {
  return (
    <section className={styles.root}>
      <div className={styles.imageWrap}>
        <div className={styles.collage}>
          <div className={styles.slice}>
            <img src={washing1} alt="Exterior wash" className={styles.image} />
          </div>
          <div className={styles.slice}>
            <img src={washing2} alt="Interior cleaning" className={styles.image} />
          </div>
          <div className={styles.slice}>
            <img src={washing3} alt="Detail finish" className={styles.image} />
          </div>
        </div>
      </div>
      <div>
        <h2 className={styles.title}>About</h2>
        <p className={styles.text}>
          At CarCuro, we are more than just car enthusiasts; we are artisans dedicated to perfecting the art of
          vehicle detailing. With a passion for precision and a commitment to excellence, we transform every vehicle
          into a masterpiece. Experience unparalleled craftsmanship and unveil a new standard of automotive beauty with us.
        </p>
        <Link to="/about" className={styles.cta}>Know More</Link>
      </div>
    </section>
  )
}

export default AboutPreview

