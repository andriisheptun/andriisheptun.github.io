// ---------------------- Select ------------------
let propertyData = [];
let activeFilters = {};

document.querySelectorAll('#searchBlock .select').forEach(select => {
  const input = select.querySelector('.select-input');
  const visibleSpan = input.querySelector('.visible');
  const arrowIcon = input.querySelector('.icon-arrow');
  const clearBtn = input.querySelector('.icon-clear');
  const dropMenu = select.querySelector('.drop-menu');
  const key = select.dataset.filter;
  const defaultText = visibleSpan.textContent;


  dropMenu.addEventListener('click', async e => {
    if (e.target.tagName === 'LI') {
      const value = e.target.dataset.value;
      visibleSpan.textContent = value;
      arrowIcon.classList.add('hide');
      clearBtn.classList.remove('hide');
      dropMenu.classList.add('hide');
      activeFilters[key] = value;
      await filterAndRender();
    }
  });

  clearBtn.addEventListener('click', async e => {
    e.stopPropagation();
    visibleSpan.textContent = defaultText;
    clearBtn.classList.add('hide');
    arrowIcon.classList.remove('hide');
    dropMenu.classList.add('hide');
    delete activeFilters[key];
    await filterAndRender();
  });

  input.addEventListener('click', e => {
    if (e.target === clearBtn) return;

    document.querySelectorAll('.drop-menu').forEach(dm => {
      if (dm !== dropMenu) dm.classList.add('hide');
    });
    dropMenu.classList.toggle('hide');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.select')) dropMenu.classList.add('hide');
  });
});


document.querySelectorAll('#categories .select').forEach(select => {
  const input = select.querySelector('.select-input');
  const visibleSpan = input.querySelector('.visible');
  const arrowIcon = input.querySelector('.icon-arrow');
  const clearBtn = input.querySelector('.icon-clear');
  const dropMenu = select.querySelector('.drop-menu');
  const defaultText = visibleSpan.textContent;
  clearBtn.setAttribute('data-default', defaultText);



  dropMenu.addEventListener('click', e => {
    if (e.target.tagName === 'LI') {
      const value = e.target.textContent;
      visibleSpan.textContent = value;
      arrowIcon.classList.add('hide');
      clearBtn.classList.remove('hide');
      dropMenu.classList.add('hide');
    }
  });

  clearBtn.addEventListener('click', e => {
    e.stopPropagation();
    visibleSpan.textContent = defaultText;
    clearBtn.classList.add('hide');
    arrowIcon.classList.remove('hide');
    dropMenu.classList.add('hide');
  });

  input.addEventListener('click', e => {
    if (e.target === clearBtn) return;

    document.querySelectorAll('.drop-menu').forEach(dm => {
      if (dm !== dropMenu) dm.classList.add('hide');
    });
    dropMenu.classList.toggle('hide');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.select')) dropMenu.classList.add('hide');
  });
});


