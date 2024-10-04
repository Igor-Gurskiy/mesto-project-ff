// @todo: Темплейт карточки
const placeTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(element) {
  const placeElement = placeTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  placeElement.querySelector(".card__image").src = element.link;
  placeElement.querySelector(".card__image").alt = element.name;
  placeElement.querySelector(".card__title").textContent = element.name;
  placeElement
    .querySelector(".card__delete-button")
    .addEventListener("click", removeCard);

  placesList.append(placeElement);
}

// @todo: Функция удаления карточки
function removeCard(evt) {
  evt.target.parentElement.parentElement.removeChild(evt.target.parentElement);
}

// @todo: Вывести карточки на страницу
initialCards.forEach(createCard);
