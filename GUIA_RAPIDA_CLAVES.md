# ⚡ OBTENER CLAVES EN 2 MINUTOS

Abre en nuevas pestañas y sigue los pasos numerados.

---

## 🔑 PASO 1: Google reCAPTCHA v3 (2 min)

**URL:** https://www.google.com/recaptcha/admin

1. Haz clic en **"+" (crear nuevo sitio)**
2. **Nombre:** `AnclaTech Solutions`
3. **Tipo:** `reCAPTCHA v3`
4. **Dominios:** 
   - `anclatech.netlify.app` (por ahora)
   - Después agregas tu dominio personalizado
5. Acepta términos → **Crear**

**COPIA ESTAS DOS CLAVES:**

```
Site Key (pública):
_____________________________________

Secret Key (privada - GUARDA BIEN):
_____________________________________
```

**Dónde van:**
- **Site Key** → En `contacto.html` línea ~47 en lugar de `YOUR_RECAPTCHA_SITE_KEY`
- **Site Key** → En `script.js` línea ~164 en lugar de `YOUR_RECAPTCHA_SITE_KEY`
- **Secret Key** → En Netlify como variable `RECAPTCHA_SECRET`

---

## 📧 PASO 2: Formspree (1 min)

**URL:** https://formspree.io/

1. Haz clic en **"Sign Up"** (o login si tienes cuenta)
2. Usa Google o email
3. Verifica tu email
4. Ve a dashboard
5. **New Form** → nombre: `anclatech-contact`
6. Copia el **Form ID** (ejemplo: `mxyzabc123`)

**COPIA ESTE ID:**

```
Form ID:
_____________________________________
```

**Construye la URL completa:**
```
https://formspree.io/f/FORM_ID
```

Ejemplo:
```
https://formspree.io/f/mxyzabc123
```

**Dónde va:**
- En Netlify como variable `FORMSPREE_ENDPOINT` = `https://formspree.io/f/FORM_ID`

---

## 📝 PASO 3: REEMPLAZAR EN ARCHIVOS LOCALES

### Archivo: `contacto.html` (línea ~47)

**Busca:**
```html
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_RECAPTCHA_SITE_KEY"></script>
```

**Reemplaza con:**
```html
<script src="https://www.google.com/recaptcha/api.js?render=TU_SITE_KEY_AQUI"></script>
```

---

### Archivo: `script.js` (línea ~164)

**Busca:**
```javascript
grecaptcha.execute('YOUR_RECAPTCHA_SITE_KEY', {action: 'contact'})
```

**Reemplaza con:**
```javascript
grecaptcha.execute('TU_SITE_KEY_AQUI', {action: 'contact'})
```

---

## 🌐 PASO 4: NETLIFY ENVIRONMENT VARIABLES

1. Ve a: **https://app.netlify.com/**
2. Selecciona tu sitio
3. **Settings** → **Build & Deploy** → **Environment**
4. **Edit Variables**
5. Agrega dos variables:

```
RECAPTCHA_SECRET = TU_SECRET_KEY_AQUI
FORMSPREE_ENDPOINT = https://formspree.io/f/TU_FORM_ID_AQUI
```

6. **Save**
7. Ve a **Deployments** → **Trigger deploy** → **Deploy site**

---

## ✅ VERIFICACIÓN RÁPIDA

Después de completar todo:

1. Ve a tu sitio: `https://anclatech.netlify.app/contacto.html`
2. Completa el formulario
3. Envía
4. Deberías ver: ✅ **"Mensaje enviado correctamente"**
5. Verifica en **Formspree dashboard** que llegó el mensaje

---

## 🎯 TABLA DE CLAVES

| Dónde obtenerlo | Tipo | Dónde usarlo |
|-----------------|------|-------------|
| Google reCAPTCHA Admin | Site Key (pública) | contacto.html + script.js |
| Google reCAPTCHA Admin | Secret Key (privada) | Netlify: `RECAPTCHA_SECRET` |
| Formspree | Form ID | Netlify: `FORMSPREE_ENDPOINT` |

---

## ⏱️ TIMELINE

```
Google reCAPTCHA v3:     ~ 1 minuto
Formspree:               ~ 1 minuto
Reemplazar en archivos:  ~ 2 minutos
Netlify variables:       ~ 2 minutos
─────────────────────────────────
TOTAL:                   ~ 6 minutos
```

---

## 🆘 SI ALGO FALLA

**Error: "reCAPTCHA token missing"**
- ¿Está la Site Key correcta en `contacto.html`?
- ¿El dominio está agregado en Google reCAPTCHA Admin?

**Error: "Formspree endpoint invalid"**
- ¿La URL está completa? `https://formspree.io/f/FORM_ID`
- ¿El Form ID es correcto en Formspree?

**Error: "RECAPTCHA_SECRET undefined"**
- ¿Agregaste la variable en Netlify?
- ¿Hiciste "Trigger deploy" después de agregar?

---

**¡Eso es todo! Tu web estará 100% funcional en ~6 minutos.**

*Guía: 31 de enero de 2026*
