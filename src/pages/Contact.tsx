import styles from './Contact.module.css'
import contactImg from '../assets/Contact Us.avif'
import { useState, useEffect, useRef } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    comment: '',
    captcha: ''
  })
  const [captchaAnswer] = useState(23) // 17 + 6 = 23
  const [isRecaptchaChecked, setIsRecaptchaChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formProgress, setFormProgress] = useState(0)
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({})
  const [isFormVisible, setIsFormVisible] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)

  // Form visibility animation
  useEffect(() => {
    const timer = setTimeout(() => setIsFormVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // Calculate form progress
  useEffect(() => {
    const totalFields = 5 // name, email, phone, service, comment
    const filledFields = Object.values(formData).filter(value => value.trim() !== '').length
    const progress = (filledFields / totalFields) * 100
    setFormProgress(progress)
  }, [formData])

  // Real-time validation
  const validateField = (name: string, value: string) => {
    let error = ''
    
    switch (name) {
      case 'name':
        if (value.length < 2) error = 'Name must be at least 2 characters'
        break
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (value && !emailRegex.test(value)) error = 'Please enter a valid email'
        break
      case 'phone':
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
        if (value && !phoneRegex.test(value.replace(/\s/g, ''))) error = 'Please enter a valid phone number'
        break
      case 'service':
        if (!value) error = 'Please select a service'
        break
      case 'comment':
        if (value.length < 10) error = 'Message must be at least 10 characters'
        break
      case 'captcha':
        if (value && parseInt(value) !== captchaAnswer) error = 'Incorrect answer'
        break
    }
    
    setFieldErrors(prev => ({ ...prev, [name]: error }))
    return error === ''
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Real-time validation
    validateField(name, value)
  }

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target
    // Update step based on field focus
    if (name === 'name' || name === 'email') {
      setCurrentStep(1) // Personal Info
    } else if (name === 'phone' || name === 'service') {
      setCurrentStep(2) // Contact & Service
    } else if (name === 'comment') {
      setCurrentStep(3) // Message
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Validate all fields
    const isNameValid = validateField('name', formData.name)
    const isEmailValid = validateField('email', formData.email)
    const isPhoneValid = validateField('phone', formData.phone)
    const isServiceValid = validateField('service', formData.service)
    const isCommentValid = validateField('comment', formData.comment)
    
    if (!isNameValid || !isEmailValid || !isPhoneValid || !isServiceValid || !isCommentValid || !isRecaptchaChecked) {
      setIsSubmitting(false)
      return
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setShowSuccess(true)
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        comment: '',
        captcha: ''
      })
      setIsRecaptchaChecked(false)
      setShowSuccess(false)
      setFormProgress(0)
      setCurrentStep(1)
    }, 3000)
  }

  return (
    <div className={styles.contactPage}>
      <section 
        className={styles.contactSection}
        style={{ backgroundImage: `url(${contactImg})` }}
      >
        <div className={styles.overlay} />
        <div className={styles.contactContent}>
          <h1 className={styles.contactTitle}>CONTACT INFORMATION</h1>
          <p className={styles.contactSubtitle}>
            Connect with us for personalized automotive care. Your journey to unparalleled vehicle elegance begins here. Reach out today for excellence.
          </p>
          
          <div className={styles.contactActions}>
            <a href="tel:+919876543210" className={styles.contactButton}>
              Call Now
            </a>
          </div>
          
          <div className={styles.contactInfo}>
            <div className={styles.contactInfoItem}>
              <h3 className={styles.contactInfoTitle}>Phone</h3>
              <p className={styles.contactInfoText}>+91 98765 43210</p>
            </div>
            <div className={styles.contactInfoItem}>
              <h3 className={styles.contactInfoTitle}>Email</h3>
              <p className={styles.contactInfoText}>info@carcuro.com</p>
            </div>
            <div className={styles.contactInfoItem}>
              <h3 className={styles.contactInfoTitle}>Address</h3>
              <p className={styles.contactInfoText}>Pune, Maharashtra, India</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Reach Out To Us</h2>
          
          {/* Progress Indicator */}
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${formProgress}%` }}
              />
            </div>
            <span className={styles.progressText}>{Math.round(formProgress)}% Complete</span>
          </div>

          {/* Step Indicator */}
          <div className={styles.stepIndicator}>
            <div className={`${styles.step} ${currentStep >= 1 ? styles.active : ''}`}>
              <span className={styles.stepNumber}>1</span>
              <span className={styles.stepLabel}>Personal Info</span>
            </div>
            <div className={`${styles.step} ${currentStep >= 2 ? styles.active : ''}`}>
              <span className={styles.stepNumber}>2</span>
              <span className={styles.stepLabel}>Contact & Service</span>
            </div>
            <div className={`${styles.step} ${currentStep >= 3 ? styles.active : ''}`}>
              <span className={styles.stepNumber}>3</span>
              <span className={styles.stepLabel}>Message</span>
            </div>
          </div>

          {showSuccess ? (
            <div className={styles.successAnimation}>
              <div className={styles.successIcon}>✓</div>
              <h3 className={styles.successTitle}>Message Sent Successfully!</h3>
              <p className={styles.successText}>Thank you for contacting us. We'll get back to you soon.</p>
            </div>
          ) : (
            <form 
              ref={formRef}
              className={`${styles.contactForm} ${isFormVisible ? styles.visible : ''}`} 
              onSubmit={handleSubmit}
            >
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.fieldLabel}>
                    Your Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className={`${styles.simpleInput} ${fieldErrors.name ? styles.error : ''}`}
                    required
                  />
                  {fieldErrors.name && <span className={styles.errorMessage}>{fieldErrors.name}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.fieldLabel}>
                    Your Email <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className={`${styles.simpleInput} ${fieldErrors.email ? styles.error : ''}`}
                    required
                  />
                  {fieldErrors.email && <span className={styles.errorMessage}>{fieldErrors.email}</span>}
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.fieldLabel}>
                    Phone <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className={`${styles.simpleInput} ${fieldErrors.phone ? styles.error : ''}`}
                    required
                  />
                  {fieldErrors.phone && <span className={styles.errorMessage}>{fieldErrors.phone}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.fieldLabel}>
                    Service <span className={styles.required}>*</span>
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className={`${styles.simpleSelect} ${fieldErrors.service ? styles.error : ''}`}
                    required
                  >
                    <option value="">Service</option>
                    <option value="car-detailing">Car Detailing</option>
                    <option value="polymer-coating">Polymer Coating</option>
                    <option value="ceramic-coating">Ceramic Coating</option>
                    <option value="print-protection-film">Print Protection Film (PPF)</option>
                    <option value="sun-control-filming">Sun Control Filming</option>
                    <option value="accessories">Accessories</option>
                  </select>
                  {fieldErrors.service && <span className={styles.errorMessage}>{fieldErrors.service}</span>}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.fieldLabel}>
                  Your Message <span className={styles.required}>*</span>
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className={`${styles.simpleTextarea} ${fieldErrors.comment ? styles.error : ''}`}
                  rows={6}
                  required
                />
                {fieldErrors.comment && <span className={styles.errorMessage}>{fieldErrors.comment}</span>}
              </div>

              <div className={styles.consentSection}>
                <label className={styles.consentLabel}>
                  <input
                    type="checkbox"
                    checked={isRecaptchaChecked}
                    onChange={(e) => setIsRecaptchaChecked(e.target.checked)}
                    className={styles.consentCheckbox}
                    required
                  />
                  <span className={styles.checkmark} />
                  <span className={styles.consentText}>
                    I agree that my submitted data is being collected and stored.
                  </span>
                </label>
              </div>

              <button 
                type="submit" 
                className={`${styles.sendButton} ${isSubmitting ? styles.submitting : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner} />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          )}
        </div>
    </section>
    </div>
  )
}

export default Contact

