import AbstractComponent from "./abstratct-component";

export default class NavMenu extends AbstractComponent {
  getTemplate() {
    return `
<nav class="main-navigation">
<a href="#stats" class="main-navigation__additional">Stats</a>
</nav>
`.trim();
  }
}
