/* eslint-disable */
import { disableBodyScroll, enableBodyScroll } from './helpers';

function openDrawer(drawer) {
  const hamburgers = document.querySelectorAll(
    `.hamburger[data-drawer="${drawer.id}"]`);
  Array.prototype.forEach.call(hamburgers, (hamburger) => {
    hamburger.classList.add('is-active');
  });

  drawer.classList.remove('sr-only');
  drawer.classList.add('drawer--opened');
  disableBodyScroll();
}

function closeDrawer(drawer) {
  const hamburgers = document.querySelectorAll(
    `.hamburger[data-drawer="${drawer.id}"]`);
  Array.prototype.forEach.call(hamburgers, (hamburger) => {
    hamburger.classList.remove('is-active');
  });

  drawer.classList.remove('drawer--opened');
  enableBodyScroll();
}

function closeAllDrawers() {
  const drawers = document.querySelectorAll('.js-drawer');
  Array.prototype.forEach.call(drawers, (drawer) => {
    closeDrawer(drawer);
  });
}

function escapeClose(e) {
  if (e.key === 'Escape') {
    closeAllDrawers();
    document.removeEventListener('keydown', escapeClose);
  }
}

function toggleDrawer(e) {
  const button = e.target.closest('[data-drawer]');
  const drawer = document.querySelector(`#${button.dataset.drawer}`);

  if (!drawer) return;

  const isOpened = drawer.classList.contains('drawer--opened');

  if (isOpened) {
    closeDrawer(drawer);
    document.removeEventListener('keydown', escapeClose);
  } else {
    openDrawer(drawer);
    document.addEventListener('keydown', escapeClose);
  }
}

function matchMediaHandler(match) {
  if (match.matches) {
    closeAllDrawers();
    document.removeEventListener('keydown', escapeClose);
  }
}

function initDrawer() {
  const buttons = document.querySelectorAll('[data-drawer]');
  Array.prototype.forEach.call(buttons, (button) => {
    button.addEventListener('click', toggleDrawer);
  });

  const drawers = document.querySelectorAll('.js-drawer');
  Array.prototype.forEach.call(drawers, (drawer) => {
    drawer.addEventListener('click', (e) => {
      if (e.target.classList.contains('js-drawer')) {
        closeDrawer(e.target);
        document.removeEventListener('keydown', escapeClose);
      }
    });
    drawer.addEventListener('transitionend', (e) => {
      if (
        e.target.classList.contains('drawer')
        && !e.target.classList.contains('drawer--opened')
      ) {
        drawer.classList.add('sr-only');
      }
    });
  });

  const match = window.matchMedia('(min-width: 992px)');
  try {
    // Chrome & Firefox
    match.addEventListener('change', matchMediaHandler.bind(this, match));
  } catch (e1) {
    try {
      // Safari
      match.addListener(matchMediaHandler.bind(this, match));
    } catch (e2) {
      // eslint-disable-next-line no-console
      console.error(e2);
    }
  }
}

export default initDrawer;
