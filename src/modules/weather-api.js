const getWeatherData = async (location) => {
	const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?key=SJ79ULMSZ74444BLZX5CEY5HS`;
	try {
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			const errorResponse = await response.json();
			const errorMessage = errorResponse.error.message;
			throw new Error(errorMessage || "Failed to fetch weather data");
		}
	} catch (error) {
		console.error("Error fetching weather data:", error.message);
		throw error;
	}
};

export default getWeatherData;
