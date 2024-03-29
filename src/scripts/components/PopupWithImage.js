import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._popupPicture = this._popup.querySelector('.popup__open-photo');
        this._popupTitle = this._popup.querySelector('.popup__open-title');
    }

    open(name, link) {
        super.open()
        this._popupTitle.textContent = name;
        this._popupPicture.src = link;
        this._popupPicture.alt = name;
    }
}
