/* eslint-disable */
function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function disableBodyScroll() {
  const { isMobile } = window;
  const widthScroll = window.innerWidth - document.documentElement.clientWidth;

  if (!isMobile && !!widthScroll) {
    const style = document.createElement('style');
    const cssStyles = `.compensate-scrollbar{margin-right: ${widthScroll}px;}`;

    style.id = 'style-lock-scroll';
    style.appendChild(document.createTextNode(cssStyles));

    document.head.appendChild(style);
  }

  document.body.classList.add('compensate-scrollbar');
  document.body.classList.add('page--no-scroll');
}

function enableBodyScroll() {
  const styleLockScroll = document.getElementById('style-lock-scroll');
  if (styleLockScroll) styleLockScroll.remove();

  document.body.classList.remove('compensate-scrollbar');
  document.body.classList.remove('page--no-scroll');
}

/**
 * y: the y coordinate to scroll, 0 = top
 * duration: scroll duration in milliseconds; default is 0 (no transition)
 * element: the html element that should be scrolled ; default is the main scrolling element
 */
function scrollToY(y, duration = 0, el = document.scrollingElement) {
  const element = el;
  // cancel if already on target position
  if (element.scrollTop === y) return;

  const cosParameter = (element.scrollTop - y) / 2;
  let scrollCount = 0;
  let oldTimestamp = null;

  function step(newTimestamp) {
    if (oldTimestamp !== null) {
      // if duration is 0 scrollCount will be Infinity
      scrollCount += Math.PI * ((newTimestamp - oldTimestamp) / duration);
      if (scrollCount >= Math.PI) {
        element.scrollTop = y;
        return;
      }
      element.scrollTop = cosParameter + y + cosParameter *
        Math.cos(scrollCount);
    }
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
}

/**
 * debounce function
 * use inDebounce to maintain internal reference of timeout to clear
 */
const debounce = (func, delay) => {
  let inDebounce;
  // eslint-disable-next-line func-names
  return function(...args) {
    const context = this;
    const saveArgs = args;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => {
      func.apply(context, saveArgs);
    }, delay);
  };
};

/**
 * throttle function that catches and triggers last invocation
 * use time to see if there is a last invocation
 */
const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  // eslint-disable-next-line func-names
  return function(...args) {
    const context = this;
    const saveArgs = args;
    if (!lastRan) {
      func.apply(context, saveArgs);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, saveArgs);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

export {
  ready,
  disableBodyScroll,
  enableBodyScroll,
  scrollToY,
  debounce,
  throttle,
};
