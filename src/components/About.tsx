import { useEffect, useRef } from 'preact/hooks'
import './About.css'

export function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('about--visible')
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section class="about" id="about" ref={sectionRef}>
      <div class="about__inner container">
        {/* Left - Text content */}
        <div class="about__content">

          <p class="about__para about__para--1">
            I'm Kartik — a UI designer who came to design through curiosity, not a
            conventional path. I study Commerce, but somewhere between spreadsheets
            and textbooks, I got obsessed with something else: why do some apps feel
            effortless while others just frustrate you?
          </p>

          <p class="about__para about__para--2">
            That question pulled me into UI design. And honestly? I think my background
            helps. I naturally think about users as people with goals, not just screens to fill.
            Design, to me, is about removing obstacles — not adding decoration.
          </p>

          <p class="about__para about__para--3">
            I work in Figma, focusing on mobile and web interfaces. My process is
            straightforward: understand the problem, simplify the flow, make every visual
            choice intentional. I'm early in my career but serious about the craft.
          </p>

          <p class="about__para about__para--4">
            If you're looking for someone who shows up thoughtful, stays minimal, and
            genuinely cares about the end user — let's talk.
          </p>

          <div class="about__btn-wrap">
            <a href="#contact" class="about__btn">
              Get In Touch <span>→</span>
            </a>
          </div>
        </div>

        {/* Right - Info cards + quote */}
        <div class="about__sidebar">
          <div class="about__info-stack">
            <div class="about__info-card">
              <span class="about__info-label">CURRENTLY</span>
              <span class="about__info-value">
                Open to opportunities
                <span class="about__pulse-wrap">
                  <span class="about__green-dot" />
                  <span class="about__green-ring" />
                </span>
              </span>
            </div>
            <div class="about__info-card">
              <span class="about__info-label">BASED IN</span>
              <span class="about__info-value">India 🇮🇳</span>
            </div>
            <div class="about__info-card">
              <span class="about__info-label">BACKGROUND</span>
              <span class="about__info-value">Commerce → UI Design</span>
            </div>
            <div class="about__info-card">
              <span class="about__info-label">LOOKING FOR</span>
              <span class="about__info-value">Freelance · Internship · Full-time</span>
            </div>
          </div>

          <div class="about__quote">
            <span class="about__quote-mark">❝</span>
            <p class="about__quote-text">
              Designing interfaces that get out of the user's way.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
