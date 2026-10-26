import { useEffect, useState } from 'react'
import Instagram from './Instagram.jsx'
import logoSvg from './assets/odisea-logo.svg?raw'

const INSTAGRAM = 'https://www.instagram.com/___odiseacafe/'

const servicios = [
  {
    n: '01',
    titulo: 'Cafeterías',
    texto:
      'Granos de especialidad con tueste fresco, perfiles pensados para espresso y filtro, y acompañamiento en la calibración de tu barra.',
  },
  {
    n: '02',
    titulo: 'Restaurantes y hoteles',
    texto:
      'Un café que cierre bien cada comida. Suministro constante, entregas puntuales y una selección que se adapta a tu carta.',
  },
  {
    n: '03',
    titulo: 'Oficinas',
    texto:
      'Café de verdad para tu equipo. Planes de suministro recurrente en grano o molido, según tu forma de preparar.',
  },
  {
    n: '04',
    titulo: 'Marca propia',
    texto:
      'Desarrollamos un perfil de tueste exclusivo para tu negocio, listo para servir o vender con tu nombre.',
  },
]

const proceso = [
  { paso: 'Origen', texto: 'Seleccionamos lotes de pequeños productores, con trazabilidad desde la finca.' },
  { paso: 'Tueste', texto: 'Tostamos en lotes cortos para respetar el carácter de cada grano.' },
  { paso: 'Entrega', texto: 'Llevamos el café a tu negocio en su punto, con la frecuencia que necesites.' },
]

// El SVG usa currentColor, así que toma el color del texto donde se coloque
function Logo({ className = '' }) {
  return <span className={`logo-mark ${className}`} dangerouslySetInnerHTML={{ __html: logoSvg }} />
}

