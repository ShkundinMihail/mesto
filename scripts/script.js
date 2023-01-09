import { Card } from './Card.js';
import { initialCards } from './cards.js';
import { FormValidator } from './FormValidator.js';
import { validationSettings } from './validationSettings.js';

const nameAuthor = document.querySelector('.author__name');                               // на странице автор имя
const workAuthor = document.querySelector('.author__work');                               // на странице автор работа
const authorEditButton = document.querySelector('.author__edit');                         // вызов  формы изменения автора кнопка
const buttonAddCard = document.querySelector('.profile__add-photo');                      //добавить фото на страницу
const popupEditAuthor = document.querySelector('#edit-profile');                          // попап автора
const formEditAuthor = popupEditAuthor.querySelector('[name="infoAuthor"]');              //author form
const buttonCloseEditAuthor = document.querySelector('#close-edit-author');               //close для попапа автора
const popupFormAuthor = document.querySelector('.popup__author-edit');                    // форма попапа изменения автора
const inputNameAuthor = document.querySelector('.popup__input-style_edit_name');          //поле ввода автора имя
const inputWorkAuthor = popupFormAuthor.querySelector('.popup__input-style_edit_work');   //поле ввода автора работа
const contentZone = document.querySelector('.elements')
const popupElementAddPhoto = document.querySelector('#add-card');                         //попап добавления фоток
const formAddPhoto = popupElementAddPhoto.querySelector('[name="addPhoto"]');             //add photo form
const buttonCloseAddPhoto = document.querySelector('#close-add-photo');                   //закрытие попапа добавления фоток
const titlePhotoValue = document.querySelector('#titlePhoto');                            // поле ввода название карточки
const linkPhotoValue = document.querySelector('#linkPhoto');                              //поле ввода ссылка на картинку
const popupPhotoForm = document.querySelector('#popupPhotoForm');                         //форма попапа добавления фото
const popupPhoto = document.querySelector('.popup__open-photo');
const popupPhotoTitle = document.querySelector('.popup__open-title');
const photoOpen = document.querySelector('#open-photo');
const popupPhotoCloseButton = document.querySelector('#close-photo-popup');

//данные об авторе ,такое условие было если не ошибаюсь в 6 проектной
const dataAuthor = () => {
    inputNameAuthor.value = nameAuthor.textContent;
    inputWorkAuthor.value = workAuthor.textContent;
}
dataAuthor();

//just validation
const validation = (form) => {
    const newValidate = new FormValidator(validationSettings, form);
    newValidate.enableValidation();
}
validation(formAddPhoto);
validation(formEditAuthor);
//зальём карточки
const createCard = (item) => {
    const card = new Card(item, '#element-template', openPhotoPopup);
    const cardElement = card.generateCard();
    return cardElement;
}
initialCards.forEach(item => {
    contentZone.append(createCard(item));
});
//Добавление карточек из попапа
const addPhoto = function (event) {
    event.preventDefault();
    const cardData = {
        name: titlePhotoValue.value,
        link: linkPhotoValue.value,
        alt: titlePhotoValue.value
    };
    contentZone.prepend(createCard(cardData));
    closePopupAddPhoto();
    popupPhotoForm.reset();
};

//Закрытие попапов
const closePopup = function (item) {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupOnClickEsc);

};
//закрытие на esc
const closePopupOnClickEsc = (e) => {
    if (e.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
};

const closePopupEditAuthor = function () {
    closePopup(popupEditAuthor)
};
const closePopupAddPhoto = function () {
    closePopup(popupElementAddPhoto)
};

const closePopupPhoto = () => {
    closePopup(photoOpen);
}

//Открытие попапов
const openPopup = function (item) {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupOnClickEsc)
};

const openPopupEditAuthor = function () {
    openPopup(popupEditAuthor);
};

const openPopupAddPhoto = function () {
    openPopup(popupElementAddPhoto);
};

function openPhotoPopup(name, link) {
    popupPhoto.src = link;
    popupPhoto.alt = name;
    popupPhotoTitle.textContent = name;
    openPopup(photoOpen);
};

//Закрытие по оверлею
const closePopupByClickOnOverlay = event => {
    if (event.target === event.currentTarget) {
        closePopup(event.currentTarget);
    };
}
//Добавляет те же данные что на отображаются на странице в попап редактирования автора
const editAuthorInfo = function () {
    nameAuthor.textContent = inputNameAuthor.value;
    workAuthor.textContent = inputWorkAuthor.value;
};
//функция сохранения данных автора
const saveFormInformationAuthor = function (evt) {
    evt.preventDefault();
    editAuthorInfo();
    closePopupEditAuthor();
};

//обработчики
popupFormAuthor.addEventListener('submit', saveFormInformationAuthor);
popupPhotoForm.addEventListener('submit', addPhoto);

authorEditButton.addEventListener('click', openPopupEditAuthor);
buttonAddCard.addEventListener('click', openPopupAddPhoto);

buttonCloseEditAuthor.addEventListener('click', closePopupEditAuthor);
buttonCloseAddPhoto.addEventListener('click', closePopupAddPhoto);
popupPhotoCloseButton.addEventListener('click', closePopupPhoto);

popupEditAuthor.addEventListener('click', closePopupByClickOnOverlay);
popupElementAddPhoto.addEventListener('click', closePopupByClickOnOverlay);
photoOpen.addEventListener('click', closePopupByClickOnOverlay);
