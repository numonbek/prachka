import { scrollToY } from './helpers';

function initAnchor() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const isAnchor = link.hash.includes('#anchor');
    if (!isAnchor) return;

    const section = document.querySelector(link.hash);
    if (!section) return;

    e.preventDefault();
    window.history.pushState(null, null, link.href);
    scrollToY(section.offsetTop, 500);
  });
}

export default initAnchor;
