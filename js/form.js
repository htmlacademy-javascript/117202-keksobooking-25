const adform = document.querySelector('.ad-form');
const fieldset = adform.querySelectorAll('fieldset');
const mapfilter = document.querySelector('.map__filters');
const select = mapfilter.querySelectorAll('select');

function inactiveState(){
  adform.classList.add('ad-form--disabled');
  fieldset.forEach((it) =>  {it.disabled = true;});
  mapfilter.classList.add('map__filters--disabled');
  select.forEach((it) =>  {it.disabled = true;});

}

function activateState(){
  adform.classList.remove('ad-form--disabled');
  fieldset.forEach((it) =>  {it.disabled = false;});
  mapfilter.classList.remove('map__filters--disabled');
  select.forEach((it) =>  {it.disabled = false;});
}

export {inactiveState,activateState};
