export default class Section {
  constructor({ item, renderer }, classSelector) {
    this._item = item;
    this._renderer = renderer;
    this._classSection = classSelector;
  }

  renderItems() {
    this._item.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._classSection.prepend(element);
  }
}
