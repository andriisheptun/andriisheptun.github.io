let companies = [];

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


async function renderCompaniesCards() {
  propertyData = await fetchUrl("https://andriisheptun.github.io/tasks/js/company_review.json");

  let wrapper = document.getElementById("companiesSwiper");

  propertyData.forEach(item => {
    let slide = document.createElement("div");
    slide.classList.add("swiper-slide", "two-item-swiper-slide", "border", "d-flex", "box-shadow-6");

    slide.innerHTML = `
            <div class="two-item-swiper-head d-flex space-between">
              <div class="two-item-swiper-title d-flex">
                <span class="obscured-text">Since ${item.since}</span>
                <h3>${item.name}</h3>
              </div>
              <a href="${item.website}" class="btn btn-fill__black">Visit Website</a>
            </div>

            <div class="two-item-swiper-descr d-grid">

              <div class="descr-item d-flex grid-item-1">
                <div class="descr-item-title d-flex align-center obscured-text">
                  <svg width="18px" height="18px">
                    <use xlink:href="assets/images/sprite.svg#domain"></use>
                  </svg>
                  <span>Domain</span>
                </div>
                <p>${item.domain}</p>
              </div>

              <div class="descr-item d-flex grid-item-2">
                <div class="descr-item-title d-flex align-center obscured-text">
                  <svg width="18px" height="18px">
                    <use xlink:href="assets/images/sprite.svg#category"></use>
                  </svg>
                  <span>Category</span>
                </div>
                  <p>${item.category}</p>
              </div>

              <div class="descr-line grid-item-3"></div>

            </div>

            <div class="two-item-swiper-comment border b-radius-12 d-flex">
              <p class="obscured-text">What They Said 🤗</p>
              <p>${item.testimonial}</p>`;

    wrapper.appendChild(slide);

  })
}


function initCompanySwiper() {
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
};



document.addEventListener('DOMContentLoaded', async () => {
  await renderCompaniesCards();
  initCompanySwiper();
});