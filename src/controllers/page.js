import SortComponent, {SortType} from "../components/sort";
import FilmDetailsComponent from "../components/film-details";
import LoadMoreButtonComponent from "../components/load-more";
import FilmComponent from "../components/film";
import FilmsListSectionComponent from "../components/films-list-section";
import NoFilmsComponent from "../components/no-films";
import {render, remove, RenderPosition} from "../utils/render";
import FilmsSectionComponent from "../components/films-section";

const MAIN_FILMS_COUNT_ON_START = 5;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;

///////* Функция рендера фильма (и навески обработчиков) *////////////////
const renderFilm = (filmsListTemplate, film) => {
  const filmCard = new FilmComponent(film);
  const filmDetails = new FilmDetailsComponent(film);

  // ///////* Функция открытия попапа *///////////////
  const onPopupClick = () => {
    // Рендерим попап
    render(document.body, filmDetails, RenderPosition.BEFOREEND);
    // Навешиваем обработчик на кнопку закрытия попапа
    filmDetails.setPopupCloseBtnClickHandler(() => {
      remove(filmDetails);
    });
  };

  // Навешиваем обработчик клика, для открытия попапа, на карточку фильма
  filmCard.setOpenPopupClickHandler(onPopupClick);

  // Рендерим карточку
  render(filmsListTemplate, filmCard, RenderPosition.BEFOREEND);
};

////////////////* Функция рендера фильмОВ */////////////////////////
const renderFilms = (filmSectionElement, films) => {
  films.forEach((film) => {
    renderFilm(filmSectionElement, film);
  });
};

/////////// * Функция получения сортированых фильмов * ///////////
const getSortedFilms = (films, sortType, from, to) => {
  let sortedFilms = [];
  const showingFilms = films.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedFilms = showingFilms.sort((a, b) => a.releaseDate - b.releaseDate);
      break;
    case SortType.BY_RATING:
      sortedFilms = showingFilms.sort((a, b) => a.rating - b.rating);
    case SortType.DEFAULT:
      sortedFilms = showingFilms;
      break;
  }
  return sortedFilms.slice(from, to);
}
///////////////////////////////////////////
export default class PageController {
  constructor(container) {
    this._container = container;

    this._sortComponent = new SortComponent();
    this._showMoreComponent = new LoadMoreButtonComponent();
    this._noFilmsComponent = new NoFilmsComponent()
    this._filmSectionComponent = new FilmsListSectionComponent(false, `All movies. Upcoming`);
    this._filmSectionTopRated = new FilmsListSectionComponent(true, `Top rated movies`);
    this._filmsSectionMostCommented = new FilmsListSectionComponent(true, `Most commented`);
    this._filmsSectionComponent = new FilmsSectionComponent();
  }

  render(films) {
    // Задаем функию рендера кнопки шоу мор
    const renderShowMoreButton = () => {
      remove(this._showMoreComponent);

      if (showingFilmsCount >= films.length) {
        return;
      }

      render(this._filmSectionComponent.getElement(), this._showMoreComponent, RenderPosition.BEFOREEND);
      // Навешиваем обработчик нажатия кнопки
      this._showMoreComponent.setShowMoreBtnBtnClickHandler(() => {
        const prevFilmsCount = showingFilmsCount;
        showingFilmsCount = showingFilmsCount + SHOWING_TASKS_COUNT_BY_BUTTON;

        const sortedFilms = getSortedFilms(films, this._sortComponent.getSortType(), prevFilmsCount, showingFilmsCount)
        renderFilms(this._filmSectionComponent.getElement().querySelector(`.films-list__container`), sortedFilms);

        if (showingFilmsCount >= films.length) {
          remove(this._showMoreComponent)
        }
      });

    }
    // Рендерим компонент сортировки в контейнер
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    // Рендерим доску в контейнер
    render(this._container, this._filmsSectionComponent, RenderPosition.BEFOREEND)
    // Если фильмов нет то рендерим пустую страницу
    if (films.length === 0) {
      render(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }
    // Пременная, для почдсёта того, сколько карточек рендерить за раз
    let showingFilmsCount = MAIN_FILMS_COUNT_ON_START;
    // Рендерим 3 секции для карточек фильмов
    render(this._filmsSectionComponent.getElement(), this._filmSectionComponent, RenderPosition.BEFOREEND);
    render(this._filmsSectionComponent.getElement(), this._filmSectionTopRated, RenderPosition.BEFOREEND);
    render(this._filmsSectionComponent.getElement(), this._filmsSectionMostCommented, RenderPosition.BEFOREEND);
    // Вызываем функцию рендера фильмОВ первой секции
    renderFilms(this._filmSectionComponent.getElement().querySelector(`.films-list__container`), films.slice(0, showingFilmsCount));
    // Вызываем функцию рендера фильмОВ второй секции
    renderFilms(this._filmSectionTopRated.getElement().querySelector(`.films-list__container`), films.slice(0, TOP_RATED_FILMS_COUNT));
    // Вызываем функцию рендера фильмОВ третьей секции
    renderFilms(this._filmsSectionMostCommented.getElement().querySelector(`.films-list__container`), films.slice(0, MOST_COMMENTED_FILMS_COUNT));

    // Вызываем функцию рендера кнопки лоад мор
    renderShowMoreButton();

    // Передаём в метод компонента, отвечающий за обработку клика по кнопке сортировке,
    // инструкции о том,что он будет делать со страницей
    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingFilmsCount = SHOWING_TASKS_COUNT_BY_BUTTON;
      const sortedFilms = getSortedFilms(films, sortType, 0, showingFilmsCount);

      this._filmSectionComponent.getElement().querySelector(`.films-list__container`).innerHTML = ``;

      renderFilms(this._filmSectionComponent.getElement().querySelector(`.films-list__container`), sortedFilms);

      renderShowMoreButton();
    });
  }
}
