import Notiflix from 'notiflix';
import { oneCountry, manyCountries, removeCountries } from '.';
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
        removeCountries();
      }
      if (data.length === 1) {
        oneCountry(data[0]);
      }
      if (data.length >= 2 && data.length <= 10) {
        manyCountries(data);
      }
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure('Oops, there is no country with that name');
      removeCountries();
    });
}
