const generateFilm = () => {
  return {
    title: getRandomArrayItem(MovieNames),
    rating: 7,
    releaseDate: 124,
    duration: 321,
    genre: `randomGenre`,
    picture: getRandomArrayItem(Posters),
    description: getRandomDescription(),
    commentsQuantity: 5,
    inWatchlist: true,
    isWatched: true,
    isFavorite: true,
    userRating: 5,
    comment: {
      emotion: `smile`,
      date: `randomDate`,
      author: `randomAuthor`,
      message: `randomMessage`,
    },
  };
};

const MovieNames = [
  `made-for-each-other`,
  `popeye-meets-sinbad`,
  `sagebrush-trail`,
  `santa-claus-conquers-the-martians`,
  `the-dance-of-life`,
  `the-great-flamarion`,
  `the-man-with-the-golden-arm`,
];

const Posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const Descriptions = description.split(`.`);
// Вариант 1
// const getRandomDescription = () =>
// {
//   const amountOfComments = getRandomIntegerNumber(1, 5);
//   let RandomComments = [];
//   for (let i = 0; i < amountOfComments; i++) {
//     RandomComments.push(getRandomArrayItem(Descriptions));
//   }
//   return RandomComments.join(`. `);
// }
// Вариант 2
// Array(40).fill().map(() => Math.round(Math.random() * 40))
// Вариант 3
// const getRandomDescription = () =>
// {
//   let RandomComments = new Array(getRandomIntegerNumber(1,5)).fill(``);
//   RandomComments.forEach((element ,i) => RandomComments[i] = getRandomArrayItem(Descriptions))
//   return RandomComments.join(`. `);
// }
// Вариант 4
const getRandomDescription = () => {
  return Array.from({length: (getRandomIntegerNumber(1, 5))}, () => getRandomArrayItem(Descriptions));
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export {generateFilms, generateFilm};
