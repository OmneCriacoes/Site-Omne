const swiperHeader = new Swiper('#swiper-header', {
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    loop: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

let swiperScn = new Swiper('#swiper-scenography', {
    autoplay: {
        delay: 4000,
        disableOnInteraction: true,
    },

    loop: false,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

let swiperScu = new Swiper('#swiper-sculptures', {
    autoplay: {
        delay: 4000,
        disableOnInteraction: true,
    },

    loop: false,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});