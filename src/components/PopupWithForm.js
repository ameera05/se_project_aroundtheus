import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = [...this._popupForm.querySelectorAll(".modal__input")];
  }
}

// close() {
// this._popupForm.reset();
//super.close();
// }
//}

//const newCardPopup = new PopupWithForm("#profile-add-modal", () => {});
//newCardPopup.open();

//newCardPopup.close();
