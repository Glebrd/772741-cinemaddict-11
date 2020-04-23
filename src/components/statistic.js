import AbstractComponent from "./abstratct-component";

export default class Statistic extends AbstractComponent {
  getTemplate() {
    return `<p>130 291 movies inside</p>`.trim();
  }
}
