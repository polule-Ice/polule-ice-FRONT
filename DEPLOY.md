# Polule ICE - Despliegue en Netlify

## 📋 Pasos para desplegar en Netlify

### 1. Preparar el repositorio
Asegúrate de que todos los cambios estén en GitHub:
```bash
git add .
git commit -m "Configuración para Netlify"
git push origin main
```

### 2. Conectar con Netlify

#### Opción A: Desde Netlify Dashboard (Recomendado)
1. Ve a [netlify.com](https://netlify.com) e inicia sesión
2. Click en "Add new site" > "Import an existing project"
3. Conecta tu cuenta de GitHub
4. Selecciona tu repositorio `polule_ice-FRONT`
5. Netlify detectará automáticamente la configuración del archivo `netlify.toml`
6. Click en "Deploy site"

#### Opción B: Netlify CLI
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Iniciar sesión
netlify login

# Inicializar el sitio
netlify init

# Desplegar
netlify deploy --prod
```

### 3. Configuración automática
El archivo `netlify.toml` ya está configurado con:
- ✅ Comando de build: `npm run build`
- ✅ Directorio de publicación: `dist/polule-ice-front/browser`
- ✅ Redirects para Angular routing (SPA)
- ✅ Versión de Node.js: 18

### 4. Variables de entorno (si las necesitas)
En Netlify Dashboard:
- Site settings > Environment variables
- Agrega las variables necesarias

### 5. Dominio personalizado (opcional)
- Site settings > Domain management
- Add custom domain
- Sigue las instrucciones para configurar DNS

## 🚀 Build local para probar
```bash
npm run build
```

El build se generará en `dist/polule-ice-front/browser/`

## 📝 Archivos de configuración creados
- `netlify.toml` - Configuración principal de Netlify
- `public/_redirects` - Manejo de rutas SPA
- Scripts actualizados en `package.json`

## 🔍 Solución de problemas

### Error: "Page not found" en rutas
- Verifica que el archivo `_redirects` esté en `public/`
- Verifica que `netlify.toml` tenga la configuración de redirects

### Error de build
- Verifica que todos los paquetes estén instalados
- Revisa los logs de Netlify para detalles específicos

### Assets no se cargan
- Verifica las rutas en `src/assets/`
- Usa rutas relativas: `/assets/imagen.jpg`
