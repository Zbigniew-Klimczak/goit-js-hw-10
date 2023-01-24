import './css/styles.css';
import _ from 'lodash';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;
const countryInput = document.querySelector('#search-box');
countryInput.addEventListener(
  'input',
  _.debounce(evt => {
    let countryName = evt.target.value.trim();
    if (countryName !== '') {
      fetchCountries(countryName);
    }
    if (countryName === '') {
      document.querySelector('.heading').remove();
      document.querySelector('.capital').remove();
      document.querySelector('.population').remove();
      document.querySelector('.languages').remove();
    }
  }, DEBOUNCE_DELAY)
);
