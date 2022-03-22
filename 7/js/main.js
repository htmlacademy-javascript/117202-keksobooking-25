import {greatAds} from './data.js';
import {generatorAd} from './ad.js';
import {deactivateState, activateState,pristineStart} from './form.js';
const ADS_LENGTH = 5;

const randomAds = Array.from({length: ADS_LENGTH},greatAds);


generatorAd(randomAds[1]);
console.log(deactivateState, activateState);
activateState();
pristineStart();
