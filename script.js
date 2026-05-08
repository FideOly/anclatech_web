// ============================================
// ANCLATECH SOLUTIONS - SCRIPT PRINCIPAL
// SEGURIDAD: NIVEL PROFESIONAL
// ============================================

// 1. MODO OSCURO/CLARO
const toggleBtn = document.getElementById("modoToggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("modo-oscuro");
    const esOscuro = document.body.classList.contains("modo-oscuro");
    localStorage.setItem("modoOscuroActivado", esOscuro);
  });
}

// Leer preferencia al cargar
window.addEventListener("DOMContentLoaded", () => {
  const guardado = localStorage.getItem("modoOscuroActivado");
  if (guardado === "true") {
    document.body.classList.add("modo-oscuro");
  }
  
  // Animar elementos al cargar
  revelarElementosAlScroll();
});

// 2. ANIMACIONES AL HACER SCROLL
function revelarElementosAlScroll() {
  const elementos = document.querySelectorAll(".fade-in-on-scroll");
  const alturaVentana = window.innerHeight;

  elementos.forEach(elemento => {
    const posicionTop = elemento.getBoundingClientRect().top;
    if (posicionTop < alturaVentana - 50) {
      elemento.classList.add("visible");
    }
  });
}

// Usar IntersectionObserver para mejor performance
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll(".fade-in-on-scroll, .fade-in").forEach((el) => {
  observador.observe(el);
});

window.addEventListener("scroll", revelarElementosAlScroll);

