import './Hero.css'

export function Hero() {
  return (
    <section class="hero" id="hero">
      <div class="hero__inner container">
        {/* Left Content */}
        <div class="hero__content">
          <div class="hero__badge">
            <span class="hero__badge-dot" />
            <span class="hero__badge-icon">✦</span>
            <span>Available for opportunities</span>
          </div>

          <h1 class="hero__title">
            Crafting interfaces
            <br />
            <span class="hero__title-accent">people enjoy</span>
            <br />
            using.
          </h1>

          <p class="hero__subtitle">
            I'm Kartik Rana — a UI Designer turning cluttered screens
            into calm, intuitive experiences.
          </p>

          <div class="hero__actions">
            <a href="#work" class="hero__btn hero__btn--primary">
              See My Work
            </a>
            <a href="#about" class="hero__btn hero__btn--secondary">
              About Me <span>→</span>
            </a>
          </div>
        </div>

        {/* Right Visual */}
        <div class="hero__visual">
          {/* Floating tags */}
          <div class="hero__float-tag hero__float-tag--clean">
            <span class="hero__float-icon">✦</span> Clean UI
          </div>
          <div class="hero__float-tag hero__float-tag--mobile">
            Mobile + Web
          </div>
          <div class="hero__float-tag hero__float-tag--figma">
            Figma
          </div>

          {/* Main mockup card - Virtual Library with sidebar */}
          <div class="hero__mockup">
            <div class="hero__mockup-header">
              <div class="hero__mockup-dots">
                <span class="dot dot--red" />
                <span class="dot dot--yellow" />
                <span class="dot dot--green" />
              </div>
              <span class="hero__mockup-title">Virtual Library</span>
            </div>
            <div class="hero__mockup-layout">
              {/* Left sidebar */}
              <div class="hero__mockup-sidebar">
                <div class="sidebar-line sidebar-line--long" />
                <div class="sidebar-line sidebar-line--medium" />
                <div class="sidebar-line sidebar-line--short" />
                <div class="sidebar-line sidebar-line--long" />
                <div class="sidebar-line sidebar-line--medium" />
              </div>
              {/* Main content */}
              <div class="hero__mockup-content">
                {/* Top row - 3 cards */}
                <div class="mockup-content__row">
                  <div class="mockup-content__card" />
                  <div class="mockup-content__card" />
                  <div class="mockup-content__card" />
                </div>
                {/* Bottom row - 3 cards */}
                <div class="mockup-content__row">
                  <div class="mockup-content__card" />
                  <div class="mockup-content__card" />
                  <div class="mockup-content__card" />
                </div>
                {/* Lines below */}
                <div class="mockup-content__lines">
                  <div class="content-line content-line--full" />
                  <div class="content-line content-line--medium" />
                </div>
              </div>
            </div>
          </div>

          {/* Phone mockup overlapping bottom-right */}
          <div class="hero__phone">
            <div class="hero__phone-notch" />
            <div class="hero__phone-screen">
              {/* Status bar */}
              <div class="phone-status">
                <span class="phone-status__time">9:41</span>
                <div class="phone-status__icons">
                  <span class="phone-status__bar" />
                  <span class="phone-status__bar" />
                  <span class="phone-status__bar" />
                </div>
              </div>
              {/* App content */}
              <div class="phone-content">
                <div class="phone-content__header-line" />
                <div class="phone-content__subline" />
                <div class="phone-content__card-row">
                  <div class="phone-content__card" />
                  <div class="phone-content__card" />
                </div>
                <div class="phone-content__line-long" />
                <div class="phone-content__line-short" />
              </div>
            </div>
            <div class="hero__phone-home" />
          </div>
          {/* Label below phone */}
          <div class="hero__mockup-label">
            UI DESIGN · FIGMA
          </div>
        </div>
      </div>

      {/* Background gradient orb */}
      <div class="hero__bg-orb" />
    </section>
  )
}
