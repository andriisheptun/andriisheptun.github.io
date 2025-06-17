// ---------------------- Select ------------------

document.querySelectorAll('.select').forEach(select => {
    const input = select.querySelector('.select-input');
    const visibleSpan = input.querySelector('.visible');
    const optionSpans = input.querySelectorAll('.option');
    const arrowIcon = input.querySelector('.icon-arrow');
    const clearBtn = input.querySelector('.icon-clear');
    const dropdown = select.querySelector('.drop-menu');
    const items = dropdown.querySelectorAll('li');

    // Click to input — open drop menu
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
