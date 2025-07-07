import { register } from "swiper/element/bundle";

export default () => {
  register();
};

window.addEventListener("load", () => {
  const swiper = document.querySelector("swiper-container");

  Object.assign(swiper, {
    class: "section",
    direction: "vertical",
    scrollbar: true,
    speed: 700,
    mousewheel: {
      forceToAxis: true,
    },
    freeMode: true,
    breakpoints: {
      480: {
        freeMode: false,
      },
    },
    on: {
      slideChange: (e) => {
        if (e.activeIndex !== 0) {
          document.body.classList.add("white-menu");
        } else {
          document.body.classList.remove("white-menu");
        }
      },
    },
  });

  swiper.initialize();
});
