import { useState, useEffect } from 'preact/hooks'
import { theme } from '../theme'
import { useScrollReveal } from '../hooks/useScrollReveal'


const socialLinks = [
  {
    title: 'EMAIL',
    value: 'rana.work08@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    link: 'mailto:rana.work08@gmail.com'
  },
  {
    title: 'LINKEDIN',
    value: 'linkedin.com/in/kartikrana',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    link: 'https://linkedin.com/in/kartikrana'
  },
  {
    title: 'BEHANCE',
    value: 'behance.net/kartikrana',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="12" height="6" rx="1"/><path d="M3 7h12c1 0 2 1 2 2v2"/><path d="M3 13h12"/><path d="M11 7h2"/>
      </svg>
    ),
    link: 'https://behance.net/kartikrana'
  },
  {
    title: 'WHATSAPP',
    value: '+91 70489 24873',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14h.8A8.38 8.38 0 0 1 21 11.5Z"/>
      </svg>
    ),
    link: 'https://wa.me/917048924873'
  }
]

export function Contact() {
  const { ref: sectionRef } = useScrollReveal()
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)
  const [isSubmitHovered, setIsSubmitHovered] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  
  // Responsive logic
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])



  const isTablet = windowWidth <= 1024
  const isMobile = windowWidth <= 640

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    // Form handling logic
  }

  // -- Styles --

  const sectionStyle: any = {
    position: 'relative',
    backgroundColor: '#f2ede3',
    padding: theme.spacing['4xl'] + ' 0',
  }

  const innerStyle: any = {
    maxWidth: theme.layout.maxWidth,
    margin: '0 auto',
    padding: `0 ${theme.spacing.xl}`,
  }

  const mainCardStyle: any = {
    background: theme.colors.white,
    borderRadius: isMobile ? '24px' : '40px',
    padding: isMobile ? theme.spacing.xl : isTablet ? theme.spacing['2xl'] : `${theme.spacing['2xl']} ${theme.spacing['4xl']}`,
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.02)',
  }

  const gridStyle: any = {
    display: 'grid',
    gridTemplateColumns: isTablet ? '1fr' : '1.2fr 1fr',
    gap: isTablet ? theme.spacing['4xl'] : theme.spacing['3xl'],
    alignItems: 'start',
  }

  const socialItemStyle = (id: string): any => ({
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    background: theme.colors.white,
    border: `1px solid ${hoveredSocial === id ? theme.colors.accentText : 'rgba(0, 0, 0, 0.06)'}`,
    borderRadius: '20px',
    textDecoration: 'none',
    transition: 'all 0.25s ease',
    transform: hoveredSocial === id ? 'translateX(8px)' : 'none',
  })

  const inputStyle = (id: string): any => ({
    width: '100%',
    padding: '1rem 1.25rem',
    background: focusedField === id ? theme.colors.white : '#F4F4F4',
    border: `1px solid ${focusedField === id ? theme.colors.accentText : 'transparent'}`,
    borderRadius: '14px',
    fontFamily: theme.typography.sans,
    fontSize: '0.9375rem',
    color: theme.colors.textPrimary,
    transition: 'all 0.25s ease',
    outline: 'none',
    boxShadow: focusedField === id ? '0 4px 12px rgba(192, 81, 63, 0.05)' : 'none',
  })

  const submitBtnStyle: any = {
    width: '100%',
    padding: '1.1rem',
    background: isSubmitHovered ? theme.colors.accentHover : theme.colors.accentText,
    color: theme.colors.white,
    fontSize: '1rem',
    fontWeight: 700,
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    transition: 'all 0.25s ease',
    marginTop: theme.spacing.md,
    boxShadow: isSubmitHovered ? '0 15px 30px rgba(192, 81, 63, 0.3)' : '0 10px 20px rgba(192, 81, 63, 0.2)',
    transform: isSubmitHovered ? 'translateY(-2px)' : 'none',
    border: 'none',
    cursor: 'pointer',
  }

  return (
    <section style={sectionStyle} id="contact" ref={sectionRef}>
      <style>{`
        @keyframes contactPulse {
          0% { transform: scale(1); opacity: 0.4; }
          70% { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>

      <div style={innerStyle}>
        {/* Section header */}
        <div 
          className="animate-on-scroll"
          style={{ marginBottom: theme.spacing['2xl'], textAlign: 'center', transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1)' }}
        >

          <span style={{
            display: 'inline-block',
            padding: '0.35rem 1rem',
            background: theme.colors.accentSoft,
            color: theme.colors.accentText,
            fontSize: '0.8125rem',
            fontWeight: 600,
            borderRadius: theme.radius.full,
            marginBottom: theme.spacing.lg,
          }}>Get In Touch</span>
          <h2 style={{
            fontFamily: theme.typography.serif,
            fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: theme.colors.textPrimary,
            margin: 0,
          }}>
            Let's create something together
          </h2>
        </div>

        <div className="animate-on-scroll" style={{ ...mainCardStyle, transitionDelay: '0.15s' }}>

          <div style={gridStyle}>
            {/* Left Column: Contact Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.xl }}>
              <div style={{ marginBottom: theme.spacing.lg }}>
                <h3 style={{ fontSize: isMobile ? '1.75rem' : '2.25rem', fontWeight: 800, color: theme.colors.textPrimary, lineHeight: 1.1, margin: 0, whiteSpace: isTablet ? 'normal' : 'nowrap' }}>
                  I reply to every message.
                </h3>
                <h3 style={{ fontSize: isMobile ? '1.75rem' : '2.25rem', fontWeight: 800, color: theme.colors.accentText, lineHeight: 1.1, margin: 0, whiteSpace: isTablet ? 'normal' : 'nowrap' }}>
                  Don't Hesitate — Reach out.
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.md }}>
                {socialLinks.map((item) => (
                  <a 
                    key={item.title}
                    href={item.link} 
                    style={socialItemStyle(item.title)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredSocial(item.title)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <div style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F4F4F4', borderRadius: '12px', color: theme.colors.textPrimary, marginRight: theme.spacing.md }}>
                      {item.icon}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#999', letterSpacing: '0.1em', marginBottom: '2px' }}>{item.title}</span>
                      <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: theme.colors.textPrimary }}>{item.value}</span>
                    </div>
                    {item.title !== 'WHATSAPP' && (
                      <div style={{ marginLeft: 'auto', color: hoveredSocial === item.title ? theme.colors.accentText : '#DDD', transition: 'color 0.15s ease' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7,7 17,7 17,17"/>
                        </svg>
                      </div>
                    )}
                  </a>
                ))}
              </div>

              <div style={{ display: 'flex', padding: theme.spacing.lg, background: '#E8F3EF', borderRadius: '20px', gap: theme.spacing.md }}>
                <div style={{ paddingTop: '4px' }}>
                  <span style={{ display: 'block', width: '10px', height: '10px', background: '#2D8A4E', borderRadius: '50%', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: '-4px', left: '-4px', right: '-4px', bottom: '-4px', border: '2px solid #2D8A4E', borderRadius: '50%', opacity: 0.4, animation: 'contactPulse 2s infinite' }} />
                  </span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 700, color: '#246B3E', marginBottom: '4px' }}>Currently Available</span>
                  <p style={{ fontSize: '0.8125rem', color: '#3B7E58', lineHeight: 1.5, margin: 0 }}>Open to freelance work, internships, and full-time UI design roles.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div style={{ height: '100%' }}>
              <div style={{ background: '#FDFDFD', borderRadius: '30px', padding: theme.spacing['2xl'], border: '1px solid rgba(0, 0, 0, 0.03)', height: '100%' }}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }} onSubmit={handleSubmit}>
                  {[
                    { label: 'YOUR NAME', type: 'text', placeholder: 'What should I call you?', id: 'name' },
                    { label: 'EMAIL ADDRESS', type: 'email', placeholder: 'your@email.com', id: 'email' },
                  ].map(field => (
                    <div key={field.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#999', letterSpacing: '0.05em' }}>{field.label}</label>
                      <input 
                        type={field.type} 
                        style={inputStyle(field.id)} 
                        placeholder={field.placeholder} 
                        required 
                        onFocus={() => setFocusedField(field.id)}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  ))}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#999', letterSpacing: '0.05em' }}>WHAT'S THIS ABOUT?</label>
                    <div style={{ position: 'relative' }}>
                      <select 
                        style={inputStyle('select')} 
                        required
                        onFocus={() => setFocusedField('select')}
                        onBlur={() => setFocusedField(null)}
                      >
                        <option value="" disabled selected>Select a reason ▾</option>
                        <option value="project">New Project</option>
                        <option value="internship">Internship Enquiry</option>
                        <option value="full-time">Full-time Role</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#999', letterSpacing: '0.05em' }}>MESSAGE</label>
                    <textarea 
                      style={{ ...inputStyle('message'), height: '140px', resize: 'none' }} 
                      placeholder="Tell me about your project or opportunity..." 
                      required
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  <button 
                    type="submit" 
                    style={submitBtnStyle}
                    onMouseEnter={() => setIsSubmitHovered(true)}
                    onMouseLeave={() => setIsSubmitHovered(false)}
                  >
                    Send Message <span style={{ fontSize: '1.25rem' }}>→</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
