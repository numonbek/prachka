/* eslint-disable */
import { updateIsotope } from "./initIsotope";

const basket = {
  products: {},
  totalPrice: 0,
  totalCount: 0,
};

function sendAjax(data, isDelete = false) {
  // eslint-disable-next-line no-console
  console.log("Отправка данных!", data, isDelete);
}

function toggleBasket() {
  if (Object.keys(basket.products).length) {
    document.body.classList.add("page--show-basket");
  } else {
    document.body.classList.remove("page--show-basket");
  }
}

function updateTotalValues() {
  let totalPrice = 0;
  let totalCount = 0;

  Object.values(basket.products).forEach((product) => {
    totalPrice += product.price * product.count;
    totalCount += product.count;
  });

  basket.totalPrice = totalPrice > 0 ? totalPrice : 0;
  basket.totalCount = totalCount > 0 ? totalCount : 0;
}

function renderBasket() {
  updateTotalValues();
  toggleBasket();
  updateIsotope();

  const totalPriceElements = document.querySelectorAll("[data-total-price]");
  const totalCountElements = document.querySelectorAll("[data-total-count]");
  const basketElement = document.getElementById("basket");
  const group = basketElement.querySelector(".card-basket__group");

  group.innerHTML = "";

  Object.values(basket.products)
    .sort((a, b) => {
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;
      return 0;
    })
    .forEach((product) => {
      group.innerHTML += `
        <div class="card-basket__item">
          <div class="row mx-n1 align-items-center">
            <div class="col px-1">
              <div class="card-basket__item-title">${product.title}</div>
            </div>
            <div class="col-auto px-1">
              <div class="input-counter js-input-counter">
                <button type="button" class="button input-counter__decrement" data-decrement></button>
                <label class="input-counter__label" title="${product.count} шт">
                  <span class="input-counter__result">${product.count} шт</span>
                  <input type="number" value="${product.count}" name="PRODUCT[${product.id}]" data-product-id="${product.id}" data-unit=" шт" class="sr-only">
                </label>
                <button type="button" class="button input-counter__increment" data-increment></button>
              </div>
            </div>
            <div class="col-auto px-1">
              <div class="card-basket__item-price">${product.price} ₽</div>
            </div>
          </div>
        </div>
      `;
    });

  totalPriceElements.forEach((el) => {
    // eslint-disable-next-line no-param-reassign
    el.textContent = basket.totalPrice;
  });

  totalCountElements.forEach((el) => {
    // eslint-disable-next-line no-param-reassign
    el.textContent = basket.totalCount;
  });
}

function addDataProduct(data) {
  if (!basket.products[data.id]) {
    basket.products[data.id] = data;
  } else {
    basket.products[data.id].count += 1;
  }

  renderBasket();
  sendAjax(basket.products[data.id]);
}

function changeProductCount(id, count) {
  if (count <= 0) {
    sendAjax(id, true);
    delete basket.products[id];
  } else {
    basket.products[id].count = count;
    sendAjax(basket.products[id]);
  }

  renderBasket();
}

function initBasket() {
  const basketElement = document.getElementById("basket");
  if (!basketElement) return;

  renderBasket();

  document.addEventListener("click", (e) => {
    const btnAdd = e.target.closest("[data-basket-add]");
    const btnToggle = e.target.closest(".js-toggle-basket");

    if (btnAdd) {
      const productData = {
        id: +btnAdd.dataset.productId,
        price: +btnAdd.dataset.productPrice,
        title: btnAdd.dataset.productTitle,
        count: 1,
      };
      const cardBasket = document.querySelector("#basket .card-basket");

      addDataProduct(productData);
      cardBasket.classList.add("card-basket--opened");
    }

    if (btnToggle) {
      const cardBasket = btnToggle.closest(".card-basket");
      cardBasket.classList.toggle("card-basket--opened");
    }
  });

  basketElement.addEventListener("change", (e) => {
    const inpCounter = e.target.closest(".js-input-counter");
    if (!inpCounter) return;
    const { productId } = e.target.dataset;
    const count = +e.target.value;

    changeProductCount(productId, count);
  });
}

export { initBasket };
