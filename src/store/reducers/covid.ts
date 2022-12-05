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

const initialSummaryState = {
	global: {},
	indonesia: {},
	selectedCountry: {}
}

const summaryReducer = (state = initialSummaryState, action: IAction) => {
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

const initialDetailState = {
	global: [],
	region: [],
}

const detailReducer = (state = initialDetailState, action: IAction) => {
	switch(action.type){
		case "SET_GLOBAL_DETAIL":
			return {
				...state,
				global: action.payload
			}
		case "SET_REGION_DETAIL":
			return {
				...state,
				region: action.payload
			}
		default:
			return state;
	}
}

const initialDailyState = {
	allDaily: [],
	dailyByDate: []
}

const dailyReducer = (state = initialDailyState, action: IAction) => {
	switch(action.type){
		case "SET_ALL_DAILY":
			return {
				...state,
				allDaily: action.payload
			}
		case "SET_DAILY_BY_DATE":
			return {
				...state,
				dailyByDate: action.payload
			}
		default:
			return state;
	}
}


export const covidReducers = combineReducers({
	countries: countryReducer,
	summaries: summaryReducer,
	details: detailReducer,
	daily: dailyReducer
})

