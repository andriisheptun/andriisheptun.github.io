const iconContainer = document.getElementById("iconsContainer");
const iconOpen = document.getElementById("iconOpen");
const iconClose = document.getElementById("iconClose");
const headerMenu = document.getElementById("headerMenu");

iconContainer.addEventListener("click", () => {
  iconOpen.classList.toggle("hide");
  iconClose.classList.toggle("hide");
  headerMenu.classList.toggle("header-menu-hide");
});

headerMenu.addEventListener("click", () => {
  iconOpen.classList.toggle("hide");
  iconClose.classList.toggle("hide");
  headerMenu.classList.toggle("header-menu-hide");
});
