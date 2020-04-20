import {createElement} from "../utils";

export default class NavMenu {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return `
<nav class="main-navigation">
<a href="#stats" class="main-navigation__additional">Stats</a>
</nav>
`.trim();
  }
  getElement () {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
