import Inputmask from 'inputmask';

function initInputmask() {
  document.addEventListener('focusin', (e) => {
    const phone = e.target.closest('input[type="tel"]');

    if (!phone) return;

    const im = new Inputmask('+7 (999) 999-99-99');
    im.mask(phone);
  });
}

export default initInputmask;
