import AbstractComponent from "./abstratct-component";

export default class Film extends AbstractComponent {
  constructor({title, rating, releaseDate, duration, genre, picture, description, inWatchlist, isWatched, isFavorite}) {
    super();
    this._title = title;
    this._rating = rating;
    this._releaseDate = releaseDate;
    this._duration = duration;
    this._genre = genre;
    this._picture = picture;
    this._description = description;
    this._inWatchlist = inWatchlist;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;
  }
  createButtonMarkup(cssClassName, name, isActive = true) {
    return (
      `<button class="film-card__controls-item button film-card__controls-item--${cssClassName}${isActive ? `` : `film-card__controls-item--active`}">${name}</button>`.trim()
    );
  };
  getTemplate() {
    const watchlistButton = this.createButtonMarkup(`add-to-watchlist`,`Add to watchlis`, this._inWatchlist);
    const watchedButton = this.createButtonMarkup(`mark-as-watched`,`Mark as watched`, this._isWatched);
    const favoriteButton = this.createButtonMarkup(`favorite`,`Mark as favorite`, this._isFavorite);
    return (
      `<article class="film-card">
          <h3 class="film-card__title">${this._title}</h3>
          <p class="film-card__rating">${this._rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${this._releaseDate}</span> <span class="film-card__duration">${this._duration}</span>
            <span class="film-card__genre">${this._genre}</span>
          </p>
          <img src="./images/posters/${this._picture}" alt="" class="film-card__poster">
          <p class="film-card__description">${this._description}</p>
          <a class="film-card__comments">5 comments</a>
          <form class="film-card__controls">
              ${watchlistButton}
              ${watchedButton}
              ${favoriteButton}
          </form>
        </article>`.trim()
    );
}
  setOpenPopupClickHandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
  }
  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }
  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }
  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }
}
