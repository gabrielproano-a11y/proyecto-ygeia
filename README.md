# Ygeia — Consultorio Médico & Estético
## Landing Page Premium

---

## 📁 Estructura del Proyecto

```
Proyecto Ygeia/
├── index.html          # Página principal (todas las secciones)
├── styles.css          # Sistema de diseño + animaciones
├── script.js           # Interactividad (JS puro)
├── README.md           # Este archivo
└── images/
    ├── logo.png         # Logo de Ygeia (IA generada)
    ├── hero_visual.png  # Visual del Hero (IA generada)
    ├── service_1.png    # Medicina General & Ocupacional
    ├── service_2.png    # Sueros & Terapia IV
    ├── service_3.png    # Limpieza Facial & Acné
    └── service_4.png    # Retiro de Lunares & Aclaramiento
```

---

## 🎨 Paleta de Colores

| Variable         | Valor     | Uso                         |
|------------------|-----------|-----------------------------|
| `--primary-500`  | `#03A0A0` | Color principal Teal        |
| `--primary-400`  | `#1AC5BC` | Hover states, textos claros |
| `--primary-600`  | `#028080` | Botones activos             |
| `--bg-primary`   | `#000000` | Fondo negro puro            |
| `--bg-secondary` | `#05111A` | Fondo oscuro secciones      |
| `--text-primary` | `#FFFFFF` | Texto principal             |

---

## 🖼️ Imágenes Generadas con IA

- `logo.png` — Logo minimalista Ygeia (teal + fondo blanco)
- `hero_visual.png` — Visual 3D futurista para el hero
- `service_1.png` — Medicina General & Ocupacional
- `service_2.png` — Sueros & Terapia Intravenosa
- `service_3.png` — Limpieza Facial & Tratamiento de Acné
- `service_4.png` — Retiro de Lunares & Aclaramiento

> **Servicios 5 y 6** (Rejuvenecimiento y Masajes) usan visuales CSS premium por límite de cuota de generación de imágenes.

---

## 🔧 Personalización

### Cambiar información de contacto
En `index.html`, busca el `<section class="footer">` y actualiza:
- Dirección, teléfono, email, horarios
- Links de redes sociales (Instagram, Facebook, WhatsApp)

### Cambiar color principal
En `styles.css`, modifica la variable:
```css
--primary-500: #03a0a0; /* Tu nuevo color HEX */
```

### Activar formulario de contacto
El formulario actualmente simula el envío. Para conectarlo a un backend real, reemplaza en `script.js` el bloque `initForm()` con tu endpoint (ej: EmailJS, Formspree, o tu API).

### Agregar imágenes para servicios 5 y 6
Coloca archivos `service_5.png` y `service_6.png` en la carpeta `/images/` y reemplaza el `<div class="service-image service-image-gradient ...">` en el HTML por un `<img>`.

---

## 📱 Responsive

| Breakpoint    | Layout              |
|---------------|---------------------|
| Desktop XL    | Grid 3 columnas     |
| Tablet        | Grid 2 columnas     |
| Mobile (768px)| Stack 1 columna     |
| Mobile small  | Menú hamburguesa    |

---

## ⚡ Características

- ✅ Dark mode premium con acento Teal
- ✅ Flip cards 3D interactivas con imágenes reales
- ✅ Partículas flotantes (50 partículas)
- ✅ Contadores animados (IntersectionObserver)
- ✅ Navbar sticky con blur al scroll
- ✅ Glassmorphism en cards
- ✅ Smooth scroll y animaciones de reveal
- ✅ Mobile menu hamburguesa
- ✅ Psicología de marketing (urgencia, social proof)
- ✅ Formulario de contacto funcional
- ✅ SEO básico (meta tags, semántica HTML5)
- ✅ Fuentes: Plus Jakarta Sans + Inter

---

© 2026 Ygeia. Todos los derechos reservados.
