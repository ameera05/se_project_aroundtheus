export default class Card {
  constructor(data, cardSelector, handleImageClick, api) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._api = api;
    this._id = data._id;
    this._likes = data.likes || [];
    this._ownerId = data.owner?._id;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleDeleteCard() {
    this._api
      .deleteCard(this._id)
      .then(() => {
        this._cardElement.remove();
        this._cardElement = null;
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      });
  }

  _handleLikeIcon() {
    const isLiked = this._likeButton.classList.contains(
      "card__like-button_active"
    );

    if (!isLiked) {
      this._api
        .likeCard(this._id)
        .then((updatedCard) => {
          this._likeButton.classList.add("card__like-button_active");
          this._likeCount.textContent = updatedCard.likes.length;
        })
        .catch((err) => {
          console.error("Error liking card:", err);
        });
    } else {
      this._api
        .dislikeCard(this._id)
        .then((updatedCard) => {
          this._likeButton.classList.remove("card__like-button_active");
          this._likeCount.textContent = updatedCard.likes.length;
        })
        .catch((err) => {
          console.error("Error unliking card:", err);
        });
    }
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeCount = this._cardElement.querySelector(".card__like-count");

    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    this._cardTitleEl.textContent = this._name;

    // Set initial like count
    this._likeCount.textContent = this._likes.length;

    // Set like button active state if current user already liked
    // Optional: if you have current user ID, you can check if user liked it
    // e.g. if (this._likes.some(like => like._id === currentUserId)) { ... }

    this._setEventListeners();

    return this._cardElement;
  }
}
