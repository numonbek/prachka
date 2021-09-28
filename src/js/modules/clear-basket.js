/* eslint-disable */
function clearBasket(event) {
  document.addEventListener("click", function (event) {
    let deleteBasket = document.getElementById("catalog-delete");
    let basketMain = document.querySelector(".card-basket__main");
    let basketItem = document.querySelector(".card-basket__group");
    let basketItemc = document.querySelector(".card-basket__item");

    if (event.target.dataset.counter != undefined) {
      console.log("!!! in cart");
      basketItem.removeChild(basketItemc);

      sendAjax((data = null), (isDelete = false));
    } else {
      console.log("not card");
    }
  });
}
export { clearBasket };

// if (event.target.dataset.counter != undefined) {
//   // если есть атрибут...
//   console.log("!!! in cart");
// }
//   let deleteBasket = document.getElementById("catalog-delete");
//   let basketMain = document.querySelector(".card-basket__main");

//   if (deleteBasket.closest(".card-basket__inner")) {
//     console.log("!!! in cart");
//   }
