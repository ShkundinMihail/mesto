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
Promise.all([api.userInfoFromServer(), api.cardsFromServer()])
  .then(([userInfo, initialCards]) => {
    authorInfoSource.setUserInfo({ nameAuthor: userInfo.name, workAuthor: userInfo.about });
    authorInfoSource.setUserAvatar({ avatarAuthor: userInfo.avatar });
    userId = userInfo._id;
    cardsFromArray.renderItems(initialCards)
  })
  .catch((err) => {
    console.log(`Ошибка данных: ${err}`);
  });
//попап изменения аватара автора///////////////////////////////////////////////////////////////
const editAvatar = new PopupWithForm(popupEditAvatar, 'Сохранить', {
  callbackSubmitForm: (value) => {
    editAvatar.loadInfo(true)
    api.changeAvatar(value)
      .then(() => {
        authorInfoSource.setUserAvatar({ avatarAuthor: value.avatar })
        editAvatar.close()
      })
      .catch((err) => { console.log(`Ошибка данных : ${err}`) })
      .finally(() => {
        editAvatar.loadInfo(false)
      })
  }
});
buttonEditAvatar.addEventListener('click', () => {
  editAvatarValidation.editStatusButton();
  editAvatar.open()
});
editAvatar.setEventListeners();
//попап текста о авторе//////////////////////////////////////////////////////////////////////////
authorEditButton.addEventListener('click', () => {
  profileValidation.resetValidation();
  const authorInfo = authorInfoSource.getUserInfo();
  inputNameAuthor.value = authorInfo.name;
  inputWorkAuthor.value = authorInfo.work;
  editAuthor.open();
});
const editAuthor = new PopupWithForm(popupEditAuthor, 'Сохранить', {
  callbackSubmitForm: (value) => {
    editAuthor.loadInfo(true)
    api.changeUserInfo(value)
      .then(() => {
        authorInfoSource.setUserInfo({
          nameAuthor: value.name,
          workAuthor: value.work,
        })
        editAuthor.close()
      })
      .catch((err) => { console.log(`Ошибка данных : ${err}`) })
      .finally(() => {
        editAuthor.loadInfo(false)
      })
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
const makingCard = (item) => {
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
          .catch((err) => { console.log(`Ошибка данных : ${err}`) })
      })
    }
  });
  const cardElement = card.generateCard();

  return cardElement
}
//попап удаления фоток////////////////////////////////////////////////////////////////////
const popupDeleteImg = new PopupWithConfirm(popupDelete);
popupDeleteImg.setEventListeners()

const addCardFromPopup = new PopupWithForm(popupElementAddPhoto, 'Создать', {
  callbackSubmitForm: (value) => {
    addCardFromPopup.loadInfo(true)
    api.downloadNewCard(value)
      .then((data) => {
        cardsFromArray.addItemToTop(makingCard(data))
        addCardFromPopup.close()
      })
      .catch((err) => { console.log(`Ошибка данных : ${err}`) })
      .finally(() => {
        addCardFromPopup.loadInfo(false)
      })

  }
})
addCardFromPopup.setEventListeners();
buttonAddCard.addEventListener('click', () => {
  newCardValidation.editStatusButton();
  addCardFromPopup.open();
});
const cardsFromArray = new Section({
  renderer: (item) => {
    cardsFromArray.addItem(makingCard(item));
  }
}, contentZone)
