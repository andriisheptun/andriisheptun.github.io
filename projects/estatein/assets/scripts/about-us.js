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