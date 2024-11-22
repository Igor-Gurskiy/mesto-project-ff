// @todo: Функция создания карточки
import { deleteLike, putLike } from "./api";

const createCard = (
  cardData,
  openPopupImage,
  addLike,
  template,
  idProfile,
  onDeleteCard
) => {
  const placeElement = template.querySelector(".places__item").cloneNode(true);
  const cardImageElement = placeElement.querySelector(".card__image");
  const buttonDelete = placeElement.querySelector(".card__delete-button");
  const buttonLike = placeElement.querySelector(".card__like-button");
  const likesQuantity = placeElement.querySelector(".card__likes-quantity");

  likesQuantity.textContent = cardData.likes.length;

  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  placeElement.querySelector(".card__title").textContent = cardData.name;

  if (cardData.owner._id === idProfile) {
    buttonDelete.addEventListener("click", () => {
      onDeleteCard(cardData._id, placeElement);
    });
  } else {
    buttonDelete.classList.add("card__delete-button-hidden");
  }

  cardImageElement.addEventListener("click", (evt) =>
    openPopupImage(evt.target.src, evt.target.alt)
  );

  buttonLike.addEventListener("click", () => {
    addLike(buttonLike, cardData, likesQuantity);
  });

  if (cardData.likes.some((like) => like._id === idProfile)) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  return placeElement;
};

const addLike = (buttonLike, cardData, likesQuantity) => {
  const likeMethod = buttonLike.classList.contains(
    "card__like-button_is-active"
  )
    ? deleteLike
    : putLike;
    
  likeMethod(cardData._id)
    .then((res) => {
      likesQuantity.textContent = res.likes.length;
      buttonLike.classList.toggle("card__like-button_is-active");
    })
    .catch((err) => {
      console.log(err);
    });
};

export { createCard, addLike };
