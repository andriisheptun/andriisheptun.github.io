// ---------------------- Select ------------------

document.querySelectorAll('.select').forEach(select => {
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

// -------------------- End of Select ---------------------

// -------------------- Sort Offices ----------------------

let buttons = document.getElementById('sortBtns').querySelectorAll('[data-filter]');
let container = document.getElementById('sortItems');
let offices = container.querySelectorAll('.office');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    let visibleCount = 0;

    offices.forEach(office => {
      const isVisible = filter === 'all' || office.classList.contains(filter);
      office.classList.toggle('hide', !isVisible);
      if (isVisible) visibleCount++;
    });

    container.classList.toggle('single', visibleCount === 1);

    buttons.forEach(btn => btn.disabled = false);
    button.disabled = true;
  });
});

// -------------------- End of Sort Offices ----------------------

document.querySelector('form[name="contactForm"]').addEventListener('submit', function (e) {
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

  const formEmail = form.querySelector('input[name="Email"]');
  const formTel = form.querySelector('input[name="Phone"]');
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