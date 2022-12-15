import initialCards from './cards.js';

const nameAuthor = document.querySelector('.author__name');                               // на странице автор имя
const workAuthor = document.querySelector('.author__work');                               // на странице автор работа
const editAuthorButton = document.querySelector('.author__edit');                         // вызов  формы изменения автора
const buttonAddCard = document.querySelector('.profile__add-photo');                      //добавить фото на страницу
const openPhoto = document.querySelector('#open-photo');                                  // открыть фото в отдельном попапе

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

const closeButtonPhoto = document.querySelector('#close-photo-popup');                    //закрыть попап с фото кнопка
const openCardPhoto = openPhoto.querySelector('.popup__open-photo');                      //фото открытое в попапе
const openTitle = document.querySelector('.popup__open-title');                           //название открытое в попапе

const elements = document.querySelector('.elements');                                     //место для контента из DOM
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');//шаблон карточек

//Закрытие попапов
const closePopup = function (item) {
    item.classList.remove('popup_opened');
};
//закрытие на esc
const closePopupOnClickEsc = (e) =>{
    if(e.key === 'Escape'){
    const popups = [...document.querySelectorAll('.popup')];
    popups.forEach(el=>{
      el.classList.remove('popup_opened');
    });
};
};
const closePopupEditAuthor = function () { closePopup(popupEditAuthor)};
const closePopupAddPhoto = function () { closePopup(popupElementAddPhoto) };
const closePopupPhoto = function () { closePopup(openPhoto) };

//Открытие попапов
const openPopup = function (item) {
    item.classList.add('popup_opened');
};
const openPopupEditAuthor = function () {
    openPopup(popupEditAuthor);
    inputNameAuthor.value = nameAuthor.textContent;
    inputWorkAuthor.value = workAuthor.textContent;
};

const openPopupAddPhoto = function () { openPopup(popupElementAddPhoto); };

//Добавление карточек из массива также лайки ,делиты 
function createElement(item) {
    const card = elementTemplate.cloneNode(true);
    const cardTitle = card.querySelector('.element__title');
    const cardPhoto = card.querySelector('.element__photo');
    const likeElement = card.querySelector('.element__like');
    const photoButtonDelete = card.querySelector('#deletePhoto');
    cardTitle.textContent = item.name;
    cardPhoto.src = item.link;
    cardPhoto.alt = item.alt;

    const openCard = function () {
        openPopup(openPhoto);
        openTitle.textContent = cardTitle.textContent;
        openCardPhoto.src = cardPhoto.src;
    };
    cardPhoto.addEventListener('click', openCard);

    const elementLikeActive = function (e) {
        e.target.classList.toggle('element__like_active');
    };
    likeElement.addEventListener('click', elementLikeActive);
    const deletePhoto = function (event) {
        event.target.closest('.element').remove();
    };
    photoButtonDelete.addEventListener('click', deletePhoto);
    return card;
};

initialCards.forEach(function (item) {
    const newElement = createElement(item);
    elements.append(newElement);

});
//Добавление карточек из попапа
const addPhoto = function (event) {
    event.preventDefault();
    const cardData = {
        name: titlePhotoValue.value,
        link: linkPhotoValue.value,
        alt: titlePhotoValue.value
    };
    const newCard = createElement(cardData);
    elements.prepend(newCard);

    closePopupAddPhoto();

    popupPhotoForm.reset();
};
//Закрытие по оверлею
const closePopupByClickOnOverlay = event => {
    if (event.target === event.currentTarget) {
        closePopup(event.currentTarget);        //получилось методом 'тыка' т.к. не понимаю логики работы.
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
closeButtonPhoto.addEventListener('click', closePopupPhoto);

document.addEventListener('keydown' , closePopupOnClickEsc)   //закрытие на esc  

popupEditAuthor.addEventListener('click', closePopupByClickOnOverlay);
popupElementAddPhoto.addEventListener('click', closePopupByClickOnOverlay);
openPhoto.addEventListener('click', closePopupByClickOnOverlay);
popupPhotoForm.addEventListener('submit', addPhoto);
