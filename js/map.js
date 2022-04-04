import {generatorAd} from './ad.js';
import { deactivateState,activateState,deactivateFilter} from './form.js';
import {createLoader} from './server-data.js';
import {showAlert} from './util.js';
import {clear} from './map-filter.js';

const ADFORM = document.querySelector('.ad-form');
const adress = ADFORM.querySelector('#address');
const resetButton = ADFORM.querySelector('.ad-form__reset');
const allFilters = document.querySelector('.map__filters');

const onError = function (){
  showAlert('Ошибка сервера, перезагрузите страницу');
  deactivateFilter();
};
const useAdress = function(){
  adress.value = '35.75330,139.63690';
};
deactivateState();

const newMarker = function (it){
  const {lat,lng} = it.location;
  const marker = L.marker({lat,lng},{icon});
  marker.addTo(markerGroup).bindPopup(generatorAd(it));
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker({lat: 35.6827,lng: 139.7516,},{draggable: true,icon: mainPinIcon,},);
mainPinMarker.on('moveend', (evt) => {
  adress.value = Object.values(evt.target.getLatLng()).map((element) => element.toFixed(5)).join(',');
});

const resetPage = function() {
  mainPinMarker.setLatLng({
    lat: 35.6827,
    lng: 139.7516,
  });
  map.setView({
    lat: 35.6827,
    lng: 139.7516,
  }, 10);
};

resetButton.addEventListener('click', () => {
  resetPage();
  allFilters.reset();
  clear();
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


const workData = function(it){
  for(let i=0;i<10;i++){
    newMarker(it[i]);
  }
  useAdress();
};

const dataMap = createLoader(workData,onError);
const map = L.map('map-canvas').on('load', () => {
  activateState();
  dataMap();
}).setView({lat: 35.7533,lng: 139.6369,}, 10);
mainPinMarker.addTo(map);
const markerGroup = L.layerGroup().addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
export {newMarker,resetPage,markerGroup,workData,useAdress};
