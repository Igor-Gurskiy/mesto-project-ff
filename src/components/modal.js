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
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKeyUp);
  document.addEventListener("mousedown", clickCloseModal);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKeyUp);
  document.removeEventListener("mousedown", clickCloseModal);
};

export { openModal, closeModal };
