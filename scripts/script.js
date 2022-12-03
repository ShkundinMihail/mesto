import initialCards from './cards.js';

const nameAuthor = document.querySelector('.author__name');
const workAuthor = document.querySelector('.author__work');
const editAuthorButton = document.querySelector('.author__edit');
const popupEditAuthor = document.querySelector('#edit-profile');
const popupElementAddPhoto = document.querySelector('#add-card');
const closeButtonEditAuthor = document.querySelector('#close-edit-author');
const closeButtonAddPhoto = document.querySelector('#close-add-photo');
const closeButtonPhoto = document.querySelector('#close-photo-popup')
const popupFormAuthor = document.querySelector('.popup__author-edit');
const inputNameAuthor = document.querySelector('.popup__input-style_edit_name');
const inputWorkAuthor = popupFormAuthor.querySelector('.popup__input-style_edit_work');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');
const buttonAddCard = document.querySelector('.profile__add-photo');
const openPhoto = document.querySelector('#open-photo');
const openCardPhoto = openPhoto.querySelector('.popup__open-photo');
const openTitle = document.querySelector('.popup__open-title');
const popupPhotoForm = document.querySelector('#popupPhotoForm');
const titlePhotoValue = document.querySelector('#titlePhoto');
const linkPhotoValue = document.querySelector('#linkPhoto');

//Закрытие попапов
const closePopup = function (item, mod) {
    item.classList.remove(mod);
};
const closePopupEditAuthor = function () { closePopup(popupEditAuthor, 'popup_opened') };
const closePopupAddPhoto = function () { closePopup(popupElementAddPhoto, 'popup_opened') };
const closePopupPhoto = function () { closePopup(openPhoto, 'popup_opened-photo') };
//Открытие попапов
const openPopup = function (item, mod) {
    item.classList.add(mod);
};
const openPopupEditAuthor = function () {
    openPopup(popupEditAuthor,'popup_opened');
    inputNameAuthor.value = nameAuthor.textContent;
    inputWorkAuthor.value = workAuthor.textContent;
};

const openPopupAddPhoto = function () { openPopup(popupElementAddPhoto,'popup_opened'); };

//Добавление карточек из массива
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
        openPopup(openPhoto,'popup_opened-photo');
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

    closePopupPhoto();

    popupPhotoForm.reset();
};
//Закрытие по оверлею
const closePopupByClickOnOverlay = event => {
    if (event.target === event.currentTarget) {
    closePopupEditAuthor(event.currentTarget);
    closePopupAddPhoto(event.currentTarget);
    closePopupPhoto(event.currentTarget);
    }
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
popupEditAuthor.addEventListener('click', closePopupByClickOnOverlay);
popupElementAddPhoto.addEventListener('click', closePopupByClickOnOverlay);
openPhoto.addEventListener('click', closePopupByClickOnOverlay);
popupPhotoForm.addEventListener('submit', addPhoto);
