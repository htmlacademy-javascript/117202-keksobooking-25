const getRandomNumberFloat = function (min, max, precision) {
  if (min >= 0 && max >= min) {
    const value = Math.random();
    return value.toFixed(precision);
  }
};

const getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

getRandomNumberFloat();
getRandomNumber();
