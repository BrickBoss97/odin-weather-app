import icons from "./image-loader";
import * as Datefns from "date-fns";

const elementCreator = () => {
	const createCurrentWeatherElem = (data, unit) => {
		const contentElem = document.querySelector(".main-content");
		// Create the main container
		const weatherContainer = document.createElement("div");
		weatherContainer.className = "display current-weather";

		// Create the location div
		const locationDiv = document.createElement("div");
		locationDiv.className = "current-weather__location";
		locationDiv.textContent = data.address;
		weatherContainer.appendChild(locationDiv);

		// Create the left partition div
		const leftPartitionDiv = document.createElement("div");
		leftPartitionDiv.className =
			"current-weather__partition current-weather__partition__left";

		// Feels like
		const feelsLikeDiv = document.createElement("div");
		feelsLikeDiv.className =
			"current-weather__info current-weather__feels-like";
		feelsLikeDiv.textContent = `Feels like: ${Math.trunc(
			data.feelsLike[`${unit}`]
		)}°`;
		leftPartitionDiv.appendChild(feelsLikeDiv);

		// Precipitation
		const precipDiv = document.createElement("div");
		precipDiv.className = "current-weather__info current-weather__precip";
		precipDiv.textContent = `Precipitation: ${data.precip}"`;
		leftPartitionDiv.appendChild(precipDiv);

		// Humidity
		const humidityDiv = document.createElement("div");
		humidityDiv.className = "current-weather__info current-weather__humidity";
		humidityDiv.textContent = `Humidity: ${data.humidity}%`;
		leftPartitionDiv.appendChild(humidityDiv);

		weatherContainer.appendChild(leftPartitionDiv);

		// Create the right partition div
		const rightPartitionDiv = document.createElement("div");
		rightPartitionDiv.className =
			"current-weather__partition current-weather__partition__right";

		// Weather icon
		const img = document.createElement("img");
		img.src = icons[data.icon];
		img.alt = data.icon;
		rightPartitionDiv.appendChild(img);

		// Temperature
		const tempDiv = document.createElement("div");
		tempDiv.className = "current-weather__info current-weather__temp";
		tempDiv.textContent = `${Math.trunc(data.temperature[`${unit}`])}°`;
		rightPartitionDiv.appendChild(tempDiv);

		// Conditions
		const conditionsDiv = document.createElement("div");
		conditionsDiv.className =
			"current-weather__info current-weather__conditions";
		conditionsDiv.textContent = data.conditions;
		rightPartitionDiv.appendChild(conditionsDiv);

		weatherContainer.appendChild(rightPartitionDiv);

		// Append the entire weather container to the body or a specific parent element
		contentElem.appendChild(weatherContainer);
	};

	const createDailyWeatherElem = (data, unit) => {
		const contentElem = document.querySelector(".main-content");

		//Create the main conatiner
		const dailyWeatherContainer = document.createElement("div");
		dailyWeatherContainer.className = "display display__small";

		//Create the scroll conatiner
		const scrollContainer = document.createElement("div");
		scrollContainer.className = "scroll-container weekly-weather";

		const createDailyWeatherItem = (day) => {
			//Create the item conatiner
			const itemContainer = document.createElement("div");
			itemContainer.className = "weather__item";

			//Day Name
			const nameDiv = document.createElement("div");
			nameDiv.className = "daily-weather__day";
			nameDiv.textContent = Datefns.format(new Date(day.datetime), "E");
			itemContainer.appendChild(nameDiv);

			//Image
			const img = document.createElement("img");
			img.src = icons[day.icon];
			img.alt = day.icon;
			itemContainer.appendChild(img);

			//Temperature
			const tempDiv = document.createElement("div");
			tempDiv.className = "daily-weather__temp";
			tempDiv.textContent = `${Math.trunc(
				day.minTemp[`${unit}`]
			)}°/${Math.trunc(day.maxTemp[`${unit}`])}°`;
			itemContainer.appendChild(tempDiv);

			//Append item container to scroll container
			scrollContainer.appendChild(itemContainer);
		};

		data.forEach((day) => {
			createDailyWeatherItem(day);
		});

		// Append the entire weather container to the body or a specific parent element
		dailyWeatherContainer.appendChild(scrollContainer);
		contentElem.appendChild(dailyWeatherContainer);
	};

	const createHourlyWeatherElem = (data, unit) => {
		const contentElem = document.querySelector(".main-content");

		//Create the main conatiner
		const hourlyWeatherContainer = document.createElement("div");
		hourlyWeatherContainer.className = "display display__small";

		//Create the scroll conatiner
		const scrollContainer = document.createElement("div");
		scrollContainer.className = "scroll-container hourly-weather";

		const createHourlyWeatherItem = (hour) => {
			//Create the item conatiner
			const itemContainer = document.createElement("div");
			itemContainer.className = "weather__item";

			//Hour
			const nameDiv = document.createElement("div");
			nameDiv.className = "hourly-weather__hour";
			const time = Datefns.parse(hour.datetime, "HH:mm:ss", new Date());
			nameDiv.textContent = Datefns.format(time, "ha");
			itemContainer.appendChild(nameDiv);

			//Image
			const img = document.createElement("img");
			img.src = icons[hour.icon];
			img.alt = hour.icon;
			itemContainer.appendChild(img);

			//Temperature
			const tempDiv = document.createElement("div");
			tempDiv.className = "hourly-weather__temp";
			tempDiv.textContent = `${Math.trunc(hour.temp[`${unit}`])}°`;
			itemContainer.appendChild(tempDiv);

			//Append item container to scroll container
			scrollContainer.appendChild(itemContainer);
		};

		data.forEach((hour) => {
			createHourlyWeatherItem(hour);
		});

		// Append the entire weather container to the body or a specific parent element
		hourlyWeatherContainer.appendChild(scrollContainer);
		contentElem.appendChild(hourlyWeatherContainer);
	};

	const displayLoadingElem = () => {
		const contentElem = document.querySelector(".main-content");

		// Create the main container
		const loadingContainer = document.createElement("div");
		loadingContainer.className = "display loading-message__container";

		//Loading message
		const loadingMessage = document.createElement("div");
		loadingMessage.className = "loading-element loading-message";
		loadingMessage.textContent = "Fetching weather data...";
		loadingContainer.appendChild(loadingMessage);

		//Loading animation
		const loadingAnimation = document.createElement("div");
		loadingAnimation.className = "loading-element loading-animation";
		loadingContainer.appendChild(loadingAnimation);

		//Append loading elem to main comatiner
		contentElem.appendChild(loadingContainer);
	};

	const displayErrorMessage = () => {
		const contentElem = document.querySelector(".main-content");

		// Get the error container
		const errorContainer = document.createElement("div");
		errorContainer.className = "display error-message__container";

		// Create a new div for the error message
		const errorDiv = document.createElement("div");
		errorDiv.className = "error-message";
		errorDiv.textContent =
			"Something went wrong, try entering a valid location or refreshing the page.";

		// Append the error message div to the error container
		errorContainer.appendChild(errorDiv);

		//Append error elem to main comatiner
		contentElem.appendChild(errorContainer);
	};

	return {
		createCurrentWeatherElem,
		createDailyWeatherElem,
		createHourlyWeatherElem,
		displayLoadingElem,
		displayErrorMessage,
	};
};

export default elementCreator;
