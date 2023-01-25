class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }
  //клонируем шаблон//////////////////////////////////////////////////////////////////////////////
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }
  //создание карточки////////////////////////////////////////////////////////////////////////////////
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._titleCard.textContent = this._name;
    this._imgCard.src = this._link;
    this._imgCard.alt = this._name;

    return this._element;
  }
  //лайк/////////////////////////////////////////////////////////////////////////////
  _putLikeElement() {
    this._likeButton.classList.toggle('element__like_active');

  }
  //удаление карточки/////////////////////////////////////////////////////////////////////////
  _deleteElement() {
    this._element.remove();
  }

  _setEventListeners() {
    this._titleCard = this._element.querySelector('.element__title');
    this._imgCard = this._element.querySelector('.element__photo');
    this._likeButton = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector('#deletePhoto');

    this._deleteButton.addEventListener('click', () => {
      this._deleteElement()
    });
    this._likeButton.addEventListener('click', () => {
      this._putLikeElement();
    });
    this._imgCard.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }
}

export { Card };
