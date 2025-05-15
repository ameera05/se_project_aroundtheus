import "../pages/index.css";
import { config } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "./Api.js";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d6b6e546-f538-467e-af58-784d7d51e987",
  },
});

api
  .getInitialCards()
  .then((cards) => {
    console.log(cards);
  })
  .catch((err) => {
    console.error(err);
  });

//templates
const cardlistEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const modals = document.querySelectorAll(".modal");
const modalContainer = document.querySelector(".modal__container");

//edit profile
const profileEditBtn = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

//add card
const profileAddModal = document.querySelector("#profile-add-modal");
const addCardFormElement = profileAddModal.querySelector(".modal__form");
const addNewCardButton = document.querySelector(".profile__add-button");
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

//preview image
const previewModalCloseBtn = document.querySelector(
  "#preview-image-close-button"
);
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageElement = document.querySelector(".modal__image");
const previewImageLabel = document.querySelector(".modal__image-label");

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

function handleImageClick(cardData) {
  previewImagePopup.open(cardData);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick, api);
  return card.getView();
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(data) {
  api
    .updateUserInfo({
      name: data.title,
      about: data.description,
    })
    .then((updatedUser) => {
      user.setUserInfo({
        name: updatedUser.name,
        description: updatedUser.about,
        avatar: updatedUser.avatar,
        _id: updatedUser._id,
      });
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleProfileAddSubmit(data) {
  api
    .addCard({
      name: data.title,
      link: data.url,
    })
    .then((newCard) => {
      section.addItem(createCard(newCard));
      newCardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleEscClose(e) {
  if (e.key === "Escape")
    document.querySelectorAll(".modal.modal_opened").forEach(closeModal);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

//edit profile

profileEditBtn.addEventListener("click", () => {
  const currentUserInfo = user.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;
  editProfilePopup.open();
});

// add new card button

addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

const addCardFormValidator = new FormValidator(config, addCardFormElement);
addCardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(config, profileEditForm);
profileFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                               Pop Ups                                      */
/* -------------------------------------------------------------------------- */
//add card popup
const newCardPopup = new PopupWithForm(
  "#profile-add-modal",
  handleProfileAddSubmit
);
newCardPopup.setEventListeners();

//edit profile popup
const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

//preview image popup
const previewImagePopup = new PopupWithImage("#preview-image-modal");
previewImagePopup.setEventListeners();

//Section

const section = new Section(
  {
    item: [],
    renderer: (item) => {
      section.addItem(createCard(item));
    },
  },
  cardlistEl
);

api
  .getInitialCards()
  .then((cards) => {
    cards.forEach((card) => {
      section.addItem(createCard(card));
    });
  })
  .catch((err) => {
    console.error(err);
  });

//Userinfo
const user = new UserInfo({
  name: ".profile__title",
  description: ".profile__description",
});

api
  .getUserInfo()
  .then((userData) => {
    user.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar,
      _id: userData._id,
    });
  })
  .catch((err) => {
    console.error(err);
  });

export function multiply(a, b) {
  return a * b;
}
