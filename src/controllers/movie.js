import FilmDetailsComponent from "../components/film-details";
import FilmComponent from "../components/film";
import {render, replace, RenderPosition, remove} from "../utils/render";


export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;

    this._filmComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  render(film) {
    this._filmComponent = new FilmComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    // ///////////////////////////////////////////////
    //  Навешиваем обработчики на карточку фильма   //
    // ///////////////////////////////////////////////
    // Навешиваем обработчик клика, для открытия попапа, на карточку фильма
    this._filmComponent.setOpenPopupClickHandler(this._openPopup);

    this._filmComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    this._filmComponent.setWatchedButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });
    this._filmComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        inWatchlist: !film.inWatchlist,
      }));
    });

    // ////////////////////////////////////////////////////////////////////
    //   Навешиваем обработички на попап (через интерфейсы компонента)   //
    // ////////////////////////////////////////////////////////////////////

    this._filmDetailsComponent.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    this._filmDetailsComponent.setWatchedButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });

    this._filmDetailsComponent.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        inWatchlist: !film.inWatchlist,
      }));
    });

    // Навешиваем обработчик на кнопку закрытия попапа
    this._filmDetailsComponent.setPopupCloseBtnClickHandler(() => {
      this._removePopup();
    });

    render(this._container, this._filmComponent, RenderPosition.BEFOREEND);


  }

  _openPopup() {
    render(document.body, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  };

  _removePopup() {
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  };

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._removePopup();
    }
  }
}
