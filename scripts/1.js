export default class FormValidator {
    constructor(validationParams, targetFormElement) {
        this._formElement = validationParams.formElement;
        this._inputElement = validationParams.inputElement;
        this._buttonElement = validationParams.buttonElement;
        this._inactiveButtonClass = validationParams.inactiveButtonClass;
        this._inputErrorClass = validationParams.inputErrorClass;
        this._errorShowClass = validationParams.errorShowClass;
        this._controlSelectorClass = validationParams.controlSelectorClass;
        this._errorClass = validationParams.errorClass;

        this._targetFormElement = targetFormElement;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = inputElement.closest(this._controlSelectorClass).querySelector(this._errorClass);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorShowClass);
    }

    _hideInputError(inputElement) {
        const errorElement = inputElement.closest(this._controlSelectorClass).querySelector(this._errorClass);

        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorShowClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    }

    _setEventListeners(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputElement));
        const buttonElement = formElement.querySelector(this._buttonElement);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    updateErrorsAndButtonState(formElement) {
        const inputList = Array.from(formElement.querySelectorAll(this._inputElement));
        const buttonElement = formElement.querySelector(this._buttonElement);

        inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });

        this._toggleButtonState(inputList, buttonElement);
    };

    enableValidation() {
        this.updateErrorsAndButtonState(this._targetFormElement);
        this._setEventListeners(this._targetFormElement);

        this._targetFormElement.addEventListener('submit', (event) => {
            event.preventDefault();
        });
    }
}



import initialCards from './utils.js';

import FormValidator from './FormValidator.js';

const root = document.querySelector('.root');

const profile = root.querySelector('.profile');
const profName = profile.querySelector('.profile__name');
const profText = profile.querySelector('.profile__job');
const popupOpenButton = profile.querySelector('.profile__button-edit')
const openPlacePopupButton = profile.querySelector('.profile__button-add');
const elementEL = root.querySelector('.element');
const cardsList = document.querySelector('.element__list');
const cardTemplateElement = document.querySelector('.element-template');
const socialLike = document.querySelectorAll('.element__social-like');
const escCode = 27;
//popup-edit
const popupProfile = document.querySelector('.popup[data-type="profile"]');
const formProfile = popupProfile.querySelector('#form-profile');
const nameInput = formProfile.querySelector('.popup__prof-name');
const jobInput = formProfile.querySelector('.popup__prof-text');
const popupCloseButton = popupProfile.querySelector('.popup__button-close')
const profFormSubmitButton = popupProfile.querySelector('.popup__button-save');
//popup-add
const editPlacePopup = document.querySelector('.popup-mesto[data-type="add"]');
const cardFormElement = editPlacePopup.querySelector('.popup-mesto__content');
const cardInputElement = cardFormElement.querySelector('.popup-mesto__prof-name');
const cardInputLinkEl = cardFormElement.querySelector('.popup-mesto__prof-text');
const closePlacePopupButton = editPlacePopup.querySelector('.popup-mesto__close');
const cardFormSubmitButton = cardFormElement.querySelector('.popup-mesto__button-save');
//popup-img
const popupFigure = document.querySelector('.popup-img[data-type="image"]');
const imageZoom = document.querySelector('.popup-img__foto');
const popupImgText = popupFigure.querySelector('.popup-img__name');
const popupImgFoto = popupFigure.querySelector('.popup-img__foto');
const popupImgCloseButton = popupFigure.querySelector('.popup-img__close');
initialCards.forEach(function(element) {
    generateCard(element.name, element.link);
});
const figureFoto = cardsList.querySelectorAll('.element__foto');
//функция открытия/закрытия попап
function togglePopup(popup) {
    popup.classList.toggle('popup__opened')
}
//закрытие попапов на оверлей.
function closePopupOverlay(popup) {
    if (event.target !== event.currentTarget) { return }
    togglePopup(event.target.closest('.popup__opened'));
}
const popupToggleProf = function(event) {
    nameInput.value = profName.textContent;
    jobInput.value = profText.textContent;
    togglePopup(popupProfile);
}
const saveProfile = function(event) {
    event.preventDefault();
    profName.textContent = nameInput.value;
    profText.textContent = jobInput.value;
    togglePopup(popupProfile);
}
formProfile.addEventListener('submit', saveProfile);
const placePopupToggle = function() {
    editPlacePopup.classList.toggle('popup__opened');
    cardFormSubmitButton.setAttribute('disabled', true);
    cardFormSubmitButton.classList.add('popup__but-disabled');
    cardFormSubmitButton.classList.remove('popup__button-save');
}
function formSubmitHandler(evt) {
    evt.preventDefault();
    profName.textContent = nameInput.value;
    profText.textContent = jobInput.value;
    togglePopup(editPlacePopup);
}
cardFormSubmitButton.addEventListener('submit', formSubmitHandler);
function generateCard(name, link) {
    const card = cardTemplateElement.content.cloneNode(true);
    card.querySelector('.element__delete-but').addEventListener('click', deleteCard);
    card.querySelector('.element__text').textContent = name;
    card.querySelector('.element__foto').alt = name;
    card.querySelector('.element__foto').src = link;
    addCard(card);
}
function addCard(card) {
    cardsList.prepend(card);
}
function deleteCard(event) {
    const card = event.target.closest('.element__group');
    card.remove();
}
figureFoto.forEach((activeFoto) => {
    activeFoto.addEventListener('click', (evt) => {
        const figureFotoTarget = evt.target;
        popupFigure.classList.toggle('popup__opened');
        popupImgFoto.src = figureFotoTarget.src;
        const figureCard = figureFotoTarget.closest('.element__group');
        popupImgText.textContent = figureCard.querySelector('.element__text').textContent;
    })
})
socialLike.forEach((activButton) => {
    activButton.addEventListener('click', (evt) => {
        const socialLikeTarget = evt.target;
        socialLikeTarget.classList.toggle('element__social-likeactiv');
    })
})
document.body.addEventListener('keyup', function(e) {
    const openedPopup = document.querySelector('.popup__opened');
    if (e.keyCode === escCode) {
        togglePopup(openedPopup)
    }
}, false)
cardFormElement.addEventListener('submit', e => {
    e.preventDefault();
    const name = cardInputElement.value;
    const link = cardInputLinkEl.value;
    generateCard(name, link);
    cardFormElement.reset();
    placePopupToggle();
})
popupOpenButton.addEventListener('click', () => { popupToggleProf(popupProfile) });
openPlacePopupButton.addEventListener('click', () => { togglePopup(editPlacePopup) });
imageZoom.addEventListener('click', () => { togglePopup(imageZoom) })
popupCloseButton.addEventListener('click', () => { togglePopup(popupProfile) })
closePlacePopupButton.addEventListener('click', () => { togglePopup(editPlacePopup) });
popupImgCloseButton.addEventListener('click', () => { togglePopup(popupFigure) });
popupProfile.addEventListener('click', () => { closePopupOverlay(popupProfile) })
editPlacePopup.addEventListener('click', () => { closePopupOverlay(editPlacePopup) })
popupFigure.addEventListener('click', () => { closePopupOverlay(popupFigure) })




