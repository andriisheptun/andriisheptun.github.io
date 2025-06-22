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
