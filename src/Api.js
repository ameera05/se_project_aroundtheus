class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _fetch(endpoint, options = {}) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      headers: this._headers,
      ...options,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCards() {
    return this._fetch("/cards");
  }

  getUserInfo() {
    return this._fetch("/users/me");
  }

  updateUserInfo(data) {
    return this._fetch("/users/me", {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  updateAvatar(link) {
    return this._fetch("/users/me/avatar", {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: link }),
    });
  }

  addCard(data) {
    return this._fetch("/cards", {
      method: "POST",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return this._fetch(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  likeCard(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, {
      method: "PUT",
    });
  }

  dislikeCard(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, {
      method: "DELETE",
    });
  }
}

export default Api;
