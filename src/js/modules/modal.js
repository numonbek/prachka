/* eslint-disable */
function openModal() {
  let modal = document.getElementById("myModal");
  let btn = document.getElementById("myBtn");
  let span = document.getElementsByClassName("close")[0];
  let succesSend = document.getElementById("successful-send");
  let sendSuccess = document.getElementById("submetSucces");
  let formModal = document.getElementById("formModal");

  btn.onclick = function () {
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === sendSuccess) {
      modal.style.display = "none";
      succesSend.style.display = "block";
    }
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

export { openModal };
