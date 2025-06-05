let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById('carouselTrack');
  if (!track) {
    console.error("Elemento 'carouselTrack' no encontrado.");
    return;
  }

  const totalItems = track.children.length;

  function moveSlide(direction) {
    currentIndex += direction;

    if (currentIndex < 0) currentIndex = totalItems - 1;
    if (currentIndex >= totalItems) currentIndex = 0;

    const itemWidth = track.children[0].offsetWidth + 20; // incluye gap
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }

  // Exponer globalmente
  window.moveSlide = moveSlide;

  // MENÚ lateral si lo tenés
  const sidebar = document.getElementById("mySidebar");
  const openBtn = document.getElementById("openSidebar");
  const closeBtn = document.getElementById("closeSidebar");

  if (sidebar && openBtn && closeBtn) {
    openBtn.addEventListener("click", () => {
      sidebar.classList.add("open");
    });

    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });

    document.addEventListener("click", (e) => {
      if (
        sidebar.classList.contains("open") &&
        !sidebar.contains(e.target) &&
        e.target !== openBtn
      ) {
        sidebar.classList.remove("open");
      }
    });
  }
});
