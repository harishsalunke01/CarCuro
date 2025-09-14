import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

// Brand data with images and descriptions
const brands = [
  {
    id: '3m',
    name: '3M',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/3M-Logo.png',
    description: 'Premium Paint Protection Films',
    features: ['Self-Healing Technology', '10-Year Warranty', 'Crystal Clear Finish'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=240&fit=crop&crop=center'
  },
  {
    id: 'xpel',
    name: 'XPEL',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/XPEL-Logo.png',
    description: 'Advanced Ceramic Coatings',
    features: ['Hydrophobic Properties', 'UV Protection', 'Easy Maintenance'],
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&h=240&fit=crop&crop=center'
  },
  {
    id: 'suntek',
    name: 'SunTek',
    logo: 'https://logos-world.net/wp-content/uploads/2021/08/SunTek-Logo.png',
    description: 'Professional Window Films',
    features: ['Heat Rejection', 'Privacy Protection', 'Energy Savings'],
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=240&fit=crop&crop=center'
  },
  {
    id: 'ceramic-pro',
    name: 'Ceramic Pro',
    logo: 'https://logos-world.net/wp-content/uploads/2021/09/Ceramic-Pro-Logo.png',
    description: 'Ultimate Paint Protection',
    features: ['9H Hardness', 'Chemical Resistance', 'Gloss Enhancement'],
    image: 'https://images.unsplash.com/photo-1580418778103-8a0a0b5a8b5c?w=400&h=240&fit=crop&crop=center'
  }
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [logoErrors, setLogoErrors] = useState<{[key: string]: boolean}>({})
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({})
  const location = useLocation()

  const closeMenu = () => setOpen(false)

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const handleLogoError = (brandId: string) => {
    setLogoErrors(prev => ({ ...prev, [brandId]: true }))
  }

  const handleImageError = (brandId: string) => {
    setImageErrors(prev => ({ ...prev, [brandId]: true }))
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
                <Link to="/services#ppf" className={styles.dropdownItem}>Paint Protection Films</Link>
                <Link to="/services#ceramic" className={styles.dropdownItem}>Ceramic Coating</Link>
                <Link to="/services#graphene" className={styles.dropdownItem}>Graphene Coating</Link>
                <Link to="/services#detailing" className={styles.dropdownItem}>Car Detailing</Link>
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
              <div className={styles.brandsDropdown}>
                <div className={styles.brandsHeader}>
                  <h3 className={styles.brandsTitle}>Our Premium Brands</h3>
                  <p className={styles.brandsSubtitle}>Trusted by professionals worldwide</p>
                </div>
                <div className={styles.brandsGrid}>
                  {brands.map((brand, index) => (
                    <Link 
                      key={brand.id} 
                      to={`/brands#${brand.id}`} 
                      className={styles.brandCard}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={styles.brandImageContainer}>
                        {!imageErrors[brand.id] ? (
                          <img 
                            src={brand.image} 
                            alt={`${brand.name} products`}
                            className={styles.brandImage}
                            onError={() => handleImageError(brand.id)}
                          />
                        ) : (
                          <div className={styles.brandImageFallback}>
                            <span className={styles.brandImageIcon}>🚗</span>
                            <span className={styles.brandImageText}>{brand.name}</span>
                          </div>
                        )}
                        <div className={styles.brandLogoContainer}>
                          {!logoErrors[brand.id] ? (
                            <img 
                              src={brand.logo} 
                              alt={`${brand.name} logo`}
                              className={styles.brandLogo}
                              onError={() => handleLogoError(brand.id)}
                              onLoad={() => {
                                // Logo loaded successfully
                              }}
                            />
                          ) : (
                            <div className={styles.brandLogoFallback}>
                              <span className={styles.brandInitials}>
                                {brand.name.split(' ').map(word => word[0]).join('')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={styles.brandContent}>
                        <h4 className={styles.brandName}>{brand.name}</h4>
                        <p className={styles.brandDescription}>{brand.description}</p>
                        <ul className={styles.brandFeatures}>
                          {brand.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className={styles.brandFeature}>
                              <span className={styles.featureIcon}>✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={styles.brandOverlay}>
                        <span className={styles.brandCta}>Learn More</span>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className={styles.brandsFooter}>
                  <Link to="/brands" className={styles.viewAllBrands}>
                    View All Brands →
                  </Link>
                </div>
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
        
        {/* Mobile Brands Section */}
        <div className={styles.mobileBrandsSection}>
          <button 
            className={styles.mobileBrandsToggle}
            onClick={() => toggleDropdown('mobile-brands')}
          >
            <span>Brands</span>
            <span className={styles.mobileChevron}>{activeDropdown === 'mobile-brands' ? '▲' : '▼'}</span>
          </button>
          {activeDropdown === 'mobile-brands' && (
            <div className={styles.mobileBrandsList}>
              {brands.map((brand) => (
                <Link 
                  key={brand.id}
                  to={`/brands#${brand.id}`} 
                  className={styles.mobileBrandItem}
                  onClick={closeMenu}
                >
                  <div className={styles.mobileBrandInfo}>
                    <h4 className={styles.mobileBrandName}>{brand.name}</h4>
                    <p className={styles.mobileBrandDesc}>{brand.description}</p>
                  </div>
                  <span className={styles.mobileBrandArrow}>→</span>
                </Link>
              ))}
              <Link to="/brands" className={styles.mobileViewAllBrands} onClick={closeMenu}>
                View All Brands →
              </Link>
            </div>
          )}
        </div>

        <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => isActive ? `${styles.mobileLink} ${styles.mobileActive}` : styles.mobileLink}>Contact Us</NavLink>
        <Link to="/gallery" onClick={closeMenu} className={styles.mobileLink}>Gallery</Link>
        <button className={styles.mobileCallButton} onClick={closeMenu}>
          <span className={styles.phoneIcon}>📞</span>
          CALL US
        </button>
      </div>
    </nav>
  )
}

export default Navbar

