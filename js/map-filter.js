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

const type = function(it) {
  return it.offer.type === housingType.value || housingType.value === 'any';
};
const price = function(it){
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
const rooms = function(it) {
  return (roomsNumber.value === it.offer.rooms.toString() || roomsNumber.value === 'any');
};
const guest = function(it){
  if(guestNumber.value === 0){
    return it.offer.guests.toString() === 100;
  }
  if(guestNumber.value === 'any'){
    return true;
  }
  return(guestNumber.value === it.offer.guests.toString());
};

const features = function(it,checkedFeaturesItems){
  Array.from(checkedFeaturesItems).every((elem) => it.offer.features.includes(elem.value));
};

const newMarkerFilter = function (it){
  const result = [];
  const checkedFeaturesItems = featuresFieldset.querySelectorAll('input:checked');
  
  console.log(checkedFeaturesItems);
  for(let i =0;i < it.length;i++){
    if(type(it[i]) === true && price(it[i]) === true && rooms(it[i]) === true && guest(it[i]) === true && features(it[i],checkedFeaturesItems)){
      result.push(it[i]);
    }
    if (result.length >=10) {
      break;
    }

  }

  result.forEach((element) => {
    newMarker(element);
  });};
const dataFilterMap = createLoader(newMarkerFilter,onError);
let clear = function(){
  markerGroup.clearLayers();
  dataFilterMap();
};
clear = debounce(clear,RERENDER_DELAY);

allFilters.addEventListener('change',clear);

