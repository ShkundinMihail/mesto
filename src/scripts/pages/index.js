import './index.css';
import { Card } from '../components/Card.js';
import { initialCards } from '../utils/cards.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationSettings } from '../utils/validationSettings.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { formAddPhoto, authorEditButton, buttonAddCard, popupEditAuthor, formEditAuthor, popupFormAuthor, inputNameAuthor, inputWorkAuthor, contentZone, popupElementAddPhoto, photoOpen } from '../utils/constants.js'
//попап автора//////////////////////////////////////////////////////////////////////////
const authorInfoSource = new UserInfo({
    name: '.author__name',
    work: '.author__work'
});
authorEditButton.addEventListener('click', () => {
    profileValidation.resetError()
    const authorInfo = authorInfoSource.getUserInfo();
    inputNameAuthor.value = authorInfo.name;
    inputWorkAuthor.value = authorInfo.work;
    editAuthor.open();
});

const editAuthor = new PopupWithForm(popupEditAuthor, {
    callbackSubmitForm: (value) => {
        authorInfoSource.setUserInfo({
            nameAuthor: value.name,
            workAuthor: value.work,
        })
    }
});
editAuthor.setEventListeners();//установил в глобальной области
/////////////////////////////////////////////////////////////////////////////////////////
//just validation
const profileValidation = new FormValidator(validationSettings, formEditAuthor);
const newCardValidation = new FormValidator(validationSettings, formAddPhoto);
profileValidation.enableValidation();
newCardValidation.enableValidation();
//экземпляр класса который дает возможность открывать фотки////////////////////////////////////// 
const popupPicture = new PopupWithImage(photoOpen);
popupPicture.setEventListeners();
//добавление фоток из попапа////////////////////////////////////////////////////////////
const justMakingCard = (item) => {
    const card = new Card(item, '#element-template', { handleCardClick: (name, link) => { popupPicture.open(name, link) } });
    const cardElement = card.generateCard();
    return cardElement
}
const addCardFromPopup = new PopupWithForm(popupElementAddPhoto, {
    callbackSubmitForm: (value) => {
        const cardData = [{ name: value.title, link: value.link }]
        const placeForPhoto = new Section({
            data: cardData,
            renderer: (item) => {
                placeForPhoto.addItemToTop(justMakingCard(item));
            }
        }, contentZone)
        placeForPhoto.renderItems()
        addCardFromPopup.close();
    }
})
addCardFromPopup.setEventListeners();

buttonAddCard.addEventListener('click', () => {
    newCardValidation.editStatusButton();
    addCardFromPopup.open();
});

//добавление фоток из массива cards/////////////////////////////////////////////////////
const cardsFromArray = new Section({
    data: initialCards,
    renderer: (item) => {
        cardsFromArray.addItem(justMakingCard(item));
    }
}, contentZone);
cardsFromArray.renderItems()
//////////////////////////////////////////////////////////////////////////////////////
