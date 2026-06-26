// Gentle reveal of timeline entries as they enter view — respects reduced-motion via CSS.
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.tl-item');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.2 });

    items.forEach((item) => io.observe(item));
  } else {
    // Fallback for browsers without IntersectionObserver support
    items.forEach((item) => item.classList.add('is-visible'));
  }
});