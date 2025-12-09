// Activar modo claro/oscuro
const toggleBtn = document.getElementById("modoToggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("modo-oscuro");

  // Puedes guardar preferencia en localStorage (opcional)
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

// Activar animaciones al hacer scroll
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

// Detectar scroll
window.addEventListener("scroll", revelarElementosAlScroll);
window.addEventListener("load", revelarElementosAlScroll);
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("aparecer");
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll(".fade-in").forEach((el) => {
  observador.observe(el);
});