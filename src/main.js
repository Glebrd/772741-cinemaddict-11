import {board} from './components/board';
import {filmCard} from './components/film-card';
import {filmDetails} from './components/film-details';
import {filmSection} from './components/film-section';
import {filter} from './components/filter';
import {navMenu} from './components/nav-menu';
import {profile} from './components/profile';
import {showMore} from './components/show-more';
import {sorting} from './components/sorting';
import {statistic} from './components/statistic';
// import {generateFilm} from './mock/film';
import {generateFilms} from './mock/film';

const MAIN_FILMS_COUNT = 22;

const MAIN_FILMS_COUNT_ON_START = 5;

const TOP_RATED_FILMS_COUNT = 2;

const MOST_COMMENTED_FILMS_COUNT = 2;

const SHOWING_TASKS_COUNT_BY_BUTTON = 5;

// Функция рендера элементов
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Создаем массив фильмов
const films = generateFilms(MAIN_FILMS_COUNT);

// Идентификаторы элементов (чтоб понять, куда ренедерить)
const siteHeader = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsContainer = document.querySelector(`.footer__statistics`);

// Рендерим!
render(siteHeader, profile(), `beforeend`);
render(siteMainElement, navMenu(), `beforeend`);
render(siteMainElement, sorting(), `beforeend`);
const navMenuTemplate = document.querySelector(`.main-navigation`);
render(navMenuTemplate, filter(), `afterbegin`);
render(siteMainElement, board(), `beforeend`);
const filmsTemplate = document.querySelector(`.films`);
render(filmsTemplate, filmSection(), `beforeend`);
render(filmsTemplate, filmSection(true), `beforeend`);
render(filmsTemplate, filmSection(true), `beforeend`);
const filmsListTemplate = document.querySelector(`.films-list__container`);
render(filmsListTemplate, showMore(), `afterend`);
const filmsListTopRatedTemplate = document.querySelector(`.films-list--extra .films-list__container`);
const filmsListMostCommentedTemplate = document.querySelector(`.films-list--extra + .films-list--extra .films-list__container`);

let showingFilmsCount = MAIN_FILMS_COUNT_ON_START;

films.slice(0, showingFilmsCount)
  .forEach((film)=> render(filmsListTemplate, filmCard(film), `beforeend`));

films.slice(0, TOP_RATED_FILMS_COUNT)
  .forEach((film)=> render(filmsListTopRatedTemplate, filmCard(film), `beforeend`));

films.slice(0, MOST_COMMENTED_FILMS_COUNT)
  .forEach((film)=> render(filmsListMostCommentedTemplate, filmCard(film), `beforeend`));

// for (let i = 0; i < MAIN_FILMS_COUNT; i++) {
//   render(filmsListTemplate, filmCard(), `beforeend`);
// }

// for (let i = 0; i < TOP_RATED_FILMS_COUNT; i++) {
//   render(filmsListTopRatedTemplate , filmCard(), `beforeend`);
// }
//
// for (let i = 0; i < MOST_COMMENTED_FILMS_COUNT; i++) {
//   render(filmsListMostCommentedTemplate, filmCard(), `beforeend`);
// }

render(footerStatisticsContainer, statistic(), `beforeend`);

const loadMoreButton = siteMainElement.querySelector(`.films-list__show-more`);

render(siteMainElement, filmDetails(), `beforeend`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  films.slice(prevTasksCount, showingFilmsCount)
    .forEach((film) => render(filmsListTemplate, filmCard(film), `beforeend`));

  if (showingFilmsCount >= films.length) {
    loadMoreButton.remove();
  }
});
