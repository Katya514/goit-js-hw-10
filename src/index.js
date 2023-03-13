import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const ref = {
  searchInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

ref.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();

  clearInput();
  const valueEntered = e.target.value.trim();
  if (!valueEntered) {
    clearInput();
    return;
  }

  fetchCountries(valueEntered)
    .then(countryName => {
      if (countryName.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (countryName.length >= 2 && countryName.length <= 10) {
        ref.countryList.innerHTML = '';
        displayCountriesList(countryName);
        ref.countryInfo.innerHTML = '';
      } else {
        ref.countryInfo.innerHTML = '';
        displayCountryInfo(countryName);
        ref.countryList.innerHTML = '';
      }
    })
    .catch(() => {
      ref.countryList.innerHTML = '';
      ref.countryInfo.innerHTML = '';
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function clearInput() {
  ref.countryInfo.innerHTML = '';
  ref.countryList.innerHTML = '';
}

function displayCountryInfo(countryName) {
  const markupInfo = countryName
    .map(({ name, flags, capital, population, languages }) => {
      return `
      <div class="accent_line"> <img src="${flags.svg}" alt="${
        name.official
      }" width="50" height= "25"/>

<h1>${name.official}</h1> </div>
<p><b>Capital</b>: ${capital}</p>
<p><b>Population</b>: ${population}</p>
<p><b>Languages</b>: ${Object.values(languages).join(', ')}</p>`;
    })
    .join('');

  ref.countryInfo.innerHTML = markupInfo;
  ref.countryList.innerHTML = '';
}

function displayCountriesList(countryName) {
  const listInfo = countryName
    .map(({ name, flags }) => {
      return `<li> <img src="${flags.svg}" alt="${name.official}" width="25" height= "15"/>
        <h2>${name.official}</h2> </li>`;
    })
    .join('');
  ref.countryInfo.innerHTML = '';
  ref.countryList.innerHTML = listInfo;
}
