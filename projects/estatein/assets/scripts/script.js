document.addEventListener('touchstart', () => { }, true);

const topSection = document.getElementById("topSection");
const bannerClose = document.getElementById("bannerClose");
const banner = document.getElementById("banner");
const iconOpen = document.getElementById("iconOpen");
const iconClose = document.getElementById("iconClose");
const headerMenu = document.getElementById("headerMenu");

// ---------------------- Select ------------------

document.querySelectorAll('.select').forEach(select => {
  const input = select.querySelector('.select-input');
  const visibleSpan = input.querySelector('.visible');
  const optionSpans = input.querySelectorAll('.option');
  const arrowIcon = input.querySelector('.icon-arrow');
  const clearBtn = input.querySelector('.icon-clear');
  const dropdown = select.querySelector('.drop-menu');
  const items = dropdown.querySelectorAll('li');

  // Клік по input — відкриває dropdown
  input.addEventListener('click', (e) => {
    if (e.target === clearBtn) return; // не відкривати dropdown при кліку на хрестик

    document.querySelectorAll('.drop-menu').forEach(dd => {
      if (dd !== dropdown) dd.classList.add('hide');
    });
    dropdown.classList.toggle('hide');
  });

  // Клік по пункту списку
  items.forEach(li => {
    li.addEventListener('click', () => {
      const selectedIndex = li.getAttribute('data-index');

      visibleSpan.classList.add('hide');
      optionSpans.forEach(span => span.classList.add('hide'));

      optionSpans[selectedIndex].classList.remove('hide');
      clearBtn.classList.remove('hide');
      arrowIcon.classList.add('hide');
      dropdown.classList.add('hide');
    });
  });

  // Клік на хрестик — скинути вибір
  clearBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // не відкривати dropdown
    optionSpans.forEach(span => span.classList.add('hide'));
    visibleSpan.classList.remove('hide');
    clearBtn.classList.add('hide');
    arrowIcon.classList.remove('hide');
    dropdown.classList.add('hide');
  });
});

// Закривання dropdown при кліку поза селектом
document.addEventListener('click', (e) => {
  if (!e.target.closest('.select')) {
    document.querySelectorAll('.drop-menu').forEach(dd => dd.classList.add('hide'));
  }
});

// -------------------- End of Select ---------------------

//---------------------- Radios -------------------------------

const radios = document.querySelectorAll('input[name="preferred_contact"]');
const phoneInput = document.getElementById('proprtsPhoneInput');
const emailInput = document.getElementById('proprtsEemailInput');
const radioTel = document.getElementById("radioTel");
const radioEmail = document.getElementById("radioEmail");


function updateInputState() {
  const selected = document.querySelector('input[name="preferred_contact"]:checked').value;

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

// updateInputState();

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