import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowRight, ExternalLink, Code2, Sparkles } from 'lucide-react'
import Spline from '@splinetool/react-spline'

function SectionHeader({ kicker, title, subtitle }) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-12">
      <p className="uppercase tracking-widest text-xs text-blue-600 font-semibold mb-2">{kicker}</p>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
    </div>
  )
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 text-xs font-medium">
      <Sparkles size={14} /> {children}
    </span>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    const onScroll = () => {
      const header = document.getElementById('site-header')
      if (!header) return
      if (window.scrollY > 10) header.classList.add('backdrop-blur', 'bg-white/70', 'shadow-sm')
      else header.classList.remove('backdrop-blur', 'bg-white/70', 'shadow-sm')
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <div className="min-h-screen bg-white text-gray-900" id="home">
      {/* Navbar */}
      <header id="site-header" className="fixed top-0 left-0 right-0 z-50 transition-all">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#home" className="font-semibold text-lg tracking-tight">
            <span className="text-gray-900">Sahil</span>
            <span className="text-blue-600">.Ali</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-gray-700 hover:text-blue-600 transition-colors">
                {item.label}
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href="mailto:sahil@example.com" className="p-2 hover:bg-blue-50 rounded-full text-gray-700 hover:text-blue-600 transition" aria-label="Email">
              <Mail size={18} />
            </a>
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="p-2 hover:bg-blue-50 rounded-full text-gray-700 hover:text-blue-600 transition" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="p-2 hover:bg-blue-50 rounded-full text-gray-700 hover:text-blue-600 transition" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
          <button className="md:hidden p-2 rounded hover:bg-gray-100" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </nav>
        {menuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-center">
          <motion.div variants={heroVariants} initial="hidden" animate="show" className="py-10">
            <Badge>Full Stack Developer</Badge>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Hi, I'm <span className="text-blue-600">Sahil Ali</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl">
              I build modern, scalable web apps end‑to‑end. I’m a BCA graduate who loves crafting delightful UIs, robust APIs, and smooth developer experiences.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg transition-colors">
                View Projects <ArrowRight size={18} />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-5 py-3 rounded-lg transition-colors">
                Contact Me <Mail size={18} />
              </a>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2"><Code2 size={16} className="text-blue-600"/> MERN, Next.js, Node, FastAPI</div>
              <div className="hidden sm:block w-px h-4 bg-gray-300"/>
              <div>Open to freelance & full‑time roles</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative h-[420px] sm:h-[520px] lg:h-[560px] rounded-2xl overflow-hidden shadow-xl">
            <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-20 sm:py-24 bg-gradient-to-b from-white to-blue-50/50">
        <SectionHeader kicker="About" title="A bit about me" subtitle="Developer focused on clean code, DX, and product impact" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-xl font-semibold mb-2">Background</h3>
            <p className="text-gray-600">I'm a BCA graduate with a passion for full‑stack development. I enjoy working across the stack—from crafting interactive frontends to building reliable, secure backends.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="bg-white rounded-xl p-6 shadow-sm border">
            <h3 className="text-xl font-semibold mb-2">What I value</h3>
            <p className="text-gray-600">Clean architecture, accessible UX, performance, and maintainability. I love building with modern tools and adding playful touches with motion and 3D.</p>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 sm:py-24">
        <SectionHeader kicker="Skills" title="Technologies I work with" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Frontend', items: ['React', 'Next.js', 'Tailwind', 'Framer Motion'] },
            { title: 'Backend', items: ['Node.js', 'Express', 'FastAPI', 'MongoDB'] },
            { title: 'Tools', items: ['Git', 'Docker', 'Vite', 'Postman'] },
            { title: 'Others', items: ['REST APIs', 'Auth', 'Testing', 'CI/CD'] },
          ].map((card, idx) => (
            <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.05 }} className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="font-semibold mb-3">{card.title}</h3>
              <div className="flex flex-wrap gap-2">
                {card.items.map((chip) => (
                  <span key={chip} className="px-3 py-1 rounded-full bg-gray-50 border text-sm text-gray-700">{chip}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 sm:py-24 bg-gradient-to-b from-blue-50/50 to-white">
        <SectionHeader kicker="Projects" title="Selected work" subtitle="A snapshot of things I've built and shipped" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'Interactive Portfolio',
              desc: 'Modern portfolio with 3D hero, motion, and responsive design.',
              tech: ['React', 'Spline', 'Tailwind'],
              link: '#',
            },
            {
              title: 'Task Manager API',
              desc: 'JWT-authenticated API with filtering, pagination, and testing.',
              tech: ['FastAPI', 'MongoDB', 'PyTest'],
              link: '#',
            },
            {
              title: 'E-commerce UI',
              desc: 'Accessible storefront with product cards, cart, and checkout flow.',
              tech: ['Next.js', 'Stripe', 'Tailwind'],
              link: '#',
            },
            {
              title: 'Real-time Chat',
              desc: 'Websocket chat with typing indicators and message reactions.',
              tech: ['Node', 'Socket.IO', 'Redis'],
              link: '#',
            },
          ].map((p, i) => (
            <motion.a key={p.title} href={p.link} target={p.link.startsWith('http') ? '_blank' : undefined} rel={p.link.startsWith('http') ? 'noreferrer' : undefined} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }} className="group block bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">{p.title}</h3>
                <ExternalLink size={18} className="text-gray-400 group-hover:text-blue-600 transition-colors"/>
              </div>
              <p className="mt-2 text-gray-600">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full bg-gray-50 border text-xs text-gray-700">{t}</span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 sm:py-24">
        <SectionHeader kicker="Contact" title="Let’s build something great" subtitle="I’m available for freelance and full‑time opportunities" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="mailto:sahil@example.com" className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg transition-colors">
                <Mail size={18}/> Email Me
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-5 py-3 rounded-lg transition-colors">
                <Linkedin size={18}/> LinkedIn
              </a>
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-5 py-3 rounded-lg transition-colors sm:col-span-2">
                <Github size={18}/> GitHub
              </a>
            </div>
            <p className="mt-4 text-center text-sm text-gray-600">Prefer a quick chat? Reach out and I’ll get back within 24 hours.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Sahil Ali. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <a href="#home" className="hover:text-blue-600">Back to top</a>
            <a href="/test" className="hover:text-blue-600">System Check</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
