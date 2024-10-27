// @todo: Функция создания карточки
const createCard = (cardData, openPopupImage, addLike, template) => {
  const placeElement = template.querySelector(".places__item").cloneNode(true);
  const cardImageElement = placeElement.querySelector(".card__image");
  const buttonDelete = placeElement.querySelector(".card__delete-button");
  const buttonLike = placeElement.querySelector(".card__like-button");

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  placeElement.querySelector(".card__title").textContent = cardData.name;
  buttonDelete.addEventListener("click", () => removeCard(placeElement));

  cardImageElement.addEventListener("click", (evt) =>
    openPopupImage(evt.target.src, evt.target.alt)
  );

  buttonLike.addEventListener("click", () => addLike(buttonLike));

  return placeElement;
};

const addLike = (buttonLike) => {
  if (buttonLike.classList.contains("card__like-button_is-active")) {
    buttonLike.classList.remove("card__like-button_is-active");
  } else {
    buttonLike.classList.add("card__like-button_is-active");
  }
};

// @todo: Функция удаления карточки
function removeCard(card) {
  card.remove();
}

export { createCard, addLike };
