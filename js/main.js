const getRandomNumberFloat = function (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const getRandomNumber = function (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];


const AVATAR_IMG = ['01','02','03','04','05','06','07','08','09','10'];
const TYPES = ['palace','flat','house','bungalow','hotel'];
const CHECKINS = ['12:00','13:00','14:00'];
const CHECKOUTS = ['12:00','13:00','14:00'];
const FEATURESS = ['wifi','dishwasher','parking','washer','elevator','conditioner'];
const PICTYRE = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg','https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const ADS_LENGTH = 10;

const greatAds = function () {
  return {
    author : {
      avatar: `img/avatars/user${getRandomArrayElement(AVATAR_IMG)}.png`
    },

    offer : {
      title: 'Заголовок объявления',
      address: '',
      price: getRandomNumber(100, 5000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(1, 3),
      guests: getRandomNumber(1, 5),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: FEATURESS.slice(0,getRandomNumber(1,FEATURESS.length-1)),
      description: 'Описание объявления',
      photos: PICTYRE.slice(0,getRandomNumber(1,PICTYRE.length-1))
    },

    location : {
      lat: getRandomNumberFloat(35.65000, 35.70000, 5),
      lng: getRandomNumberFloat(139.70000, 139.80000, 5)
    },

  };

};


const randomAds = Array.from({length: ADS_LENGTH},greatAds);

console.log(randomAds);
