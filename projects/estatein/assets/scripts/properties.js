// ---------------------- Select ------------------

document.querySelectorAll('.select').forEach(select => {
  const input = select.querySelector('.select-input');
  const visibleSpan = input.querySelector('.visible');
  const optionSpans = input.querySelectorAll('.option');
  const arrowIcon = input.querySelector('.icon-arrow');
  const clearBtn = input.querySelector('.icon-clear');
  const dropMenu = select.querySelector('.drop-menu');
  const items = dropMenu.querySelectorAll('li');

  input.addEventListener('click', (e) => {
    if (e.target === clearBtn) return;

    document.querySelectorAll('.drop-menu').forEach(dm => {
      if (dm !== dropMenu) dm.classList.add('hide');
    });
    dropMenu.classList.toggle('hide');
  });

  items.forEach(li => {
    li.addEventListener('click', () => {
      const selectedIndex = li.getAttribute('data-index');

      visibleSpan.classList.add('hide');
      optionSpans.forEach(span => span.classList.add('hide'));

      optionSpans[selectedIndex].classList.remove('hide');
      clearBtn.classList.remove('hide');
      arrowIcon.classList.add('hide');
      dropMenu.classList.add('hide');
    });
  });

  clearBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    optionSpans.forEach(span => span.classList.add('hide'));
    visibleSpan.classList.remove('hide');
    clearBtn.classList.add('hide');
    arrowIcon.classList.remove('hide');
    dropMenu.classList.add('hide');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.select')) {
      select.querySelectorAll('.drop-menu').forEach(dm => dm.classList.add('hide'));
    }
  });

});



// -------------------- End of Select ---------------------

//---------------------- Radios -------------------------------

const radios = document.querySelectorAll('input[name="preferred_contact"]');
const phoneInput = document.getElementById('proprtsPhoneInput');
const emailInput = document.getElementById('proprtsEemailInput');
const radioTel = document.getElementById("radioTel");
const radioEmail = document.getElementById("radioEmail");


function updateInputState() {
  let selected = document.querySelector('input[name="preferred_contact"]:checked').value;

  if (selected === 'tel') {
    phoneInput.classList.remove('inactive');
    emailInput.classList.add('inactive');
    emailInput.value = '';
  } else {
    phoneInput.classList.add('inactive');
    emailInput.classList.remove('inactive');
    phoneInput.value = '';
  }
}

updateInputState();

radios.forEach(radio => {
  radio.addEventListener('change', updateInputState);
});

phoneInput.addEventListener("focus", () => {
  radioTel.checked = true;
  updateInputState();
});

emailInput.addEventListener("focus", () => {
  radioEmail.checked = true;
  updateInputState();
});



//---------------------- End of Radios -------------------------------




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

async function renderPropertyCards() {
  let data = await fetchUrl("https://andriisheptun.github.io/tasks/js/properties_full_updated.json");

  let wrapper = document.getElementById("propertySwiper");

  data.forEach(item => {
    let slide = document.createElement("div");
    slide.classList.add("swiper-slide", "swiper1-slide");

    let shortDesc = item.description.length > 70
      ? item.description.slice(0, 70) + "..."
      : item.description;

    let bedroomsText = `${item.bedrooms}-Bedroom${item.bedrooms !== 1 ? "s" : ""}`;

    let bathroomsText = `${item.bathrooms}-Bathroom${item.bathrooms !== 1 ? 's' : ''}`;

    slide.innerHTML = `
              <img src="${item.images.exterior}" alt="Photo: ${item.title}">
              <div class="swiper-content">
                <h3>${item.title}</h3>
                <p class="obscured-text">
                  ${shortDesc} <a href="#">Read More</a>
                </p>
              </div>
  
              <div class="icon-boxes d-flex">
                <div class="icon-boxes-item border d-flex">
                  <svg width="20px" height="20px">
                    <use xlink:href="assets/images/sprite.svg#bedroom"></use>
                  </svg>
                  <span>${bedroomsText}</span>
                </div>
                <div class="icon-boxes-item border d-flex">
                  <svg width="20px" height="20px">
                    <use xlink:href="assets/images/sprite.svg#bathroom"></use>
                  </svg>
                  <span>${bathroomsText}</span>
                </div>
                <div class="icon-boxes-item border d-flex">
                  <svg width="20px" height="20px">
                    <use xlink:href="assets/images/sprite.svg#villa"></use>
                  </svg>
                  <span>${item.type}</span>
                </div>
              </div>
  
              <div class="swiper-price d-flex items-center space-between">
                <div class="price-item d-flex">
                  <p class="obscured-text">Price</p>
                  <p>$${item.price.toLocaleString('en-US')}</p>
                </div>
                <a href="#" class="btn btn-fill__main-color">View Property Details</a>
              </div>`;

    wrapper.appendChild(slide);

  })
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

document.addEventListener('DOMContentLoaded', async () => {
  await renderPropertyCards()
  initSwipers();
});
