import { useState, useEffect, useRef } from 'preact/hooks'
import { theme } from '../theme'

// --- Data ---

const projectMeta = [
  { label: 'ROLE', value: 'UI Designer' },
  { label: 'TYPE', value: 'Collaborative' },
  { label: 'PLATFORM', value: 'Mobile App + Website' },
  { label: 'TOOL', value: 'Figma' },
  { label: 'FOCUS', value: 'EdTech UI' },
]

const problems = [
  'Inconsistent visual hierarchy made scanning difficult',
  'User flow had unnecessary friction between key actions',
  'No clear typographic or spacing system',
  'Mobile experience felt like an afterthought',
]

const processSteps = [
  {
    num: '01',
    title: 'Audit & Observe',
    desc: 'Studied the existing interface screen by screen — noting what felt confusing, visually heavy, or where the flow broke down.',
  },
  {
    num: '02',
    title: 'Define the Problems',
    desc: 'Grouped issues into three categories: visual inconsistency, flow friction, and spacing/layout problems. This gave the design a clear direction.',
  },
  {
    num: '03',
    title: 'Design & Refine',
    desc: 'Applied a consistent type scale, spacing system, and component structure. Built key screens prioritizing clarity and calm over complexity.',
  },
  {
    num: '04',
    title: 'Review & Iterate',
    desc: 'Compared design iterations side-by-side to ensure every change had a reason. Removed anything that didn\'t serve the user.',
  },
]

const improvements = [
  'Established clear visual hierarchy using type scale and weight contrast',
  'Simplified navigation flow — reduced steps to reach core content',
  'Introduced consistent spacing and layout grid across all screens',
  'Redesigned mobile screens with thumb-friendly interaction zones',
  'Applied a clean, minimal color palette suited for long study sessions',
  'Created reusable UI components for visual consistency',
]

const decisions = [
  { decision: 'Minimal color palette', reason: 'Reduces cognitive load during study sessions' },
  { decision: 'Large readable typography', reason: 'Prioritizes accessibility and scan-ability' },
  { decision: 'Bottom navigation on mobile', reason: 'Follows natural thumb reach patterns' },
  { decision: 'Generous white space', reason: 'Lets content breathe, reduces overwhelm' },
  { decision: 'Card-based layout', reason: 'Creates clear content boundaries' },
]

// --- Scroll-reveal hook ---
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}

// --- Animated Section Row ---
function SectionRow({ label, children, delay = 0, isMobile }: { label: string; children: any; delay?: number; isMobile: boolean }) {
  const { ref, visible } = useReveal()

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? theme.spacing.md : theme.spacing['2xl'],
        padding: `${theme.spacing['2xl']} 0`,
        borderTop: '1px solid rgba(224, 213, 204, 0.4)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      <div style={{
        minWidth: isMobile ? 'auto' : '160px',
        flexShrink: 0,
        fontSize: '0.6875rem',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase' as const,
        color: theme.colors.textMuted,
        paddingTop: '4px',
      }}>
        {label}
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  )
}

// --- Main Component ---

