import { IAction } from '../interfaces/interfaces';
import { combineReducers } from 'redux';

const countryReducer = (state = [], action: IAction) => {
	switch(action.type){
		case "GET_ALL_COUNTRIES":
			return state;
		case "SET_COUNTRIES":
			return action.payload;
		default:
			return state;
	}
}

const initialState = {
	global: {},
	indonesia: {},
	selectedCountry: {}
}

const summaryReducer = (state = initialState, action: IAction) => {
    switch(action.type){
		case "SET_GLOBAL_SUMMARY":
			return {
				...state,
				global: action.payload
			};
		case "SET_INDONESIA_SUMMARY":
			return {
				...state,
				indonesia: action.payload
			}
		case "SET_SELECTED_COUNTRY_SUMMARY":
			return {
				...state,
				selectedCountry: action.payload
			}
		default:
			return state;
    }
}

export const covidReducers = combineReducers({
	countries: countryReducer,
	summaries: summaryReducer,
})

