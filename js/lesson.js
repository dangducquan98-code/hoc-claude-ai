// === SCROLL TO TOP ===
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// === KEYBOARD NAVIGATION ===
document.addEventListener('keydown', function(e) {
  // Left arrow -> previous lesson
  if (e.key === 'ArrowLeft') {
    var prev = document.querySelector('.nav-prev');
    if (prev && prev.href) window.location.href = prev.href;
  }
  // Right arrow -> next lesson
  if (e.key === 'ArrowRight') {
    var next = document.querySelector('.nav-next');
    if (next && next.href) window.location.href = next.href;
  }
});
