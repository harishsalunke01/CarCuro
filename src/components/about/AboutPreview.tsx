import { Link } from 'react-router-dom'
import styles from './AboutPreview.module.css'
import studio2 from '../../assets/Studio 2.avif'
import studio3 from '../../assets/Studio 3.avif'

function AboutPreview() {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.root}>
        {/* The background is now handled by CSS on the .sectionWrapper element */}
        <div className={styles.foreground}>
          <div className={styles.collage}>
            <div className={`${styles.slice} ${styles.sliceOne}`}>
              <img src={studio2} alt="Flawless finish on a car's paintwork" className={styles.image} />
            </div>
            <div className={`${styles.slice} ${styles.sliceTwo}`}>
              <img src={studio3} alt="Intricate details of a luxury car's headlight" className={styles.image} />
            </div>
          </div>

          <div className={styles.content}>
            <h2 className={styles.title}>The Pursuit of Perfection</h2>
            <p className={styles.text}>
              At CarCuro, we see vehicle detailing not as a task, but as an art form. Our passion is matched only by our precision, transforming every car into a statement of excellence and beauty.
            </p>
            <Link to="/about" className={styles.cta}>Discover Our Craft</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPreview
