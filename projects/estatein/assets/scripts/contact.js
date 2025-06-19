// ---------------------- Select ------------------

document.querySelectorAll('.select').forEach(select => {
    const input = select.querySelector('.select-input');
    const visibleSpan = input.querySelector('.visible');
    const optionSpans = input.querySelectorAll('.option');
    const arrowIcon = input.querySelector('.icon-arrow');
    const clearBtn = input.querySelector('.icon-clear');
    const dropdown = select.querySelector('.drop-menu');
    const items = dropdown.querySelectorAll('li');


    input.addEventListener('click', (e) => {
        if (e.target === clearBtn) return;

        document.querySelectorAll('.drop-menu').forEach(dd => {
            if (dd !== dropdown) dd.classList.add('hide');
        });
        dropdown.classList.toggle('hide');
    });

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

    clearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        optionSpans.forEach(span => span.classList.add('hide'));
        visibleSpan.classList.remove('hide');
        clearBtn.classList.add('hide');
        arrowIcon.classList.remove('hide');
        dropdown.classList.add('hide');
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.select')) {
        document.querySelectorAll('.drop-menu').forEach(dd => dd.classList.add('hide'));
    }
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

