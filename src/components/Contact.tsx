import { useState, useEffect } from 'preact/hooks'
import { theme } from '../theme'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useIsMobile } from '../hooks/useIsMobile'


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
    title: 'DRIBBBLE',
    value: 'dribbble.com/rana-work08',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm7.65 6.2c-.75-.54-2.22-.88-4.16-.76-1.52.09-3.23.49-4.8 1.13A17.9 17.9 0 0 1 9.42 4.44a8 8 0 0 1 8.52 3.65c-.1-.03-.2-.06-.29-.09zM4.1 10.39c.65-.24 1.84-.45 3.33-.49 1.18-.03 2.45.1 3.73.37-1.12 3.03-2.6 5.56-4.13 7.15A8 8 0 0 1 4.1 10.39zm9.58 9.38c.98-1.55 1.95-3.87 2.65-6.59 1.54.49 2.76 1.34 3.32 2.22a8.04 8.04 0 0 1-5.97 4.37zm3.18-8.24c-.58-.8-1.74-1.59-3.22-2.07 1.48-.61 3.02-.98 4.42-1.07a8 8 0 0 1 1.42 6.16c-.52-.8-1.53-2.07-2.62-3.02zM12 4c.67 0 1.31.08 1.93.24a16 16 0 0 0-2.8 3.75 16.3 16.3 0 0 0-3.3-3.6C8.88 4.13 10.38 4 12 4zm-4.32.96c.64.67 1.5 1.76 2.37 3.09-1.28.32-2.61.85-3.83 1.58A16 16 0 0 0 7.68 4.96z"/>
      </svg>
    ),
    link: 'https://dribbble.com/rana-work08'
  },
  {
    title: 'WHATSAPP',
    value: '+91 70489 24873',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
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

  
  const { windowWidth, isMobile } = useIsMobile()
  const isTablet = windowWidth <= 1024

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
            fontSize: '48px',
            fontWeight: 700,
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
                <h3 style={{ fontFamily: theme.typography.serif, fontSize: isMobile ? '1.75rem' : '2.25rem', fontWeight: 600, color: theme.colors.textPrimary, lineHeight: 1.1, margin: 0, whiteSpace: isTablet ? 'normal' : 'nowrap' }}>
                  I reply to every message.
                </h3>
                <h3 style={{ fontFamily: theme.typography.serif, fontSize: isMobile ? '1.75rem' : '2.25rem', fontWeight: 600, color: theme.colors.accentText, lineHeight: 1.1, margin: 0, whiteSpace: isTablet ? 'normal' : 'nowrap' }}>
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
