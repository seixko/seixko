let currentIndex = 0;
const track = document.getElementById('carouselTrack');
const totalItems = track.children.length;

function moveSlide(direction) {
  currentIndex += direction;

  if (currentIndex < 0) currentIndex = totalItems - 1;
  if (currentIndex >= totalItems) currentIndex = 0;

  const width = track.clientWidth;
  track.style.transform = `translateX(-${currentIndex * width}px)`;
}
