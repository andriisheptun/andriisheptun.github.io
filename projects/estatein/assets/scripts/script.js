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



const themeRadios = document.querySelectorAll('input[name="theme"]');
const body = document.body;

function setTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.remove('light');
    localStorage.setItem('theme', 'dark');
  }
}

function loadTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.getElementById(`theme-${theme}`).checked = true;
  setTheme(theme);
}

themeRadios.forEach(radio => {
  radio.addEventListener('change', (e) => setTheme(e.target.value));
});

loadTheme();

