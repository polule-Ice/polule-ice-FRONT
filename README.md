# Polule ICE - Landing Page 🍦

Sitio web oficial de Polule ICE, heladería artesanal con helados tipo soft cremosos y toppings personalizables.

## 🚀 Características

- 🎨 Landing page moderna y atractiva
- 📱 Diseño 100% responsive
- 🍦 Menú interactivo con categorías
- 📍 Mapa de ubicación integrado
- 💬 WhatsApp directo para pedidos
- ⚡ Optimizado para despliegue en Netlify

## 🛠️ Tecnologías

- **Angular 20** - Framework principal
- **Tailwind CSS** - Estilos y diseño
- **TypeScript** - Lenguaje de programación
- **Leaflet** - Mapas interactivos

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/polule-Ice/polule-ice-FRONT.git

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

El sitio estará disponible en `http://localhost:4200/`

## 🏗️ Build

```bash
# Build de producción
npm run build

# Build específico para Netlify
npm run build:netlify
```

## 🌐 Despliegue en Netlify

El proyecto está configurado para despliegue automático en Netlify:

1. Conecta tu repositorio en [netlify.com](https://netlify.com)
2. Netlify detectará automáticamente la configuración desde `netlify.toml`
3. El sitio se desplegará automáticamente con cada push a `main`

Ver [DEPLOY.md](DEPLOY.md) para más detalles.

## 📂 Estructura del Proyecto

```
src/
├── app/
│   ├── features/
│   │   ├── landing/        # Página principal
│   │   │   ├── components/ # Componentes de landing
│   │   │   └── pages/      # Landing page
│   │   └── menu/          # Página del menú
│   │       └── pages/     # Menú interactivo
│   ├── shared/            # Componentes compartidos
│   │   └── components/
│   │       └── footer/    # Footer global
│   └── environments/      # Configuración de entornos
├── assets/                # Imágenes y recursos
└── styles/               # Estilos globales
```

## 🎨 Paleta de Colores

- **Chocolate**: `#8B4513` - Color principal
- **Amarillo Mango**: `#FFB84D` - Acentos
- **Blanco Crema**: `#FFF8E7` - Fondos
- **Azul Hielo**: `#B8E6F0` - Detalles

## 📝 Scripts Disponibles

```bash
npm start          # Servidor de desarrollo
npm run build      # Build de producción
npm run watch      # Build con watch mode
npm test           # Ejecutar tests
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📞 Contacto

- **WhatsApp**: +51 970 473 404
- **Instagram**: [@polule_ice](https://instagram.com/polule_ice)

## 📄 Licencia

Este proyecto es privado y pertenece a Polule ICE.

---

Desarrollado con ❤️ para Polule ICE 🍦
