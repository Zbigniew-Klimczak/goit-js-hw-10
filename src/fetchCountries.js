import Notiflix from 'notiflix';
import { oneCountry, manyCountries } from '.';
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
