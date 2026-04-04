import './app.css'
import { Marquee } from './components/Marquee'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { FeaturedWork } from './components/FeaturedWork'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Process } from './components/Process'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* Marquee divider between hero and featured work */}
        <div class="section-divider-marquee">
          <Marquee />
        </div>
        <FeaturedWork />
        <About />
        <Skills />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
