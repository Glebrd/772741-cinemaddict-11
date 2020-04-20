import {createElement} from "../utils";

export default class FilmSection {
  constructor(isExtra, title) {
    this._element = null;
    this._isExtra = isExtra;
    this._title = title;
  }
  getTemplate(){
    return `
      <section class="${this._isExtra ? `films-list--extra` : `films-list`}">
        <h2 class="films-list__title ${this._isExtra ? `` : `visually-hidden`}">
          ${this._title}
        </h2>
        <div class="films-list__container"></div>
      </section>
    `.trim();
  }
  getELement(){
    if (!this._element){
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement(){
    this._element = null;
  }
}

