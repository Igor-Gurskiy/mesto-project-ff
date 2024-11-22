const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-27",
  headers: {
    authorization: "eee47a36-7f04-45e4-8ee5-646acc5ec68f",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

const deleteCard = (idCard) => {
  return fetch(`${config.baseUrl}/cards/${idCard}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
};

const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};

const patchProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(handleResponse);
};

const patchCard = (name, link) => {
  return headUrl(link).then(() =>
    fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(handleResponse)
  );
};

const patchAvatar = (link) => {
  return headUrl(link).then(() =>
    fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(handleResponse)
  );
};

const headUrl = (link) => {
  return fetch(link, {
    method: "HEAD",
  })
    .then((res) => {
      if (res.ok) {
        const curentUrlType = res.headers.get("content-type");
        if (curentUrlType.indexOf("image") > -1) {
          return Promise.resolve();
        }
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteLike = (cardDataId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardDataId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

const putLike = (cardDataId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardDataId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleResponse);
};

export {
  deleteCard,
  getProfile,
  getCards,
  patchProfile,
  patchCard,
  patchAvatar,
  deleteLike,
  putLike,
};
