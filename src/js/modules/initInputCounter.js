function initInputCounter() {
  document.addEventListener('click', (e) => {
    const input = e.target.closest('.js-input-counter');
    if (!input) return;

    const inpControl = input.querySelector('input');
    const btnDecrement = e.target.closest('[data-decrement]');
    const btnIncrement = e.target.closest('[data-increment]');

    if (btnDecrement) inpControl.value = +inpControl.value - 1;
    if (btnIncrement) inpControl.value = +inpControl.value + 1;

    inpControl.dispatchEvent(new Event('change', {
      bubbles: true,
    }));
  });

  document.addEventListener('change', (e) => {
    const input = e.target.closest('.js-input-counter');
    if (!input) return;

    const inpControl = input.querySelector('input');
    const inpUnit = inpControl.dataset.unit;
    const result = input.querySelector('.input-counter__result');

    result.textContent = `${inpControl.value}${inpUnit}`;
  });
}

export default initInputCounter;
