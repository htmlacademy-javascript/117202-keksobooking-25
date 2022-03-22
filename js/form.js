const ADFORM = document.querySelector('.ad-form');
const FIELDSETS = ADFORM.querySelectorAll('fieldset');
const MAPFILTER = document.querySelector('.map__filters');
const SELECTS = MAPFILTER.querySelectorAll('select');
const type = ADFORM.querySelector('[name="type"]');
const amountField = ADFORM.querySelector('#price');
const TITLE_AD = ADFORM.querySelector('#title');
function deactivateState(){
  ADFORM.classList.add('ad-form--disabled');
  FIELDSETS.forEach((it) =>  {it.disabled = true;});
  MAPFILTER.classList.add('map__filters--disabled');
  SELECTS.forEach((it) =>  {it.disabled = true;});
}
function activateState(){
  ADFORM.classList.remove('ad-form--disabled');
  FIELDSETS.forEach((it) =>  {it.disabled = false;});
  MAPFILTER.classList.remove('map__filters--disabled');
  SELECTS.forEach((it) =>  {it.disabled = false;});
  amountField.min = 1000;
  amountField.max = 100000;
}

const pristine = new Pristine(ADFORM,{
  classTo: 'ad-form__element' ,
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'error__message--text' ,
});

function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}
function errorValidateTitle (){
  TITLE_AD.style.border = '2px solid red';
  return 'От 30 до 100 символов';
}
pristine.addValidator(TITLE_AD,validateTitle,errorValidateTitle);

const minAmount = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

function validateAmount (value) {
  if(parseInt(value) < 100000){
    amountField.style.border = '';
    return parseInt(value) >= minAmount[type.value];}
}
function getAmountErrorMessage () {
  if(amountField.value < 100000){
    amountField.style.border = '2px solid red';
    return `Не менее ${minAmount[type.value]} рублей`;}
  amountField.style.border = '2px solid red';
  return 'Не более 100000 рублей';
}
pristine.addValidator(amountField, validateAmount ,getAmountErrorMessage);
function onUnitChange () {
  amountField.placeholder = minAmount[this.value];
  amountField.min = minAmount[this.value];

}

ADFORM.querySelectorAll('[name="type"]').forEach((item) => item.addEventListener('change', onUnitChange));

const rooms = ADFORM.querySelector('[name="rooms"]');
const capacitys = ADFORM.querySelector('[name="capacity"]');
const roomsOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2','3'],
  '100': ['0']
};

function validateRoom () {
  capacitys.style.border = '';
  return roomsOption[rooms.value].includes(capacitys.value);
}

function getDeliveryErrorMessage () {
  capacitys.style.border = '2px solid red';
  if (rooms.value !== '100' && capacitys.value !== '0'){return `для ${capacitys.value}-х гостей необходимо ${capacitys.value} комнаты`;}
  if (rooms.value === '100'){return '100 комнат для гостей не доступно';}
  if (capacitys.value === '0'){return 'Без гостей доступно только 100 комнат';}
  if(rooms.value === '2'){return 'для';}

}

const timeInForm = ADFORM.querySelector('[name="timein"]');
const timeOutForm = ADFORM.querySelector('[name="timeout"]');

timeInForm.addEventListener('change', (evt) => {
  timeOutForm.value = timeInForm.value;
});
timeOutForm.addEventListener('change', (evt) => {
  timeInForm.value = timeOutForm.value;
});
console.log(FIELDSETS);

pristine.addValidator(capacitys, validateRoom, getDeliveryErrorMessage);
const pristineStart = function (){
  ADFORM.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });

};

export {deactivateState,activateState,pristineStart};
