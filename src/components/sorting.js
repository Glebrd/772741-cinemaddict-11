import {createElement} from "../utils";

export default class Sorting {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return`
 <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
 </ul>`.trim();
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removerELement() {
    this._element = null;
  }
}
