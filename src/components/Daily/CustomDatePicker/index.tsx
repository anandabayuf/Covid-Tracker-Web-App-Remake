import CurrentTheme from "../../../styles/index";
import { CustomDatePickerProps } from "./interfaces/interfaces";
import { DatePicker } from "antd";
import { useSelector } from "react-redux";
import { State } from "../../../store/index";
import { ThemeModeNames } from "../../../styles/interfaces/enums";
import "./styles/style.scss";

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
	handleChange,
}) => {
	const currentTheme = CurrentTheme();
	const theme = useSelector((state: State) => state.theme);

	return (
		<DatePicker
			style={{
				backgroundColor: currentTheme.other,
				color: currentTheme.text,
				border: "none",
			}}
			className={
				theme === ThemeModeNames.LIGHT
					? `rounded-xl shadow-md light`
					: `rounded-xl shadow-md dark`
			}
			popupClassName={theme === ThemeModeNames.LIGHT ? "light" : "dark"}
			onChange={handleChange}
			size={"large"}
			disabledDate={(currentDate) => {
				return currentDate.toDate().getTime() > Date.now();
			}}
		/>
	);
};

export default CustomDatePicker;
