let faqData = [];
let testimonialsData = [];
let propertyData = [];

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

    let wrapper = document.getElementById('faqSwiper').querySelector('.swiper-wrapper');

    faqData.forEach((item, index) => {
        let slide = document.createElement('div');

        slide.classList.add('swiper-slide', 'swiper3-slide');
        slide.innerHTML = `
        <h3>${item.question}</h3>
        <p class="obscured-text">${item.description}</p>
        <div class="btn btn-fill__black" data-index="${index}">Read More</div>  
    `;

        wrapper.appendChild(slide);
    });
}

async function renderTestimonialsCards() {
    testimonialsData = await fetchUrl('https://andriisheptun.github.io/tasks/js/client_reviews.json');

    let wrapper = document.getElementById('testimonialsSwiper');

    testimonialsData.forEach(item => {
        let slide = document.createElement('div');
        slide.classList.add('swiper-slide', 'swiper2-slide');

        let rating = document.createElement('div');
        rating.classList.add('rating', 'd-flex');

        for (let i = 0; i < item.rating; i++) {
            let star = document.createElement('div');
            star.classList.add('stars', 'border', 'd-flex', 'items-center');
            star.innerHTML = `
          <svg class="star" width="20" height="20">
            <use xlink:href="assets/images/sprite.svg#star"></use>
          </svg>`;
            rating.appendChild(star);
        }

        let content = document.createElement('div');
        content.classList.add('swiper2-content', 'main-section-title', 'always-full-width', 'd-flex');
        content.innerHTML = `
        <h3>${item.title}</h3>
        <p class="obscured-text">${item.review}</p>
      `;

        let profile = document.createElement('div');
        profile.classList.add('swiper2-profile', 'd-flex', 'align-center');
        profile.innerHTML = `
        <img src="${item.photo}" alt="${item.name}" class="swiper2-photo bg-cover">
        <div class="swiper2-name-block">
          <p>${item.name}</p>
          <p class="obscured-text">${item.location}</p>
        </div>
      `;

        slide.appendChild(rating);
        slide.appendChild(content);
        slide.appendChild(profile);

        wrapper.appendChild(slide);
    });
}

async function renderPropertyCards() {
    propertyData = await fetchUrl("https://andriisheptun.github.io/tasks/js/properties_full_updated.json");

    let wrapper = document.getElementById("propertySwiper");

    propertyData.forEach(item => {
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

function renderFaqAccordion() {
    list.innerHTML = '';

    faqData.forEach((item, index) => {
        const li = document.createElement("li");
        li.classList.add("faq-item");

        li.innerHTML = `
        <h3 class="faq-title" data-index="${index}">${item.question}</h3>
        <div class="faq-answer obscured-text hide">${item.fullDescription}</div>
      `;

        list.appendChild(li);
    });
}




document.addEventListener('DOMContentLoaded', async () => {
    await renderPropertyCards()
    await renderTestimonialsCards();
    await renderFAQCards();
    initSwipers();
    renderFaqAccordion();
});

const list = document.getElementById("faqList");
const faqContainer = document.getElementById('faqSwiper');
const modal = document.getElementById("faqModal");
const modalQuestion = document.getElementById("modalQuestion");
const modalAnswer = document.getElementById("modalAnswer");
const modalClose = document.getElementById("faqModal").querySelector(".modal-close");
const toggleBtn = document.getElementById("toggleFaqBtn");

faqContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn")) {
        const index = +event.target.dataset.index;
        const item = faqData[index];

        modalQuestion.textContent = item.question;
        modalAnswer.textContent = item.fullDescription;
        modal.classList.remove("hide");
    }
});

modalClose.addEventListener("click", () => modal.classList.add("hide"));
window.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hide");
});


list.addEventListener("click", (e) => {
    if (e.target.classList.contains("faq-title")) {
        const clickedTitle = e.target;
        const isAlreadyActive = clickedTitle.classList.contains("active");
        const allAnswers = list.querySelectorAll(".faq-answer");
        const allTitles = list.querySelectorAll(".faq-title");


        allAnswers.forEach(answer => answer.classList.add("hide"));
        allTitles.forEach(title => title.classList.remove("active"));

        if (!isAlreadyActive) {
            const answer = clickedTitle.nextElementSibling;
            answer.classList.remove("hide");
            clickedTitle.classList.add("active");
        }

    }
});

toggleBtn.addEventListener("click", () => {
    const isListVisible = !list.classList.contains("hide");

    if (isListVisible) {
        list.classList.add("hide");
        faqContainer.classList.remove("hide");
        toggleBtn.textContent = "View all FAQ's";
    } else {
        list.classList.remove("hide");
        faqContainer.classList.add("hide");
        toggleBtn.textContent = "View less FAQ's";
    }
});
