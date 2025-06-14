document.addEventListener('touchstart', () => { }, true);


const topSection = document.getElementById("topSection");
const bannerClose = document.getElementById("bannerClose");
const banner = document.getElementById("banner");
const iconOpen = document.getElementById("iconOpen");
const iconClose = document.getElementById("iconClose");
const headerMenu = document.getElementById("headerMenu");


bannerClose.addEventListener("click", () => {
  banner.classList.toggle("hide");
  headerMenu.classList.toggle("max-height");
  topSection.classList.toggle("hero-height");
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
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1440: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1920: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});


let swiper2 = new Swiper(".two-item-swiper", {
  pagination: {
    el: ".swipe-pagination",
    type: "fraction",
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