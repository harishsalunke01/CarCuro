import { useState, useEffect } from 'react'
import styles from './Gallery.module.css'

// Gallery data with high-quality automotive images
const galleryData = [
  {
    id: 'paint-protection',
    category: 'Paint Protection',
    title: 'Premium Paint Protection Films',
    description: 'Advanced protection for your vehicle\'s paintwork',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center',
        alt: 'Paint protection film application',
        caption: 'Professional PPF Installation'
      },
      {
        src: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop&crop=center',
        alt: 'Ceramic coating process',
        caption: 'Ceramic Coating Application'
      },
      {
        src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop&crop=center',
        alt: 'Window tinting service',
        caption: 'Professional Window Tinting'
      }
    ]
  },
  {
    id: 'detailing',
    category: 'Auto Detailing',
    title: 'Professional Detailing Services',
    description: 'Complete interior and exterior detailing',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&h=600&fit=crop&crop=center',
        alt: 'Car detailing process',
        caption: 'Interior Deep Cleaning'
      },
      {
        src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center',
        alt: 'Exterior detailing',
        caption: 'Exterior Polish & Wax'
      },
      {
        src: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop&crop=center',
        alt: 'Engine bay cleaning',
        caption: 'Engine Bay Detailing'
      }
    ]
  },
  {
    id: 'customization',
    category: 'Customization',
    title: 'Vehicle Customization',
    description: 'Personalize your vehicle with our custom solutions',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop&crop=center',
        alt: 'Custom wrap installation',
        caption: 'Custom Vinyl Wraps'
      },
      {
        src: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=800&h=600&fit=crop&crop=center',
        alt: 'LED lighting installation',
        caption: 'LED Light Installation'
      },
      {
        src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center',
        alt: 'Custom accessories',
        caption: 'Custom Accessories'
      }
    ]
  },
  {
    id: 'before-after',
    category: 'Before & After',
    title: 'Transformation Gallery',
    description: 'See the amazing transformations we\'ve achieved',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop&crop=center',
        alt: 'Before and after detailing',
        caption: 'Complete Makeover'
      },
      {
        src: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop&crop=center',
        alt: 'Paint correction results',
        caption: 'Paint Correction Results'
      },
      {
        src: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop&crop=center',
        alt: 'Protection film results',
        caption: 'PPF Installation Results'
      }
    ]
  }
]

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string, caption: string} | null>(null)
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({})

  // Scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    const timer = setTimeout(() => {
      const animatedElements = document.querySelectorAll(`
        .animateOnScroll,
        .fadeInUp,
        .scaleIn,
        .slideInLeft,
        .slideInRight,
        .staggerItem
      `)

      animatedElements.forEach((el) => {
        observer.observe(el)
      })
    }, 100)

    // Fallback: Make all elements visible after 2 seconds
    const fallbackTimer = setTimeout(() => {
      const allAnimatedElements = document.querySelectorAll(`
        .animateOnScroll,
        .fadeInUp,
        .scaleIn,
        .slideInLeft,
        .slideInRight,
        .staggerItem
      `)

      allAnimatedElements.forEach((el) => {
        if (!el.classList.contains('visible')) {
          el.classList.add('visible')
        }
      })
    }, 2000)

    return () => {
      clearTimeout(timer)
      clearTimeout(fallbackTimer)
      observer.disconnect()
    }
  }, [])

  const handleImageError = (imageId: string) => {
    setImageErrors(prev => ({ ...prev, [imageId]: true }))
  }

  const categories = [
    { id: 'all', name: 'All Work', count: galleryData.reduce((acc, cat) => acc + cat.images.length, 0) },
    ...galleryData.map(cat => ({
      id: cat.id,
      name: cat.category,
      count: cat.images.length
    }))
  ]

  const filteredData = selectedCategory === 'all' 
    ? galleryData 
    : galleryData.filter(cat => cat.id === selectedCategory)

  return (
    <div className={styles.galleryPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} ${styles.fadeInUp}`}>Our Work Gallery</h1>
          <p className={`${styles.heroSubtitle} ${styles.animateOnScroll}`}>
            Explore our portfolio of premium automotive services and see the quality craftsmanship that sets CarCuro apart.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className={styles.filterSection}>
        <div className={styles.filterContainer}>
          <h2 className={`${styles.filterTitle} ${styles.fadeInUp}`}>Browse by Category</h2>
          <div className={`${styles.categoryFilter} ${styles.scaleIn}`}>
            {categories.map((category, index) => (
              <button
                key={category.id}
                className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''} ${styles.staggerItem}`}
                onClick={() => setSelectedCategory(category.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className={styles.categoryName}>{category.name}</span>
                <span className={styles.categoryCount}>{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className={styles.gallerySection}>
        <div className={styles.galleryContainer}>
          {filteredData.map((category, categoryIndex) => (
            <div key={category.id} className={`${styles.categorySection} ${styles.slideInLeft}`}>
              <div className={styles.categoryHeader}>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                <p className={styles.categoryDescription}>{category.description}</p>
              </div>
              
              <div className={styles.imageGrid}>
                {category.images.map((image, imageIndex) => (
                  <div
                    key={`${category.id}-${imageIndex}`}
                    className={`${styles.imageCard} ${styles.staggerItem}`}
                    style={{ animationDelay: `${(categoryIndex * 0.2) + (imageIndex * 0.1)}s` }}
                    onClick={() => setSelectedImage(image)}
                  >
                    {!imageErrors[`${category.id}-${imageIndex}`] ? (
                      <img
                        src={image.src}
                        alt={image.alt}
                        className={styles.galleryImage}
                        onError={() => handleImageError(`${category.id}-${imageIndex}`)}
                      />
                    ) : (
                      <div className={styles.imageFallback}>
                        <span className={styles.fallbackIcon}>🚗</span>
                        <span className={styles.fallbackText}>{image.caption}</span>
                      </div>
                    )}
                    <div className={styles.imageOverlay}>
                      <div className={styles.imageInfo}>
                        <h4 className={styles.imageCaption}>{image.caption}</h4>
                        <span className={styles.viewIcon}>👁️</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={`${styles.ctaTitle} ${styles.fadeInUp}`}>Ready to Transform Your Vehicle?</h2>
          <p className={`${styles.ctaSubtitle} ${styles.animateOnScroll}`}>
            Let us bring the same level of excellence to your vehicle. Contact us today for a consultation.
          </p>
          <div className={`${styles.ctaButtons} ${styles.scaleIn}`}>
            <a href="/contact" className={styles.ctaButtonPrimary}>
              Get Quote
            </a>
            <a href="tel:+919876543210" className={styles.ctaButtonSecondary}>
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className={styles.modal} onClick={() => setSelectedImage(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setSelectedImage(null)}>
              ✕
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className={styles.modalImage}
            />
            <div className={styles.modalCaption}>
              <h3>{selectedImage.caption}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery
