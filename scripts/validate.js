
class FormValidator {
    constructor(config) {
        this._form = config.formSelector;
        this._input = config.inputSelector;
        this._button = config.submitButtonSelector;
        this._btnDis = config.inactiveButtonClass
        this._error = config.inputErrorClass;
        this._inputs = config.inputsSelector;
        console.log(config.formSelector)
    }
    
    enableValidation() {
        this._buttonStatus();
        this._errorMessage();
    }
    _buttonStatus() {
        if ([...this._form.querySelectorAll(this._input)].every(input => input.validity.valid)) {
            this._button.disabled = ''
            this._button.classList.remove(this._btnDis)
        } else {
            this._button.disabled = 'disabled'
            this._button.classList.add(this._btnDis)
        }
    }
    _errorMessage() {
        if (this._input.validity.valid) {
            this._input.classList.remove(this._error)
            this._error.textContent = ''

        } else {
            this._input.classList.add(this._error)
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
                const valid = new FormValidator(objSet);
                valid.enableValidation()
            });
        });
    });
}

const objSet = {                                                                  
    formSelector: '.popup__author-edit',                                             
    inputSelector: '.popup__input-style',                                          
    submitButtonSelector: '.popup__save',                                            
    inactiveButtonClass: 'popup__save_disabled',                                    
    inputSelector: 'popup__author-edit'                                             
};                                                                                 

export { megaValidationOfTheGalacticScale };