export function CaseStudy({ onBack }: { onBack?: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const heroReveal = useReveal()

  // Responsive
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const isMobile = windowWidth <= 768

  return (
    <div
      ref={sectionRef}
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: `0 ${theme.spacing.xl}`,
        fontFamily: theme.typography.sans,
      }}
    >

        {/* Back Button */}
        <button
          onClick={() => onBack?.()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.625rem 1.25rem',
            background: theme.colors.white,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.radius.full,
            fontSize: '0.875rem',
            fontWeight: 600,
            color: theme.colors.textPrimary,
            cursor: 'pointer',
            marginBottom: theme.spacing['2xl'],
            transition: 'all 0.25s ease',
            fontFamily: theme.typography.sans,
          }}
          onMouseEnter={(e: any) => { e.currentTarget.style.background = theme.colors.dark; e.currentTarget.style.color = theme.colors.white; e.currentTarget.style.borderColor = theme.colors.dark }}
          onMouseLeave={(e: any) => { e.currentTarget.style.background = theme.colors.white; e.currentTarget.style.color = theme.colors.textPrimary; e.currentTarget.style.borderColor = theme.colors.border }}
        >
          <span style={{ transition: 'transform 0.2s ease', display: 'inline-block' }}>←</span> Back to Projects
        </button>

        {/* --- HERO --- */}
        <div
          ref={heroReveal.ref}
          style={{
            marginBottom: theme.spacing['2xl'],
            opacity: heroReveal.visible ? 1 : 0,
            transform: heroReveal.visible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: theme.spacing.md, marginBottom: theme.spacing.sm }}>
            <span style={{
              fontFamily: theme.typography.serif,
              fontSize: 'clamp(3rem, 5vw, 4.5rem)',
              fontWeight: 400,
              color: 'rgba(192, 81, 63, 0.15)',
              lineHeight: 1,
            }}>01</span>
            <h2 style={{
              fontFamily: theme.typography.serif,
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              fontWeight: 400,
              color: theme.colors.textPrimary,
              margin: 0,
              letterSpacing: '-0.02em',
            }}>Virtual Library</h2>
          </div>
          <p style={{
            fontSize: '1.0625rem',
            color: theme.colors.textSecondary,
            lineHeight: 1.6,
            margin: 0,
            maxWidth: '600px',
          }}>
            Redesigning the way students learn online — from functional to frictionless.
          </p>
        </div>

        {/* --- META BAR --- */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : `repeat(${projectMeta.length}, 1fr)`,
            background: theme.colors.white,
            borderRadius: '14px',
            border: '1px solid rgba(224, 213, 204, 0.5)',
            overflow: 'hidden',
            marginBottom: theme.spacing.md,
            opacity: heroReveal.visible ? 1 : 0,
            transform: heroReveal.visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.15s',
          }}
        >
          {projectMeta.map((meta, i) => (
            <div key={i} style={{
              padding: '1rem 1.25rem',
              borderRight: (i < projectMeta.length - 1 && !isMobile) ? '1px solid rgba(224, 213, 204, 0.4)' : 'none',
              borderBottom: isMobile ? '1px solid rgba(224, 213, 204, 0.4)' : 'none',
            }}>
              <div style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: theme.colors.textMuted, marginBottom: '6px' }}>
                {meta.label}
              </div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: theme.colors.textPrimary }}>
                {meta.value}
              </div>
            </div>
          ))}
        </div>

        {/* --- OVERVIEW --- */}
        <SectionRow label="Overview" isMobile={isMobile}>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: theme.colors.textPrimary, margin: 0 }}>
            Virtual Library is a tutoring platform designed to connect students with learning resources and educators. This project focused on designing a clean, structured UI that creates an intuitive learning experience across both a mobile app and website.
          </p>
        </SectionRow>

        {/* --- PROBLEM --- */}
        <SectionRow label="Problem" delay={0.05} isMobile={isMobile}>
          <div>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: theme.colors.textPrimary, margin: `0 0 ${theme.spacing.lg} 0` }}>
              The existing interface was built code-first — functional, but visually rough and difficult to navigate. Learners had to work harder than necessary to find content, understand where they were, or move between key sections.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px' }}>
              {problems.map((p, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '1rem 1.25rem',
                  background: 'rgba(253, 236, 236, 0.4)',
                  border: '1px solid rgba(192, 81, 63, 0.1)',
                  borderRadius: '12px',
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'rgba(192, 81, 63, 0.12)',
                    color: theme.colors.accent,
                    fontSize: '0.6rem',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}>✕</span>
                  <span style={{ fontSize: '0.875rem', lineHeight: 1.6, color: theme.colors.textPrimary }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionRow>

        {/* --- MY ROLE --- */}
        <SectionRow label="My Role" delay={0.05} isMobile={isMobile}>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.8, color: theme.colors.textPrimary, margin: 0 }}>
            I was responsible for the complete UI design of the platform — from layout structure and visual hierarchy to user flow and component design. The project was collaborative in nature, with development and technical implementation handled separately.
          </p>
        </SectionRow>

        {/* --- PROCESS --- */}
        <SectionRow label="Process" delay={0.05} isMobile={isMobile}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.lg }}>
            {processSteps.map((step) => (
              <div key={step.num} style={{ display: 'flex', alignItems: 'flex-start', gap: theme.spacing.md }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: theme.colors.accent,
                  color: theme.colors.white,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {step.num}
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: theme.colors.textPrimary, margin: '0 0 4px 0' }}>{step.title}</h4>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: theme.colors.textSecondary, margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionRow>

        {/* --- KEY UI IMPROVEMENTS --- */}
        <SectionRow label="Key UI Improvements" delay={0.05} isMobile={isMobile}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px' }}>
            {improvements.map((imp, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '1rem 1.25rem',
                background: 'rgba(230, 244, 234, 0.5)',
                border: '1px solid rgba(45, 138, 78, 0.12)',
                borderRadius: '12px',
              }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'rgba(45, 138, 78, 0.12)',
                  color: theme.colors.green,
                  fontSize: '0.7rem',
                  flexShrink: 0,
                  marginTop: '2px',
                }}>✓</span>
                <span style={{ fontSize: '0.875rem', lineHeight: 1.6, color: theme.colors.textPrimary }}>{imp}</span>
              </div>
            ))}
          </div>
        </SectionRow>

        {/* --- DESIGN DECISIONS --- */}
        <SectionRow label="Design Decisions" delay={0.05} isMobile={isMobile}>
          <div style={{
            borderRadius: '14px',
            overflow: 'hidden',
            border: '1px solid rgba(224, 213, 204, 0.5)',
          }}>
            {/* Table Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.2fr',
              background: theme.colors.dark,
              padding: '0.875rem 1.25rem',
            }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: theme.colors.white }}>Decision</span>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: theme.colors.white }}>Reason</span>
            </div>
            {/* Table Rows */}
            {decisions.map((row, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.2fr',
                padding: '0.875rem 1.25rem',
                borderBottom: i < decisions.length - 1 ? '1px solid rgba(224, 213, 204, 0.3)' : 'none',
                background: theme.colors.white,
              }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: theme.colors.textPrimary }}>{row.decision}</span>
                <span style={{ fontSize: '0.875rem', color: theme.colors.textSecondary, lineHeight: 1.5 }}>{row.reason}</span>
              </div>
            ))}
          </div>
        </SectionRow>

        {/* --- OUTCOME --- */}
        <SectionRow label="Outcome" delay={0.05} isMobile={isMobile}>
          <div style={{
            background: 'rgba(192, 81, 63, 0.06)',
            border: '1.5px solid rgba(192, 81, 63, 0.15)',
            borderRadius: '16px',
            padding: '2rem',
          }}>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: theme.colors.textPrimary, margin: 0, fontStyle: 'italic' }}>
              The designed interface transforms Virtual Library from a rough, code-first platform into a calm, organized learning environment. Students can now navigate with less friction, find content faster, and spend more mental energy on learning — not figuring out the UI.
            </p>
          </div>
        </SectionRow>

        {/* --- LIVE PROJECT --- */}
        <SectionRow label="Live Project" delay={0.05} isMobile={isMobile}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: theme.colors.white,
            borderRadius: '14px',
            border: '1px solid rgba(224, 213, 204, 0.5)',
            padding: '1.25rem 1.5rem',
            flexWrap: 'wrap',
            gap: theme.spacing.md,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(192, 81, 63, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.colors.accent,
                fontSize: '1.1rem',
              }}>↗</div>
              <div>
                <div style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: theme.colors.textMuted }}>APP LINK</div>
                <div style={{ fontSize: '0.875rem', color: theme.colors.textSecondary }}>Paste your app link here</div>
              </div>
            </div>
            <a
              href="#"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0.75rem 1.5rem',
                background: theme.colors.dark,
                color: theme.colors.white,
                borderRadius: theme.radius.full,
                fontSize: '0.875rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e: any) => e.currentTarget.style.background = '#333'}
              onMouseLeave={(e: any) => e.currentTarget.style.background = theme.colors.dark}
            >
              Visit <span>→</span>
            </a>
          </div>
        </SectionRow>

    </div>
  )
}
