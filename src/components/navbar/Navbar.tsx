import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'
import logo from '../../assets/Logo.PNG'

function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const closeMenu = () => setOpen(false)

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.brandArea}>
          <img src={logo} alt="CarCuro logo" className={styles.logo} />
          <span className={styles.brand}>Car Curo</span>
        </div>
        <button
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          className={styles.menuButton}
          onClick={() => setOpen(!open)}
        >
          <span className={styles.menuIcon} />
        </button>

        <div className={styles.links}>
          <NavLink to="/" end className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>About CarCuro</NavLink>
          <Link to="/#services" className={(location.pathname === '/' && location.hash === '#services') ? `${styles.link} ${styles.active}` : styles.link}>Services</Link>
          <NavLink to="/contact" className={({ isActive }) => isActive ? `${styles.cta} ${styles.active}` : styles.cta}>Contact Us</NavLink>
        </div>
      </div>

      <div className={`${styles.mobilePanel} ${open ? styles.mobileOpen : ''}`}>
        <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => isActive ? `${styles.mobileLink} ${styles.mobileActive}` : styles.mobileLink}>Home</NavLink>
        <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => isActive ? `${styles.mobileLink} ${styles.mobileActive}` : styles.mobileLink}>About CarCuro</NavLink>
        <Link to="/#services" onClick={closeMenu} className={(location.pathname === '/' && location.hash === '#services') ? `${styles.mobileLink} ${styles.mobileActive}` : styles.mobileLink}>Services</Link>
        <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => isActive ? `${styles.mobileCta} ${styles.mobileActive}` : styles.mobileCta}>Contact Us</NavLink>
      </div>
    </nav>
  )
}

export default Navbar