function Bean({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 40 56" aria-hidden="true">
      <ellipse cx="20" cy="28" rx="17" ry="25" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M20 4 C 12 18, 28 38, 20 52" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function Leaf({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true">
      <path
        d="M10 110 C 20 50, 60 15, 110 10 C 105 60, 70 100, 10 110 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M10 110 C 45 75, 75 45, 110 10" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

function Reveal({ children, as: Tag = 'div', className = '', ...rest }) {
  const [el, setEl] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [el])

  return (
    <Tag ref={setEl} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

function MobileCta() {
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const contacto = document.getElementById('contacto')
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.6
      const atContact = contacto && contacto.getBoundingClientRect().top < window.innerHeight
      setHidden(!pastHero || atContact)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a href="#contacto" className={`btn mobile-cta ${hidden ? 'hidden' : ''}`}>
      Pedir muestras
    </a>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const links = [
    ['Nosotros', '#nosotros'],
    ['Servicios', '#servicios'],
    ['Proceso', '#proceso'],
    ['Contacto', '#contacto'],
  ]
  return (
    <header className="nav">
      <a href="#inicio" className="logo" aria-label="Odisea Café, inicio">
        <Logo />
        <span>café especial</span>
      </a>
      <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Menú" aria-expanded={open}>
        <span />
        <span />
      </button>
      <nav className={open ? 'open' : ''}>
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default function App() {
  const [form, setForm] = useState({ nombre: '', negocio: '', mensaje: '' })

  const enviar = (e) => {
    e.preventDefault()
    const texto = `Hola Odisea Café, soy ${form.nombre} (${form.negocio}). ${form.mensaje}`
    navigator.clipboard?.writeText(texto).catch(() => {})
    window.open(INSTAGRAM, '_blank', 'noopener')
  }

  return (
    <>
      <Nav />

      <main>
        {/* Hero */}
        <section id="inicio" className="hero">
          <Leaf className="hero-leaf" />
          <div className="hero-inner">
            <Logo className="hero-logo" />
            <p className="eyebrow">Café especial · presenta</p>
            <h1>
              Cada taza,
              <br />
              <em>un viaje de vuelta</em>
              <br />
              al origen.
            </h1>
            <p className="lead">
              Proveedor de café de especialidad. Llevamos café honesto, de tueste fresco, a cafeterías, restaurantes y oficinas que se
              toman en serio lo que sirven.
            </p>
            <div className="hero-actions">
              <a href="#contacto" className="btn">
                Quiero ser cliente
              </a>
              <a href="#servicios" className="link">
                Ver servicios →
              </a>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="sun" />
            <Bean className="bean bean-1" />
            <Bean className="bean bean-2" />
            <Bean className="bean bean-3" />
          </div>
        </section>

        <div className="stripes" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        {/* Nosotros */}
        <section id="nosotros" className="section about">
          <Reveal className="about-label">
            <p className="eyebrow">Capítulo uno</p>
            <p className="chapter">Nosotros</p>
          </Reveal>
          <Reveal className="about-body">
            <h2>
              Una odisea que empieza en la tierra
              <br />y termina en tu barra.
            </h2>
            <p>
              En Odisea Café creemos que un buen café no necesita adornos. Trabajamos de cerca con
              productores, tostamos con paciencia y entregamos con constancia. Lo nuestro es simple:
              que cada negocio que confía en nosotros sirva un café del que pueda sentirse orgulloso.
            </p>
            <ul className="values">
              <li>Origen trazable</li>
              <li>Tueste fresco</li>
              <li>Trato cercano</li>
            </ul>
          </Reveal>
        </section>

        {/* Servicios */}
        <section id="servicios" className="section services">
          <Reveal className="section-head">
            <p className="eyebrow">Capítulo dos · Servicios</p>
            <h2>Café para tu negocio</h2>
          </Reveal>
          <div className="service-grid">
            {servicios.map((s) => (
              <Reveal as="article" key={s.n} className="service">
                <span className="num">{s.n}</span>
                <h3>{s.titulo}</h3>
                <p>{s.texto}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Proceso */}
        <section id="proceso" className="section process">
          <Reveal className="section-head">
            <p className="eyebrow">Capítulo tres · Proceso</p>
            <h2>De la finca a la taza</h2>
          </Reveal>
          <ol className="steps">
            {proceso.map((p, i) => (
              <Reveal as="li" key={p.paso} className="step">
                <span className="step-dot">{i + 1}</span>
                <h3>{p.paso}</h3>
                <p>{p.texto}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Cita */}
        <section className="quote">
          <Reveal>
            <Bean className="quote-bean" />
            <blockquote>“El café bueno no se apura: se cuida desde la semilla.”</blockquote>
          </Reveal>
        </section>

        <Instagram />

        {/* Contacto */}
        <section id="contacto" className="section contact">
          <Reveal className="contact-info">
            <p className="eyebrow">Capítulo final · Contacto</p>
            <h2>Hablemos de café</h2>
            <p>
              Cuéntanos sobre tu negocio y te preparamos una propuesta con muestras para que pruebes
              antes de decidir.
            </p>
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="ig">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
              @___odiseacafe
            </a>
          </Reveal>
          <Reveal as="form" className="contact-form" onSubmit={enviar}>
            <label>
              Nombre
              <input
                required
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
            </label>
            <label>
              Negocio
              <input
                required
                value={form.negocio}
                onChange={(e) => setForm({ ...form, negocio: e.target.value })}
              />
            </label>
            <label>
              ¿Qué necesitas?
              <textarea
                rows="4"
                value={form.mensaje}
                onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
              />
            </label>
            <button type="submit" className="btn">
              Enviar por Instagram
            </button>
            <small>Copiamos tu mensaje para que solo tengas que pegarlo en el chat.</small>
          </Reveal>
        </section>
      </main>

      <MobileCta />

      <footer className="footer">
        <span className="logo">
          <Logo />
          <span>café especial</span>
        </span>
        <span>© {new Date().getFullYear()} Odisea Café</span>
        <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </footer>
    </>
  )
}
