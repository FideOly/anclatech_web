Despliegue y Seguridad - AnclaTech (Guía rápida)

Objetivo: poner tu sitio online rápido y seguro, sin exponer datos sensibles.

Opciones recomendadas (rápidas):

1) Netlify (drag & drop) — recomendado si quieres subir la carpeta estática ahora
- Crea cuenta en https://app.netlify.com
- Comprime la carpeta `anclatech_web` en un .zip (ver comando PowerShell más abajo)
- En Netlify > Sites > "New site from drag and drop" arrastra el zip
- Netlify proporcionará un subdominio `*.netlify.app` con HTTPS automático
- Ventajas: HTTPS automático, cabeceras si usas archivo `_headers`, fácil de actualizar

2) GitHub Pages (si usas Git)
- Crea repo en GitHub
- Desde PowerShell (ajusta `<tu-usuario>` y nombre de repo):
  cd "C:\Users\lopez\OneDrive\Escritorio\anclatech_web"
  git init
  git add .
  git commit -m "Publicar sitio"
  git remote add origin https://github.com/<tu-usuario>/<repo>.git
  git branch -M main
  git push -u origin main
- En GitHub: Settings > Pages > selecciona `main` y carpeta `/` (root)
- Caveat: GitHub Pages ofrece HTTPS, pero si usas Stripe o integraciones, asegúrate de colocar claves en servidor seguro.

3) ngrok (temporal, compartir demo)
- Útil para compartir localmente sin publicar aún.
- Ejecuta:
  python -m http.server 8000
  ngrok http 8000
- Ngrok te dará una URL pública temporal.

Medidas de seguridad aplicadas (ya presentes o añadidas):
- Archivo `_headers` con cabeceras de seguridad (para Netlify / CDN)
- `robots.txt` y `sitemap.xml` añadidos
- Banner de cookies implementado y guardado en localStorage

Siguientes pasos (dominio, SSL, WordPress):

Si compras un dominio (recomendado a largo plazo):
- Comprar en Namecheap/Google Domains/GoDaddy
- (Opcional) Usar Cloudflare (gratuito) como DNS y proxy: Cloudflare provee HTTPS, WAF y mejoras de rendimiento
- En DNS: crear registro A `@` -> 50.63.142.19 (tu hosting) y A `www` -> 50.63.142.19 o CNAME `www` -> `@`
- En GoDaddy (hosting WordPress): añadir dominio en panel y activar SSL (Let’s Encrypt/GoDaddy)

Checklist rápido de seguridad para WordPress (si usas WP en GoDaddy):
- Backup (UpdraftPlus o panel hosting)
- Actualizar core/tema/plugins
- Forzar HTTPS y activar HSTS
- 2FA para administradores
- Plugin de seguridad (Wordfence o Sucuri)
- No guardar claves de Stripe en repositorio; usar variables de entorno

Comandos PowerShell útiles (ejecuta en tu máquina):
- Comprimir carpeta para Netlify drag&drop:
  Compress-Archive -Path "C:\Users\lopez\OneDrive\Escritorio\anclatech_web\*" -DestinationPath "C:\Users\lopez\OneDrive\Escritorio\anclatech_web.zip"
- Crear archivo CNAME al comprar dominio (reemplaza `tudominio.com`):
  Set-Content -Path "C:\Users\lopez\OneDrive\Escritorio\anclatech_web\CNAME" -Value "tudominio.com"

Stripe y pagos (resumen):
- Usa Stripe Checkout o Elements para que Stripe gestione la captura de tarjetas
- Claves secretas solo en servidor; claves públicas en cliente
- Usa webhooks y valida la firma de los webhooks

Si quieres, hago esto por ti:
- Preparar el sitio para subir a Netlify (ya está listo): crea zip y te digo exactamente qué subir.
- Generar el archivo `CNAME` y reemplazar metadatos cuando compres el dominio.
- Preparar instrucciones para activar Cloudflare y SSL.

¿Quieres que:
- A) Genere ahora el zip para Netlify (y te diga dónde está) — yo puedo crear el zip si me autorizas (lo generaré en tu carpeta), o
- B) Te guíe paso a paso para crear el sitio en Netlify mientras lo haces, o
- C) Esperamos a que compres un dominio y procedemos con Cloudflare + DNS?

Dime A, B o C y lo continuo.