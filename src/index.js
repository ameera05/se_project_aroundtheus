import "./pages/index.css";
import { initialCards, config } from "../src/utils/constants.js";
import Card from "../src/components/Card.js";
import FormValidator from "../src/components/FormValidator.js";
import Popup from "../src/components/Popup.js";
import PopupWithForm from "../src/components/PopupWithForm.js";
import PopupWithImage from "../src/components/PopupWithImage.js";
import Section from "../src/components/Section.js";
import UserInfo from "../src/components/UserInfo.js";

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

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
  openModal(previewImageModal);
  previewImageElement.src = cardData.link;
  previewImageElement.alt = cardData.name;
  previewImageLabel.textContent = cardData.name;
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = createCard(cardData);
  wrapper.prepend(cardElement);
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

//function handleProfileEditSubmit(e) {
//profileTitle.textContent = profileTitleInput.value;
//profileDescription.textContent = profileDescriptionInput.value;
//closeModal(profileEditModal);
//}

function handleProfileEditSubmit(e) {
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  editProfilePopup.close();
}

//function handleProfileAddSubmit(e) {
//e.preventDefault();
//const name = cardTitleInput.value;
//const link = cardUrlInput.value;
//renderCard({ name, link }, cardlistEl);
//closeModal(profileAddModal);
//e.target.reset();
//}

function handleProfileAddSubmit(e) {
  const name = cardTitleInput.value;
  const alt = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardlistEl);
  profileAddModal.close();
  addCardFormValidator.resetForm();
}

function handleEscClose(e) {
  if (e.key === "Escape")
    document.querySelectorAll(".modal.modal_opened").forEach(closeModal);
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

//edit profile

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleProfileAddSubmit);
profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

// add new card button
addNewCardButton.addEventListener("click", () => openModal(profileAddModal));

//close modal
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target === modal || e.target.classList.contains("modal__close")) {
      closeModal(modal);
    }
  });
});

initialCards.forEach((cardData) => renderCard(cardData, cardlistEl));

const addCardFormValidator = new FormValidator(config, addCardFormElement);
addCardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(config, profileEditForm);
profileFormValidator.enableValidation();

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
    item: initialCards,
    renderer: (item) => {
      section.addItem(createCard(item));
    },
  },
  cardlistEl
);
section.renderItems();

//Userinfo
const user = new UserInfo({
  name: ".profile__title",
  description: ".profile__description",
});

export function multiply(a, b) {
  return a * b;
}
