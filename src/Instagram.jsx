import { useEffect, useRef, useState } from 'react'

const FEED_URL = import.meta.env.VITE_INSTAGRAM_FEED_URL
const PROFILE = 'https://www.instagram.com/___odiseacafe/'

// Acepta el formato de Behold ({ posts: [...] } o [...]) y el de la Graph API ({ data: [...] })
function normalizar(json) {
  const lista = Array.isArray(json) ? json : json.posts || json.data || []
  return lista
    .map((p) => ({
      id: p.id,
      url: p.permalink || PROFILE,
      imagen:
        p.sizes?.medium?.mediaUrl || p.thumbnailUrl || p.thumbnail_url || p.mediaUrl || p.media_url,
      texto: p.prunedCaption || p.caption || '',
      video: (p.mediaType || p.media_type) === 'VIDEO',
    }))
    .filter((p) => p.imagen)
}

function Card({ post }) {
  return (
    <a href={post.url} target="_blank" rel="noopener noreferrer" className="ig-card">
      <div className="ig-media">
        <img src={post.imagen} alt={post.texto.slice(0, 120) || 'Publicación de Odisea Café'} loading="lazy" />
        {post.video && <span className="ig-badge">▶</span>}
      </div>
      {post.texto && <p>{post.texto}</p>}
    </a>
  )
}

function Placeholder({ i }) {
  return (
    <a href={PROFILE} target="_blank" rel="noopener noreferrer" className={`ig-card ig-placeholder ph-${i % 3}`}>
      <div className="ig-media">
        <span>@___odiseacafe</span>
      </div>
      <p>Síguenos para ver lo último que sale del tostador.</p>
    </a>
  )
}

export default function Instagram() {
  const track = useRef(null)
  const [posts, setPosts] = useState(null)
  const [bordes, setBordes] = useState({ inicio: true, fin: false })

  useEffect(() => {
    if (!FEED_URL) {
      setPosts([])
      return
    }
    fetch(FEED_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => setPosts(normalizar(json).slice(0, 12)))
      .catch(() => setPosts([]))
  }, [])

  const actualizarBordes = () => {
    const el = track.current
    if (!el) return
    setBordes({
      inicio: el.scrollLeft < 8,
      fin: el.scrollLeft + el.clientWidth > el.scrollWidth - 8,
    })
  }

  useEffect(actualizarBordes, [posts])

  const mover = (dir) => {
    const el = track.current
    const card = el.querySelector('.ig-card')
    const paso = card ? card.offsetWidth + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * paso, behavior: 'smooth' })
  }

  const cargando = posts === null
  const vacio = posts?.length === 0

  return (
    <section id="instagram" className="section instagram">
      <div className="ig-head">
        <div>
          <p className="eyebrow">Capítulo cuatro · Instagram</p>
          <h2>Lo último del tostador</h2>
        </div>
        <div className="ig-controls">
          <button onClick={() => mover(-1)} disabled={bordes.inicio} aria-label="Anterior">
            ←
          </button>
          <button onClick={() => mover(1)} disabled={bordes.fin} aria-label="Siguiente">
            →
          </button>
        </div>
      </div>

      <div className="ig-track" ref={track} onScroll={actualizarBordes}>
        {cargando &&
          Array.from({ length: 4 }, (_, i) => <div key={i} className="ig-card ig-skeleton" />)}
        {vacio && Array.from({ length: 6 }, (_, i) => <Placeholder key={i} i={i} />)}
        {posts?.map((p) => (
          <Card key={p.id} post={p} />
        ))}
      </div>

      <a href={PROFILE} target="_blank" rel="noopener noreferrer" className="link ig-profile">
        Ver perfil completo →
      </a>
    </section>
  )
}
