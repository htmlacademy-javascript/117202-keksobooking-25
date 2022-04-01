import {markerGroup,newMarker} from './map.js';
import { createLoader } from './server-data.js';
const allFilters = document.querySelector('.map__filters');
const housingType = allFilters.querySelector('#housing-type');
const housingPrice = allFilters.querySelector('#housing-price');
const onError = function(){
  return 'ошибка';
};

const type = function(it) {
  const result = [];
  for (let i=0;i<it.length;i++){
    if(it[i].offer.type === housingType.value){
      result.push(it[i]);
    }
  }
  return result;
};
const price = function(it){
  const resultPrice = [];
  if(housingPrice.value === 'middle'){
    for (let i=0;i<it.length;i++){
      if(it[i].offer.price >10000 && it[i].offer.price < 50000){
        resultPrice.push(it[i]);
      }
    }
  }
  if(housingPrice.value === 'low'){
    for (let i=0;i<it.length;i++){
      if(it[i].offer.price < 10000){
        resultPrice.push(it[i]);
      }
    }
  }
  if(housingPrice.value === 'high'){
    for (let i=0;i<it.length;i++){
      if(it[i].offer.price > 50000){
        resultPrice.push(it[i]);
      }
    }
  }
  return resultPrice;
};
const newMarkerFilter = function (it){
  const resultType = [];
  const resultPrice = [];
  if(housingType.value !== 'any' && housingPrice.value === 'any'){
    type(it).forEach((ix)=> {
      resultType.push(ix);
      newMarker(ix);
    });
  }
  if(housingType.value !== 'any' && housingPrice.value !== 'any'){
    type(it).forEach((ix)=> {
      resultType.push(ix);
    });
  }
  if(housingPrice.value !== 'any' && housingType.value === 'any'){
    price(it).forEach((ixPrice)=> resultType.push(ixPrice));
  }
  if(housingPrice.value !== 'any' && housingType.value !== 'any'){
    price(resultType).forEach((item)=> {
      resultPrice.push(item);
      newMarker(item);
    });
  }
  console.log(resultType);
  console.log(resultPrice);
  //result.forEach((item)=> console.log(item));
};

const dataFilterMap = createLoader(newMarkerFilter,onError);
const clear = function(){
  markerGroup.clearLayers();
  dataFilterMap();
};

housingType.addEventListener('change',newMarkerFilter);
allFilters.addEventListener('change',clear);
