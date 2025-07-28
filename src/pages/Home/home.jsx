import CountryCard from '../../components/CountryCard/countryCard';
import './home.css';
import { useEffect, useState } from 'react';

const API_URL = "https://restcountries.com/v3.1/all?fields=name,capital,idd,flags,region,continents,currencies,borders,languages,population";

function Home() {
	const [countriesData, setCountriesData] = useState([]);

	useEffect(() => {
		fetchData();
	},[])

	const fetchData = async () => {
		try {
			const response = await fetch(API_URL);
			const data = await response.json();
			console.log("data", data);
			setCountriesData(data);
			return;
		} catch (err) {
			console.log("err", err);
		}
	}

  return (
    <div className="home-container">
			<div className="w-full flex flex-row justify-between items-center">
				<search>
					<input className="search-bar" id="searchCountry" type="text" placeholder="Search for a country..." />
				</search>
				<select id="regionFilter" className="region-filter">
					<option value="">Filter by Region</option>
					<option value="africa">Africa</option>
					<option value="americas">Americas</option>
					<option value="asia">Asia</option>
					<option value="europe">Europe</option>
					<option value="oceania">Oceania</option>
				</select>
			</div>

			<div className="countries-grid">
				{countriesData && countriesData.map((country, index) => (
					<CountryCard country={country} key={index} />
				))}
			</div>
    </div>
  );
}

export default Home;

/**
 * TODO: 
 * Crear componente tarjeta
 * Desde home pasar datos paisxpais a tarjeta,
 * Cargar datos en tarjeta,
 * Hacer grid con tarjetas
 */

/** 
TODO:
- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*

*/