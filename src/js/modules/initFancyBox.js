import '@fancyapps/fancybox';
import { initMapMain } from './initYandexMap';

function initFancyBox() {
  $.extend(true, $.fancybox.defaults, {
    lang: 'ru',
    i18n: {
      ru: {
        CLOSE: 'Закрыть',
        NEXT: 'Вперед',
        PREV: 'Назад',
        ERROR: 'Запрашиваемый контент не может быть загружен. <br/> Пожалуйста, попробуйте позже.',
        PLAY_START: 'Начать демонстрацию',
        PLAY_STOP: 'Приостановить демонстрацию',
        FULL_SCREEN: 'На полный экран',
        THUMBS: 'Миниатюры',
        DOWNLOAD: 'Скачать',
        SHARE: 'Поделиться',
        ZOOM: 'Увеличить',
      },
    },
  });

  $('[data-fancybox-window]').fancybox({
    buttons: [],
    touch: false,
  });

  $('[data-fancybox-map]').fancybox({
    buttons: [],
    touch: false,
    beforeShow() {
      const { ymaps } = window;
      ymaps.ready(initMapMain);
    },
  });
}

export default initFancyBox;
