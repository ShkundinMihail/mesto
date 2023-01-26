export default class Popup {
    constructor(popup) {
        this._popup = popup;
        this._buttonClosePopup = this._popup.querySelector('.popup__close');
        this._closingByClickingOnEsc = this._handleEscClose.bind(this);
    }
    _handleEscClose(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._closingByClickingOnEsc);
    }
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closingByClickingOnEsc);
    }

    setEventListeners() {
        this._buttonClosePopup.addEventListener('click', () => { this.close() });
        this._popup.addEventListener('mousedown', (e) => {
            if (e.target === e.currentTarget) {
                this.close();
            }
        }
        )
    }
}
