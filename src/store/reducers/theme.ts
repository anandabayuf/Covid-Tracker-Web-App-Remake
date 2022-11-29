import { ThemeModeNames } from '../../styles/interfaces/enums';
import { IAction } from '../interfaces/interfaces';

export const themeReducer = (state: ThemeModeNames = ThemeModeNames.LIGHT, action: IAction) => {
	switch(action.type){
		case "SWITCH_TO_DARK":
			return ThemeModeNames.DARK;
		case "SWITCH_TO_LIGHT":
			return ThemeModeNames.LIGHT;
		default:
			return state;
	}
} 