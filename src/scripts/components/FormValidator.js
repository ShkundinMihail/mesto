
class FormValidator {
    constructor(config, form) {
        this._form = form;
        this._formInputs = [...this._form.querySelectorAll(config.inputSelector)]
        this._button = this._form.querySelector(config.submitButtonSelector);
        this._btnDisColor = config.inactiveButtonClass;
        this._inputErrorColor = config.inputErrorClass;
    }
    editStatusButton() {
        if (this._formInputs.every(input => input.validity.valid)) {
            this._button.disabled = false;
            this._button.classList.remove(this._btnDisColor);
        } else {
            this._button.disabled = true;
            this._button.classList.add(this._btnDisColor);
        }
    }

    _editErrorMessage(input) {
        const errorText = this._form.querySelector(`#${input.id}-error`);
        if (input.validity.valid) {
            errorText.textContent = '';
        } else {
            errorText.textContent = input.validationMessage;
        }
    }
    resetValidation() {
        this._formInputs.forEach((formInput) => {
            const errorText = this._form.querySelector(`#${formInput.id}-error`);
            errorText.textContent = '';
            formInput.classList.remove(this._inputErrorColor)
        });
        this.editStatusButton();
    }
    _editInputStatus(input) {
        if (input.validity.valid) {
            input.classList.remove(this._inputErrorColor);
        } else {
            input.classList.add(this._inputErrorColor);
        }
    }
    enableValidation() {
        this._formInputs.forEach(input => {
            input.addEventListener('input', () => {
                this.editStatusButton();
                this._editErrorMessage(input);
                this._editInputStatus(input);
            });
        });
    };
};

export { FormValidator };
