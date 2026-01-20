# xPlay IPTV

Reproductor de canales IPTV chilenos hecho con React y Vite.

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

## Cómo usar

- **Play/Pause**: Botón de reproducción
- **Cambiar canal**: Botones anterior/siguiente o scroll del mouse
- **Lista de canales**: Click en el nombre del canal
- **Silenciar**: Botón de volumen
- **Picture-in-Picture**: Botón PiP

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
