
class FormValidator {
    constructor(form, input, button, error, inputs) {
        this._form = form;
        this._input = input;
        this._button = button;
        this._error = error;
        this._inputs = inputs;
    }
    enableValidation() {
        this._buttonStatus();
        this._errorMessage();
    }
    _buttonStatus() {
        if (this._inputs.every(input => input.validity.valid)) {
            this._button.disabled = ''
            this._button.classList.remove('popup__save_disabled')
        } else {
            this._button.disabled = 'disabled'
            this._button.classList.add('popup__save_disabled')
        }
    }
    _errorMessage() {
        if (this._input.validity.valid) {
            this._input.classList.remove('popup__input-style_error')
            this._error.textContent = ''

        } else {
            this._input.classList.add('popup__input-style_error')
            this._error.textContent = this._input.validationMessage
        }
    }
}

const megaValidationOfTheGalacticScale = () => {
    const forms = [...document.querySelectorAll('.popup__author-edit')];
    forms.forEach(form => {
        const inputs = [...form.querySelectorAll('.popup__input-style')];
        const button = form.querySelector('.popup__save');
        form.addEventListener('submit', (e) => {
            e.preventDefault()
        });
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const error = form.querySelector(`#${input.id}-error`);
                const valid = new FormValidator(form, input, button, error, inputs);
                valid.enableValidation()
            });
        });
    });
}

export { megaValidationOfTheGalacticScale };
