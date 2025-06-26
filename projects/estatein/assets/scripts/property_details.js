let faqData = {};
let propertyData = {};

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
  faqData = await fetchUrl('https://andriisheptun.github.io/tasks/js/estatein_faq.json');

  let wrapper = document.getElementById('faqSwiper');

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

function initSwipers() {
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
      1920: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
    },
  });
}

async function renderPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) return;

  try {
    const response = await fetch("https://andriisheptun.github.io/tasks/js/properties_full_updated.json");

    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    const item = data.find(item => item.id == id);

    if (item) {

      let titleOne = document.getElementById("titleOne");
      titleOne.textContent = item.title;

      let location = document.getElementById("location");
      location.textContent = item.location;

      let priceOne = document.getElementById("priceOne");
      priceOne.textContent = `$${item.price.toLocaleString('en-US')}`;

      let description = document.getElementById("description");
      description.textContent = item.description;

      let bedrooms = document.getElementById("bedrooms");
      bedrooms.textContent = `0${item.bedrooms}`;

      let bathrooms = document.getElementById("bathrooms");
      bathrooms.textContent = `0${item.bathrooms}`;

      let area = document.getElementById("area");
      area.textContent = `${item.area.toLocaleString('en-US')} Square Feet`;

      let keyFeatures = document.getElementById("keyFeatures");
      item.keyFeaturesAndAmenities.forEach(f => {
        let li = document.createElement("li");
        li.classList.add("d-flex", "align-center");
        li.innerHTML = `
          <svg width="14" height="16">
            <use xlink:href="assets/images/sprite.svg#bolt"></use>
          </svg>
          <span class="obscured-text">${f}</span>`
        keyFeatures.appendChild(li);
      });

      let titleTwo = document.getElementById("titleTwo");
      titleTwo.textContent = item.title;

      let titleLocat = document.getElementById("titleAndLocation");
      titleLocat.value = `${item.title}, ${item.location}`;

      let priceTwo = document.getElementById("priceTwo");
      priceTwo.textContent = `$${item.price.toLocaleString('en-US')}`;

      let propertyTransferTax = document.getElementById("propertyTransferTax");
      propertyTransferTax.textContent = `$${item.additionalFees.propertyTransferTax.toLocaleString('en-US')}`;

      let legalFees = document.getElementById("legalFees");
      legalFees.textContent = `$${item.additionalFees.legalFees.toLocaleString('en-US')}`;

      let homeInspection = document.getElementById("homeInspection");
      homeInspection.textContent = `$${item.additionalFees.homeInspection.toLocaleString('en-US')}`;

      let propertyInsurance = document.getElementById("propertyInsurance");
      propertyInsurance.textContent = `$${item.additionalFees.propertyInsurance.toLocaleString('en-US')}`;

      let mortgageFees = document.getElementById("mortgageFees");
      let value = item.additionalFees.mortgageFees;

      if (typeof value === 'number' && !isNaN(value)) {
        mortgageFees.textContent = `$${value.toLocaleString('en-US')}`;
      } else {
        mortgageFees.textContent = value;
      }

      let propertyTaxes = document.getElementById("propertyTaxes");
      propertyTaxes.textContent = `$${item.monthlyCosts.propertyTaxes.toLocaleString('en-US')}`;

      let hoaFee = document.getElementById("hoaFee");
      hoaFee.textContent = `$${item.monthlyCosts.hoaFee.toLocaleString('en-US')}`;

      let priceThree = document.getElementById("priceThree");
      priceThree.textContent = `$${item.price.toLocaleString('en-US')}`;


      let additionalFees = document.getElementById("additionalFees");
      let fees = item.additionalFees;

      let total = 0;

      for (let key in fees) {
        let value = fees[key];
        if (typeof value === 'number' && !isNaN(value)) {
          total += value;
        }
      }
      additionalFees.textContent = `$${total.toLocaleString('en-US')}`;

      let downPayment = document.getElementById("downPayment");
      if (typeof item.price === 'number' && !isNaN(item.price)) {
        let percent20 = item.price * 0.2;
        downPayment.textContent = `$${percent20.toLocaleString('en-US')}`;
      }

      let mortgageAmount = document.getElementById("mortgageAmount");
      if (typeof item.price === 'number' && !isNaN(item.price)) {
        let percent80 = item.price * 0.8;
        mortgageAmount.textContent = `$${percent80.toLocaleString('en-US')}`;
      }

      let propertyTaxesTwo = document.getElementById("propertyTaxesTwo");
      propertyTaxesTwo.textContent = `$${item.monthlyCosts.propertyTaxes.toLocaleString('en-US')}`;

      let hoaFeeTwo = document.getElementById("hoaFeeTwo");
      hoaFeeTwo.textContent = `$${item.monthlyCosts.hoaFee.toLocaleString('en-US')}`;

      let insurance = document.getElementById("insurance");
      insurance.textContent = `$${item.monthlyCosts.insurance.toLocaleString('en-US')}`;




      console.log("Property:", item);
    } else {
      console.warn("Property not found");
    }

  } catch (error) {
    console.error("Error loading property:", error);
  }
}



document.addEventListener('DOMContentLoaded', async () => {
  await renderPage();
  await renderFAQCards();
  initSwipers();
});

// 2. Показ модалки по індексу
const faqContainer = document.getElementById('faqSwiper');
const modal = document.getElementById("faqModal");
const modalQuestion = document.getElementById("modalQuestion");
const modalAnswer = document.getElementById("modalAnswer");
const modalClose = document.getElementById("faqModal").querySelector(".modal-close");

// Делегування події на кнопку Read more
faqContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn")) {
    const index = +event.target.dataset.index;
    const item = faqData[index];

    modalQuestion.textContent = item.question;
    modalAnswer.textContent = item.fullDescription;
    modal.classList.remove("hide");
  }
});

// Закриття модалки
modalClose.addEventListener("click", () => modal.classList.add("hide"));
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hide");
});




