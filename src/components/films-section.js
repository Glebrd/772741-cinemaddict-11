import AbstractComponent from "./abstratct-component";

export default class FilmsSection extends AbstractComponent {
  getTemplate(){
    return (
      `<section class="films"></section>`
    );
  }
}

