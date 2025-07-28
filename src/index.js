import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/Home/home';
import Layout from './Layout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
	// <BrowserRouter basename="/devchallenge-country-quiz">
	<BrowserRouter>
		<Routes>
				<Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* Otras rutas de páginas */}
        </Route>
			</Routes>
	</BrowserRouter>
  // </React.StrictMode>
);




/** 
TODO:
- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*

*/