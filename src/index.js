import './css/styles.css';
import _ from 'lodash';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';
const DEBOUNCE_DELAY = 300;
const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
countryInput.addEventListener(
  'input',
  _.debounce(evt => {
    let countryName = evt.target.value.trim();
    if (countryName !== '') {
      console.log(countryName);
    }
  }, DEBOUNCE_DELAY)
);
