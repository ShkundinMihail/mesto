import './index.css';
let userId;
import { Card } from '../components/Card.js';
import { initialCards } from '../utils/cards.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationSettings } from '../utils/validationSettings.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import { formAddPhoto, authorEditButton, buttonAddCard, popupEditAuthor, formEditAuthor, popupEditAvatar, formEditAvatar, buttonEditAvatar, popupDelete, popupFormAuthor, inputNameAuthor, inputWorkAuthor, contentZone, popupElementAddPhoto, photoOpen } from '../utils/constants.js'
//api//////////////////////////////////////////////////////////////////////////////////////
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '22484fcb-aa03-43f2-ad62-a17b1e9a91a9',
    'Content-Type': 'application/json',
  }
});
//данные об авторе с сервера///////////////////////////////////////////////////////////////
const authorInfoSource = new UserInfo({
  name: '.author__name',
  work: '.author__work',
  avatar: '.author__avatar',
});
Promise.all([api.userInfoFromServer()])
  .then(([userInfo]) => {
    authorInfoSource.setUserInfo({ nameAuthor: userInfo.name, workAuthor: userInfo.about });
    authorInfoSource.setUserAvatar({ avatarAuthor: userInfo.avatar });
    userId = userInfo._id;
  })
  .catch((err) => {
    console.log(`Ошибка данных: ${err}`);
  });
//попап изменения аватара автора///////////////////////////////////////////////////////////////
const editAvatar = new PopupWithForm(popupEditAvatar, 'Сохранение', {
  callbackSubmitForm: (value) => {
    api.changeAvatar(value)
      .then(() => {
        editAvatar.loadInfo(true)
        authorInfoSource.setUserAvatar({ avatarAuthor: value.avatar })
      })
      .catch((err) => { console.log(`Ошибка данных : ${err}`) })
      .finally(() => { editAvatar.loadInfo(false)
      editAvatar.close()})
  }
});
buttonEditAvatar.addEventListener('click', () => {
  editAvatarValidation.editStatusButton();
  editAvatar.open()
});
editAvatar.setEventListeners();
//попап текста о авторе//////////////////////////////////////////////////////////////////////////
authorEditButton.addEventListener('click', () => {
  profileValidation.resetError();
  const authorInfo = authorInfoSource.getUserInfo();
  inputNameAuthor.value = authorInfo.name;
  inputWorkAuthor.value = authorInfo.work;
  editAuthor.open();
});
const editAuthor = new PopupWithForm(popupEditAuthor, 'Сохранение', {
  callbackSubmitForm: (value) => {
    api.changeUserInfo(value)
      .then(() => {
        editAuthor.loadInfo(true)
        authorInfoSource.setUserInfo({
          nameAuthor: value.name,
          workAuthor: value.work,
        })
      })
      .catch((err) => { console.log(`Ошибка данных : ${err}`) })
      .finally(() => { editAuthor.loadInfo(false)
      editAuthor.close()})
  }
});
editAuthor.setEventListeners();//установил в глобальной области
/////////////////////////////////////////////////////////////////////////////////////////
//just validation
const profileValidation = new FormValidator(validationSettings, formEditAuthor);
const newCardValidation = new FormValidator(validationSettings, formAddPhoto);
const editAvatarValidation = new FormValidator(validationSettings, formEditAvatar);
profileValidation.enableValidation();
newCardValidation.enableValidation();
editAvatarValidation.enableValidation();
//экземпляр класса который дает возможность открывать фотки//////////////////////////////////////
const popupPicture = new PopupWithImage(photoOpen);
popupPicture.setEventListeners();


//добавление фоток из попапа////////////////////////////////////////////////////////////
const justMakingCard = (item) => {
  const card = new Card(item, '#element-template', {
    userId: userId,
    putLike: (cardId) => {
      api.putLikeEl(cardId)
        .then((value) => {
          card.putLikeElement(value)
        })
        .catch((err) => { console.log(`Ошибка данных : ${err}`) })
    },
    deleteLike: (cardId) => {
      api.deleteLikeEL(cardId)
        .then((value) => {
          card.putLikeElement(value)
        })
        .catch((err) => { console.log(`Ошибка данных : ${err}`) })
    },
    handleCardClick: (name, link) => {
      popupPicture.open(name, link)
    },
    delCard: (cardId) => {
      popupDeleteImg.open()
      popupDeleteImg.setSubmitHandler(() => {
        popupDeleteImg.loadInfo(true)
        api.deleteCard(cardId)
          .then(() => {
            card.deleteElement()
            popupDeleteImg.loadInfo(false)
            popupDeleteImg.close()
          })
      })
    }
  });
  const cardElement = card.generateCard();

  return cardElement
}
//попап удаления фоток////////////////////////////////////////////////////////////////////
const popupDeleteImg = new PopupWithConfirm(popupDelete);
popupDeleteImg.setEventListeners()

const addCardFromPopup = new PopupWithForm(popupElementAddPhoto, 'Сохранение', {
  callbackSubmitForm: (value) => {
    api.downloadNewCard(value)
      .then((data) => {
        addCardFromPopup.loadInfo(true)
        cardsFromArray.addItemToTop(justMakingCard(data))})
      .catch((err) => { console.log(`Ошибка данных : ${err}`) })
      .finally(() => { addCardFromPopup.loadInfo(false)
      addCardFromPopup.close()})

  }
})
addCardFromPopup.setEventListeners();
buttonAddCard.addEventListener('click', () => {
  newCardValidation.editStatusButton();
  addCardFromPopup.open();
});
const cardsFromArray = new Section({
  renderer: (item) => {
    cardsFromArray.addItem(justMakingCard(item));
  }
}, contentZone)
//добавление фоток из массива cards/////////////////////////////////////////////////////
Promise.all([api.cardsFromServer()])
  .then(([initialCards]) => {
    cardsFromArray.renderItems(initialCards)
  })
  .catch((err) => {
    console.log(`Ошибка данных: ${err}`);
  });
//////////////////////////////////////////////////////////////////////////////////////
