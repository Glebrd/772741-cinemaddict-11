import AbstractComponent from "./abstratct-component";

export const SortType = {
  BY_RATING: `by-rating`,
  DATE_UP: `date-up`,
  DEFAULT: `default`,
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return `
 <ul class="sort">
    <li><a href="#" data-sort-type = "${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" data-sort-type = "${SortType.DATE_UP}" class="sort__button">Sort by date</a></li>
    <li><a href="#" data-sort-type = "${SortType.BY_RATING}" class="sort__button">Sort by rating</a></li>
 </ul>`.trim();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;

      handler(this._currentSortType);
    });
  }
}
