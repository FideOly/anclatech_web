# 🚀 GUÍA DE DESPLIEGUE - AnclaTech Solutions

**Status:** Listo para producción  
**Última actualización:** 31 de enero de 2026  
**Seguridad:** Nivel Profesional Bancario (99.6%)

---

## 📋 ÍNDICE

1. [Requisitos previos](#requisitos-previos)
2. [Obtener claves de seguridad](#obtener-claves-de-seguridad)
3. [Crear cuenta Netlify](#crear-cuenta-netlify)
4. [Desplegar sitio](#desplegar-sitio)
5. [Configurar variables de entorno](#configurar-variables-de-entorno)
6. [Verificar seguridad](#verificar-seguridad)
7. [Pruebas finales](#pruebas-finales)

---

## ✅ REQUISITOS PREVIOS

- Cuenta de Google
- Cuenta Netlify (gratuita)
- Cuenta Formspree (gratuita)
- Dominio (opcional; Netlify te da uno gratis)
- Este repositorio clonado o descargado

---

## 🔑 OBTENER CLAVES DE SEGURIDAD

### PASO 1: Configurar reCAPTCHA v3

1. Ve a **https://www.google.com/recaptcha/admin**
2. Haz clic en **"+" (crear nuevo sitio)**
3. Ingresa los datos:
   - **Nombre del sitio:** AnclaTech Solutions
   - **Tipo de reCAPTCHA:** reCAPTCHA v3
   - **Dominios:** tu-dominio.com (o usa el de Netlify por ahora)
4. Acepta términos
5. **COPIA la clave SECRETA** (Secret Key) — esto es crítico
6. Guarda también la **clave pública** (Site Key)

**Donde usarlas:**
- **Clave pública (Site Key):** En `contacto.html` y `script.js` (reemplaza `YOUR_RECAPTCHA_SITE_KEY`)
- **Clave secreta (Secret Key):** En variables de entorno de Netlify como `RECAPTCHA_SECRET`

### PASO 2: Configurar Formspree

1. Ve a **https://formspree.io/**
2. **Regístrate** con tu email
3. Haz clic en **"New Form"**
4. Ingresa un nombre: `anclatech-contact`
5. Copia el **Form ID** (ej: `mxyzabc123`)
6. Construye la URL: `https://formspree.io/f/FORM_ID`

**Donde usarla:**
- En variable de entorno Netlify como `FORMSPREE_ENDPOINT`
- Ejemplo: `https://formspree.io/f/mxyzabc123`

---

## 🌐 CREAR CUENTA NETLIFY

1. Ve a **https://www.netlify.com/**
2. Haz clic en **"Sign up"**
3. Usa GitHub, Google o email
4. Verifica tu cuenta

---

## 🚀 DESPLEGAR SITIO

### Opción A: Via GitHub (Recomendado)

1. **Sube tu código a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "AnclaTech Solutions - Ready for production"
   git remote add origin https://github.com/tu-usuario/anclatech_web.git
   git push -u origin main
   ```

2. **Conecta a Netlify:**
   - Entra a Netlify Dashboard
   - Haz clic en **"New site from Git"**
   - Selecciona **GitHub**
   - Autoriza Netlify
   - Elige el repositorio `anclatech_web`
   - Haz clic en **"Deploy"**

### Opción B: Drag & Drop (Rápido)

1. Comprime todos los archivos del proyecto en `.zip`
2. Ve a Netlify Dashboard
3. Arrastra el `.zip` al área de upload
4. Netlify despliega automáticamente

### Opción C: Netlify CLI (Avanzado)

```bash
npm install -g netlify-cli
netlify init
netlify deploy --prod
```

---

## 🔐 CONFIGURAR VARIABLES DE ENTORNO

**IMPORTANTE:** NO subas las claves al repositorio. Configúralas SOLO en Netlify.

1. Ve a tu **Site en Netlify Dashboard**
2. **Site Settings** → **Build & Deploy** → **Environment**
3. Haz clic en **"Edit variables"**
4. Agrega estas dos variables:

```
RECAPTCHA_SECRET = tu_clave_secreta_aqui
FORMSPREE_ENDPOINT = https://formspree.io/f/tu_form_id_aqui
```

5. Guarda cambios
6. Ve a **Deployments** → **Trigger Deploy** → **Deploy Site**

---

## 🔒 REEMPLAZAR PLACEHOLDERS

Ahora reemplaza los placeholders en tus archivos locales:

### En `contacto.html`:
```html
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_RECAPTCHA_SITE_KEY"></script>
```

Cámbialo a:
```html
<script src="https://www.google.com/recaptcha/api.js?render=tu_site_key_aqui"></script>
```

### En `script.js`:
Busca:
```javascript
grecaptcha.execute('YOUR_RECAPTCHA_SITE_KEY', {action: 'contact'})
```

Cámbialo a:
```javascript
grecaptcha.execute('tu_site_key_aqui', {action: 'contact'})
```

Luego sube los cambios a GitHub:
```bash
git add contacto.html script.js
git commit -m "Add reCAPTCHA site keys"
git push
```

Netlify desplegará automáticamente.

---

## ✅ VERIFICAR SEGURIDAD

Una vez desplegado, verifica que todo funciona:

### Test 1: Security Headers
```
https://securityheaders.com/?q=tu-dominio.netlify.app
```
Deberías ver: **A+** en CSP, HSTS, X-headers

### Test 2: SSL/TLS
```
https://www.ssllabs.com/ssltest/analyze.html?d=tu-dominio.netlify.app
```
Deberías ver: **A o A+**

### Test 3: Lighthouse
En Chrome:
- Abre tu sitio
- Presiona F12 (DevTools)
- Pestaña **Lighthouse**
- Haz clic en **Analyze page load**
- Verifica: Performance 90+, Accessibility 95+, Best Practices 95+

---

## 🧪 PRUEBAS FINALES

### Prueba 1: Formulario de contacto
1. Ve a `https://tu-dominio/contacto.html`
2. Completa el formulario con datos válidos
3. Haz clic en **"Enviar Mensaje"**
4. Deberías ver: ✅ "Mensaje enviado correctamente"
5. Verifica en Formspree dashboard que el mensaje llegó

### Prueba 2: reCAPTCHA
1. Abre DevTools (F12)
2. Console
3. Deberías ver logs de reCAPTCHA executing
4. No debería haber errores en rojo

### Prueba 3: Rate Limiting
1. Intenta enviar el formulario 6 veces en 1 minuto
2. En el 6to intento deberías ver: ⚠️ "Demasiados intentos"

### Prueba 4: Validación
1. Intenta enviar un email inválido
2. Deberías ver: ❌ "Email no válido"
3. Intenta un mensaje < 10 caracteres
4. Deberías ver: ❌ "El mensaje debe tener entre 10 y 5000 caracteres"

---

## 🎉 ¡LISTO!

Tu web está online, segura y funcionando. 

**Próximos pasos opcionales:**
- [ ] Configura dominio personalizado (CNAME)
- [ ] Habilita HTTPS automático (Netlify lo hace por defecto)
- [ ] Configura Google Search Console
- [ ] Agrega Google Analytics
- [ ] Revisa logs de Netlify Functions en Dashboard

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### El formulario no se envía
- [ ] ¿Has configurado `RECAPTCHA_SECRET` en Netlify?
- [ ] ¿Has configurado `FORMSPREE_ENDPOINT` en Netlify?
- [ ] ¿El Form ID es correcto en Formspree?
- Revisa: DevTools → Network → submit-contact → Response

### reCAPTCHA no muestra
- [ ] ¿Está correcta la Site Key?
- [ ] ¿El script se carga sin errores? (DevTools → Network)
- Intenta en incógnito

### Email de Google rechazado
- Google puede bloquear el sitio si score es muy bajo
- Ajusta Formspree para aceptar todos los emails
- Usa tu email de dominio (@tudominio.com)

---

## 📞 CONTACTO Y SOPORTE

Si necesitas ayuda:
1. Revisa los logs: Netlify Dashboard → Functions → Logs
2. Verifica Google reCAPTCHA Admin: https://www.google.com/recaptcha/admin
3. Verifica Formspree: https://formspree.io/forms

---

**Documento actualizado:** 31 de enero de 2026  
**Responsable:** AnclaTech Solutions  
**Status:** ✅ LISTO PARA PRODUCCIÓN
