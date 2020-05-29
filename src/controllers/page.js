// module7-task1

import SortComponent, {SortType} from "../components/sort";
import LoadMoreButtonComponent from "../components/load-more";
import FilmComponent from "../components/film";
import FilmsListSectionComponent from "../components/films-list-section";
import NoFilmsComponent from "../components/no-films";
import {render, remove, RenderPosition} from "../utils/render";
import FilmsSectionComponent from "../components/films-section";
import MovieController from "./movie";

const MAIN_FILMS_COUNT_ON_START = 5;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;

////////////////* Функция рендера фильмОВ */////////////////////////
const renderFilms = (filmSectionElement, films, onDataChange) => {
  // Для каждого фильма из массива создаём контроллер.
  return films.map((film) => {
    const movieController = new MovieController(filmSectionElement, onDataChange);
    // используем метод контролллера для рендера карточки
    movieController.render(film);
    // Возвращаем сам контроллер.
    return movieController;
  });
};

// ///////// * Функция получения сортированых фильмов * ///////////
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
// ///////////////////////////////////////
export default class PageController {
  constructor(container) {
    this._container = container;

    this._films = [];
    this._showedMovieControllers = [];
    // Пременная, для почдсёта того, сколько карточек рендерить за раз
    this._showingFilmsCount = MAIN_FILMS_COUNT_ON_START;
    this._sortComponent = new SortComponent();
    this._showMoreComponent = new LoadMoreButtonComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._filmSectionComponent = new FilmsListSectionComponent(false, `All movies. Upcoming`);
    this._filmSectionTopRated = new FilmsListSectionComponent(true, `Top rated movies`);
    this._filmsSectionMostCommented = new FilmsListSectionComponent(true, `Most commented`);
    this._filmsSectionComponent = new FilmsSectionComponent();
    this._onDataCHange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    // Обращаемся к интерфейсу, который нам предаставляет this._sortComponent. Данный интерфейс
    // позовляет установить обработчик на нажатие кнопки соритровки, мы в качестве обработчика передаём this._onSortTypeChange
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(films) {
    this._films = films;

    // Рендерим компонент сортировки в контейнер
    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);
    // Рендерим доску в контейнер
    render(this._container, this._filmsSectionComponent, RenderPosition.BEFOREEND);
    // Если фильмов нет то рендерим пустую страницу
    if (films.length === 0) {
      render(this._container, this._noFilmsComponent, RenderPosition.BEFOREEND);
      return;
    }
    // Рендерим 3 секции для карточек фильмов
    render(this._filmsSectionComponent.getElement(), this._filmSectionComponent, RenderPosition.BEFOREEND);
    render(this._filmsSectionComponent.getElement(), this._filmSectionTopRated, RenderPosition.BEFOREEND);
    render(this._filmsSectionComponent.getElement(), this._filmsSectionMostCommented, RenderPosition.BEFOREEND);

    // Вызываем функцию рендера фильмОВ первой секции
    // Берем контейнер, куда будем рендерить карточки
    const filmSectionContainer = this._filmSectionComponent.getElement().querySelector(`.films-list__container`);
    // Рендерим фильмы а их контроллеры складываем в переменную newFilms
    const newFilms = renderFilms(filmSectionContainer, this._films.slice(0, this._showingFilmsCount), this._onDataCHange);
    // Добавляем новые контролеры в массив,где мы храним все контроллеры
    this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

    // Вызываем функцию рендера фильмОВ второй секции
    const filmSectionTopRatedContainer = this._filmSectionTopRated.getElement().querySelector(`.films-list__container`);
    // Рендерим фильмы а их контроллеры складываем в переменную newTopRatedFilms
    const newTopRatedFilms = renderFilms(filmSectionTopRatedContainer, this._films.slice(0, this._showingFilmsCount), this._onDataCHange);
    // Добавляем новые контролеры в массив,где мы храним все контроллеры
    this._showedMovieControllers = this._showedMovieControllers.concat(newTopRatedFilms);

    // Вызываем функцию рендера фильмОВ третьей секции
    const filmSectionMostCommentedContainer = this._filmsSectionMostCommented.getElement().querySelector(`.films-list__container`);
    // Рендерим фильмы а их контроллеры складываем в переменную newMostCommentedFilms
    const newMostCommentedFilms = renderFilms(filmSectionMostCommentedContainer, this._films.slice(0, this._showingFilmsCount), this._onDataCHange);
    this._showedMovieControllers = this._showedMovieControllers.concat(newMostCommentedFilms);

    // Вызываем функцию рендера кнопки лоад мор
    this._renderShowMoreButton();
  }

  _renderShowMoreButton() {
    // Если кнопка уже есть,то на ней есть обработкик, чтоб не получилось 2 обработчика, предварительно её удаляем.
    remove(this._showMoreComponent);

    if (this._showingFilmsCount >= this._films.length) {
      return;
    }

    const filmSectionElement = this._filmSectionComponent.getElement();
    render(filmSectionElement, this._showMoreComponent, RenderPosition.BEFOREEND);

    // Навешиваем обработчик нажатия кнопки
    this._showMoreComponent.setShowMoreBtnBtnClickHandler(() => {
      const prevFilmsCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      // Получаем сортированные фильмы из функции (вверху)
      const sortedFilms = getSortedFilms(this._films, this._sortComponent.getSortType(), prevFilmsCount, this._showingFilmsCount);

      // Вызываем функцию рендера фильмОВ первой секции
      // Берем контейнер, куда будем рендерить карточки
      const filmSectionContainer = this._filmSectionComponent.getElement().querySelector(`.films-list__container`);
      // Рендерим фильмы а их контроллеры складываем в переменную newFilms
      const newFilms = renderFilms(filmSectionContainer, sortedFilms, this._onDataCHange);
      // Добавляем новые контролеры в массив,где мы храним все контроллеры
      this._showedMovieControllers = this._showedMovieControllers.concat(newFilms);

      if (this._showingFilmsCount >= this._films.length) {
        remove(this._showMoreComponent);
      }
    });

  }

  _onDataChange(filmController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    filmController.render(this._films[index]);
  }

  // Метод, который мы Передадим в конструкторе  в метод компонента, отвечающий за обработку клика по кнопке сортировки,
  _onSortTypeChange(sortType) {
    this._showingFilmsCount = SHOWING_TASKS_COUNT_BY_BUTTON;

    // Получаем сортированные фильмы из функции (вверху)
    const sortedFilms = getSortedFilms(this._films, sortType, 0, this._showingFilmsCount);

    // Вызываем функцию рендера фильмОВ первой секции
    // Берем контейнер, куда будем рендерить карточки
    const filmSectionContainer = this._filmSectionComponent.getElement().querySelector(`.films-list__container`);

    // Очищаем контейнер
    filmSectionContainer.innerHTML = ``;

    // Рендерим фильмы а их контроллеры складываем в переменную newFilms
    const newFilms = renderFilms(filmSectionContainer, sortedFilms, this._onDataCHange);
    // Добавляем новые контролеры в массив,где мы храним все контроллеры
    this._showedMovieControllers = newFilms;

    this._renderShowMoreButton();
  }
}
