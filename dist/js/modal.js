
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.getElementById('btnClose'),
    modal: document.getElementById('modal'),
    dropDownBtn: document.getElementById('dropDown')
};
  

refs.openModalBtn.addEventListener("click", toggleModal);
refs.closeModalBtn.addEventListener("click", toggleModal);
  
 function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }
})();
