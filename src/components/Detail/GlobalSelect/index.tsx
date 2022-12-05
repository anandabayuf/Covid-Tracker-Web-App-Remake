import { Select } from "antd";
import { GlobalSelectProps, OptionsType } from "./interfaces/interfaces";
import { useSelector } from "react-redux";
import { State } from "../../../store/index";
import { ThemeModeNames } from "../../../styles/interfaces/enums";

const GlobalSelect: React.FC<GlobalSelectProps> = ({
	isLoading,
	handleChange,
}) => {
	const theme = useSelector((state: State) => state.theme);
	const options: OptionsType = [
		{
			label: "Confirmed",
			value: "confirmed",
		},
		{
			label: "Recovered",
			value: "recovered",
		},
		{
			label: "Deaths",
			value: "deaths",
		},
	];

	const style: React.CSSProperties = {
		width: "150px",
	};

	return (
		<Select
			defaultValue="confirmed"
			size="large"
			onChange={handleChange}
			options={options}
			style={style}
			loading={isLoading}
			popupClassName={theme === ThemeModeNames.LIGHT ? "light" : "dark"}
			className={theme === ThemeModeNames.LIGHT ? "light" : "dark"}
		/>
	);
};

export default GlobalSelect;
