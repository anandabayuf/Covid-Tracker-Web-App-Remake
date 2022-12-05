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

export const setAllDaily = (data: []) => {
	return {
		type: "SET_ALL_DAILY",
        payload: data
	}
}

export const setDailyByDate = (data: []) => {
	return {
		type: "SET_DAILY_BY_DATE",
        payload: data
	}
}

export const setGlobalDetail = (data: []) => {
	return {
		type: "SET_GLOBAL_DETAIL",
        payload: data
	}
}

export const setRegionDetail = (data: []) => {
	return {
		type: "SET_REGION_DETAIL",
        payload: data
	}
}