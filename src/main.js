import Board from './components/board';
import FilmCard from './components/film-card';
import FilmDetails from './components/film-details';
import FilmSection from './components/film-section';
import Filter from './components/filter';
import NavMenu from './components/nav-menu';
import Profile from './components/profile';
import ShowMore from './components/show-more';
import Sorting from './components/sorting';
import Statistic from './components/statistic';
// import {generateFilm} from './mock/film';
import {generateFilms} from './mock/film';
import {render, RenderPosition} from "./utils";

const MAIN_FILMS_COUNT = 22;
const MAIN_FILMS_COUNT_ON_START = 5;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;
const SHOWING_TASKS_COUNT_BY_BUTTON = 5;

// ///////* Функция рендера фильма (и навески обработчиков) *///////////////
const renderFilm = (filmsListTemplate, film) => {
  const filmCard = new FilmCard(film);
  const filmDetails = new FilmDetails(film);
  // ///////* Функция открытия попапа *///////////////
  const onPopupClick = () => {
    render(document.body, filmDetails.getElement(), RenderPosition.BEFOREEND);
    filmDetails.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`,
      () => {
      filmDetails.getElement().remove();
      filmDetails.removeElement();
      });
  };
  const poster = filmCard.getElement().querySelector(`.film-card__poster`);
  poster.addEventListener(`click`, onPopupClick)
  render(filmsListTemplate, filmCard.getElement(), RenderPosition.BEFOREEND);
};

// ///////* Функция рендера доски (и навески обработчиков) *///////////////
let showingFilmsCount = MAIN_FILMS_COUNT_ON_START;
const renderBoard = (boardComponent, films) => {
  const filmSection = new FilmSection(false, `All movies. Upcoming`);
  const filmSectionTopRated = new FilmSection(true, `Top rated movies`);
  const filmsSectionMostCommented = new FilmSection(true, `Most commented`);
  render(board.getElement(), filmSection.getELement(), RenderPosition.BEFOREEND);
  render(board.getElement(), filmSectionTopRated.getELement(), RenderPosition.BEFOREEND);
  render(board.getElement(), filmsSectionMostCommented.getELement(), RenderPosition.BEFOREEND)
  films.slice(0, showingFilmsCount)
    .forEach((film) => {
      renderFilm(filmSection.getELement().querySelector(`.films-list__container`), film);
    });

  films.slice(0, TOP_RATED_FILMS_COUNT)
    .forEach((film) => {
      renderFilm(filmSectionTopRated.getELement().querySelector(`.films-list__container`), film);
    });

  films.slice(0, MOST_COMMENTED_FILMS_COUNT)
    .forEach((film) => {
      renderFilm(filmsSectionMostCommented.getELement().querySelector(`.films-list__container`), film);
    });

  // Кнопка
  const showMoreButton = new ShowMore;
  render(filmSection.getELement(), showMoreButton.getElement(), RenderPosition.BEFOREEND);
  showMoreButton.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_TASKS_COUNT_BY_BUTTON;
    films.slice(prevTasksCount, showingFilmsCount)
      .forEach((film) => renderFilm(filmSection.getELement().querySelector(`.films-list__container`), film));

    if (showingFilmsCount >= films.length) {
      showMoreButton.getElement().remove();
      showMoreButton.removeElement();
    }
  });
}
// ///////////////////////////////////////////

// Идентификаторы элементов сайта (чтоб понять, куда ренедерить)
const siteHeader = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsContainer = document.querySelector(`.footer__statistics`);

// Рендерим!
// Профиль
const profileComponent = new Profile();
render(siteHeader, profileComponent.getElement(), RenderPosition.BEFOREEND);
// НавМеню
const navMenuComponent = new NavMenu();
render(siteMainElement, navMenuComponent.getElement(), RenderPosition.BEFOREEND);
// Фильтры
const filter = new Filter();
render(navMenuComponent.getElement(), filter.getElement(), RenderPosition.AFTERBEGIN);
// Сортфировка
const sorting = new Sorting();
render(siteMainElement, sorting.getElement(), RenderPosition.BEFOREEND);
// Доска
const board = new Board();
render(siteMainElement, board.getElement(), RenderPosition.BEFOREEND)

// Создаем массив фильмов
const films = generateFilms(MAIN_FILMS_COUNT);

// рендерим достку
renderBoard(board, films);

// Статистика
const statistic = new Statistic();
render(footerStatisticsContainer, statistic.getElement(), RenderPosition.BEFOREEND)
// const navMenuTemplate = document.querySelector(`.main-navigation`);
// render(navMenuTemplate, filter(), RenderPosition.AFTERBEGIN);
// render(siteMainElement, board(), RenderPosition.BEFOREEND);
// const filmsListTemplate = document.querySelector(`.films-list__container`);
// // render(filmsListTemplate, showMore(), `afterend`);
// const filmsListTopRatedTemplate = document.querySelector(`.films-list--extra .films-list__container`);
// const filmsListMostCommentedTemplate = document.querySelector(`.films-list--extra + .films-list--extra .films-list__container`);
//
// // Рендер карточке
//
//
// films.slice(0, showingFilmsCount)
//   .forEach((film) => renderFilm(filmsListTemplate, film));
//
// films.slice(0, TOP_RATED_FILMS_COUNT)
//   .forEach((film) => renderFilm(filmsListTopRatedTemplate, film));
//
// films.slice(0, MOST_COMMENTED_FILMS_COUNT)
//   .forEach((film) => renderFilm(filmsListMostCommentedTemplate, film));
//
// render(footerStatisticsContainer, statistic(), RenderPosition.BEFOREEND);
//
// const loadMoreButton = siteMainElement.querySelector(`.films-list__show-more`);
//
// render(siteMainElement, filmDetails(), RenderPosition.BEFOREEND);
