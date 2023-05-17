import Swiper, {
  Navigation,
  Autoplay,
  EffectFade,
  Thumbs,
  Pagination,
  Grid,
  Manipulation,
} from "swiper";

import "swiper/css";

let mySwiper = null;
let allSlides = [];

function initSliders() {
  if (document.querySelector(".brand__slider")) {
    new Swiper(".brand__slider", {
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
  if (document.querySelector(".elem__slider")) {
    mySwiper = new Swiper(".elem__slider", {
      modules: [Navigation, Pagination, Autoplay],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 60,
      speed: 800,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      loop: true,
      pagination: {
        el: ".elem__pagination",
        clickable: true,
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
        320: {
          slidesPerView: 1,
          spaceBetween: 45,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 50,
        },
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
  if (document.querySelector(".nomics__slider")) {
    mySwiper = new Swiper(".nomics__slider", {
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 3,
      spaceBetween: 38,
      speed: 800,
      navigation: {
        prevEl: ".nomics__prev",
        nextEl: ".nomics__next",
      },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 20 },
        600: { slidesPerView: 2, spaceBetween: 20 },
        991: {
          slidesPerView: 3,
        },
        1100: {
          spaceBetween: 38,
        },
      },
      on: {},
    });
  }
  if (document.querySelector(".podcast__slider")) {
    mySwiper = new Swiper(".podcast__slider", {
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 4,
      spaceBetween: 30,
      speed: 800,
      navigation: {
        prevEl: ".podcast__prev",
        nextEl: ".podcast__next",
      },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 20 },
        600: { slidesPerView: 2 },
        991: {
          slidesPerView: 3,
        },
        1100: {
          spaceBetween: 30,
        },
      },
      on: {},
    });
  }
}

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

const breakpoint = window.matchMedia("(min-width:991px)");
let mySwiperInfo;
const breakpointChecker = function () {
  if (breakpoint.matches === true) {
    if (mySwiperInfo !== undefined) mySwiperInfo.destroy(true, true);

    return;
  } else if (breakpoint.matches === false) {
    return enableSwiper();
  }
};
const enableSwiper = function () {
  if (document.querySelector(".info__wrap")) {
    mySwiperInfo = new Swiper(".info__wrap", {
      modules: [Pagination],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 800,
      pagination: {
        el: ".info__pagination",
        clickable: true,
      },
      on: {},
    });
  }
};
breakpoint.addListener(breakpointChecker);

breakpointChecker();

window.addEventListener("load", function (e) {
  initSliders();
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
