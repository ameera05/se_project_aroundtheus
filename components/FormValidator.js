export default class FormValidator {
  constructor(config, formEl) {
    this._formEl = formEl;
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
  }

  _showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    this._errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(inputErrorClass);
    this._errorMessageEl.textContent = inputEl.validationMessage;
    this._errorMessageEl.classList.add(errorClass);
  }

  _hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    this.errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    this._errorMessageEl.textContent = "";
    this._errorMessageEl.classList.remove(errorClass);
  }

  _checkInputValidity(formEl, inputEl, options) {
    if (!inputEl.validity.valid) {
      return this._showInputError(formEl, inputEl, options);
    }
    this._hideInputError(formEl, inputEl, options);
  }

  _hasInvalidInput(inputList) {
    return !this._inputList.every((inputEl) => inputEl.validity.valid);
  }

  _toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    if (this._hasInvalidInput(inputEls)) {
      this.disableSubmitButton();
      return;
    }
    this.enableSubmitButton();
  }

  _enableSubmitButton() {
    this._submitButton.classList.add(inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _disableSubmitButton() {
    this._submitButton.classList.remove(inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _setEventListeners(formEl, options) {
    this._inputList = [...this._formEl.querySelectorAll(this._inputSelector)];
    this._submitButton = formEl.querySelector(submitButtonSelector);

    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(formEl, inputEl, options);
        this._toggleButtonState(inputEls, submitButton, options);
      });
    });
  }

  _enableValidation(options) {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners(formEl, options);
  }
}
