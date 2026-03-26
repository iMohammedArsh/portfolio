import { HelmetProvider, Helmet } from 'react-helmet-async'
import CustomCursor from './components/CustomCursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Values from './components/Values'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <html lang="en" />
        <meta name="theme-color" content="#F5F4F0" />
      </Helmet>

      <CustomCursor />
      <Nav />

      <main>
        <Hero />
        <Values />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </HelmetProvider>
  )
}
