export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }

  addItem(element) {
    this._container.append(element);
  }
  addItemToTop(element) {
    this._container.prepend(element);
  }
  renderItems(data) {
    data.forEach(item => {
      this._renderer(item);
    });
  }
}
