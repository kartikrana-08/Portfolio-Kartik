import { useState, useEffect } from 'preact/hooks'

import { Marquee } from './components/Marquee'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { FeaturedWork } from './components/FeaturedWork'
import { CaseStudy } from './components/CaseStudyModal'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Process } from './components/Process'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { theme } from './theme'
import { useScrollReveal } from './hooks/useScrollReveal'
import { GuestCursor } from './components/GuestCursor'



export function App() {
  const [showCaseStudy, setShowCaseStudy] = useState(false)
  const [pixelPos, setPixelPos] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const { ref: workSectionRef } = useScrollReveal()


  // Ensure website starts from the Hero section on reload
  useEffect(() => {
    // Small delay to ensure browser doesn't override with saved scroll position
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 10)

    const handleMouseMove = (e: MouseEvent) => {
      setPixelPos({ x: e.clientX, y: e.clientY })
      const target = e.target as HTMLElement
      const isClickable = target.closest('a, button, [role="button"], input, select, textarea')
      setIsPointer(!!isClickable)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])




  const handleViewCaseStudy = () => {
    setShowCaseStudy(true)
    requestAnimationFrame(() => {
      const el = document.getElementById('work')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    })
  }

  const handleBackToProjects = () => {
    setShowCaseStudy(false)
    requestAnimationFrame(() => {
      const el = document.getElementById('work')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <div style={{ backgroundColor: theme.colors.bg, minHeight: '100vh', fontFamily: theme.typography.sans }}>
      <GuestCursor x={pixelPos.x} y={pixelPos.y} isPointer={isPointer} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          cursor: none !important;
        }

        html {
          scroll-behavior: smooth;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        body {
          margin: 0;
          background-color: ${theme.colors.bg};
          color: ${theme.colors.textPrimary};
          line-height: 1.6;
          overflow-x: hidden;
        }

        a, a:hover, a:visited, a:active {
          text-decoration: none !important;
          color: inherit;
        }

        button {
          cursor: pointer;
          border: none;
          background: none;
          font-family: inherit;
        }

        ul, ol {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        ::selection {
          background: ${theme.colors.accent};
          color: ${theme.colors.white};
        }

        /* Webkit scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.colors.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.colors.border}; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: ${theme.colors.textMuted}; }
      `}</style>

      <Navbar />
      <main>
        <Hero />
        <div style={{ position: 'relative', height: '36px', zIndex: 10 }}>
          <Marquee />
        </div>

        {/* Featured Work Section — header always visible */}
        <section id="work" ref={workSectionRef} style={{ position: 'relative', backgroundColor: theme.colors.bg, padding: `${theme.spacing['4xl']} 0` }}>
          <div style={{ maxWidth: theme.layout.maxWidth, margin: '0 auto', padding: `0 ${theme.spacing.xl}` }}>
            {/* Always-visible header */}
            <div className="animate-on-scroll" style={{ marginBottom: theme.spacing['2xl'] }}>

              <span style={{
                display: 'inline-block',
                padding: '0.35rem 1rem',
                background: theme.colors.accent,
                color: theme.colors.white,
                fontSize: '0.8125rem',
                fontWeight: 600,
                borderRadius: theme.radius.full,
                marginBottom: theme.spacing.lg,
              }}>Featured Work</span>
              <h2 style={{
                fontFamily: theme.typography.serif,
                fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: theme.colors.textPrimary,
                margin: 0,
              }}>
                One project<br />
                Designed with intent
              </h2>
            </div>
          </div>

          {/* Swap between project card and case study */}
          <div className="animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            {showCaseStudy ? (
              <CaseStudy onBack={handleBackToProjects} />
            ) : (
              <FeaturedWork onViewCaseStudy={handleViewCaseStudy} />
            )}
          </div>

        </section>

        <About />
        <Skills />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