// 3. VALIDACIÓN Y SEGURIDAD DE FORMULARIO
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  // Array para almacenar intentos de envío
  let submissionAttempts = [];
  const MAX_ATTEMPTS = 5;
  const TIME_WINDOW = 60000;
  
  // Validación en tiempo real de email
  const emailInput = document.getElementById("email");
  if (emailInput) {
    emailInput.addEventListener("blur", function() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.value) && this.value.length > 0) {
        this.style.borderColor = "#ff6b6b";
        this.setAttribute("title", "❌ Email no válido");
      } else {
        this.style.borderColor = "#51cf66";
      }
    });
  }
  
  // Validación al enviar formulario
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    // 1. RATE LIMITING (Prevenir spam)
    const now = Date.now();
    submissionAttempts = submissionAttempts.filter(time => now - time < TIME_WINDOW);
    
    if (submissionAttempts.length >= MAX_ATTEMPTS) {
      alert("⚠️ Demasiados intentos. Espera 1 minuto antes de intentar nuevamente.");
      return false;
    }
    submissionAttempts.push(now);
    
    // 2. OBTENER Y LIMPIAR DATOS
    const formData = new FormData(this);
    const datos = {
      nombre: formData.get('nombre').trim(),
      email: formData.get('email').trim(),
      empresa: formData.get('empresa').trim(),
      asunto: formData.get('asunto').trim(),
      mensaje: formData.get('mensaje').trim()
    };
    
    // 3. VALIDACIÓN DE LONGITUDES
    if (datos.nombre.length < 3 || datos.nombre.length > 100) {
      alert("❌ El nombre debe tener entre 3 y 100 caracteres.");
      return false;
    }
    
    if (datos.asunto.length < 5 || datos.asunto.length > 200) {
      alert("❌ El asunto debe tener entre 5 y 200 caracteres.");
      return false;
    }
    
    if (datos.mensaje.length < 10 || datos.mensaje.length > 5000) {
      alert("❌ El mensaje debe tener entre 10 y 5000 caracteres.");
      return false;
    }
    
    // 4. VALIDACIÓN DE EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(datos.email)) {
      alert("❌ Email no válido. Por favor, verifica.");
      return false;
    }
    
    // 5. DETECCIÓN DE SPAM Y INYECCIONES
    const spamPatterns = [
      /viagra|casino|pharma|lottery|weight loss|click here|buy now/gi,
      /<script|javascript:|onerror|onload|onclick/gi,
      /eval\(|execute\(|expression\(/gi
    ];
    
    const spamText = [datos.mensaje, datos.asunto, datos.nombre].join(" ");
    for (let pattern of spamPatterns) {
      if (pattern.test(spamText)) {
        console.warn("🚨 SEGURIDAD: Contenido SPAM/MALICIOSO detectado");
        alert("❌ Tu mensaje contiene contenido sospechoso. Por favor, verifica.");
        return false;
      }
    }
    
    // 6. ESCAPE HTML (Prevenir XSS)
    const escapeHTML = (str) => {
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return str.replace(/[&<>"']/g, m => map[m]);
    };
    
    // Escapar todos los datos
    datos.nombre = escapeHTML(datos.nombre);
    datos.email = escapeHTML(datos.email);
    datos.asunto = escapeHTML(datos.asunto);
    datos.mensaje = escapeHTML(datos.mensaje);
    
    // 7. LOG DE SEGURIDAD (Para auditoría)
    console.log("✅ SEGURIDAD: Formulario validado correctamente", {
      timestamp: new Date().toISOString(),
      email: datos.email.substring(0, 5) + "***",
      status: "APPROVED"
    });
    
    // 8. MOSTRAR CONFIRMACIÓN
    alert("✅ Tu mensaje fue validado y será enviado. Nos contactaremos pronto.");

    // 9. ENVIAR FORMULARIO: ejecutar reCAPTCHA v3 si está disponible, luego enviar
    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.ready(function() {
        try {
          grecaptcha.execute('6LeMFmAsAAAAAOdDv-jIWq_-ku8lIiqq6wFGBTUC', {action: 'contact'})
            .then(function(token) {
              // Preparar payload para la función serverless
              const payload = {
                nombre: datos.nombre,
                email: datos.email,
                empresa: datos.empresa,
                asunto: datos.asunto,
                mensaje: datos.mensaje,
                'g-recaptcha-response': token
              };

              // Enviar por fetch a Netlify Function (evita recarga de página)
              fetch('/.netlify/functions/submit-contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              }).then(res => res.json())
                .then(resp => {
                  if (resp && resp.ok) {
                    alert('✅ Mensaje enviado correctamente. Gracias por contactarnos.');
                    contactForm.reset();
                  } else {
                    console.warn('Error envío:', resp);
                    alert('❌ No se pudo enviar el mensaje. Intenta más tarde.');
                  }
                }).catch(err => {
                  console.error('Fetch error:', err);
                  alert('❌ Error de red. Intenta de nuevo más tarde.');
                });
            }).catch(function(err) {
              console.warn('⚠️ reCAPTCHA fallo:', err);
              alert('❌ No se pudo validar reCAPTCHA. Intenta de nuevo más tarde.');
            });
        } catch (e) {
          console.warn('⚠️ Error ejecutando reCAPTCHA:', e);
          contactForm.submit();
        }
      });
    } else {
      // reCAPTCHA no cargado: enviar formulario de forma segura
      contactForm.submit();
    }
    // Evitar doble envío desde el handler
    return false;
  });
}

// 4. GESTIÓN DEL CONSENTIMIENTO DE COOKIES
window.addEventListener("DOMContentLoaded", () => {
  try {
    const aceptado = localStorage.getItem('cookiesAceptadas');
    const banner = document.getElementById('cookie-banner');
    const btn = document.getElementById('acceptCookies');

    if (!aceptado && banner) {
      banner.removeAttribute('hidden');
    }

    if (btn) {
      btn.addEventListener('click', () => {
        localStorage.setItem('cookiesAceptadas', 'true');
        if (banner) banner.setAttribute('hidden', '');
      });
    }
  } catch (e) {
    console.warn('⚠️ No se pudo gestionar el banner de cookies:', e);
  }
});

// 5. MEJORAS DE ACCESIBILIDAD
document.addEventListener("DOMContentLoaded", () => {
  // Mejorar navegación por teclado en tarjetas
  document.querySelectorAll(".servicio-card").forEach(card => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "article");
  });

  // Asegurar que los botones sean accesibles
  document.querySelectorAll(".btn-servicio").forEach(btn => {
    if (!btn.getAttribute("aria-label")) {
      btn.setAttribute("aria-label", btn.textContent || "Botón de acción");
    }
  });
});

// 6. DETECCIÓN DE AMBIENTE SEGURO (HTTPS)
if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
  console.warn("⚠️ SEGURIDAD: La página se carga sin HTTPS. Se recomienda certificado SSL.");
}

// 7. MONITOREO DE ERRORES (Sin exposición de datos)
window.addEventListener('error', (event) => {
  console.error('❌ Error detectado:', {
    type: 'error',
    timestamp: new Date().toISOString()
  });
  // No exponer detalles del error al usuario
});

console.log("✅ AnclaTech Solutions - Script cargado con SEGURIDAD AVANZADA");
