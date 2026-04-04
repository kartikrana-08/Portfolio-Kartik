import './Footer.css'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer class="footer">
      <div class="footer__inner container">
        <div class="footer__grid">
          {/* Logo & Info */}
          <div class="footer__col footer__col--brand">
            <h2 class="footer__logo">KR.</h2>
            <p class="footer__brand-text">Kartik Rana · UI Designer</p>
          </div>

          {/* Links Column 1 */}
          <div class="footer__col">
            <ul class="footer__list">
              <li><a href="#work" class="footer__link">My Portfolio</a></li>
              <li><a href="https://dribbble.com/kartikrana" class="footer__link" target="_blank">Dribbble <span class="footer__link-arrow">↗</span></a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div class="footer__col">
            <ul class="footer__list">
              <li><a href="tel:+917048924873" class="footer__link">+91 70489 24873</a></li>
              <li><a href="https://instagram.com/kartikrana" class="footer__link" target="_blank">Instagram <span class="footer__link-arrow">↗</span></a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div class="footer__col">
            <ul class="footer__list">
              <li><a href="mailto:rana.work08@gmail.com" class="footer__link">rana.work08@gmail.com</a></li>
              <li><a href="https://linkedin.com/in/kartikrana" class="footer__link" target="_blank">LinkedIn <span class="footer__link-arrow">↗</span></a></li>
            </ul>
          </div>
        </div>

        <div class="footer__bottom">
          <p class="footer__copyright">© {currentYear} Kartik Rana. Designed with intent.</p>
        </div>
      </div>
    </footer>
  )
}
