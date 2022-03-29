import {newMarker} from './map.js';
import {showAlert} from './util.js';

const createLoader = (onSuccess,onError) => () => fetch(
  'https://25.javascript.pages.academy/keksobooking/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Ошибка загрузки');
  })
  .then((it) => {
    it.forEach((element) => {
      newMarker(element);
    });})
    .catch(() => {
      showAlert('Обновите страницу');
      onError();
    })
  .then(() => {
    onSuccess();
  });

export {createLoader};
