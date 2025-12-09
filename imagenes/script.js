// Activar modo claro/oscuro
const toggleBtn = document.getElementById("modoToggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("modo-oscuro");

  // Guardar preferencia en localStorage
  const esOscuro = document.body.classList.contains("modo-oscuro");
  localStorage.setItem("modoOscuroActivado", esOscuro);
});

// Leer preferencia al cargar
window.addEventListener("DOMContentLoaded", () => {
  const guardado = localStorage.getItem("modoOscuroActivado");
  if (guardado === "true") {
    document.body.classList.add("modo-oscuro");
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
