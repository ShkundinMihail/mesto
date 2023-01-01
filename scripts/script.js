import { Card } from './card.js';
import { initialCards } from './cards.js';
import { megaValidationOfTheGalacticScale } from './validate.js'

const nameAuthor = document.querySelector('.author__name');                               // на странице автор имя
const workAuthor = document.querySelector('.author__work');                               // на странице автор работа
const editAuthorButton = document.querySelector('.author__edit');                         // вызов  формы изменения автора кнопка
const buttonAddCard = document.querySelector('.profile__add-photo');                      //добавить фото на страницу

const popupEditAuthor = document.querySelector('#edit-profile');                          // попап автора
const closeButtonEditAuthor = document.querySelector('#close-edit-author');               //close для попапа автора
const popupFormAuthor = document.querySelector('.popup__author-edit');                    // форма попапа изменения автора
const inputNameAuthor = document.querySelector('.popup__input-style_edit_name');          //поле ввода автора имя
const inputWorkAuthor = popupFormAuthor.querySelector('.popup__input-style_edit_work');   //поле ввода автора работа

const popupElementAddPhoto = document.querySelector('#add-card');                         //попап добавления фоток
const closeButtonAddPhoto = document.querySelector('#close-add-photo');                   //закрытие попапа добавления фоток
const titlePhotoValue = document.querySelector('#titlePhoto');                            // поле ввода название карточки
const linkPhotoValue = document.querySelector('#linkPhoto');                              //поле ввода ссылка на картинку
const popupPhotoForm = document.querySelector('#popupPhotoForm');                         //форма попапа добавления фото

megaValidationOfTheGalacticScale()// валидация!!!

//зальём карточки
initialCards.forEach((item) => {
    const card = new Card(item, '#element-template');
    const cardElement = card.generateCard();
    document.querySelector('.elements').append(cardElement);
});
//Добавление карточек из попапа
const addPhoto = function (event) {
    event.preventDefault();
    const cardData = {
        name: titlePhotoValue.value,
        link: linkPhotoValue.value,
        alt: titlePhotoValue.value
    };
    const card = new Card(cardData, '#element-template');
    const cardElement = card.generateCard();
    document.querySelector('.elements').prepend(cardElement);
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

const closePopupEditAuthor = function () { closePopup(popupEditAuthor) };
const closePopupAddPhoto = function () { closePopup(popupElementAddPhoto) };

//Открытие попапов
const openPopup = function (item) {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupOnClickEsc)
};
const openPopupEditAuthor = function () {
    openPopup(popupEditAuthor);
    inputNameAuthor.value = nameAuthor.textContent;
    inputWorkAuthor.value = workAuthor.textContent;
};

const openPopupAddPhoto = function () {
    openPopup(popupElementAddPhoto);
    const button = document.querySelector('#savePhoto');
    button.disabled = 'disabled';
    button.classList.add('popup__save_disabled');
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
editAuthorButton.addEventListener('click', openPopupEditAuthor);
buttonAddCard.addEventListener('click', openPopupAddPhoto);
closeButtonEditAuthor.addEventListener('click', closePopupEditAuthor);
closeButtonAddPhoto.addEventListener('click', closePopupAddPhoto);
popupEditAuthor.addEventListener('click', closePopupByClickOnOverlay);
popupElementAddPhoto.addEventListener('click', closePopupByClickOnOverlay);
popupPhotoForm.addEventListener('submit', addPhoto);
