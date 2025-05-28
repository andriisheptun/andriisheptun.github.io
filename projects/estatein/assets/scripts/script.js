const heroSection = document.getElementById("heroSection");
const bannerClose = document.getElementById("bannerClose");
const banner = document.getElementById("banner");
const head = document.getElementById("head");
const iconOpen = document.getElementById("iconOpen");
const iconClose = document.getElementById("iconClose");
const headerMenu = document.getElementById("headerMenu");



bannerClose.addEventListener("click", () => {
  banner.classList.toggle("hide");
  headerMenu.classList.toggle("max-height");
  heroSection.classList.toggle("hero-height");
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