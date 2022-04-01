const transliteHome = {
  flat : 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const adUser = document.querySelector('#card').content.querySelector('article');
const box = [];
const generatorAd = function({offer,author}) {
  const adElement = adUser.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = offer.title;
  adElement.querySelector('.popup__text--address').textContent = offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${offer.price  } ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = transliteHome[offer.type];
  adElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  if (offer.features !== undefined){
    const modifiers = offer.features.map((feature) => `popup__feature--${ feature}`);
    adElement.querySelectorAll('.popup__feature').forEach((item) => {
      if (! modifiers.includes(item.classList[1])){
        item.remove();
      }
    });
  }
  if (offer.description !== undefined){
    adElement.querySelector('.popup__description').textContent = offer.description;}
  if (offer.photos !== undefined){
    const tamplateForm = adElement.querySelector('.popup__photos');
    const tamplateTag = tamplateForm.querySelector('img');
    const cloneImage = tamplateTag.cloneNode(true);
    tamplateTag.remove();
    for (let i = 0; i <= offer.photos.length-1; i++){
      const newImage = cloneImage.cloneNode(true);
      newImage.src = offer.photos[i];
      tamplateForm.appendChild(newImage);
    }
  }
  if (author.avatar !== undefined){
    const tamplateAvatar = adElement.querySelector('img');
    tamplateAvatar.src = author.avatar;
  }
  return adElement;
};


export {generatorAd,adUser};

