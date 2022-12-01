import initialCards from './data.js';

const nameAuthor = document.querySelector('.author__name');
const workAuthor = document.querySelector('.author__work');
const popupOpenButtonElement = document.querySelector('.author__edit');
const popupElementEditAuthor = document.querySelector('#edit-profile');
const popupElementAddphoto = document.querySelector('#add-card');
const popupCloseButtonElement = document.querySelector('#close-edit-author');
const closePopupButtonAddPhoto = document.querySelector('#close-add-photo');
const closePopupPhoto = document.querySelector('#close-photo-popup')
const popupForm = document.querySelector('.popup__author-edit');
const inputNameAuthor = document.querySelector('.popup__input-style_edit_name');
const inputWorkAuthor = popupForm.querySelector('.popup__input-style_edit_work');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');
const buttonAddCard = document.querySelector('.profile__add-photo');
const openPhoto = document.querySelector('#open-photo');
const openCardPhoto = openPhoto.querySelector('.popup__open-photo');
const openTitle = document.querySelector('.popup__open-title');
const popupPhotoForm = document.querySelector('#popupPhotoForm');
const titlePhotoValue = document.querySelector('#titlePhoto');
const linkPhotoValue = document.querySelector('#linkPhoto');

function elementAdd(item) {
    const card = elementTemplate.cloneNode(true);
    const cardTitle = card.querySelector('.element__title');
    const cardPhoto = card.querySelector('.element__photo');
    const likeElement = card.querySelector('.element__like');
    const photoButtonDelete = card.querySelector('#deletePhoto');
    cardTitle.textContent = item.name;
    cardPhoto.src = item.link;

    const openCard = function () {
        openPhoto.classList.add('popup_opened');
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
    return (card);
};

initialCards.forEach(function (item) {
    const simpleFunction = elementAdd(item);
    elements.append(simpleFunction);

});

const photoAdd = function (event) {
    event.preventDefault();
    if (titlePhotoValue.value !== '' && linkPhotoValue.value !== '') {
        const realArray = {
            name: titlePhotoValue.value,
            link: linkPhotoValue.value
        };
        const verySimpleFunction = elementAdd(realArray);
        elements.prepend(verySimpleFunction);

        closePopup();
        console.log(typeof linkPhotoValue.value)
    }
    else {
        closePopup();
        alert('Введете название и ссылку 👿')
    };
    titlePhotoValue.value = '';
    linkPhotoValue.value = '';
};

const openPopupEditAuthor = function () {
    popupElementEditAuthor.classList.add('popup_opened');
    inputNameAuthor.value = nameAuthor.textContent;
    inputWorkAuthor.value = workAuthor.textContent; 
};
const openPopupAddPhoto = function () {
    popupElementAddphoto.classList.add('popup_opened');
}
const closePopup = function () {
    popupElementEditAuthor.classList.remove('popup_opened');
    popupElementAddphoto.classList.remove('popup_opened');
    openPhoto.classList.remove('popup_opened');
};

const closePopupByClickOnOverlay = function (event) {
    if (event.target !== event.currentTarget) { return; }
    else { closePopup(); }
};

const editAuthorInfo = function () {
    nameAuthor.textContent = inputNameAuthor.value;
    workAuthor.textContent = inputWorkAuthor.value;
};

const savePopupInformation = function (evt) {
    evt.preventDefault();
    editAuthorInfo();
    closePopup();
};

popupForm.addEventListener('submit', savePopupInformation);
popupOpenButtonElement.addEventListener('click', openPopupEditAuthor);
popupCloseButtonElement.addEventListener('click', closePopup);
closePopupButtonAddPhoto.addEventListener('click', closePopup);
closePopupPhoto.addEventListener('click', closePopup);
popupElementEditAuthor.addEventListener('click', closePopupByClickOnOverlay);
popupElementAddphoto.addEventListener('click', closePopupByClickOnOverlay);
buttonAddCard.addEventListener('click', openPopupAddPhoto);
popupPhotoForm.addEventListener('submit', photoAdd);






