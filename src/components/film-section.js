export const filmSection = (isExtra = false) => {
  return (
    ` <section class="${isExtra ? `films-list--extra` : `films-list`}">
      <h2 class="films-list__title ${isExtra ? `visually-hidden` : ``}">Top rated</h2>
      <div class="films-list__container">
      </div>
  </section>
`
  );
}
