class Card {
  constructor(data, templateSelector, { userId, putLike, deleteLike, handleCardClick, delCard }) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._cardId = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._putLike = putLike;
    this._deleteLike = deleteLike;
    this._likes = data.likes;
    this._userId = userId;
    this._owner = data.owner._id;
    this._delCard = delCard;
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
    this._ownerCard();
    this._cardLiked();
    this._likesSum.textContent = this._likes.length
    this._titleCard.textContent = this._name;
    this._imgCard.src = this._link;
    this._imgCard.alt = this._name;
    return this._element;
  }
  //лайк/////////////////////////////////////////////////////////////////////////////
  putLikeElement(value) {
    this._likesSum.textContent = value.likes.length
    this._likeButton.classList.toggle('element__like_active')
  }
//проверяет стоит ли лайк//////////////////////////////////////////////////////////////////////////////////////////
  _cardLiked() {
    if (!this._likes) { return }
    if (this._likes.some((value) => {
      return this._userId === value._id
    })) {
      this._likeButton.classList.add('element__like_active');
    } else { this._likeButton.classList.remove('element__like_active'); }
  }
  //удаление карточки/////////////////////////////////////////////////////////////////////////
  deleteElement() {
    this._element.remove();
  }
  //если не владелец , удаляет корзину//////////////////////////////////////////////////////
  _ownerCard() {
    if (this._userId !== this._owner) {
      this._deleteButton.remove();
    }
  }
  _setEventListeners() {
    this._titleCard = this._element.querySelector('.element__title');
    this._imgCard = this._element.querySelector('.element__photo');
    this._likeButton = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector('#deletePhoto');
    this._likesSum = this._element.querySelector('.element__number-likes');

    this._deleteButton.addEventListener('click', () => {
      this._delCard(this._cardId)
      
    });
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('element__like_active')) {
        this._deleteLike(this._cardId);
      } else { this._putLike(this._cardId); }
    });
    this._imgCard.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

export { Card };
