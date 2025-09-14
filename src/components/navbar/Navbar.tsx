import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const location = useLocation()

  const closeMenu = () => setOpen(false)

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.brandArea}>
          <Link to="/" className={styles.logo}>CarCuro</Link>
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
          <NavLink to="/" end className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
            Home
          </NavLink>
          
          <div className={styles.dropdown}>
            <button 
              className={styles.dropdownToggle}
              onClick={() => toggleDropdown('services')}
            >
              Services
              <span className={styles.chevron}>▼</span>
            </button>
            {activeDropdown === 'services' && (
              <div className={styles.dropdownMenu}>
                <Link to="/#services" className={styles.dropdownItem}>Paint Protection Films</Link>
                <Link to="/#services" className={styles.dropdownItem}>Ceramic Coating</Link>
                <Link to="/#services" className={styles.dropdownItem}>Graphene Coating</Link>
                <Link to="/#services" className={styles.dropdownItem}>Car Detailing</Link>
              </div>
            )}
          </div>

          <div className={styles.dropdown}>
            <button 
              className={styles.dropdownToggle}
              onClick={() => toggleDropdown('brands')}
            >
              Brands
              <span className={styles.chevron}>▼</span>
            </button>
            {activeDropdown === 'brands' && (
              <div className={styles.dropdownMenu}>
                <Link to="/brands" className={styles.dropdownItem}>3M</Link>
                <Link to="/brands" className={styles.dropdownItem}>XPEL</Link>
                <Link to="/brands" className={styles.dropdownItem}>SunTek</Link>
                <Link to="/brands" className={styles.dropdownItem}>Ceramic Pro</Link>
              </div>
            )}
          </div>

          <NavLink to="/about" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
            What Sets Us Apart
          </NavLink>

          <div className={styles.dropdown}>
            <button 
              className={styles.dropdownToggle}
              onClick={() => toggleDropdown('more')}
            >
              More
              <span className={styles.chevron}>▼</span>
            </button>
            {activeDropdown === 'more' && (
              <div className={styles.dropdownMenu}>
                <Link to="/contact" className={styles.dropdownItem}>Contact Us</Link>
                <Link to="/gallery" className={styles.dropdownItem}>Gallery</Link>
                <Link to="/faq" className={styles.dropdownItem}>FAQ</Link>
                <Link to="/blog" className={styles.dropdownItem}>Blog</Link>
              </div>
            )}
          </div>

          <button className={styles.callButton}>
            <span className={styles.phoneIcon}>📞</span>
            CALL US
          </button>
        </div>
      </div>

      <div className={`${styles.mobilePanel} ${open ? styles.mobileOpen : ''}`}>
        <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => isActive ? `${styles.mobileLink} ${styles.mobileActive}` : styles.mobileLink}>Home</NavLink>
        <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => isActive ? `${styles.mobileLink} ${styles.mobileActive}` : styles.mobileLink}>What Sets Us Apart</NavLink>
        <Link to="/#services" onClick={closeMenu} className={(location.pathname === '/' && location.hash === '#services') ? `${styles.mobileLink} ${styles.mobileActive}` : styles.mobileLink}>Services</Link>
        <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => isActive ? `${styles.mobileLink} ${styles.mobileActive}` : styles.mobileLink}>Contact Us</NavLink>
        <button className={styles.mobileCallButton} onClick={closeMenu}>
          <span className={styles.phoneIcon}>📞</span>
          CALL US
        </button>
      </div>
    </nav>
  )
}

export default Navbar

