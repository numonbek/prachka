/* eslint-disable */
import "../sass/app.scss";
import "../vendor/bootstrap";
import { ready } from "./modules/helpers";
import initInputmask from "./modules/initInputmask";
import initFormValidation from "./modules/initFormValidation";
import initTooltip from "./modules/initTooltip";
import initDrawer from "./modules/initDrawer";
import initFancyBox from "./modules/initFancyBox";
import initSwiper from "./modules/initSwiper";
import initInputCounter from "./modules/initInputCounter";
import { initIsotope } from "./modules/initIsotope";
import { initBasket } from "./modules/initBasket";
import { dragDrop } from "./modules/drag-n-drops";
import { scroolTop } from "./modules/scrool-top";
import { openModal } from "./modules/modal";

// eslint-disable-next-line no-multi-assign
global.$ = global.jQuery = $;

ready(() => {
  initInputmask();
  initFormValidation();
  initTooltip();
  initDrawer();
  initFancyBox();
  initSwiper();
  initInputCounter();
  initIsotope();
  initBasket();
  dragDrop();
  scroolTop();
  openModal();
});
