import './index.css';
import { Card } from '../components/Card.js';
import { initialCards } from '../components/cards.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationSettings } from '../components/validationSettings.js';
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
    const authorInfo = authorInfoSource.getUserInfo();
    inputNameAuthor.value = authorInfo.name;
    inputWorkAuthor.value = authorInfo.work;
    editAuthor.open();
    editAuthor.setEventListeners();
});
const editAuthor = new PopupWithForm(popupEditAuthor, {
    callbackSubmitForm: (value) => {
        authorInfoSource.setUserInfo({
            nameAuthor: value[0],
            workAuthor: value[1]
        })
        editAuthor.setEventListeners();
    }
});
/////////////////////////////////////////////////////////////////////////////////////////
//just validation
const profileValidation = new FormValidator(validationSettings, formEditAuthor);
const newCardValidation = new FormValidator(validationSettings, formAddPhoto);
profileValidation.enableValidation();
newCardValidation.enableValidation();
//функция которая дает возможность открывать фотки////////////////////////////////////// 
const handleCardClick = (name, link) => {
    const PopupPicture = new PopupWithImage(photoOpen);
    PopupPicture.open(name, link);
    PopupPicture.setEventListeners();
}
//добавление фоток из попапа////////////////////////////////////////////////////////////
const justMakingCard = (item) => {
    const card = new Card(item, '#element-template', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement
}
const addCardFromPopup = new PopupWithForm(popupElementAddPhoto, {
    callbackSubmitForm: (value) => {
        const cardData = [{ name: value[0], link: value[1] }]
        console.log(cardData)
        const aaa = new Section({
            data: cardData,
            renderer: (item) => {
                aaa.addItemToTop(justMakingCard(item));
            }
        }, contentZone)
        aaa.renderItems()
        addCardFromPopup.close();
    }
})
addCardFromPopup.setEventListeners();

buttonAddCard.addEventListener('click', () => {
    newCardValidation.editStatusButton();
    addCardFromPopup.open();
}, contentZone);

//добавление фоток из массива cards/////////////////////////////////////////////////////
const cardsFromArray = new Section({
    data: initialCards,
    renderer: (item) => {
        cardsFromArray.addItem(justMakingCard(item));
    }
}, contentZone);
cardsFromArray.renderItems()
//////////////////////////////////////////////////////////////////////////////////////
