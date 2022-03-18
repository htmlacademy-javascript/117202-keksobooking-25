const ADFORM = document.querySelector('.ad-form');
const FIELDSETS = ADFORM.querySelectorAll('fieldsets');
const MAPFILTER = document.querySelector('.map__filters');
const SELECTS = MAPFILTER.querySelectorAll('selects');


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
pristine.addValidator(
  ADFORM.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов'
);


const amountField = ADFORM.querySelector('#price');
const minAmount = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};
function validateAmount (value) {
  const type = ADFORM.querySelector('[name="type"]');
  return value.length && parseInt(value) >= minAmount[type.value];
}
function getAmountErrorMessage () {
  const type = ADFORM.querySelector('[name="type"]');
  return `Не менее ${minAmount[type.value]} рублей`;
}
pristine.addValidator(amountField, validateAmount ,getAmountErrorMessage);

function onUnitChange () {
  amountField.value = minAmount[this.value];
  amountField.min = minAmount[this.value];
  pristine.validate(amountField);
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
  return roomsOption[rooms.value].includes(capacitys.value);
}

function getDeliveryErrorMessage () {
  if (rooms.value !== '100' && capacitys.value !== '0'){return `для ${capacitys.value}-х гостей номер мал`;}
  if (rooms.value === '100'){return '100 комнат для гостей не доступно';}
  if (capacitys.value === '0'){return 'Без гостей доступно только 100 комнат';}
}

const timeInForm = ADFORM.querySelector('[name="timein"]');
const timeOutForm = ADFORM.querySelector('[name="timeout"]');

timeInForm.addEventListener('change', (evt) => {
  timeOutForm.value = timeInForm.value;
});
timeOutForm.addEventListener('change', (evt) => {
  timeInForm.value = timeOutForm.value;
});

pristine.addValidator(rooms, validateRoom, getDeliveryErrorMessage);
pristine.addValidator(capacitys, validateRoom, getDeliveryErrorMessage);
const pristineStart = function (){
  ADFORM.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};
export {deactivateState,activateState,pristineStart};
