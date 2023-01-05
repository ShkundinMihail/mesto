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
    this._setEventListeners();
    this._element.querySelector('.element__title').textContent = this._name;  //данные
    this._element.querySelector('.element__photo').src = this._link;
    this._element.querySelector('.element__photo').alt = this._name;

    return this._element;
  }
  //лайк/////////////////////////////////////////////////////////////////////////////
  _elementLike() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');

  }
  //удаление карточки/////////////////////////////////////////////////////////////////////////
  _elementDelete() {
    this._element.remove();

  }

  _setEventListeners() {
    this._element.querySelector('#deletePhoto').addEventListener('click', () => {
      this._elementDelete()
    });
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._elementLike();
    });
  }
}

export { Card };
