const transliteHome = {
  flat : 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const adUser = document.querySelector('#card').content;

const generatorAd = function({offer}) {
  const adElement = adUser.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = offer.title;
  adElement.querySelector('.popup__text--address').textContent = offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${offer.price  } ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = transliteHome[offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const modifiers = offer.features.map((feature) => `popup__feature--${feature}`);
  adElement.querySelectorAll('.popup__features').forEach((item)=>{
    if (! modifiers.includes(item.classList[1])){
      item.remove();
    }
  });

  //});
  adElement.querySelector('.popup__description').textContent = offer.description;
  adElement.querySelector('.popup__photos').innerHTML = offer.photos.map((photo) => `<img src='${photo}' class="popup__photo" width="45" height="40">`).join('');
  document.querySelector('#map-canvas').appendChild(adElement);
};


export {generatorAd};

