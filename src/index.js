import './css/styles.css';
import _ from 'lodash';
import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;
const countryInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
countryInput.addEventListener(
  'input',
  _.debounce(evt => {
    let countryName = evt.target.value.trim();
    if (countryName !== '') {
      fetchCountries(countryName);
    }
    if (countryName === '' && countryInfo.hasChildNodes()) {
      countryInfo.replaceChildren();
    }
    if (countryName === '' && countryList.hasChildNodes()) {
      countryList.replaceChildren();
    }
  }, DEBOUNCE_DELAY)
);
export function oneCountry(country) {
  removeCountries();
  const name = document.createElement('div');
  name.classList.add('name');
  countryInfo.append(name);
  const flag = document.createElement('img');
  flag.classList.add('flag');
  flag.setAttribute('src', country.flags.svg);
  name.append(flag);
  const heading = document.createElement('h1');
  heading.classList.add('heading');
  heading.textContent = `${country.name.common}`;
  name.append(heading);
  const capital = document.createElement('p');
  capital.classList.add('capital');
  const boldCapital = document.createElement('span');
  boldCapital.classList.add('bold');
  boldCapital.textContent = 'Capital: ';
  capital.textContent = country.capital;
  countryInfo.append(capital);
  capital.prepend(boldCapital);
  const population = document.createElement('p');
  population.classList.add('population');
  const boldPopulation = document.createElement('span');
  boldPopulation.classList.add('bold');
  boldPopulation.textContent = 'Population: ';
  population.textContent = country.population;
  countryInfo.append(population);
  population.prepend(boldPopulation);
  let languagesArray = Object.values(country.languages).join(', ');
  const languages = document.createElement('p');
  languages.classList.add('languages');
  const boldLanguages = document.createElement('span');
  boldLanguages.classList.add('bold');
  boldLanguages.textContent = 'Languages: ';
  languages.textContent = languagesArray;
  countryInfo.append(languages);
  languages.prepend(boldLanguages);
}
export function manyCountries(countries) {
  removeCountries();
  for (let i = 0; i < countries.length; i++) {
    const country = document.createElement('li');
    country.classList.add(`country`);
    country.dataset.count = i;
    countryList.append(country);
    const flag = document.createElement('img');
    flag.classList.add('listFlag');
    flag.setAttribute('src', countries[i].flags.svg);
    country.append(flag);
    const heading = document.createElement('h2');
    heading.classList.add('listHeading');
    heading.textContent = `${countries[i].name.common}`;
    country.append(heading);
    country.addEventListener('click', evt => {
      oneCountry(countries[evt.currentTarget.dataset.count]);
    });
  }
}
export function removeCountries() {
  if (countryList.hasChildNodes()) {
    countryList.replaceChildren();
  }
  if (countryInfo.hasChildNodes()) {
    countryInfo.replaceChildren();
  }
}
