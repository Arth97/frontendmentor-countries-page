import './home.css';
import CountryCard from '../../components/CountryCard/countryCard';
import { useEffect, useState } from 'react';
import debounce from 'debounce';

const API_URL = "https://restcountries.com/v3.1/all?fields=name,cca3,capital,idd,flags,region,continents,currencies,languages,population";

function Home() {
	const [countriesData, setCountriesData] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [selectedRegion, setSelectedRegion] = useState("");
	const [searchInput, setSearchInput] = useState("");

	useEffect(() => {
		fetchData();
	},[])

	const fetchData = async () => {
		try {
			const response = await fetch(API_URL);
			const data = await response.json();
			console.log("data", data);
			setCountriesData(data);
			setFilteredCountries(data);
			return;
		} catch (err) {
			console.log("err", err);
		}
	}

	const filterByRegion = (region) => {
		if (!countriesData) return;
		
		let filteredData = [];
		filteredData = countriesData.filter(country => {
			return region === country.region.toLowerCase()
		});
		setFilteredCountries(filteredData);

		if (searchInput!=="") searchByInput(searchInput, filteredData);
	}

	const searchByInput = (searchInput, filteredData=[]) => {
		setSearchInput(searchInput)
		const data = filteredData.length===0 ? countriesData : filteredData;

		const lowerSearch = searchInput.toLowerCase();
		const searchedData = data.filter(country => {
			const name = country.name?.common?.toLowerCase() || '';
			return name.includes(lowerSearch)
		});
		setFilteredCountries(searchedData);
	}

	const debouncedHandleSearch = debounce(searchByInput, 1200);

  return (
    <div className="home-container">
			<div className="w-full flex flex-row justify-between items-center">
				<search>
					<input className="search-bar" onChange={(e) => debouncedHandleSearch(e.target.value)} id="searchCountry" type="text" placeholder="Search for a country..." />
				</search>

				<select
					id="regionFilter"
					className="region-filter"
					value={selectedRegion}
					onChange={(e) => {
						setSelectedRegion(e.target.value);
						filterByRegion(e.target.value);
					}}
				>
					<option value="">Filter by Region</option>
					<option value="africa">Africa</option>
					<option value="americas">Americas</option>
					<option value="asia">Asia</option>
					<option value="europe">Europe</option>
					<option value="oceania">Oceania</option>
				</select>
			</div>

			<div className="countries-grid">
				{filteredCountries && filteredCountries.map((country, index) => (
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