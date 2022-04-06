const fileChooserAvatar = document.querySelector('.ad-form__field input[type="file"]');
const preview = document.querySelector('.ad-form-header__preview img');
const fileChooserAd = document.querySelector('.ad-form__upload input[type="file"]');
const previewAd = document.querySelector('.ad-form__photo');
const muffinPhoto = 'img/muffin-grey.svg';
const submitButton = document.querySelector('.ad-form__submit');
const resetButton = document.querySelector('.ad-form__reset');

fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];
  preview.src = URL.createObjectURL(file);
});

fileChooserAd.addEventListener('change', () => {
  const fileAd = fileChooserAd.files[0];
  previewAd.insertAdjacentHTML('beforeend', '<img width="70" height="70"></img>');
  const previewAdImg = document.querySelector('.ad-form__photo img');
  previewAdImg.src = URL.createObjectURL(fileAd);
  submitButton.addEventListener('click', ()=>{
    previewAdImg.remove();
    preview.src = muffinPhoto;
  });
  resetButton.addEventListener('click', ()=>{
    previewAdImg.remove();
    preview.src = muffinPhoto;
  });
});
