import './Contact.css'

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
  const handleSubmit = (e: Event) => {
    e.preventDefault()
    // Form handling logic or submission indication
  }

  return (
    <section class="contact" id="contact">
      <div class="contact__inner container">
        <div class="contact__main-card">
          <div class="contact__grid">
            {/* Left Column: Contact Links */}
            <div class="contact__links-col">
              <div class="contact__intro">
                <h3 class="contact__sub">I reply to every message.</h3>
                <h3 class="contact__sub-accent">Don't Hesitate — Reach out.</h3>
              </div>

              <div class="contact__list">
                {socialLinks.map((item) => (
                  <a href={item.link} class="contact__item" target="_blank" rel="noopener noreferrer">
                    <div class="contact__item-icon-box">
                      {item.icon}
                    </div>
                    <div class="contact__item-info">
                      <span class="contact__item-label">{item.title}</span>
                      <span class="contact__item-value">{item.value}</span>
                    </div>
                    {item.title !== 'WHATSAPP' && (
                      <div class="contact__item-arrow">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7,7 17,7 17,17"/>
                        </svg>
                      </div>
                    )}
                  </a>
                ))}
              </div>

              <div class="contact__status-card">
                <div class="contact__status-dot-box">
                  <span class="contact__status-dot"></span>
                </div>
                <div class="contact__status-info">
                  <span class="contact__status-label">Currently Available</span>
                  <p class="contact__status-text">Open to freelance work, internships, and full-time UI design roles.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div class="contact__form-col">
              <div class="contact__form-card">
                <form class="contact__form" onSubmit={handleSubmit}>
                  <div class="contact__field">
                    <label class="contact__label">YOUR NAME</label>
                    <input type="text" class="contact__input" placeholder="What should I call you?" required />
                  </div>

                  <div class="contact__field">
                    <label class="contact__label">EMAIL ADDRESS</label>
                    <input type="email" class="contact__input" placeholder="your@email.com" required />
                  </div>

                  <div class="contact__field">
                    <label class="contact__label">WHAT'S THIS ABOUT?</label>
                    <div class="contact__select-wrapper">
                      <select class="contact__select" required>
                        <option value="" disabled selected>Select a reason ▾</option>
                        <option value="project">New Project</option>
                        <option value="internship">Internship Enquiry</option>
                        <option value="full-time">Full-time Role</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div class="contact__field">
                    <label class="contact__label">MESSAGE</label>
                    <textarea class="contact__textarea" placeholder="Tell me about your project or opportunity..." required></textarea>
                  </div>

                  <button type="submit" class="contact__submit">
                    Send Message <span class="contact__submit-arrow">→</span>
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
