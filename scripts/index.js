// @todo: Темплейт карточки
const placeTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData) {
  const placeElement = placeTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImageElement = placeElement.querySelector(".card__image");
  const buttonDelete = placeElement.querySelector(".card__delete-button");

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  placeElement.querySelector(".card__title").textContent = cardData.name;
  buttonDelete.addEventListener("click", () => removeCard(placeElement));

  return placeElement;
}

// @todo: Функция удаления карточки
function removeCard(card) {
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  cardsContainer.append(card);
});
