
const URL_GET = 'https://25.javascript.pages.academ/keksobooking/data';

const createLoader = (onSuccess,onError) => () => fetch(
  URL_GET,
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
      onSuccess(element);
    });})
  .catch(() => {
    onError();
  });

export {createLoader};
