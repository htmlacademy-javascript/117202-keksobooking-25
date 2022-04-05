import {markerGroup,newMarker} from './map.js';
import { createLoader } from './server-data.js';

const allFilters = document.querySelector('.map__filters');
const housingType = allFilters.querySelector('#housing-type');
const housingPrice = allFilters.querySelector('#housing-price');
const roomsNumber = allFilters.querySelector('#housing-rooms');
const guestNumber = allFilters.querySelector('#housing-guests');
const featuresFieldset = allFilters.querySelector('#housing-features');


const RERENDER_DELAY = 500;
const debounce = function (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const onError = function(){
  return 'ошибка';
};

const checkType = function(it) {
  return it.offer.type === housingType.value || housingType.value === 'any';
};
const checkPrice = function(it){
  if(housingPrice.value === 'middle'){
    return it.offer.price < 50000 && it.offer.price > 10000;
  }
  if(housingPrice.value === 'low'){
    return it.offer.price < 10000;
  }
  if(housingPrice.value === 'high'){
    return it.offer.price > 50000;
  }
  return true;
};
const checkRooms = function(it) {
  return (roomsNumber.value === it.offer.rooms.toString() || roomsNumber.value === 'any');
};
const checkGuest = function(it){
  if(guestNumber.value === 0){
    return it.offer.guests.toString() === 100;
  }
  if(guestNumber.value === 'any'){
    return true;
  }
  return(guestNumber.value === it.offer.guests.toString());
};

const checkFeatures = function (it, checkedFeaturesItems) {
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

const newMarkerFilter = function (it) {
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

let cleanOut = function(){
  markerGroup.clearLayers();
  dataFilterMap();
};
cleanOut = debounce(cleanOut,RERENDER_DELAY);

allFilters.addEventListener('change',cleanOut);
export{cleanOut};


