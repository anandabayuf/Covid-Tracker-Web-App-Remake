export const setCountries = (data: []) => {
	return {
		type: "SET_COUNTRIES",
        payload: data
	}
}

export const setGlobalSummary = (data: {}) => {
	return {
		type: "SET_GLOBAL_SUMMARY",
        payload: data
	}
}

export const setIndonesiaSummary = (data: {}) => {
	return {
		type: "SET_INDONESIA_SUMMARY",
        payload: data
	}
}

export const setSelectedCountrySummary = (data: {}) => {
	return {
		type: "SET_SELECTED_COUNTRY_SUMMARY",
        payload: data
	}
}