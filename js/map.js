import {generateAd} from './ad.js';
import { deactivateState,activateState,deactivateFilter,resetOptionSlider} from './form.js';
import {createLoader} from './server-data.js';
import {showAlert,downloadInformation} from './util.js';
import {onChangeFilter} from './map-filter.js';

const adform = document.querySelector('.ad-form');
const adress = adform.querySelector('#address');
const resetButton = adform.querySelector('.ad-form__reset');
const allFilters = document.querySelector('.map__filters');


const onError = () =>{
  showAlert('Ошибка сервера, перезагрузите страницу');
  deactivateFilter();
};
const setStartAdress = () =>{adress.value = '35.75330,139.63690';};
deactivateState();

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker({lat: 35.6827,lng: 139.7516,},{draggable: true,icon: mainPinIcon,},);
mainPinMarker.on('moveend', (evt) => {
  adress.value = Object.values(evt.target.getLatLng()).map((element) => element.toFixed(5)).join(',');
});

const dataMap = createLoader(downloadInformation,onError);
const map = L.map('map-canvas').on('load', () => {
  activateState();
  dataMap();
  setStartAdress();
}).setView({lat: 35.7533,lng: 139.6369,}, 10);
mainPinMarker.addTo(map);
const markerGroup = L.layerGroup().addTo(map);

const resetPage = () =>{
  mainPinMarker.setLatLng({
    lat: 35.6827,
    lng: 139.7516,
  });
  map.setView({
    lat: 35.6827,
    lng: 139.7516,
  }, 10);
  adform.reset();
  resetOptionSlider();
  setStartAdress();
  allFilters.reset();
  onChangeFilter();
};
const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

const newMarker = (it) =>{
  const {lat,lng} = it.location;
  const marker = L.marker({lat,lng},{icon});
  marker.addTo(markerGroup).bindPopup(generateAd(it));
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
});

export {newMarker,resetPage,markerGroup};
