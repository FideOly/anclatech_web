// Activar modo claro/oscuro (si existe el botón)
const toggleBtn = document.getElementById("modoToggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("modo-oscuro");

    // Guardar preferencia en localStorage
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
});

// Gestión del consentimiento de cookies
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
    // Fallback silencioso
    console.warn('No se pudo gestionar el banner de cookies:', e);
  }
});

// Activar animaciones al hacer scroll con IntersectionObserver
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.1
});

// Observar elementos con clase 'fade-in'
document.querySelectorAll(".fade-in").forEach((el) => {
  observador.observe(el);
});
