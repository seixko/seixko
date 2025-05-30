document.addEventListener("DOMContentLoaded", () => {
  // Inicializar EmailJS
  emailjs.init("Fpe5tRctjPyoNIDyD");

  // Formulario de contacto
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      emailjs.sendForm("service_xppniqp", "template_2a0lq7k", this)
        .then(function () {
          document.getElementById("success-message").style.display = "block";
          contactForm.reset();
        }, function (error) {
          alert("Error al enviar el formulario: " + JSON.stringify(error));
        });
    });
  }

  // MENÚ
  const sidebar = document.getElementById("mySidebar");
  const openBtn = document.getElementById("openSidebar");
  const closeBtn = document.getElementById("closeSidebar");

  if (openBtn && sidebar) {
    openBtn.addEventListener("click", () => {
      sidebar.classList.add("open");
    });
  }

  if (closeBtn && sidebar) {
    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });
  }

  // Cerrar sidebar si se clickea fuera de él (mejora UX en móvil)
  document.addEventListener("click", (e) => {
    if (
      sidebar &&
      sidebar.classList.contains("open") &&
      !sidebar.contains(e.target) &&
      e.target !== openBtn
    ) {
      sidebar.classList.remove("open");
    }
  });
});
