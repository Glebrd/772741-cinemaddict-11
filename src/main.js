import FilterComponent from './components/filter';
import NavMenuComponent from './components/nav-menu';
import ProfileComponent from './components/profile';
import StatisticComponent from './components/statistic';
import {generateFilms} from './mock/film';
import {render, RenderPosition} from "./utils/render";
import PageController from "./controllers/page";

const MAIN_FILMS_COUNT = 22;

// Идентификаторы основных контейнеров, которые изначально есть в шаблонке:
const siteHeader = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsContainer = document.querySelector(`.footer__statistics`);

// Создаем массив фильмов
const films = generateFilms(MAIN_FILMS_COUNT);

// Рендерим компоненты, которые пока работают не через контролеры.
// Профиль
const profileComponent = new ProfileComponent();
render(siteHeader, profileComponent, RenderPosition.BEFOREEND);
// НавМеню
const navMenuComponent = new NavMenuComponent();
render(siteMainElement, navMenuComponent, RenderPosition.BEFOREEND);
// Фильтры
const filterComponent = new FilterComponent();
render(navMenuComponent.getElement(), filterComponent, RenderPosition.AFTERBEGIN);

// Статистика
const statisticComponent = new StatisticComponent();
render(footerStatisticsContainer, statisticComponent, RenderPosition.BEFOREEND);

// Вызов контролера страницы фильмов
const pageController = new PageController(siteMainElement);
pageController.render(films);
