import {resetPage} from './map.js';
import {showSuccessMessage,showErrorMessage} from './util.js';
import './map-filter.js';
import './photo-ad.js';
const URL_POST = 'https://25.javascript.pages.academy/keksobooking';
const MAX_PRICE = 100000;
const MIN_PRICE = 1000;
const adform = document.querySelector('.ad-form');
const fieldset = adform.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const selects = mapFilter.querySelectorAll('select');
const type = adform.querySelector('[name="type"]');
const amountField = adform.querySelector('#price');
const titleAd = adform.querySelector('#title');
const sliderElement = document.querySelector('.ad-form__slider');
const submitButton = adform.querySelector('.ad-form__submit');


const deactivateFilter = () =>{
  mapFilter.classList.add('map__filters--disabled');
  selects.forEach((it) =>  {it.disabled = true;});
};
const deactivateState = () =>{
  adform.classList.add('ad-form--disabled');
  fieldset.forEach((it) =>  {it.disabled = true;});
  deactivateFilter();
};

const blockSubmitButton = () =>{
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () =>{
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};
const activateState = () =>{
  adform.classList.remove('ad-form--disabled');
  fieldset.forEach((it) =>  {it.disabled = false;});
  mapFilter.classList.remove('map__filters--disabled');
  selects.forEach((it) =>  {it.disabled = false;});
  amountField.min = MIN_PRICE;
  amountField.max = MAX_PRICE;
};

const pristine = new Pristine(adform,{
  classTo: 'ad-form__element' ,
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'error__message--text' ,
});

const validateTitle = (value) => {
  titleAd.style.border = '';
  return value.length >= 30 && value.length <= 100;
};
const errorValidateTitle = () =>{
  titleAd.style.border = '2px solid red';
  return 'От 30 до 100 символов';
};
pristine.addValidator(titleAd,validateTitle,errorValidateTitle);

const minAmount = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const validateAmount = (value) =>{
  if(parseInt(value, 10) < MAX_PRICE){
    amountField.style.border = '';
    return parseInt(value, 10) >= minAmount[type.value];}
};
const getAmountErrorMessage = () =>{
  if(amountField.value < MAX_PRICE){
    amountField.style.border = '2px solid red';
    return `Не менее ${minAmount[type.value]} рублей`;}
  amountField.style.border = '2px solid red';
  return 'Не более 100000 рублей';
};


pristine.addValidator(amountField, validateAmount ,getAmountErrorMessage);
const onUnitChange = function() {
  amountField.placeholder = minAmount[this.value];
  amountField.min = minAmount[this.value];
  if (sliderElement) {
    const options = {
      range: { min: 0, max:MAX_PRICE}, step: 100
    };

    sliderElement.noUiSlider.updateOptions(options);}
};
const resetOptionSlider = () =>{
  const options = {
    range: { min: MIN_PRICE, max:MAX_PRICE}, step: 100,start: 1000
  };
  sliderElement.noUiSlider.updateOptions(options);
};

adform.querySelector('[name="type"]').addEventListener('change', onUnitChange);

const rooms = adform.querySelector('[name="rooms"]');
const capacitys = adform.querySelector('[name="capacity"]');
const roomsOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2','3'],
  '100': ['0']
};

const validateRoom = () =>{
  capacitys.style.border = '';
  return roomsOption[rooms.value].includes(capacitys.value);
};

const getDeliveryErrorMessage = () =>{
  capacitys.style.border = '2px solid red';
  if (rooms.value !== '100' && capacitys.value !== '0'){return `для ${capacitys.value}-х гостей необходимо ${capacitys.value} комнаты`;}
  if (rooms.value === '100'){return '100 комнат для гостей не доступно';}
  if (capacitys.value === '0'){return 'Без гостей доступно только 100 комнат';}
  if(rooms.value === '2'){return 'для';}

};

const timeInForm = adform.querySelector('[name="timein"]');
const timeOutForm = adform.querySelector('[name="timeout"]');

timeInForm.addEventListener('change', () => {
  timeOutForm.value = timeInForm.value;
});
timeOutForm.addEventListener('change', () => {
  timeInForm.value = timeOutForm.value;
});

pristine.addValidator(capacitys, validateRoom, getDeliveryErrorMessage);

const pristinStart = (onSuccess,onError) =>{
  adform.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      fetch(URL_POST,
        {method: 'POST',
          body: formData,
        },
      ).then((response) => {
        if (response.ok) {
          onSuccess();
          adform.reset();
          resetPage();
          unblockSubmitButton();}
        else{
          onError();
          unblockSubmitButton();
        }}
      ).catch(() => {
        unblockSubmitButton();
        onError();
      });
    }});};

pristinStart(showSuccessMessage,showErrorMessage);

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: MAX_PRICE,
  },
  start: 0,
  step: 1000,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const onUbdSlider = () =>{
  sliderElement.noUiSlider.on('update', () => {
    amountField.value = sliderElement.noUiSlider.get();
  });
};
amountField.addEventListener('change', function () {
  sliderElement.noUiSlider.set(this.value);
});


sliderElement.addEventListener('click',onUbdSlider);


export {deactivateState,activateState,pristinStart,deactivateFilter,resetOptionSlider};
