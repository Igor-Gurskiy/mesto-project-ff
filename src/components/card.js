// @todo: Функция создания карточки
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
    buttonLike.classList.toggle("card__like-button_is-active");
  });

  if (cardData.likes.some((like) => like._id === idProfile)) {
    buttonLike.classList.add("card__like-button_is-active");
  }

  return placeElement;
};

const addLike = (buttonLike, cardData, likesQuantity) => {
  if (buttonLike.classList.contains("card__like-button_is-active")) {
    deleteLike(cardData)
      .then((res) => res.json())
      .then((res) => {
        likesQuantity.textContent = res.likes.length;
      });
  } else {
    putLike(cardData)
      .then((res) => res.json())
      .then((res) => {
        likesQuantity.textContent = res.likes.length;
      });
  }
};

const deleteLike = (cardData) => {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-27/cards/likes/${cardData._id}`,
    {
      method: "DELETE",
      headers: {
        authorization: "eee47a36-7f04-45e4-8ee5-646acc5ec68f",
        "Content-Type": "application/json",
      },
    }
  );
};
const putLike = (cardData) => {
  return fetch(
    `https://nomoreparties.co/v1/wff-cohort-27/cards/likes/${cardData._id}`,
    {
      method: "PUT",
      headers: {
        authorization: "eee47a36-7f04-45e4-8ee5-646acc5ec68f",
        "Content-Type": "application/json",
      },
    }
  );
};

export { createCard, addLike };
