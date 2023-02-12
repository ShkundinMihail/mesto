import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor( popup ) {
    super(popup);
    this._formPopup = this._popup.querySelector('.popup__author-edit');
    this._buttonSubmit = this._popup.querySelector('.popup__save');
  }
  setSubmitHandler(functionCallback) {
    this._function = functionCallback;
  }
  setEventListeners() {
    super.setEventListeners();
    this._formPopup.addEventListener('click', (e) => {
      e.preventDefault();
      this._function();
    });
  }
  loadInfo(download) {
    if (download) {
      this._buttonSubmit.textContent = 'Подождите...'
    } else {
      this._buttonSubmit.textContent = 'Да';
    }
  }
}
