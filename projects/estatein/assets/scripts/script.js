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

async function fetchUrl(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to load: ' + response.status);
    }
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function renderFAQCards() {
  let data = await fetchUrl('https://andriisheptun.github.io/tasks/js/estatein_faq.json');

  let wrapper = document.getElementById('faq').querySelector('.swiper-wrapper');

  data.forEach(item => {
    let slide = document.createElement('div');

    slide.classList.add('swiper-slide', 'swiper3-slide');
    slide.innerHTML = `
      <h3>${item.question}</h3>
      <p class="obscured-text">${item.description}</p>
      <a href="#" class="btn btn-fill__black">Read More</a>  
  `;

    wrapper.appendChild(slide);
  });
}

async function renderTestimonialsCards() {
  let data = await fetchUrl('https://andriisheptun.github.io/tasks/js/client_reviews.json');

  let wrapper = document.getElementById('testimonials').querySelector('.swiper-wrapper');

  data.forEach(item => {
    let slide = document.createElement('div');
    slide.classList.add('swiper-slide', 'swiper2-slide');

    let rating = document.createElement('div');
    rating.classList.add('rating', 'd-flex');

    for (let i = 0; i < item.rating; i++) {
      let star = document.createElement('div');
      star.classList.add('stars', 'border', 'd-flex', 'items-center');
      star.innerHTML = `
        <svg class="star" width="20" height="20">
          <use xlink:href="assets/images/sprite.svg#star"></use>
        </svg>`;
      rating.appendChild(star);
    }

    let content = document.createElement('div');
    content.classList.add('swiper2-content', 'main-section-title', 'always-full-width', 'd-flex');
    content.innerHTML = `
      <h3>${item.title}</h3>
      <p class="obscured-text">${item.review}</p>
    `;

    let profile = document.createElement('div');
    profile.classList.add('swiper2-profile', 'd-flex', 'align-center');
    profile.innerHTML = `
      <img src="${item.photo}" alt="${item.name}" class="swiper2-photo bg-cover">
      <div class="swiper2-name-block">
        <p>${item.name}</p>
        <p class="obscured-text">${item.location}</p>
      </div>
    `;

    slide.appendChild(rating);
    slide.appendChild(content);
    slide.appendChild(profile);

    wrapper.appendChild(slide);
  });
}





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

renderTestimonialsCards();
renderFAQCards();
