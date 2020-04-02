
const MAIN_FILMS_COUNT = 5;

const TOP_RATED_FILMS_COUNT = 2;

const MOST_COMMENTED_FILMS_COUNT = 2;


// Функции, возвращающие шаблоны элементов
const createUserRankTemplate = () => {
  return (
    `<nav class="main-navigation">
<div class="main-navigation__items">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
  <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
  <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
</div>
<a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`
  );
};

const createSiteMenuTemplate = () => {
  return (
    `<nav class="main-navigation">
<div class="main-navigation__items">
  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
  <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
  <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
</div>
<a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`
  );
};

const createSortingTemplate = () => {
  return (
    `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`
  );
};

const createFilmsTemplate = () => {
  return (
    `<section class="films"></section>`
  );
}

const createFilmsListTemplate  = () => {
  return (
  `<section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  <div class="films-list__container">
  </div>
  </section>`
  );
}


const createFilmsListTopRatedTemplate = () => {
  return (`
  <section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container">
      </div>
  </section>`
  );
}


const createFilmsListMostCommentedTemplate = () => {
  return (`
  <section class="films-list--extra">
  <h2 class="films-list__title">Most commented</h2>
  <div class="films-list__container">
  </div>
  </section>`
   );
}

const createFilmTemplate = () => {
  return (`
  <article class="film-card">
<h3 class="film-card__title">The Dance of Life</h3>
<p class="film-card__rating">8.3</p>
<p class="film-card__info">
  <span class="film-card__year">1929</span>
  <span class="film-card__duration">1h 55m</span>
  <span class="film-card__genre">Musical</span>
</p>
<img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
<p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
<a class="film-card__comments">5 comments</a>
<form class="film-card__controls">
  <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
  <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
  <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
</form>
</article>
`
   );
}

const createFooterStatisticsTemplate = () => {
  return (`
  <p>130 291 movies inside</p>
  `
  );
}

// Функция рендера элементов
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Идентификаторы элементов (чтоб понять, куда ренедерить)
const siteHeader = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footerStatisticsContainer = document.querySelector(`.footer__statistics`);

// Рендерим!
render(siteHeader, createUserRankTemplate(), `beforeend`);
render(siteMainElement, createSiteMenuTemplate(), `beforeend`);
render(siteMainElement, createSortingTemplate(), `beforeend`);
render(siteMainElement, createFilmsTemplate(), `beforeend`);
const filmsTemplate = document.querySelector(`.films`);
render(filmsTemplate, createFilmsListTemplate(), `beforeend`);
render(filmsTemplate, createFilmsListTopRatedTemplate(), `beforeend`);
render(filmsTemplate, createFilmsListMostCommentedTemplate(), `beforeend`);
const filmsListTemplate = document.querySelector(`.films-list__container`);
const filmsListTopRatedTemplate = document.querySelector(`.films-list--extra .films-list__container`);
const filmsListMostCommentedTemplate = document.querySelector(`.films-list--extra + .films-list--extra .films-list__container`);



for (let i = 0; i < MAIN_FILMS_COUNT; i++) {
  render(filmsListTemplate, createFilmTemplate(), `beforeend`);
}

for (let i = 0; i < TOP_RATED_FILMS_COUNT; i++) {
  render(filmsListTopRatedTemplate , createFilmTemplate(), `beforeend`);
}

for (let i = 0; i < MOST_COMMENTED_FILMS_COUNT; i++) {
  render(filmsListMostCommentedTemplate, createFilmTemplate(), `beforeend`);
}

render(footerStatisticsContainer, createFooterStatisticsTemplate(), `beforeend`);
