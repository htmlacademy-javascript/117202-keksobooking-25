const adform = document.querySelector('.ad-form');
const fieldset = document.querySelectorAll('.fieldset');
const mapfilter = document.querySelector('.map__filters');
const select = document.querySelectorAll('.select');

function inactiveState(){
  adform.classList.add('ad-form--disabled');
  fieldset.setAttribute('disabled', 'disabled');
  mapfilter.classList.add('map__filters--disabled');
  select.setAttribute('disabled', 'disabled');
}

function activateState(){
  adform.classList.remove('ad-form--disabled');
  fieldset.removeAttribute('disabled');
  mapfilter.classList.remove('map__filters--disabled');
  select.removeAttribute('disabled');
}

export {inactiveState,activateState};
