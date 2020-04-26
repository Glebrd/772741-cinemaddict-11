import AbstractComponent from "./abstratct-component";

export default class FilmsListSection extends AbstractComponent {
  constructor(isExtra, title) {
    super();
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
}

