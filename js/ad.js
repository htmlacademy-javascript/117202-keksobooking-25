const HouseType = {
  flat : 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const adUser = document.querySelector('#card').content.querySelector('article');
const generateAd = ({offer,author}) =>{
  const adElement = adUser.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = offer.title;
  adElement.querySelector('.popup__text--address').textContent = offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${offer.price  } ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = HouseType[offer.type];
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
    const templateForm = adElement.querySelector('.popup__photos');
    const templateTag = templateForm.querySelector('img');
    const cloneImage = templateTag.cloneNode(true);
    templateTag.remove();
    for (let i = 0; i <= offer.photos.length-1; i++){
      const newImage = cloneImage.cloneNode(true);
      newImage.src = offer.photos[i];
      templateForm.appendChild(newImage);
    }
  }
  if (author.avatar !== undefined){
    const templateAvatar = adElement.querySelector('img');
    templateAvatar.src = author.avatar;
  }
  return adElement;
};


export {generateAd,adUser};

