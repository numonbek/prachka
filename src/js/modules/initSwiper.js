import Swiper from 'swiper';

function initSwiperDefault() {
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper('.js-swiper-main .swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    roundLengths: true,
    nested: true,
    loop: true,
    loopAdditionalSlides: 3,
    navigation: {
      nextEl: '.js-swiper-main .swiper-button-next',
      prevEl: '.js-swiper-main .swiper-button-prev',
    },
    pagination: {
      el: '.js-swiper-main .swiper-pagination',
      clickable: true,
    },
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 460,
      modifier: 1,
      slideShadows: false,
    },
    breakpoints: {
      575: {
        slidesPerView: 2,
      },
    },
  });
}

function initSwiper() {
  initSwiperDefault();
}

export default initSwiper;
