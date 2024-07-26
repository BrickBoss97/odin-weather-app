export function formatCurrentWeatherData(rawData) {
	const data = rawData;

	return {
		address: data.resolvedAddress,
		currentDatetime: data.currentConditions.datetime,
		temperature: {
			Fahrenheit: data.currentConditions.temp,
			Celsius: (data.currentConditions.temp - 32) / (9 / 5),
		},
		conditions: data.currentConditions.conditions,
		feelsLike: {
			Fahrenheit: data.currentConditions.feelslike,
			Celsius: (data.currentConditions.feelslike - 32) / (9 / 5),
		},
		humidity: data.currentConditions.humidity,
		precip: data.currentConditions.precip,
		icon: data.currentConditions.icon,
	};
}

export function formatDailyWeatherData(rawData) {
	const data = rawData;

	return data.days.map((dailyData) => ({
		datetime: dailyData.datetime,
		minTemp: {
			Fahrenheit: dailyData.tempmin,
			Celsius: (dailyData.tempmin - 32) / (9 / 5),
		},
		maxTemp: {
			Fahrenheit: dailyData.tempmax,
			Celsius: (dailyData.tempmax - 32) / (9 / 5),
		},
		icon: dailyData.icon,
	}));
}

export function formatHourlyWeatherData(rawData) {
	const data = rawData;

	console.log(data);

	const todayHours = data.days[0].hours;
	const tomorrowHours = data.days[1].hours;
	const currentTime = data.currentConditions.datetime;

	//Remove hours before current
	let filteredHours = todayHours.filter((item) => item.datetime >= currentTime);
	//Add tomorrow hours as buffer
	filteredHours = filteredHours.concat(tomorrowHours);
	//Reduce to next 8 hours
	filteredHours = filteredHours.slice(0, 24);

	return filteredHours.map((hourlyData) => ({
		datetime: hourlyData.datetime,
		temp: {
			Fahrenheit: hourlyData.temp,
			Celsius: (hourlyData.temp - 32) / (9 / 5),
		},
		icon: hourlyData.icon,
	}));
}
