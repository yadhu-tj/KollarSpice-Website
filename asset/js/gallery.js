const track = document.getElementById('track');
const originalHTML = track.innerHTML;
const scrollSpeed = 0.3;
let scrollX = 0;
let patternWidth = 0;
let animationFrame;
let lastViewportWidth = window.innerWidth;

// Unified lazy loading observer
let unifiedObserver;

function createUnifiedObserver() {
  if (unifiedObserver) {
    unifiedObserver.disconnect();
  }
  
  unifiedObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          
          // Handle loading states
          img.addEventListener('load', () => {
            img.classList.add('loaded');
            const masonryItem = img.closest('.masonry-item');
            if (masonryItem) {
              masonryItem.style.animationPlayState = 'running';
            }
          });
          
          img.addEventListener('error', () => {
            img.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23666666" font-family="sans-serif" font-size="16" dy=".5em" text-anchor="middle" x="200" y="150"%3EImage not found%3C/text%3E%3C/svg%3E';
            img.alt = 'Failed to load image';
            img.classList.add('loaded');
            const masonryItem = img.closest('.masonry-item');
            if (masonryItem) {
              masonryItem.style.animationPlayState = 'running';
            }
          });
        }
        unifiedObserver.unobserve(img);
      }
    });
  }, { rootMargin: '300px', threshold: 0.01 });
}

function observeAllImages() {
  // Observe all images with data-src
  document.querySelectorAll('img[data-src]').forEach(img => {
    unifiedObserver.observe(img);
    
    // Pause masonry animation until image loads
    const masonryItem = img.closest('.masonry-item');
    if (masonryItem) {
      masonryItem.style.animationPlayState = 'paused';
    }
  });
}

function setupTrack() {
  track.innerHTML = originalHTML;
  const clone = track.cloneNode(true);
  clone.style.visibility = 'hidden';
  clone.style.position = 'absolute';
  document.body.appendChild(clone);
  patternWidth = clone.scrollWidth;
  document.body.removeChild(clone);

  const totalCopies = Math.ceil(window.innerWidth * 6 / patternWidth);
  for (let i = 0; i < totalCopies; i++) {
    track.innerHTML += originalHTML;
  }
  scrollX = 0;
  cancelAnimationFrame(animationFrame);
  animateScroll();
  
  // Re-observe all images after rebuilding track
  observeAllImages();
  
  lastViewportWidth = window.innerWidth;
}

function animateScroll() {
  scrollX += scrollSpeed;
  if (scrollX >= patternWidth) {
    scrollX = 0;
  }
  track.style.transform = `translateX(-${scrollX}px)`;
  animationFrame = requestAnimationFrame(animateScroll);
}

// Initialize observer and setup track
window.addEventListener('load', () => {
  createUnifiedObserver();
  setupTrack();
});

window.addEventListener('resize', setupTrack);

// Add simple viewport width monitoring for dev tools responsive toggle
setInterval(() => {
  const currentWidth = window.innerWidth;
  if (Math.abs(currentWidth - lastViewportWidth) > 100) {
    console.log('Viewport width changed significantly, rebuilding...');
    setupTrack();
  }
}, 1000);

// Fade observers for text elements
window.addEventListener('load', () => {
  const fadeTextUnderGrid = document.getElementById('fadeTextUnderGrid');
  const fadeTextBelow = document.getElementById('fadeTextBelow');

  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.add('visible');
        el.classList.remove('hidden');
      } else {
        el.classList.remove('visible');
        el.classList.add('hidden');
      }
    });
  }, { threshold: 0.3 });

  if (fadeTextUnderGrid) fadeObserver.observe(fadeTextUnderGrid);
  if (fadeTextBelow) fadeObserver.observe(fadeTextBelow);
});

// Parallax Text Movement
window.addEventListener('scroll', () => {
  const text = document.getElementById('fadeTextUnderGrid');
  const textBelow = document.getElementById('fadeTextBelow');
  if (text && textBelow) {
    const offset = window.scrollY;
    text.style.transform = `translate(-50%, calc(-50% + ${offset * 0.1}px))`;
    textBelow.style.transform = `translateY(${30 - offset * 0.1}px)`;
  }
});

// Floating Particles
function createParticle() {
  const particle = document.createElement('div');
  const container = document.getElementById('particleContainer');
  if (!container) return;
  
  const size = Math.random() * 8 + 4;
  particle.className = 'particle';
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.animationDuration = `${8 + Math.random() * 10}s`;
  container.appendChild(particle);
  setTimeout(() => {
    if (container.contains(particle)) {
      container.removeChild(particle);
    }
  }, 20000);
}

setInterval(createParticle, 300);

// Fullscreen zoom-in on image click
const fullscreenViewer = document.getElementById('fullscreenViewer');
const zoomedImage = document.getElementById('zoomedImage');

document.addEventListener('click', e => {
  const target = e.target;
  if (target.tagName === 'IMG' && target.closest('.grid-item')) {
    if (fullscreenViewer && zoomedImage) {
      zoomedImage.src = target.src;
      fullscreenViewer.classList.add('active');
    }
  } else if (target.id === 'fullscreenViewer' || target === zoomedImage) {
    if (fullscreenViewer && zoomedImage) {
      fullscreenViewer.classList.remove('active');
      zoomedImage.src = '';
    }
  }
});

/* Masonry grid effects */
document.addEventListener('DOMContentLoaded', function() {
  // Click Ripple Effect
  const masonryItems = document.querySelectorAll('.masonry-item');
  
  masonryItems.forEach(item => {
    item.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.add('clicked');
        setTimeout(() => {
          this.classList.remove('clicked');
        }, 600);
      }
    });
  });

  // Performance Optimizations
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Recalculate any layout-dependent elements if needed
    }, 200);
  });

  // Clean up observers when leaving page
  window.addEventListener('beforeunload', () => {
    if (unifiedObserver) {
      unifiedObserver.disconnect();
    }
  });

  // Accessibility Improvements
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close any open overlays or modals here
      if (fullscreenViewer && fullscreenViewer.classList.contains('active')) {
        fullscreenViewer.classList.remove('active');
        if (zoomedImage) zoomedImage.src = '';
      }
    }
  });

  // Make items focusable
  masonryItems.forEach((item, index) => {
    item.setAttribute('tabindex', '0');
    const title = item.querySelector('.item-title')?.textContent || 'Untitled';
    item.setAttribute('aria-label', `Gallery item ${index + 1}: ${title}`);
  });
});