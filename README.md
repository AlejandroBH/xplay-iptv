# xPlay IPTV

Reproductor de canales IPTV chilenos hecho con React y Vite.

## Características

- 📺 Reproducción de canales en vivo
- ⌨️ Atajos de teclado para navegación rápida
- 🔍 Búsqueda de canales en tiempo real
- 📊 Indicador de canal actual
- ⏳ Indicador visual de buffering
- 📱 Diseño responsive (desktop y móvil)
- 💾 Recuerda el último canal reproducido

## Instalación

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev      # Desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
```

## Controles

### Mouse/Touch
- **Click en ▶️/⏸️**: Play/Pause
- **Click en ⏮️/⏭️**: Canal anterior/siguiente
- **Scroll del mouse**: Cambiar canales
- **Click en nombre del canal**: Abrir lista
- **Click en 🔊/🔇**: Silenciar/Activar audio

### Teclado
- **↑/↓**: Canal anterior/siguiente
- **Espacio**: Play/Pause
- **M**: Silenciar/Activar audio
- **L**: Abrir lista de canales
- **Esc**: Cerrar lista de canales

### Búsqueda
- Abre la lista de canales (tecla **L** o click en nombre)
- Escribe para filtrar canales en tiempo real
- Presiona **Esc** para cerrar

## Agregar canales

Edita `src/chanels.json`:

```json
{
  "id": 1,
  "title": "Nombre del Canal",
  "icon": "logo.png",
  "url": "https://stream-url.m3u8",
  "description": "Descripción",
  "active": true
}
```

Los logos van en `public/assets/images/chanels/`

## Tecnologías

- React 18
- Vite
- React Player
- Styled Components

## Estructura

```
src/
├── components/     # Componentes de UI
├── hooks/          # Hooks personalizados
├── App.jsx         # Componente principal
└── chanels.json    # Lista de canales
```

## Deploy

```bash
npm run build
```

Sube la carpeta `dist/` a tu hosting favorito.
