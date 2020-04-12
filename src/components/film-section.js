export const filmSection = (isExtra = false) => {
  let title = `temp`;
  return (
    `
      <section class="${isExtra ? `films-list--extra` : `films-list`}">
        <h2 class="films-list__title ${isExtra ? `` : `visually-hidden`}">
          ${title}
        </h2>
        <div class="films-list__container"></div>
      </section>
    `.trim()
  );
};
