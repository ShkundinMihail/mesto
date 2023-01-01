const openPhoto = document.querySelector('#open-photo');//попап
const closeButtonPhoto = openPhoto.querySelector('#close-photo-popup');//кнопка закрыть попап
const openCardPhoto = openPhoto.querySelector('.popup__open-photo');//фото в попапе
const openTitle = openPhoto.querySelector('.popup__open-title');//название в попапе

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._templateSelector = templateSelector;
  }
  //клонируем шаблон//////////////////////////////////////////////////////////////////////////////
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }
  //создание карточки////////////////////////////////////////////////////////////////////////////////
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListenersDelete();
    this._setEventListenersLike();
    this._setEventListenersPopup();
    this._element.querySelector('.element__title').textContent = this._name;  //данные
    this._element.querySelector('.element__photo').src = this._link;
    this._element.querySelector('.element__photo').alt = this._alt;

    return this._element;
  }
  //лайк/////////////////////////////////////////////////////////////////////////////
  _setEventListenersLike() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._element.querySelector('.element__like').classList.toggle('element__like_active');
    });
  }
  //удаление карточки/////////////////////////////////////////////////////////////////////////
  _setEventListenersDelete() {
    this._element.querySelector('#deletePhoto').addEventListener('click', () => {
      this._element.remove();
    });
  }
  //открытие попапа///////////////////////////////////////////////////////////////////////////
  _openPhotoPopup() {
    openCardPhoto.src = this._link;
    openTitle.textContent = this._name;
    openCardPhoto.alt = this._alt;
    openPhoto.classList.add('popup_opened');
    document.addEventListener('keydown', (e) => { this._closePopupOnClickEsc(e) });
    openPhoto.addEventListener('click', (e) => { this._closePopupByClickOnOverlay(e) });

  }
  //  закрытие разными способами///////////////////////////////////////////////////////////
  _closePhotoPopup() {
    openPhoto.classList.remove('popup_opened');
    document.removeEventListener('keydown', (e) => { this._closePopupOnClickEsc(e) });
    openPhoto.removeEventListener('click', (e) => { this._closePopupByClickOnOverlay(e) });
  }

  _closePopupOnClickEsc(e) {
    if (e.key === 'Escape') {
      return this._closePhotoPopup();
    }
  };

  _closePopupByClickOnOverlay(e) {
    if (e.target === e.currentTarget) {
      return this._closePhotoPopup();
    };
  }
  //слушатель попапа//////////////////////////////////////////////////////////////////////////////////////
  _setEventListenersPopup() {
    this._element.querySelector('.element__photo').addEventListener('click', () => { this._openPhotoPopup() });
    closeButtonPhoto.addEventListener('click', () => { this._closePhotoPopup() });
  }
}

export { Card };
