const author = document.querySelector('.author');
const nameAuthor = document.querySelector('.author__name');
const workAuthor = document.querySelector('.author__work');
const popupOpenButtonElement = author.querySelector('.author__edit');
const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupForm = popupElement.querySelector('.popup__author-edit')
const inputNameAuthor = document.querySelector('.popup__input-style_edit_name');
const inputWorkAuthor = popupForm.querySelector('.popup__input-style_edit_work');

const openPopup = function () {
    popupElement.classList.add('popup_opened')
    inputNameAuthor.value = nameAuthor.textContent;
    inputWorkAuthor.value = workAuthor.textContent;

};

const closePopup = function () {
    popupElement.classList.remove('popup_opened');


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
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);