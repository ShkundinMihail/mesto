class FormValidator {
    constructor(config, form) {
        this._form = form;
        this._popup = this._form.closest(config.popup);
        this._inputsForm = [...this._form.querySelectorAll(config.input)]
        this._button = this._form.querySelector(config.button);
        this._btnDisColor = config.btnDisColor;
        this._btnDisStatus = config.btnDisStatus;
        this._inputErrorColor = config.inputErrorColor;
    }
    _formStatusStartup() {
        this._buttonStatus()
        if (!this._popup.style.visibility.visible === true) {
            this._inputsForm.forEach(input => {
                const errorText = this._form.querySelector(`#${input.id}-error`);
                errorText.textContent = null;
                input.classList.remove(this._inputErrorColor);
            })
        }

    }
    _buttonStatus() {
        if (this._inputsForm.every(input => input.validity.valid)) {
            this._button.disabled = !this._btnDisStatus;
            this._button.classList.remove(this._btnDisColor);
        } else {
            this._button.disabled = this._btnDisStatus;
            this._button.classList.add(this._btnDisColor);
        }
    }
    _errorMessage(input) {
        const errorText = this._form.querySelector(`#${input.id}-error`);
        if (input.validity.valid) {
            errorText.textContent = null;
            input.classList.remove(this._inputErrorColor);
        } else {
            errorText.textContent = input.validationMessage;
            input.classList.add(this._inputErrorColor);
        }
    }
    enableValidation() {
        this._formStatusStartup()
        this._inputsForm.forEach(input => {
            input.addEventListener('input', () => {
                this._buttonStatus();
                this._errorMessage(input);
            });
        });
    };
};

const validationSettings = {
    input: '.popup__input-style',
    button: '.popup__save',
    btnDisColor: 'popup__save_disabled',
    btnDisStatus: 'disabled',
    inputErrorColor: 'popup__input-style_error',
    errorMessage: '.popup__form-error',
    popup: '.popup',
};

export { validationSettings, FormValidator };
