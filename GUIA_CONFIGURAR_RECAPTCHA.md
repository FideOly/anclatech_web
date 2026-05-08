# 🔐 GUÍA COMPLETA: Configurar reCAPTCHA v3 para AnclaTech Solutions

## Paso 1: Crear cuenta en Google reCAPTCHA

1. Ve a: **https://www.google.com/recaptcha/admin**
2. Inicia sesión con tu cuenta de Google
3. Haz clic en el botón **"+"** para crear un nuevo sitio

## Paso 2: Registrar tu sitio web

Completa el formulario con estos datos:

| Campo | Valor |
|-------|-------|
| **Etiqueta** | AnclaTech Solutions |
| **Tipo de reCAPTCHA** | reCAPTCHA v3 |
| **Dominios** | anclatech.com |
| | www.anclatech.com |
| | localhost (para pruebas) |

> ⚠️ **Importante**: Agrega todos los dominios donde usarás el formulario

## Paso 3: Obtener las claves

Después de registrar, Google te dará **2 claves**:

### 🔑 Clave del sitio (Site Key)
- Es **PÚBLICA** - se usa en el frontend
- Ejemplo: `6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

### 🔒 Clave secreta (Secret Key)
- Es **PRIVADA** - se usa en el backend
- Ejemplo: `6LcYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY`

## Paso 4: Configurar en tu proyecto

### 4.1 Actualizar contacto.html

Busca esta línea (cerca del final del archivo):
```html
<script src="https://www.google.com/recaptcha/api.js?render=YOUR_RECAPTCHA_SITE_KEY"></script>
```

Reemplaza `YOUR_RECAPTCHA_SITE_KEY` con tu **Clave del sitio**:
```html
<script src="https://www.google.com/recaptcha/api.js?render=6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"></script>
```

### 4.2 Actualizar script.js

Busca esta línea (aproximadamente línea 174):
```javascript
grecaptcha.execute('YOUR_RECAPTCHA_SITE_KEY', {action: 'contact'})
```

Reemplaza `YOUR_RECAPTCHA_SITE_KEY` con tu **Clave del sitio**:
```javascript
grecaptcha.execute('6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', {action: 'contact'})
```

### 4.3 Configurar en Netlify (Clave Secreta)

1. Ve a tu dashboard de Netlify: **https://app.netlify.com**
2. Selecciona tu sitio **AnclaTech Solutions**
3. Ve a: **Site settings** → **Environment variables**
4. Agrega una nueva variable:

| Variable | Valor |
|----------|-------|
| `RECAPTCHA_SECRET` | Tu clave secreta (6LcYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY) |

5. Haz clic en **Save**

## Paso 5: Configurar Formspree (Opcional pero recomendado)

Si quieres recibir los mensajes del formulario por email:

1. Ve a: **https://formspree.io**
2. Crea una cuenta gratuita
3. Crea un nuevo formulario
4. Copia el **Form ID** (ejemplo: `xyzabcde`)
5. En Netlify, agrega otra variable de entorno:

| Variable | Valor |
|----------|-------|
| `FORMSPREE_ENDPOINT` | `https://formspree.io/f/xyzabcde` |

## Paso 6: Probar el formulario

1. Despliega los cambios en Netlify
2. Ve a tu página de contacto
3. Llena el formulario y envíalo
4. Verifica que:
   - No aparezcan errores en la consola del navegador
   - Recibas el mensaje en tu email (si configuraste Formspree)

## 🔧 Solución de problemas

### Error: "reCAPTCHA token missing"
- Verifica que la clave del sitio esté correcta en `contacto.html` y `script.js`

### Error: "reCAPTCHA verification failed"
- Verifica que la clave secreta esté correcta en Netlify
- Asegúrate de que el dominio esté registrado en Google reCAPTCHA

### El formulario no envía
- Abre la consola del navegador (F12) y busca errores
- Verifica que todas las variables de entorno estén configuradas en Netlify

## 📞 ¿Necesitas ayuda?

Si tienes problemas configurando reCAPTCHA, puedes:
1. Revisar la documentación oficial: https://developers.google.com/recaptcha/docs/v3
2. Contactar soporte de Google reCAPTCHA

---

**Última actualización**: Febrero 2026
**Autor**: Kilo Code Assistant
