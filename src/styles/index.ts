import { useSelector } from 'react-redux';
import { LIGHT, DARK } from './interfaces/constants';
import { ThemeModeNames } from './interfaces/enums';
import { State } from '../store/index';

const CurrentTheme = () => {
    const theme = useSelector((state: State) => state.theme);

    if(theme === ThemeModeNames.LIGHT)
        return LIGHT;
    else return DARK;
}

export default CurrentTheme;