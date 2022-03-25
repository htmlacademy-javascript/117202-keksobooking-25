import {greatAds} from './data.js';
import {generatorAd,adUser} from './ad.js';
import {deactivateState, activateState,pristineStart} from './form.js';
const ADS_LENGTH = 10;

const randomAds = Array.from({length: ADS_LENGTH},greatAds);


generatorAd(randomAds[1]);


//const marker = L.marker({location.lat,location.lng,});

//console.log(deactivateState, activateState);
//activateState();
//pristineStart();
const ADFORM = document.querySelector('.ad-form');
const adress = ADFORM.querySelector('#address');
const resetButton = ADFORM.querySelector('.ad-form__reset');
console.log(resetButton);
console.log(adress);
const map = L.map('map-canvas').on('load', () => {
  console.log('Карта инициализирована');
}).setView({lat: 35.7533,lng: 139.6369,}, 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker({lat: 35.7533,lng: 139.6369,},{draggable: true,icon: mainPinIcon,},);
mainPinMarker.on('moveend', (evt) => {
  adress.value = Object.values(evt.target.getLatLng()).map((element) => element.toFixed(5)).join(',');
});

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: 35.7533,
    lng: 139.6369,
  });
  map.setView({
    lat: 35.7533,
    lng: 139.6369,
  }, 10);
});
const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
console.log(adUser);

randomAds.forEach((it) => {
  const {lat,lng} = it.location;
  const marker = L.marker({lat,lng},{icon});
  marker.addTo(map).bindPopup(generatorAd(it.offer,it.author));
});
mainPinMarker.addTo(map);