const showInputError = (form, input, errorSelector, controlSelector, errorMessage) => { //выводит ошибку валидации
    const errorElement = input.closest(controlSelector).querySelector(errorSelector);
    input.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};
// const showInputError = (form, input, errorSelector, controlSelector, errorMessage) => { //выводит ошибку валидации
//     const errorElement = input.closest(controlSelector).querySelector(errorSelector);
//     input.classList.add('form__input_type_error');
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add('form__input-error_active');
// };

const hideInputError = (form, input, errorSelector, controlSelector) => { //убирает ошибку валиадации
    const errorElement = input.closest(controlSelector).querySelector(errorSelector);
    input.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};
// const hideInputError = (form, input, errorSelector, controlSelector) => { //убирает ошибку валиадации
//     const errorElement = input.closest(controlSelector).querySelector(errorSelector);
//     input.classList.remove('form__input_type_error');
//     errorElement.classList.remove('form__input-error_active');
//     errorElement.textContent = '';
// };

const checkInputValidity = (form, input, errorSelector, controlSelector) => { //выбора валидации
    if (!input.validity.valid) {
        showInputError(form, input, errorSelector, controlSelector, input.validationMessage);
    } else {
        hideInputError(form, input, errorSelector, controlSelector);
    }
};
// const checkInputValidity = (form, input, errorSelector, controlSelector) => { //выбора валидации
//     if (!input.validity.valid) {
//         showInputError(form, input, errorSelector, controlSelector, input.validationMessage);
//     } else {
//         hideInputError(form, input, errorSelector, controlSelector);
//     }
// };

const setEventListeners = (form, controlSelector, inputSelector, errorSelector) => { //функция слушателя инпутов
    const inputList = Array.from(form.querySelectorAll(inputSelector));
    const buttonElement = form.querySelector('.popup__button-save');
// const setEventListeners = (form, controlSelector, inputSelector, errorSelector) => { //функция слушателя инпутов
//     const inputList = Array.from(form.querySelectorAll(inputSelector));
//     const buttonElement = form.querySelector('.popup__button-save');

    inputList.forEach((input) => {
        input.addEventListener('input', function() {
            checkInputValidity(form, input, errorSelector, controlSelector);
            toggleButtonState(form, buttonElement)
        });
    });
};
//     inputList.forEach((input) => {
//         input.addEventListener('input', function() {
//             checkInputValidity(form, input, errorSelector, controlSelector);
//             toggleButtonState(form, buttonElement)
//         });
//     });
// };

function enableValidation({ formSelector, controlSelector, inputSelector, errorSelector }) { //функция слушателя submit 
    let formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(form, controlSelector, inputSelector, errorSelector);
    });
}
// function enableValidation({ formSelector, controlSelector, inputSelector, errorSelector }) { //функция слушателя submit 
//     let formList = Array.from(document.querySelectorAll('.form'));
//     formList.forEach((form) => {
//         form.addEventListener('submit', (evt) => {
//             evt.preventDefault();
//         });
//         setEventListeners(form, controlSelector, inputSelector, errorSelector);
//     });
// }

enableValidation({
    formSelector: '.form',
    controlSelector: '.popup__control',
    inputSelector: '.popup__input',
    errorSelector: '.popup__error',
});
// enableValidation({
//     formSelector: '.form',
//     controlSelector: '.popup__control',
//     inputSelector: '.popup__input',
//     errorSelector: '.popup__error',
// });

function toggleButtonState(form, buttonElement) {
    if (form.checkValidity()) {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove('popup__but-disabled');
        buttonElement.classList.add('popup__button-save');
    } else {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add('popup__but-disabled');
        buttonElement.classList.remove('popup__button-save');
    }
};
// function toggleButtonState(form, buttonElement) {
//     if (form.checkValidity()) {
//         buttonElement.removeAttribute('disabled');
//         buttonElement.classList.remove('popup__but-disabled');
//         buttonElement.classList.add('popup__button-save');
//     } else {
//         buttonElement.setAttribute('disabled', true);
//         buttonElement.classList.add('popup__but-disabled');
//         buttonElement.classList.remove('popup__button-save');
//     }
// };