import styles from './Footer.module.css'
import logo from '../../assets/Logo.PNG'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <div className={styles.brandRow}>
            <img src={logo} alt="CarCuro logo" className={styles.logo} />
            <span className={styles.brand}>Car Curo</span>
          </div>
          <p className={styles.blurb}>
            CarCuro service private limited is a premier automotive detailing studio,
            dedicated to elevating the aesthetic and maintaining the integrity of
            vehicles.
          </p>
        </div>

        <div className={styles.gridLinks}>
          <div>
            <h4 className={styles.colTitle}>Contact</h4>
            <ul className={styles.linkList}>
              <li><a href="mailto:info@carcuro.in">info@carcuro.in</a></li>
              <li><a href="tel:+918600040406">+91 86000 04006</a></li>
              <li>Mon–Sat: 10am–6pm</li>
              <li>Sun: 10am–4pm</li>
            </ul>
          </div>
          <div>
            <h4 className={styles.colTitle}>Customer Service</h4>
            <ul className={styles.linkList}>
              <li><Link to="/about">About CarCuro</Link></li>
              <li><Link to="/#services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/terms-and-conditions">Terms and Conditions</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className={styles.colTitle}>Get Social</h4>
            <ul className={styles.linkList}>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.footnote}>
        <p className={styles.studios}>
          We are studio available in area Sinhagad Road | Deccan | Hadapsar | Wanwaorie | Lulla Nagar | Moshi PCMC
        </p>
        <p className={styles.credit}>Designed and Developed by <a href="#" className={styles.creditLink}>Harish Salunke</a></p>
      </div>
    </footer>
  )
}

export default Footer


