import Isotope from 'isotope-layout';
import { debounce } from './helpers';

function updateIsotope() {
  const $grids = $('.js-isotope:visible');
  if (!$grids.length) return;

  Isotope.data($grids[0]).layout();
}

function initIsotope() {
  let qsRegex;
  const $searchInput = $('#search-input');
  const $gridIsotope = $('.js-isotope:visible');

  if (!$gridIsotope.length) return;

  let instance = new Isotope($gridIsotope[0], { layoutMode: 'fitRows' });

  const filterItems = () => {
    qsRegex = new RegExp($searchInput.val(), 'gi');
    instance.arrange({
      filter(itemElem) {
        return qsRegex ? $(itemElem).text().match(qsRegex) : true;
      },
    });
  };

  $('.tabbed__link')
    .on('shown.bs.tab', () => {
      instance.destroy();
      $searchInput.val('');
      $('.section-products__list-item').removeAttr('style');

      const $grids = $('.js-isotope:visible');
      instance = new Isotope($grids[0], { layoutMode: 'fitRows' });
    });

  $searchInput.keyup(debounce(filterItems, 200));
}

export {
  initIsotope,
  updateIsotope,
};
