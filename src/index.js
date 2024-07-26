import "./styles.css";
import controller from "./modules/controller";

const init = () => {
	const control = controller();

	const hasUndefinedProperties = (obj) => {
		// Iterate over the object's properties
		for (let key in obj) {
			// Check if the property is undefined
			if (obj[key] === undefined) {
				return true;
			}
		}
		return false;
	};

	control.load();
	let storedData = control.lastSearchedData;

	//Check loaded data to see if search data exists
	if (hasUndefinedProperties(storedData) === true) {
		//If not display default search
		control.searchForWeatherData("New York");
	} else {
		//If true display loaded search data
		control.displayWeatherData();
	}
};

init();
