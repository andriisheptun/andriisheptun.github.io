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

let swiper = new Swiper(".mySwiper", {
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

let detailsSwiper = new Swiper(".details-Swiper", {
  spaceBetween: 10,
  slidesPerView: 9,
  freeMode: true,
  watchSlidesProgress: true,
});

let detailsSwiper2 = new Swiper(".details-Swiper2", {
  spaceBetween: 10,
  slidesPerView: 2,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});