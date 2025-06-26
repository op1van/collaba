export default function () {
  const variants = [
    ["community", "over", "industry"],
    ["curation", "over", "strict contracts"],
    ["self-joy", "over", "pretentiousness"],
  ];

  const container = document.getElementById("dynamic-text");
  let currentVariant = 0;
  let isAnimating = false;

  function showNextVariant() {
    if (isAnimating) return;
    isAnimating = true;
    container.style.opacity = 0;

    setTimeout(() => {
      const pick = variants[currentVariant];
      container.innerHTML = `
                <div>${pick[0]}</div>
                <div>${pick[1]}</div>
                <div>${pick[2]}</div>
            `;
      currentVariant = (currentVariant + 1) % variants.length;
      container.style.opacity = 1;
      isAnimating = false;
    }, 800);
  }

  showNextVariant();
  setInterval(showNextVariant, 5000);

// Меняем цвета меню на втором экране
  const sections = document.querySelector('.sections');
  function updateMenuColor() {
    const els = [
      document.getElementById("main-menu"),
      document.getElementById("social-menu"),
      document.getElementById("bottom-links"),
      document.getElementById("logo"),
    ]

    console.log(sections.scrollTop, window.innerHeight - 10);

    if (sections.scrollTop >= window.innerHeight - 10) {
      els.forEach(el => el.classList.add("white-menu"));
    } else {
      els.forEach(el => el.classList.remove("white-menu"));
    }
  }
  sections.addEventListener("scroll", updateMenuColor);

  window.addEventListener('load', () => {
    const container = document.getElementById('random_imgs');
    const images = Array.from(container.querySelectorAll('img'));
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const size = 64; // размер картинок в px

    // Разделим область на 3 вертикальных зоны по ширине
    const zones = [
      { xMin: 0, xMax: containerWidth / 3 - size },
      { xMin: containerWidth / 3, xMax: (2 * containerWidth) / 3 - size },
      { xMin: (2 * containerWidth) / 3, xMax: containerWidth - size }
    ];

    images.forEach((img, i) => {
      const zone = zones[i]; // для каждой картинки своя зона

      const x = zone.xMin + Math.random() * (zone.xMax - zone.xMin);
      const y = Math.random() * (containerHeight - size);

      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
    });
  });
}