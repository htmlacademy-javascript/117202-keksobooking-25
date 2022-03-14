import {greatAds} from './data.js';
import {generatorAd} from './ad.js';
const ADS_LENGTH = 5;

const randomAds = Array.from({length: ADS_LENGTH},greatAds);


generatorAd(randomAds[1]);
