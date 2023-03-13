// import Notiflix from 'notiflix';

// export function fetchCountries(countryName) {
//   return fetch(
//     'https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages'
//   ).then(response => {
//     if (!response.ok) {
//       return Notiflix.Notify.failure(
//         'Oops, there is no country with that name'
//       );
//     }
//     return response.json();
//   });
// }

const URL = 'https://restcountries.com/v3.1/name';

export function fetchCountries(name) {
  return fetch(
    `${URL}/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error('Data fail!');
    }
    return response.json();
  });
}
