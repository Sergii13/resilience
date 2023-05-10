/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper, {
  Navigation,
  Autoplay,
  EffectFade,
  Thumbs,
  Pagination,
  Grid,
  Manipulation,
} from "swiper";
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay,
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
//import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
import "swiper/css";

// Ініціалізація слайдерів
let mySwiper = null;
let allSlides = [];

function initSliders() {
  // Список слайдерів
  // Перевіряємо, чи є слайдер на сторінці
  if (document.querySelector(".brand__slider")) {
    // Вказуємо склас потрібного слайдера
    // Створюємо слайдер
    new Swiper(".brand__slider", {
      // Вказуємо склас потрібного слайдера
      // Підключаємо модулі слайдера
      // для конкретного випадку
      modules: [Navigation, Autoplay],
      observer: true,
      observeParents: true,
      slidesPerView: "auto",
      spaceBetween: 33,
      speed: 2000,
      autoHeight: false,
      loop: true,
      allowTouchMove: false,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
      },

      breakpoints: {
        320: {
          spaceBetween: 10,
        },
        768: {
          spaceBetween: 30,
        },
      },

      on: {},
    });
  }
  let thumbsSwiper;
  if (document.querySelector(".history__thumb")) {
    thumbsSwiper = new Swiper(".history__thumb", {
      modules: [Navigation, EffectFade, Thumbs],
      observer: true,
      observeParents: true,
      slidesPerView: "auto",
      spaceBetween: 16,
      speed: 800,
      on: {},
    });
  }
  if (document.querySelector(".history__slider")) {
    new Swiper(".history__slider", {
      modules: [Navigation, EffectFade, Thumbs, Pagination],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 800,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: ".history__pagination",
        clickable: true,
      },
      thumbs: {
        swiper: thumbsSwiper,
      },
      on: {},
    });
  }
  if (document.querySelector(".team2__slider")) {
    mySwiper = new Swiper(".team2__slider", {
      modules: [Navigation, Grid, Manipulation],
      observer: true,
      observeParents: true,
      slidesPerView: 2,
      spaceBetween: 60,
      grid: {
        rows: 2,
      },
      speed: 800,
      navigation: {
        prevEl: ".team2__prev",
        nextEl: ".team2__next",
      },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 45 },
        768: { spaceBetween: 50 },
        991: {
          slidesPerView: 1,
        },
        1100: {
          slidesPerView: 2,
        },
        1500: {
          spaceBetween: 60,
        },
      },
      on: {
        init: function () {
          if (allSlides.length === 0) {
            allSlides = Array.from(this.slides);
          }
        },
      },
    });
  }
}

// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
  let sliderScrollItems = document.querySelectorAll(".swiper_scroll");
  if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
      const sliderScrollItem = sliderScrollItems[index];
      const sliderScrollBar =
        sliderScrollItem.querySelector(".swiper-scrollbar");
      const sliderScroll = new Swiper(sliderScrollItem, {
        observer: true,
        observeParents: true,
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: {
          enabled: true,
        },
        scrollbar: {
          el: sliderScrollBar,
          draggable: true,
          snapOnRelease: false,
        },
        mousewheel: {
          releaseOnEdges: true,
        },
      });
      sliderScroll.scrollbar.updateSize();
    }
  }
}

// const breakpoint = window.matchMedia("(max-width:768px)");
// let mySwiper;
// const breakpointChecker = function () {
//   if (breakpoint.matches === true) {
//     if (mySwiper !== undefined) mySwiper.destroy(true, true);
//
//     return;
//   } else if (breakpoint.matches === false) {
//     return enableSwiper();
//   }
// };
// const enableSwiper = function () {
//   if (document.querySelector(".brand__slider")) {
//     mySwiper = new Swiper(".history__thumb", {
//       modules: [Navigation],
//       observer: true,
//       observeParents: true,
//       slidesPerView: 1,
//       spaceBetween: 0,
//       autoHeight: true,
//       speed: 800,
//       on: {},
//     });
//   }
// };
// breakpoint.addListener(breakpointChecker);
//
// breakpointChecker();

window.addEventListener("load", function (e) {
  // Запуск ініціалізації слайдерів
  initSliders();
  // Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
  //initSlidersScroll();
});

const allFilterBtns = document.querySelectorAll("[data-filter]");
if (allFilterBtns.length > 0) {
  allFilterBtns.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const arrFromBtns = Array.from(allFilterBtns);
      arrFromBtns.forEach((item2) =>
        item2 !== item ? item2.classList.remove("active") : ""
      );
      item.classList.toggle("active");
      if (!item.classList.contains("active")) {
        filteredSlides(mySwiper, allSlides);
      } else {
        filteredSlides(mySwiper, allSlides, item.dataset.filter);
      }
    });
  });
}
document.addEventListener("selectCallback", function (e) {
  const currentSelect = e.detail.select;
  if (mySwiper) {
    filteredSlides(mySwiper, allSlides, currentSelect.value);
  }
});
const filteredSlides = (instance, allSlides2, filter = "all") => {
  let filteredSlidesArr = [];
  if (filter === "all") {
    filteredSlidesArr = allSlides2;
  } else {
    filteredSlidesArr = Array.from(allSlides2).filter((item) => {
      return item.dataset.filterItem === filter;
    });
  }
  instance.removeAllSlides();
  filteredSlidesArr.forEach((item) => instance.appendSlide(item));
  instance.update();
};