document.querySelector('form[name="propertiesForm"]').addEventListener('submit', function (e) {
  e.preventDefault();

  const submitError = document.getElementById('submitError')
  const form = e.target;


  const agreementCheckbox = form.querySelector('input[type="checkbox"]');
  if (!agreementCheckbox.checked) {
    submitError.classList.remove('hide');
    submitError.textContent = 'Please agree to the Terms of Use and Privacy Policy before submitting.';
    return;
  }

  const firstName = form.querySelector('input[name="firstName"]');
  const lastName = form.querySelector('input[name="lastName"]');
  if (!firstName.value.trim() || !lastName.value.trim()) {
    submitError.classList.remove('hide');
    submitError.textContent = 'Please fill out both First Name and Last Name.';
    return;
  }

  const formEmail = document.getElementById("formEmail");
  const formTel = document.getElementById("formTel");
  if (!formEmail.value.trim()) {
    submitError.classList.remove('hide');
    submitError.textContent = 'Please enter your email.';
    return;
  }

  if (!formTel.value.trim()) {
    submitError.classList.remove('hide');
    submitError.textContent = 'Please enter your phone number.';
    return;
  }

  const preferredRadio = form.querySelector('input[name="preferred_contact"]:checked');
  const phoneInput = form.querySelector('#proprtsPhoneInput');
  const emailInput = form.querySelector('#proprtsEemailInput');
  const contactMethod = preferredRadio.value;
  const contactValue = contactMethod === 'tel' ? phoneInput.value.trim() : emailInput.value.trim();
  if (!contactValue) {
    submitError.classList.remove('hide');
    submitError.textContent = `Please enter your preferred contact method.`;
    return;
  }

  const formData = new FormData(form);
  const jsonData = {};


  formData.forEach((value, key) => {
    if (jsonData[key]) {
      if (!Array.isArray(jsonData[key])) {
        jsonData[key] = [jsonData[key]];
      }
      jsonData[key].push(value);
    } else {
      jsonData[key] = value;
    }
  });


  const selects = form.querySelectorAll('.select');
  selects.forEach(select => {
    const label = select.closest('label');
    const name = label?.textContent?.trim().split('\n')[0].trim().toLowerCase().replace(/[^a-z0-9]/gi, '_') || 'unknown_field';
    const value = select.querySelector('.visible').textContent;
    if (value.toLowerCase().includes('select')) return;
    jsonData[name] = value;
  });

  console.log('Form JSON:', JSON.stringify(jsonData, null, 2));

  submitError.classList.add('hide');
  form.reset();

  selects.forEach(select => {
    const input = select.querySelector('.select-input');
    const visibleSpan = input.querySelector('.visible');
    const arrowIcon = input.querySelector('.icon-arrow');
    const clearBtn = input.querySelector('.icon-clear');
    const dropMenu = select.querySelector('.drop-menu');

    const defaultText = clearBtn.getAttribute('data-default');

    if (defaultText) {
      visibleSpan.textContent = defaultText;
    }

    clearBtn.classList.add('hide');
    arrowIcon.classList.remove('hide');
    dropMenu.classList.add('hide');
  });
});


// -------------------- End of Select ---------------------

//---------------------- Inputs and Radios -------------------------------

const radios = document.querySelectorAll('input[name="preferred_contact"]');
const phoneInput = document.getElementById('proprtsPhoneInput');
const emailInput = document.getElementById('proprtsEemailInput');
const radioTel = document.getElementById("radioTel");
const radioEmail = document.getElementById("radioEmail");
const formEmail = document.getElementById("formEmail");
const formTel = document.getElementById("formTel");

const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");

// --------------- Input email audit -----------------

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return pattern.test(email.trim());
}

formEmail.addEventListener("blur", () => {
  if (!isValidEmail(formEmail.value)) {
    emailError.classList.remove("hide");
  } else {
    emailError.classList.add("hide");
  }
});

formEmail.addEventListener("focus", () => {
  emailError.classList.add("hide");
});

// --------------- Input tel audit -----------------

function formatAndValidatePhone(rawPhone) {
  const phone = rawPhone.trim();

  if (/^0\d{9}$/.test(phone)) {
    return {
      isValid: true,
      formatted: "+38" + phone
    };
  }

  if (/^\+\d{10,15}$/.test(phone)) {
    return {
      isValid: true,
      formatted: phone
    };
  }

  return {
    isValid: false,
    formatted: phone
  };
}

formTel.addEventListener("blur", () => {
  const result = formatAndValidatePhone(formTel.value);

  if (result.isValid) {
    phoneError.classList.add("hide");
    formTel.value = result.formatted;
  } else {
    phoneError.classList.remove("hide");
  }
});

formTel.addEventListener("focus", () => {
  phoneError.classList.add("hide");
});

//---------------------- Radios -------------------------------

