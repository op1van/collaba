export default function () {
  const sections = document.querySelectorAll('section');
  let current = 0;
  let isThrottled = false;

  function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;
    current = index;
    sections[current].scrollIntoView({ behavior: 'smooth' });
  }

  function throttle(func, delay) {
    return (...args) => {
      if (isThrottled) return;
      isThrottled = true;
      func(...args);
      setTimeout(() => (isThrottled = false), delay);
    };
  }

  function onWheel(e) {
    if (e.deltaY > 0) {
      scrollToSection(current + 1);
    } else if (e.deltaY < 0) {
      scrollToSection(current - 1);
    }
  }

  let touchStartY = 0;
  let touchEndY = 0;

  function onTouchStart(e) {
    touchStartY = e.changedTouches[0].clientY;
  }

  function onTouchEnd(e) {
    touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        scrollToSection(current + 1);
      } else {
        scrollToSection(current - 1);
      }
    }
  }

  window.addEventListener('wheel', throttle(onWheel, 1000), { passive: true });
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchend', throttle(onTouchEnd, 1000), { passive: true });

  scrollToSection(0);

  const menuLinks = document.querySelectorAll('#main-menu a[href^="#"]');

  function debounce(func, wait = 100) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  function onScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 50;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        menuLinks.forEach(link => {
          link.classList.remove('inactive');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('inactive');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', debounce(onScroll, 100));
}