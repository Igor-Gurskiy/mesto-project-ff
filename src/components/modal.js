const handleEscKeyUp = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};

const clickCloseModal = (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};

const openModal = (modal) => {
  modal.classList.toggle("popup_is-opened");
  document.addEventListener("keydown", handleEscKeyUp);
  document.addEventListener("click", clickCloseModal);
};

const closeModal = (modal) => {
  modal.classList.toggle("popup_is-opened");
  document.removeEventListener("keydown", handleEscKeyUp);
  document.removeEventListener("click", clickCloseModal);
};

export { openModal, closeModal };
