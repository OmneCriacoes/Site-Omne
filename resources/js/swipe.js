const swiperHeader = new Swiper('#swiper-header', {
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    loop: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const swiperLogos = new Swiper('#logo-carousel', {
    speed: 2500,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },

    loop: true,

    slidesPerView: "auto",

    centeredSlides: false,

    spaceBetween: 20,

    pagination: {
        clickable: true,
    },

});

const swiperInfo = new Swiper('#interpriseInfo', {
    speed: 10000,

    autoplay: {
        delay: 8000,
        disableOnInteraction: false,
    },

    parallax: true,

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

let swiperScn = new Swiper('#swiper-scenography', {
    autoplay: {
        delay: 4000,
        disableOnInteraction: true,
    },

    loop: false,

    keyboard: {
        enabled: true,
    },

    mousewheel: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

let swiperScu = new Swiper('#swiper-sculptures', {
    lazy: true,

    autoplay: {
        delay: 4000,
        disableOnInteraction: true,
    },

    loop: false,

    keyboard: {
        enabled: true,
    },

    mousewheel: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});