import { combineReducers } from 'redux';
import { themeReducer } from './theme';
import { covidReducers } from './covid';

const reducers = combineReducers({
	covid: covidReducers,
	theme: themeReducer
});

export default reducers;