// Hero background image rotation
const bg = document.querySelector('.hero-bg');
const images = [
  'asset/image/cinnamonb.png',
  'asset/image/dropcinnamon.png',
  'asset/image/cinnamon2.png'
];

let current = 0;

function changeBackground() {
  bg.style.transition = 'opacity 0.5s ease';
  bg.style.opacity = 0;

  setTimeout(() => {
    bg.style.backgroundImage = `url('${images[current]}')`;
    bg.style.opacity = 1;
    current = (current + 1) % images.length;
  }, 500);
}

setInterval(changeBackground, 5000);
window.addEventListener('load', changeBackground);

// Timeline animation observer
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        timelineObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.timeline-item').forEach((item) => {
  timelineObserver.observe(item);
});

// Scroll-fade animation observer
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.5) { // Trigger when 50% or more is visible
        entry.target.classList.add('visible');
      } else if (entry.intersectionRatio < 0.1) { // Remove only when less than 10% is visible
        entry.target.classList.remove('visible');
      }
    });
  },
  { threshold: [0.1, 0.5, 1.0] } // Check at 10%, 50%, and 100% visibility
);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.scroll-fade').forEach((section) => {
    fadeObserver.observe(section);
  });
});
// NEW: Lazy loading observer for background images
    const lazyBackgroundObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Stop observing the element once it's visible
            observer.unobserve(entry.target);
          }
        });
      },
      // Start loading when the element is 200px away from the viewport
      { rootMargin: '0px 0px 200px 0px' }
    );

    document.querySelectorAll('.lazy-background').forEach((section) => {
      lazyBackgroundObserver.observe(section);
    });

// End of DOMContentLoaded