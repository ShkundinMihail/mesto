let popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.author__edit');
let infoContainer = document.querySelector('.author__info-zone');
let nameAuthor = infoContainer.querySelector('.author__name');
let workAuthor = infoContainer.querySelector('.author__work');
let inputNameAuthor = popupElement.querySelector('.popup__name');
let inputWorkAuthor = popupElement.querySelector('.popup__work');
let saveInformation = popupElement.querySelector('.popup__save');

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

let editAuthorInfo = function () {
    nameAuthor.textContent = inputNameAuthor.value;
    workAuthor.textContent = inputWorkAuthor.value;
};

function savePopupInformation(evt) {
    editAuthorInfo();
    evt.preventDefault();
    closePopup();
};

saveInformation.addEventListener('click', savePopupInformation);
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('click', closePopupByClickOnOverlay);



