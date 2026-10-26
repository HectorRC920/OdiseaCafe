# Odisea Café — Landing page

Landing page de **Odisea Café**, proveedor de café de especialidad.
Hecha con React + Vite, con estética setentera (paleta amarillo hoja seca, ocre, verde olivo y negro).

- **Producción:** https://odisea-cafe.vercel.app
- **Instagram:** https://www.instagram.com/___odiseacafe/

---

## Requisitos

- [Node.js](https://nodejs.org) 18 o superior (`node -v` para comprobarlo)
- npm (viene con Node)

## Lanzar la app en local

```bash
# 1. Instalar dependencias (solo la primera vez)
npm install

# 2. Servidor de desarrollo con recarga automática
npm run dev
```

Abre la dirección que aparece en la terminal (normalmente http://localhost:5173).
Para verla desde el móvil en la misma red Wi-Fi: `npm run dev -- --host` y abre la IP que indica.

### Otros comandos

| Comando           | Qué hace                                                  |
| ----------------- | --------------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo                                    |
| `npm run build`   | Genera la versión optimizada para publicar en `dist/`     |
| `npm run preview` | Sirve la carpeta `dist/` para revisar el build final      |

---

## Estructura

```
odisea-cafe/
├── index.html              # HTML base y carga de tipografías (Google Fonts)
├── src/
│   ├── App.jsx             # Secciones y textos de la página
│   ├── Instagram.jsx       # Carrusel de publicaciones de Instagram
│   ├── index.css           # Colores, tipografías, estilos y versión móvil
│   ├── main.jsx            # Punto de entrada de React
│   └── assets/
│       └── odisea-logo.svg # Logo vectorial (usa currentColor)
├── .env.example            # Plantilla de variables de entorno
└── vite.config.js
```

---

## Configuración

### Feed de Instagram (carrusel)

Instagram no permite leer publicaciones directamente desde una web, así que el carrusel
usa un feed JSON. Sin configurarlo, muestra tarjetas de muestra que enlazan al perfil.

1. Crea una cuenta gratis en [behold.so](https://behold.so).
2. Conecta la cuenta **@___odiseacafe** (debe ser cuenta profesional: en Instagram,
   *Configuración → Tipo de cuenta → Cambiar a cuenta profesional*).
3. Crea un feed de tipo **JSON** y copia su URL (`https://feeds.behold.so/...`).
4. Copia la plantilla y pega la URL:

   ```bash
   cp .env.example .env
   ```

   ```env
   VITE_INSTAGRAM_FEED_URL=https://feeds.behold.so/TU_ID
   ```

5. Reinicia `npm run dev`.

> La variable se inserta al compilar, así que cada vez que la cambies hay que volver a
> hacer build / deploy. El archivo `.env` no se sube a git.

El componente también acepta el formato de la Instagram Graph API (`{ data: [...] }`).

### Textos

Todo el contenido está en `src/App.jsx`:

- `servicios` y `proceso` (arriba del archivo): tarjetas de servicios y pasos del proceso.
- `INSTAGRAM`: enlace al perfil.
- El resto (portada, nosotros, cita, contacto) está escrito directamente en el JSX.

### Colores y tipografías

En `src/index.css`, al inicio (`:root`):

```css
--leaf:  #d9a33b;  /* amarillo hoja seca */
--ochre: #c4622d;  /* ocre naranjoso */
--olive: #5b6230;  /* verde olivo */
--black: #15120e;
--paper: #f0e2c0;  /* crema de fondo */
```

Tipografías (cargadas en `index.html`):

- **Shrikhand**: títulos grandes y cita
- **Fraunces**: subtítulos (estilo Cooper Black)
- **Courier Prime**: etiquetas y menú (estilo guion de cine)
- **DM Sans**: texto general

### Logo

`src/assets/odisea-logo.svg` es una versión vectorizada a partir de una imagen del logo.
Toma el color del texto que la rodea (`color` en CSS). Para usar el archivo original del
diseñador, reemplaza el SVG manteniendo `fill="currentColor"` y sin `width`/`height` fijos.

---

## Deploy en Vercel

El proyecto ya está enlazado a Vercel (carpeta `.vercel/`, ignorada en git).

### Publicar cambios

```bash
npx vercel --prod
```

Vercel compila el proyecto y actualiza https://odisea-cafe.vercel.app.
Sin `--prod` crea una versión de prueba con su propia URL, sin tocar producción.

### Primera vez en otro equipo

```bash
npx vercel login     # iniciar sesión
npx vercel link      # enlazar con el proyecto odisea-cafe existente
npx vercel --prod
```

### Variable de Instagram en Vercel

```bash
npx vercel env add VITE_INSTAGRAM_FEED_URL production
# pega la URL del feed cuando lo pida
npx vercel --prod    # vuelve a publicar para que la tome
```

También se puede añadir desde el panel: *Project → Settings → Environment Variables*.

### Deploy automático con GitHub (opcional)

Si subes el proyecto a un repositorio de GitHub y lo conectas en el panel de Vercel
(*Project → Settings → Git*), cada `git push` a la rama principal se publica solo.

### Dominio propio (opcional)

En el panel de Vercel: *Project → Settings → Domains* → añade tu dominio
(por ejemplo `odiseacafe.com`) y sigue las instrucciones de DNS que te indica.

---

## Compartir en local con ngrok (opcional)

Para enseñar la versión local sin desplegar:

```bash
npm run build
npm run preview -- --port 4173
ngrok http 4173      # en otra terminal
```

`vite.config.js` ya permite los dominios de ngrok. El enlace solo funciona mientras
ambos comandos estén abiertos.
