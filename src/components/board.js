import AbstractComponent from "./abstratct-component";

export default class Board extends AbstractComponent {
  getTemplate(){
    return (
      `<section class="films"></section>`
    );
  }
}

