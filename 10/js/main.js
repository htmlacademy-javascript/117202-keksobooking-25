
import './map.js';
import {deactivateState,activateState,pristinStart} from './form.js';
import {createLoader} from './server_data.js';
import {showSuccessMessage,showErrorMessage} from './util.js';


const loadAds = createLoader(activateState,deactivateState());
window.addEventListener('load', () => {
  loadAds();
  pristinStart(showSuccessMessage,showErrorMessage);

});

