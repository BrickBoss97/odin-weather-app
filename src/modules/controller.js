import getWeatherData from "./weather-api";
import {
	formatCurrentWeatherData,
	formatDailyWeatherData,
	formatHourlyWeatherData,
} from "./weather-formatter";
import elementCreator from "./element-creator";
import { isStorageAvailable } from "./storage";

const $ = document.querySelector.bind(document);

const controller = () => {
	const element = elementCreator();
	const weatherDisplayElem = $(".main-content");

	let lastSearchedData = {
		currentWeather: undefined,
		dailyWeather: undefined,
		hourlyWeather: undefined,
	};

	//Temperature unit toggle button
	let currentUnit = "Fahrenheit";

	document.addEventListener("DOMContentLoaded", function () {
		const toggleButton = document.getElementById("toggleButton");
		const labelF = toggleButton.querySelector(".label-f");
		const labelC = toggleButton.querySelector(".label-c");

		toggleButton.addEventListener("click", function () {
			labelF.classList.toggle("active");
			labelC.classList.toggle("active");
			currentUnit = currentUnit === "Fahrenheit" ? "Celsius" : "Fahrenheit";
			displayWeatherData();
		});
	});

	//Searchbar functionality
	const searchInput = $(".search-bar__input");
	const searchButton = $(".search-bar__button");
	searchInput.addEventListener("keyup", function onEvent(event) {
		if (event.key === "Enter") {
			searchForWeatherData(searchInput.value);
		}
	});
	searchButton.addEventListener("click", () => {
		searchForWeatherData(searchInput.value);
	});

	const save = () => {
		if (!isStorageAvailable("localStorage")) {
			return;
		}

		localStorage.setItem(
			"currentWeather",
			JSON.stringify(lastSearchedData.currentWeather)
		);
		localStorage.setItem(
			"dailyWeather",
			JSON.stringify(lastSearchedData.dailyWeather)
		);
		localStorage.setItem(
			"hourlyWeather",
			JSON.stringify(lastSearchedData.hourlyWeather)
		);
	};

	const load = () => {
		if (!isStorageAvailable("localStorage")) {
			return;
		}

		const currentWeatherData = localStorage.getItem("currentWeather");

		if (currentWeatherData) {
			lastSearchedData.currentWeather = JSON.parse(
				localStorage.getItem("currentWeather") || undefined
			);
			lastSearchedData.dailyWeather = JSON.parse(
				localStorage.getItem("dailyWeather") || undefined
			);
			lastSearchedData.hourlyWeather = JSON.parse(
				localStorage.getItem("hourlyWeather") || undefined
			);
		}
	};

	const displayWeatherData = (data = lastSearchedData) => {
		weatherDisplayElem.innerHTML = "";
		element.createCurrentWeatherElem(data.currentWeather, currentUnit);
		element.createDailyWeatherElem(data.dailyWeather, currentUnit);
		element.createHourlyWeatherElem(data.hourlyWeather, currentUnit);
	};

	const searchForWeatherData = async (search) => {
		weatherDisplayElem.innerHTML = "";
		element.displayLoadingElem();
		try {
			const data = await getWeatherData(search);
			lastSearchedData.currentWeather = formatCurrentWeatherData(data);
			lastSearchedData.dailyWeather = formatDailyWeatherData(data);
			lastSearchedData.hourlyWeather = formatHourlyWeatherData(data);
			save();
			displayWeatherData(lastSearchedData);
		} catch (error) {
			weatherDisplayElem.innerHTML = "";
			element.displayErrorMessage();
			console.error(error);
		}
	};

	return {
		displayWeatherData,
		searchForWeatherData,
		save,
		load,
		lastSearchedData,
	};
};

export default controller;
