import Notiflix from 'notiflix';
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
export function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }

      return response.json();
    })
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.warning(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (data.length === 1) {
        console.log('one country', data);
        oneCountry(data);
      }
      if (data.length >= 2 && data.length <= 10) {
        console.log('2-10 countries', data);
        manyCountries(data);
      }
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
function oneCountry(country) {
  console.log('one');
  const heading = document.createElement('h1');
  heading.classList.add('heading');
  heading.textContent = `${country[0].name.common}`;
  countryInfo.append(heading);
  const capital = document.createElement('p');
  capital.classList.add('capital');
  capital.textContent = `Capital: ${country[0].capital}`;
  countryInfo.append(capital);
  const population = document.createElement('p');
  population.classList.add('population');
  population.textContent = `Population: ${country[0].population}`;
  countryInfo.append(population);
  let languagesArray = Object.values(country[0].languages).join(', ');
  const languages = document.createElement('p');
  languages.classList.add('languages');
  languages.textContent = `Population: ${languagesArray}`;
  countryInfo.append(languages);
}
function manyCountries(countries) {
  console.log('many');
}
