import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, ArrowRight, ExternalLink, Code2, Sparkles, ChevronUp, Sun, Moon } from 'lucide-react'
import Spline from '@splinetool/react-spline'
import Loader from './components/Loader'

function SectionHeader({ kicker, title, subtitle }) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-12">
      <p className="uppercase tracking-widest text-xs text-blue-600 dark:text-brand-300 font-semibold mb-2">{kicker}</p>
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      {subtitle && <p className="text-gray-600 dark:text-gray-300">{subtitle}</p>}
    </div>
  )
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-brand-900/40 text-blue-700 dark:text-brand-200 border border-blue-200 dark:border-brand-800 px-3 py-1 text-xs font-medium">
      <Sparkles size={14} /> {children}
    </span>
  )
}

const SITE = {
  name: 'Sahil Ali',
  email: 'sahil@example.com',
  github: 'https://github.com/',
  linkedin: 'https://linkedin.com/',
  resumeUrl: '/resume.pdf', // Drop your resume.pdf into public/ to enable
  projects: [
    {
      title: 'Interactive Portfolio',
      desc: 'Modern portfolio with 3D hero, motion, and responsive design.',
      tech: ['React', 'Spline', 'Tailwind'],
      link: '#',
      image: 'https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: 'Task Manager API',
      desc: 'JWT-authenticated API with filtering, pagination, and testing.',
      tech: ['FastAPI', 'MongoDB', 'PyTest'],
      link: '#',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: 'E-commerce UI',
      desc: 'Accessible storefront with product cards, cart, and checkout flow.',
      tech: ['Next.js', 'Stripe', 'Tailwind'],
      link: '#',
      image: 'https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?q=80&w=1200&auto=format&fit=crop'
    },
    {
      title: 'Real-time Chat',
      desc: 'Websocket chat with typing indicators and message reactions.',
      tech: ['Node', 'Socket.IO', 'Redis'],
      link: '#',
      image: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=1200&auto=format&fit=crop'
    },
  ],
  // Optional: Add a secondary Spline scene for an extra 3D object
  // Provide your own Spline URL to show your photo/object as 3D
  secondarySpline: import.meta.env.VITE_SPLINE_SECOND || ''
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showToTop, setShowToTop] = useState(false)
  const [theme, setTheme] = useState(() => (localStorage.getItem('theme') || 'light'))

  const BACKEND = import.meta.env.VITE_BACKEND_URL || ''

  const navItems = useMemo(() => ([
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]), [])

  // Apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  // Navbar style on scroll + progress + back-to-top
  useEffect(() => {
    const onScroll = () => {
      const header = document.getElementById('site-header')
      if (header) {
        if (window.scrollY > 10) header.classList.add('backdrop-blur', 'bg-white/70', 'shadow-sm', 'dark:bg-black/30')
        else header.classList.remove('backdrop-blur', 'bg-white/70', 'shadow-sm', 'dark:bg-black/30')
      }
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(pct)
      setShowToTop(scrollTop > 600)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Ensure loader shows until Spline is ready or a timeout fallback
  useEffect(() => {
    const minTimer = setTimeout(() => setIsLoading(false), 1800)
    return () => clearTimeout(minTimer)
  }, [])

  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  // Contact form state
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitResult(null)
    try {
      const res = await fetch(`${BACKEND}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.detail || 'Failed to submit')
      setSubmitResult({ ok: true, id: data.id })
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setSubmitResult({ ok: false, error: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white" id="home">
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-white dark:focus:bg-black focus:text-blue-700 focus:ring-2 focus:ring-blue-600 focus:px-3 focus:py-2 focus:rounded-md z-[60]">Skip to content</a>

      {/* Global Loader */}
      <Loader show={isLoading} text="Setting up the 3D scene…" />

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-40">
        <div className="h-full bg-blue-600 dark:bg-brand-400 transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Navbar */}
      <header id="site-header" className="fixed top-0 left-0 right-0 z-50 transition-all">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#home" className="font-semibold text-lg tracking-tight">
            <span className="text-gray-900 dark:text-white">Sahil</span>
            <span className="text-blue-600">.Ali</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-brand-300 transition-colors">
                {item.label}
              </a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 hover:bg-blue-50 dark:hover:bg-white/5 rounded-full text-gray-700 dark:text-gray-200 transition" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href={`mailto:${SITE.email}`} className="p-2 hover:bg-blue-50 dark:hover:bg-white/5 rounded-full text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-brand-300 transition" aria-label="Email">
              <Mail size={18} />
            </a>
            <a href={SITE.github} target="_blank" rel="noreferrer" className="p-2 hover:bg-blue-50 dark:hover:bg-white/5 rounded-full text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-brand-300 transition" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="p-2 hover:bg-blue-50 dark:hover:bg-white/5 rounded-full text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-brand-300 transition" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
          <button className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-white/10" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </nav>
        {menuOpen && (
          <div className="md:hidden border-t bg-white dark:bg-black">
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-brand-300" onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="px-3 py-2 rounded bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-gray-100">
                  {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </button>
                <a href={SITE.resumeUrl} className="px-3 py-2 rounded bg-blue-600 text-white" target="_blank" rel="noreferrer">Resume</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 dark:from-brand-900/30 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-center">
          <motion.div variants={heroVariants} initial="hidden" animate="show" className="py-10">
            <Badge>Full Stack Developer</Badge>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Hi, I'm <span className="text-blue-600">{SITE.name}</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-xl">
              I build modern, scalable web apps end‑to‑end. I’m a BCA graduate who loves crafting delightful UIs, robust APIs, and smooth developer experiences.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg transition-colors">
                View Projects <ArrowRight size={18} />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white dark:text-black hover:bg-gray-800 text-white font-semibold px-5 py-3 rounded-lg transition-colors">
                Contact Me <Mail size={18} />
              </a>
              <a href={SITE.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-white dark:bg-black border dark:border-white/20 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-white/5 font-semibold px-5 py-3 rounded-lg transition-colors">
                Download Resume
              </a>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2"><Code2 size={16} className="text-blue-600"/> MERN, Next.js, Node, FastAPI</div>
              <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-white/20"/>
              <div>Open to freelance & full‑time roles</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative h-[420px] sm:h-[520px] lg:h-[560px] rounded-2xl overflow-hidden shadow-xl">
            <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} onLoad={() => setIsLoading(false)} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white dark:from-black via-transparent to-transparent" />
          </motion.div>
        </div>

        {/* Optional secondary 3D object canvas */}
        {SITE.secondarySpline && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div className="relative h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10">
              <Spline scene={SITE.secondarySpline} style={{ width: '100%', height: '100%' }} />
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">You can replace this with a Spline scene containing your 3D photo/model.</p>
          </div>
        )}
      </section>

      <main id="content">
        {/* About */}
        <section id="about" className="relative py-20 sm:py-24 bg-gradient-to-b from-white dark:from-black to-blue-50/50 dark:to-transparent">
          <SectionHeader kicker="About" title="A bit about me" subtitle="Developer focused on clean code, DX, and product impact" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-white/10">
              <h3 className="text-xl font-semibold mb-2">Background</h3>
              <p className="text-gray-600 dark:text-gray-300">I'm a BCA graduate with a passion for full‑stack development. I enjoy working across the stack—from crafting interactive frontends to building reliable, secure backends.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-white/10">
              <h3 className="text-xl font-semibold mb-2">What I value</h3>
              <p className="text-gray-600 dark:text-gray-300">Clean architecture, accessible UX, performance, and maintainability. I love building with modern tools and adding playful touches with motion and 3D.</p>
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
              <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.05 }} className="bg-white dark:bg-white/5 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-white/10">
                <h3 className="font-semibold mb-3">{card.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {card.items.map((chip) => (
                    <span key={chip} className="px-3 py-1 rounded-full bg-gray-50 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-sm text-gray-700 dark:text-gray-200">{chip}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-20 sm:py-24 bg-gradient-to-b from-blue-50/50 dark:from-brand-900/20 to-white dark:to-black">
          <SectionHeader kicker="Projects" title="Selected work" subtitle="A snapshot of things I've built and shipped" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
            {SITE.projects.map((p, i) => (
              <motion.a key={p.title} href={p.link} target={p.link.startsWith('http') ? '_blank' : undefined} rel={p.link.startsWith('http') ? 'noreferrer' : undefined} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }} className="group block bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"/>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-brand-300 transition-colors">{p.title}</h3>
                    <ExternalLink size={18} className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-brand-300 transition-colors"/>
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-gray-50 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-xs text-gray-700 dark:text-gray-200">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 sm:py-24">
          <SectionHeader kicker="Contact" title="Let’s build something great" subtitle="I’m available for freelance and full‑time opportunities" />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-sm">
              <form onSubmit={onSubmit} className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">Name</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">Email</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600" placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-700 dark:text-gray-200">Message</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-transparent text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-600" placeholder="Tell me about your project…" />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <button type="submit" disabled={submitting} className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-semibold px-5 py-3 rounded-lg transition-colors">
                    {submitting ? 'Sending…' : 'Send Message'} <Mail size={18}/>
                  </button>
                  <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-gray-900 dark:bg-white dark:text-black hover:bg-gray-800 text-white font-semibold px-5 py-3 rounded-lg transition-colors">
                    <Linkedin size={18}/> LinkedIn
                  </a>
                </div>
                {submitResult && (
                  <div className={`text-sm ${submitResult.ok ? 'text-green-600' : 'text-red-600'}`}>
                    {submitResult.ok ? 'Thanks! Your message has been sent.' : `Error: ${submitResult.error}`}
                  </div>
                )}
              </form>
              <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">Prefer email? <a className="text-blue-600 dark:text-brand-300" href={`mailto:${SITE.email}`}>Reach out directly</a>. I’ll reply within 24 hours.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Back to top button */}
      <motion.button
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-blue-600 dark:bg-brand-500 text-white p-3 shadow-lg hover:bg-blue-700 dark:hover:bg-brand-400"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showToTop ? 1 : 0, scale: showToTop ? 1 : 0.8 }}
        transition={{ duration: 0.2 }}
      >
        <ChevronUp size={20} />
      </motion.button>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-100 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            <a href={SITE.resumeUrl} target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-brand-300">Download Resume</a>
            <a href="#home" className="hover:text-blue-600 dark:hover:text-brand-300">Back to top</a>
            <a href="/test" className="hover:text-blue-600 dark:hover:text-brand-300">System Check</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
