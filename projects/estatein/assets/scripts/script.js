document.addEventListener('touchstart', () => { }, true);

const topSection = document.getElementById("topSection");
const bannerClose = document.getElementById("bannerClose");
const banner = document.getElementById("banner");
const iconOpen = document.getElementById("iconOpen");
const iconClose = document.getElementById("iconClose");
const headerMenu = document.getElementById("headerMenu");

document.addEventListener("DOMContentLoaded", function runOncePerUser() {

  if (sessionStorage.getItem("bannerClosed")) return
  else {
    banner.classList.remove("hide");
    headerMenu.classList.remove("max-height");
    topSection.classList.remove("hero-height");
  }
});

bannerClose.addEventListener("click", () => {
  banner.classList.add("hide");
  headerMenu.classList.add("max-height");
  topSection.classList.add("hero-height");
  sessionStorage.setItem("bannerClosed", "true");
});


iconOpen.addEventListener("click", () => {
  iconOpen.classList.toggle("hide");
  iconClose.classList.toggle("hide");
  headerMenu.classList.toggle("header-menu-hide");
});

iconClose.addEventListener("click", () => {
  iconOpen.classList.toggle("hide");
  iconClose.classList.toggle("hide");
  headerMenu.classList.toggle("header-menu-hide");
});

headerMenu.addEventListener("click", () => {
  iconOpen.classList.toggle("hide");
  iconClose.classList.toggle("hide");
  headerMenu.classList.toggle("header-menu-hide");
});

document.querySelectorAll('#standartSwipers .mySwiper').forEach((swiperEl) => {
  const paginationEl = swiperEl.querySelector('.swipe-pagination');
  const nextBtn = swiperEl.querySelector('.swipe-button-next');
  const prevBtn = swiperEl.querySelector('.swipe-button-prev');

  new Swiper(swiperEl, {
    pagination: {
      el: paginationEl,
      type: "fraction",
      renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' +
          ' of ' +
          '<span class="' + totalClass + '"></span>';
      },
      formatFractionCurrent: function (number) {
        return number.toString().padStart(2, '0');
      },
      formatFractionTotal: function (number) {
        return number.toString().padStart(2, '0');
      },
    },
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1920: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
});


let swiper2 = new Swiper(".two-item-swiper", {
  pagination: {
    el: ".swipe-pagination",
    type: "fraction",
    renderFraction: function (currentClass, totalClass) {
      return '<span class="' + currentClass + '"></span>' +
        ' of ' +
        '<span class="' + totalClass + '"></span>';
    },
    formatFractionCurrent: function (number) {
      return number.toString().padStart(2, '0');
    },
    formatFractionTotal: function (number) {
      return number.toString().padStart(2, '0');
    },
  },
  navigation: {
    nextEl: ".swipe-button-next",
    prevEl: ".swipe-button-prev",
  },
  breakpoints: {
    1024: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1920: {
      slidesPerView: 2,
      spaceBetween: 50,
    },
  },
});

const thumbsEl = document.getElementById('thumbsEl');
const mainSwiperEl = document.getElementById('mainSwiperEl');
const paginationDblEl = document.getElementById('paginationDblEl');
const nextDblBtn = document.getElementById('nextDblBtn');
const prevDblBtn = document.getElementById('prevDblBtn');

let thumbsSwiper = new Swiper(thumbsEl, {
  spaceBetween: 10,
  slidesPerView: 4,
  slidesPerGroup: 2,
  freeMode: true,
  watchSlidesProgress: true,
  pagination: {
    el: paginationDblEl,
    type: "bullets",
    clickable: true,
  },
  navigation: {
    nextEl: nextDblBtn,
    prevEl: prevDblBtn,
  },
  breakpoints: {
    768: {
      slidesPerView: 6,
      spaceBetween: 10,
      slidesPerGroup: 1,
    },
    1440: {
      slidesPerView: 8,
      spaceBetween: 10,
      slidesPerGroup: 1,
    },
    1920: {
      spaceBetween: 20,
      slidesPerGroup: 1,
    },
  },
});

let mainSwiper = new Swiper(mainSwiperEl, {
  spaceBetween: 10,
  thumbs: {
    swiper: thumbsSwiper,
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // 1024: {
    //   slidesPerView: 2,
    //   spaceBetween: 20,
    // },
    // 1440: {
    //   slidesPerView: 2,
    //   spaceBetween: 20,
    // },
    1920: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
  },
});