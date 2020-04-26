import AbstractComponent from "./abstratct-component";

export default class LoadMore extends AbstractComponent {
  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`.trim();
  }
  setShowMoreBtnBtnClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
