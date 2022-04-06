import { newMarker } from './map.js';

const ALERT_SHOW_TIME = 5000;
const MAX_AD = 10;
const messageFragment = document.querySelector('body');

const showAlert = function (message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  messageFragment.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
const isEscEvent = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');


const onClosePopup = () => {
  if (document.querySelector('.success')) {
    document.querySelector('.success').remove();
  }
  if (document.querySelector('.error')) {
    document.querySelector('.error').remove();
  }
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    onClosePopup();
  }
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const onPopupClick = () => {
  onClosePopup();
  document.removeEventListener('keydown', onPopupClick);
};

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successTemplate.cloneNode(true);
  successMessage.style.zIndex = 1000;
  messageFragment.append(successMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onPopupClick);

};

const showErrorMessage = (message) => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorTemplate.cloneNode(true);
  errorMessage.style.zIndex = 1000;
  if (message) {
    errorMessage.querySelector('p').textContent = message;
  }
  messageFragment.append(errorMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onClosePopup);
};

const downloadInformation = function(it){
  for(let i=0;i<MAX_AD;i++){
    newMarker(it[i]);
  }
};

export {showAlert,showSuccessMessage,showErrorMessage,downloadInformation};