function updateInputState() {
  let selected = document.querySelector('input[name="preferred_contact"]:checked').value;

  if (selected === 'tel') {
    phoneInput.classList.remove('inactive');
    phoneInput.value = formTel.value;
    emailInput.classList.add('inactive');
    emailInput.value = '';
  } else {
    phoneInput.classList.add('inactive');
    emailInput.value = formEmail.value;
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
  phoneInput.value = formTel.value;
  updateInputState();
});

emailInput.addEventListener("focus", () => {
  radioEmail.checked = true;
  emailInput.value = formEmail.value;
  updateInputState();
});



//---------------------- End of Radios -------------------------------




async function fetchUrl() {
  try {
    let response = await fetch("https://andriisheptun.github.io/tasks/js/properties_full_updated.json");
    if (!response.ok) {
      throw new Error('Failed to load: ' + response.status);
    }
    let data = await response.json();
    return propertyData = data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function renderPropertyCards(data) {

  let wrapper = document.getElementById("propertySwiper");
  wrapper.innerHTML = '';

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
                ${shortDesc} <a href="property_details.html?id=${item.id}">Read More</a>
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
              <a href="property_details.html?id=${item.id}" class="btn btn-fill__main-color">View Property Details</a>
            </div>`;

    wrapper.appendChild(slide);

  })
}

async function populateSelects(data) {
  const selects = document.querySelectorAll('.select');
  selects.forEach(select => {
    const key = select.dataset.filter;
    const dropMenu = select.querySelector('.drop-menu');
    let values = [];

    if (key === 'price') {
      values = ['up to $1000000', 'over than $1000000'];
    } else if (key === 'area') {
      values = ['up to 2500', 'from 2500 to 3500', 'over than 3500'];
    } else if (key === 'location') {
      values = [...new Set(data.map(item => {
        const fullLocation = item.location || '';
        const parts = fullLocation.split(', ');
        return parts[parts.length - 1];
      }))].sort();
    }
    else {
      values = [...new Set(data.map(item => item[key]))].sort();
    }

    values.forEach(value => {
      const li = document.createElement('li');
      li.textContent = value;
      li.dataset.value = value;
      dropMenu.appendChild(li);
    });
  });
}

async function filterAndRender() {
  const filtered = propertyData.filter(item => {
    return Object.entries(activeFilters).every(([key, val]) => {
      if (key === 'price') {
        return val === 'up to $1000000' ? item.price < 1000000 : item.price >= 1000000;
      }

      if (key === 'area') {
        if (val === 'up to 2500') return item.area <= 2500;
        if (val === 'from 2500 to 3500') return item.area > 2500 && item.area <= 3500;
        if (val === 'over than 3500') return item.area > 3500;
      }

      if (key === 'search') {
        const text = (item.title + ' ' + item.description).toLowerCase();
        return text.includes(val.toLowerCase());
      }

      if (key === 'location') {
        const itemState = (item.location || '').split(', ').pop().toLowerCase();
        return itemState === val.toLowerCase();
      }

      return item[key] == val;
    });
  });

  filtered.sort((a, b) => {
    const stateA = (a.location || '').split(', ').pop().toLowerCase();
    const stateB = (b.location || '').split(', ').pop().toLowerCase();
    return stateA.localeCompare(stateB);
  });

  await renderPropertyCards(filtered);
  initSwipers();
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
  await fetchUrl();
  await renderPropertyCards(propertyData);
  initSwipers();
  populateSelects(propertyData);

  const searchInput = document.getElementById('searchBlock').querySelector('.search-input input');
  const searchBtn = document.getElementById('searchBlock').querySelector('.search-btn');

  searchBtn.addEventListener('click', async () => {
    const value = searchInput.value.trim().toLowerCase();
    if (value) {
      activeFilters.search = value;
    } else {
      delete activeFilters.search;
    }
    await filterAndRender();
  });

  searchInput.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchBtn.click();
    }
  });

  searchInput.addEventListener('input', () => {
    if (!searchInput.value.trim()) {
      delete activeFilters.search;
      filterAndRender();
    }
  });
});




// const selectedFilters = {
//   location: null,
//   type: null,
//   price: null,
//   size: null,
//   year: null
// };

// // 1. Завантаження JSON
// async function fetchProperties() {
//   const res = await fetch('data/properties.json');
//   const data = await res.json();
//   propertyData = data;
//   renderSwiperCards(propertyData);
//   populateSelectors(propertyData);
// }

// // 2. Заповнення селектів
// function populateSelectors(data) {
//   const fieldKeys = ['location', 'type', 'price', 'size', 'year'];
//   document.querySelectorAll('.select').forEach((select, i) => {
//     const key = fieldKeys[i];
//     const ul = select.querySelector('ul.drop-menu');

//     const values = [...new Set(data.map(item => item[key]))];
//     ul.innerHTML = ''; // очистка

//     values.forEach((val, index) => {
//       const li = document.createElement('li');
//       li.dataset.index = index;
//       li.dataset.value = val;
//       li.textContent = val;
//       ul.appendChild(li);
//     });
//   });

//   initSelectLogic();
// }

// // 3. Поведінка селектів
// function initSelectLogic() {
//   document.querySelectorAll('.select').forEach(select => {
//     const input = select.querySelector('.select-input');
//     const visibleSpan = input.querySelector('.visible');
//     const optionSpans = input.querySelectorAll('.option');
//     const arrowIcon = input.querySelector('.icon-arrow');
//     const clearBtn = input.querySelector('.icon-clear');
//     const dropMenu = select.querySelector('.drop-menu');
//     const items = dropMenu.querySelectorAll('li');
//     const key = select.dataset.key;

//     input.addEventListener('click', (e) => {
//       if (e.target === clearBtn) return;
//       document.querySelectorAll('.drop-menu').forEach(dm => {
//         if (dm !== dropMenu) dm.classList.add('hide');
//       });
//       dropMenu.classList.toggle('hide');
//     });

//     items.forEach(li => {
//       li.addEventListener('click', () => {
//         const selectedIndex = li.dataset.index;
//         const value = li.dataset.value;

//         visibleSpan.classList.add('hide');
//         optionSpans.forEach(span => span.classList.add('hide'));
//         if (optionSpans[selectedIndex]) {
//           optionSpans[selectedIndex].classList.remove('hide');
//         }

//         clearBtn.classList.remove('hide');
//         arrowIcon.classList.add('hide');
//         dropMenu.classList.add('hide');

//         selectedFilters[key] = value;
//         filterSwiper();
//       });
//     });

//     clearBtn.addEventListener('click', (e) => {
//       e.stopPropagation();
//       optionSpans.forEach(span => span.classList.add('hide'));
//       visibleSpan.classList.remove('hide');
//       clearBtn.classList.add('hide');
//       arrowIcon.classList.remove('hide');
//       dropMenu.classList.add('hide');

//       selectedFilters[key] = null;
//       filterSwiper();
//     });

//     document.addEventListener('click', (e) => {
//       if (!e.target.closest('.select')) {
//         dropMenu.classList.add('hide');
//       }
//     });
//   });
// }

// // 4. Фільтрація
// function filterSwiper() {
//   const filtered = propertyData.filter(item => {
//     return Object.entries(selectedFilters).every(([key, val]) => {
//       return val === null || item[key] === val;
//     });
//   });

//   renderSwiperCards(filtered);
// }

// // 5. Рендер Swiper
// function renderSwiperCards(data) {
//   const swiperWrapper = document.querySelector('.swiper-wrapper');
//   swiperWrapper.innerHTML = '';

//   data.forEach(item => {
//     const slide = document.createElement('div');
//     slide.classList.add('swiper-slide');
//     slide.innerHTML = `
//       <img src="${item.image}" alt="${item.title}">
//       <h4>${item.title}</h4>
//     `;
//     swiperWrapper.appendChild(slide);
//   });

//   if (window.swiperInstance) {
//     window.swiperInstance.update();
//   }
// }

// // 6. Старт
// document.addEventListener('DOMContentLoaded', () => {
//   fetchProperties();
// });
