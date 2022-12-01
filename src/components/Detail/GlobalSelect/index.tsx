import { Select } from "antd";
import { GlobalSelectProps, OptionsType } from "./interfaces/interfaces";

const GlobalSelect: React.FC<GlobalSelectProps> = ({
	isLoading,
	handleChange,
}) => {
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
		/>
	);
};

export default GlobalSelect;
