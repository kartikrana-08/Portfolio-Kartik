import './FeaturedWork.css'

export function FeaturedWork() {
  return (
    <section class="featured" id="work">
      <div class="featured__inner container">
        {/* Section header */}
        <div class="featured__header">
          <span class="featured__badge">Featured Work</span>
          <h2 class="featured__title">
            One project.
            <br />
            Designed with intent.
          </h2>
        </div>

        {/* Project card */}
        <div class="featured__card">
          <div class="featured__card-accent" />
          <div class="featured__card-inner">
            {/* Left - Info */}
            <div class="featured__card-info">
              <span class="featured__card-number">01</span>
              <h3 class="featured__card-title">Virtual Library</h3>
              <p class="featured__card-desc">
                Redesigning the way students learn online. A UI design
                project for an educational tutoring platform — mobile app
                and website.
              </p>
              <div class="featured__card-tags">
                <span class="featured__tag">UI Design</span>
                <span class="featured__tag">Figma</span>
                <span class="featured__tag">Mobile + Web</span>
                <span class="featured__tag">EdTech</span>
              </div>
              <a href="#" class="featured__card-btn">
                View Case Study <span>→</span>
              </a>
            </div>

            {/* Right - Mockup visuals */}
            <div class="featured__card-visual">
              {/* Desktop mockup */}
              <div class="featured__mockup-desktop">
                <div class="fmock-header">
                  <span class="fmock-dot" />
                  <span class="fmock-dot" />
                  <span class="fmock-dot" />
                </div>
                <div class="fmock-body">
                  <div class="fmock-line fmock-line--full" />
                  <div class="fmock-line fmock-line--medium" />
                  <div class="fmock-block-row">
                    <div class="fmock-block" />
                    <div class="fmock-block" />
                  </div>
                  <div class="fmock-line fmock-line--long" />
                  <div class="fmock-line fmock-line--short" />
                </div>
              </div>

              {/* Phone mockup */}
              <div class="featured__mockup-phone">
                <div class="fphone-notch" />
                <div class="fphone-body">
                  <div class="fphone-dots">
                    <span class="fphone-dot" />
                    <span class="fphone-dot" />
                    <span class="fphone-dot" />
                  </div>
                  <div class="fphone-line fphone-line--full" />
                  <div class="fphone-block" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
