import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popup, { callbackSubmitForm }) {
        super(popup);
        this._callbackSubmitForm = callbackSubmitForm;
        this._formPopup = this._popup.querySelector('.popup__author-edit');
        this._inputsForm = [...this._formPopup.querySelectorAll('.popup__input-style')];
        this._buttonSubmit = this._popup.querySelector('.popup__save');
    }
    close() {
        super.close();
        this._formPopup.reset();
    }
    _getInputValues() {
        this._dataFormFields = {};
        this._inputsForm.forEach(object=>{
            this._dataFormFields[object.name] = object.value;
        })
        return this._dataFormFields
    }
    setEventListeners() {
        super.setEventListeners();
        this._formPopup.addEventListener('submit', (e) => {
            e.preventDefault();
            this._callbackSubmitForm(this._getInputValues());
            this.close();
        })
    }

}