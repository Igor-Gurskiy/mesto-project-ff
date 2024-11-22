import "/src/pages/index.css";

import { openModal, closeModal } from "./modal";
import { createCard, addLike } from "./card";
import { clearValidation, enableValidation } from "./validation";
import {
  getProfile,
  getCards,
  patchProfile,
  patchCard,
  patchAvatar,
  deleteCard,
} from "./api";
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
const imageProfile = document.querySelector(".profile__image");

const popupImage = document.querySelector(".popup_type_image");
const popupImageCaption = document.querySelector(".popup__caption");
const popupImagePicture = document.querySelector(".popup__image");
const formElementImage = document.forms["new-place"];
const imageLinkInput = document.querySelector(".popup__input_type_url");
const imageNameInput = document.querySelector(".popup__input_type_card-name");

const popupAddCard = document.querySelector(".popup_type_new-card");
const popupOpenAddCard = document.querySelector(".profile__add-button");

const popupDelete = document.querySelector(".popup_type_delete");
const formDelete = document.forms["delete"];

const formElementAvatar = document.forms["new-avatar"];
const avatarLinkInput = document.querySelector(".popup__input_type_url-avatar");

const popupOpenAvatar = document.querySelector(".profile__edit-avatar");
const popupAvatar = document.querySelector(".popup_type_new-avatar");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

const handleProfileSubmit = (evt) => {
  evt.preventDefault();

  renderLoading(true, formElementProfile);

  patchProfile(nameInput.value, jobInput.value)
    .then((data) => {
      nameProfile.textContent = data.name;
      jobProfile.textContent = data.about;
      closeModal(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, formElementProfile));
};

const openPopupImage = (image, caption) => {
  popupImagePicture.src = image;
  popupImagePicture.alt = caption;
  popupImageCaption.innerText = caption;

  openModal(popupImage);
};

const handleCardSubmit = (evt) => {
  evt.preventDefault();

  renderLoading(true, formElementImage);

  patchCard(imageNameInput.value, imageLinkInput.value)
    .then((cardData) => {
      const idProfile = cardData.owner._id;
      const card = createCard(
        cardData,
        openPopupImage,
        addLike,
        placeTemplate,
        idProfile,
        onDeleteCard
      );
      cardsContainer.prepend(card);

      closeModal(popupAddCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(false, formElementImage));
};

popupOpenEditProfile.addEventListener("click", () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  clearValidation(formElementProfile, validationConfig);
  openModal(popupEditProfile);
});
formElementProfile.addEventListener("submit", handleProfileSubmit);

popupOpenAddCard.addEventListener("click", () => {
  formElementImage.reset();

  clearValidation(formElementImage, validationConfig);
  openModal(popupAddCard);
});
formElementImage.addEventListener("submit", handleCardSubmit);

document
  .querySelectorAll(".popup")
  .forEach((popup) => popup.classList.add("popup_is-animated"));

let cardForDelete = {};

const onDeleteCard = (cardId, cardElement) => {
  cardForDelete = {
    id: cardId,
    cardElement,
  };
  openModal(popupDelete);
};

const handleDeleteCardSubmit = (evt) => {
  evt.preventDefault();

  if (!cardForDelete.cardElement) return;

  deleteCard(cardForDelete.id)
    .then(() => {
      cardForDelete.cardElement.remove();
      closeModal(popupDelete);
      cardForDelete = {};
    })
    .catch((err) => {
      console.log(err);
    });
};

formDelete.addEventListener("submit", handleDeleteCardSubmit);

Promise.all([getProfile(), getCards()])
  .then(([profile, cards]) => {
    nameProfile.textContent = profile.name;
    jobProfile.textContent = profile.about;
    imageProfile.style = `background-image: url('${profile.avatar}')`;
    const idProfile = profile._id;

    cards.forEach((cardData) => {
      const card = createCard(
        cardData,
        openPopupImage,
        addLike,
        placeTemplate,
        idProfile,
        onDeleteCard
      );
      cardsContainer.append(card);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const handleAvatarSubmit = (evt) => {
  evt.preventDefault();

  renderLoading(true, formElementAvatar);

  patchAvatar(avatarLinkInput.value)
    .then((data) => {
      imageProfile.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(false, formElementAvatar));

  closeModal(popupAvatar);

  formElementAvatar.reset();
};

popupOpenAvatar.addEventListener("click", () => openModal(popupAvatar));
formElementAvatar.addEventListener("submit", handleAvatarSubmit);

popupOpenAvatar.addEventListener("click", () => {
  formElementAvatar.reset();

  clearValidation(formElementAvatar, validationConfig);
  openModal(popupAvatar);
});

formElementAvatar.addEventListener("submit", handleAvatarSubmit);

function renderLoading(isLoading, form) {
  const button = form.querySelector(".popup__button");
  button.textContent = isLoading ? "Cохранение..." : "Сохранить";
}
