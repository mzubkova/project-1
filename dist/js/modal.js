//   const refs = {
//     openModalBtn: document.querySelector("[data-modal-open]"),
//     closeModalBtn: document.getElementById('btnClose'),
//     modal: document.getElementById('modal'),
//     dropDownBtn: document.getElementById('dropDown')
// };

// refs.openModalBtn.addEventListener("click", toggleModal);
// refs.closeModalBtn.addEventListener("click", toggleModal);

//  function toggleModal() {
//     refs.modal.classList.toggle("is-hidden");
//   }

//   refs.openModalBtn.addEventListener("click", toggleModal);
//   refs.closeModalBtn.addEventListener("click", toggleModal);

//   function toggleModal() {
//     refs.modal.classList.toggle("is-hidden");
//   }
// })();

// var backdrop = document.getElementsByClassName("backdrop")[0];
var modal = document.getElementById("modal");
var modalContent = document.querySelector(".modal");
var modalOpen = document.getElementById("modal-btn");
var modalClose = document.getElementById("btnClose");

modalOpen.onclick = function () {
  modal.style.display = "block";
  modalContent.style.display = "block";
  modalContent.style.zIndex = 99;
};

modalClose.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
