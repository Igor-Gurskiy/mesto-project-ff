import "/src/pages/index.css";

import { initialCards } from "./cards";
import { openModal, closeModal } from "./modal";
import { createCard, addLike } from "./card";

// @todo: Темплейт карточки
const placeTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

const popupOpenEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const formElementProfile = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const nameProfile = document.querySelector(".profile__title");
const jobProfile = document.querySelector(".profile__description");

const popupImage = document.querySelector(".popup_type_image");
const popupImageCaption = document.querySelector(".popup__caption");
const popupImagePicture = document.querySelector(".popup__image");
const formElementImage = document.forms["new-place"];
const imageLinkInput = document.querySelector(".popup__input_type_url");
const imageNameInput = document.querySelector(".popup__input_type_card-name");

const popupAddCard = document.querySelector(".popup_type_new-card");
const popupOpenAddCard = document.querySelector(".profile__add-button");

// @todo: Работа модальных окон
function handleProfileSubmit(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closeModal(popupEditProfile);
}

const openPopupImage = (image, caption) => {
  popupImagePicture.src = image;
  popupImagePicture.alt = caption;
  popupImageCaption.innerText = caption;

  openModal(popupImage);
};

const handleCardSubmit = (evt) => {
  evt.preventDefault();

  const newCard = {};
  newCard.name = imageNameInput.value;
  newCard.link = imageLinkInput.value;

  const card = createCard(newCard, openPopupImage, addLike, placeTemplate);
  cardsContainer.prepend(card);

  closeModal(popupAddCard);

  formElementImage.reset();
};

popupOpenEditProfile.addEventListener("click", () => {
  openModal(popupEditProfile);

  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});
formElementProfile.addEventListener("submit", handleProfileSubmit);

popupOpenAddCard.addEventListener("click", () => openModal(popupAddCard));
formElementImage.addEventListener("submit", handleCardSubmit);

document
  .querySelectorAll(".popup")
  .forEach((popup) => popup.classList.add("popup_is-animated"));

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const card = createCard(cardData, openPopupImage, addLike, placeTemplate);
  cardsContainer.append(card);
});
