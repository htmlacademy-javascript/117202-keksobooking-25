import {markerGroup,newMarker} from './map.js';
import { createLoader } from './server-data.js';
const RERENDER_DELAY = 500;
const HIGHT_PRICE = 50000;
const LOW_PRICE = 10000;
const ROOMS_WITHOUT_GUEST = 100;
const allFilters = document.querySelector('.map__filters');
const housingType = allFilters.querySelector('#housing-type');
const housingPrice = allFilters.querySelector('#housing-price');
const roomsNumber = allFilters.querySelector('#housing-rooms');
const guestNumber = allFilters.querySelector('#housing-guests');
const featuresFieldset = allFilters.querySelector('#housing-features');


const debounce = function (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const onError = () =>'ошибка';

const checkType = (it) =>it.offer.type === housingType.value || housingType.value === 'any';
const checkPrice = (it) =>{
  if(housingPrice.value === 'middle'){
    return it.offer.price < HIGHT_PRICE && it.offer.price > LOW_PRICE;
  }
  if(housingPrice.value === 'low'){
    return it.offer.price < LOW_PRICE;
  }
  if(housingPrice.value === 'high'){
    return it.offer.price > HIGHT_PRICE;
  }
  return true;
};
const checkRooms = (it) =>(roomsNumber.value === it.offer.rooms.toString() || roomsNumber.value === 'any');
const checkGuest = (it) =>{
  if(guestNumber.value === 0){
    return it.offer.guests.toString() === ROOMS_WITHOUT_GUEST;
  }
  if(guestNumber.value === 'any'){
    return true;
  }
  return(guestNumber.value === it.offer.guests.toString());
};

const checkFeatures = (it,checkedFeaturesItems) =>{
  let featuresIn = true;
  if (checkedFeaturesItems.length === 0) {
    return featuresIn;
  }
  const arrayFeaturesItems = Array.from(checkedFeaturesItems);
  if (it.offer.features) {
    for (let i = 0; i < arrayFeaturesItems.length; i++) {
      if (!(it.offer.features.includes(arrayFeaturesItems[i].value))) {
        featuresIn = false;
        break;
      }
    }
  } else {
    featuresIn = false;
  }
  return featuresIn;
};

const newMarkerFilter = (it) =>{
  const result = [];
  const checkedFeaturesItems = featuresFieldset.querySelectorAll('input:checked');
  for (let i = 0; i < it.length; i++) {
    if (checkType(it[i]) && checkPrice(it[i]) && checkRooms(it[i]) && checkGuest(it[i])) {
      if (it[i].offer.features) {
        if (checkFeatures(it[i], checkedFeaturesItems)) {
          result.push(it[i]);
        }
      }
    }
    if (result.length >= 10) {
      break;
    }
  }

  result.forEach((element) => {
    newMarker(element);
  });};
const dataFilterMap = createLoader(newMarkerFilter,onError);

let onChangeFilter = () =>{
  markerGroup.clearLayers();
  dataFilterMap();
};
onChangeFilter = debounce(onChangeFilter,RERENDER_DELAY);

allFilters.addEventListener('change',onChangeFilter);
export{onChangeFilter};


