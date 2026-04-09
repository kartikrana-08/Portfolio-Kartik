import { lazy, Suspense } from 'preact/compat'
import { useState, useEffect } from 'preact/hooks'
import { useScrollReveal } from './hooks/useScrollReveal'

import { Marquee } from './components/Marquee'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Footer } from './components/Footer'
import { theme } from './theme'
import { GuestCursor } from './components/GuestCursor'
import { SectionFallback } from './components/SectionFallback'

const FeaturedWork = lazy(() => import('./components/FeaturedWork').then(m => ({ default: m.FeaturedWork })))
const CaseStudy = lazy(() => import('./components/CaseStudyModal').then(m => ({ default: m.CaseStudy })))
const About = lazy(() => import('./components/About').then(m => ({ default: m.About })))
const Skills = lazy(() => import('./components/Skills').then(m => ({ default: m.Skills })))
const Process = lazy(() => import('./components/Process').then(m => ({ default: m.Process })))
const Contact = lazy(() => import('./components/Contact').then(m => ({ default: m.Contact })))



export function App() {
  const [showCaseStudy, setShowCaseStudy] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const { ref: workSectionRef } = useScrollReveal()


  // Ensure website starts from the Hero section on reload
  useEffect(() => {
    // Initialize mouse variables off-screen
    document.documentElement.style.setProperty('--mouse-x', '-100px')
    document.documentElement.style.setProperty('--mouse-y', '-100px')

    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 10)

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
      
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
      <GuestCursor isPointer={isPointer} />

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
                fontSize: '48px',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: theme.colors.textPrimary,
                margin: 0,
              }}>
                Projects built<br />
                with purpose.
              </h2>
            </div>
          </div>

          {/* Swap between project card and case study */}
          <div className="animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
            <Suspense fallback={<SectionFallback />}>
              {showCaseStudy ? (
                <div className="case-study-enter">
                  <CaseStudy onBack={handleBackToProjects} />
                </div>
              ) : (
                <FeaturedWork onViewCaseStudy={handleViewCaseStudy} />
              )}
            </Suspense>
          </div>

        </section>

        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Process />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
