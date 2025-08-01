import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/Home/home';
import Layout from './Layout';
import CountryDetail from './pages/CountryDetail/countryDetail';
import { ThemeProvider } from "./ThemeContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
		<ThemeProvider>
			<BrowserRouter basename="/frontendmentor-countries-page">
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="/countryDetail/:cca3" element={<CountryDetail />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
  </React.StrictMode>
);

