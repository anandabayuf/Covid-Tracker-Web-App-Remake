import { Select } from "antd";
import { SearchBoxProps, ICountry, OptionsType } from "./interfaces/interfaces";
import "./styles/style.scss";
import { useSelector } from "react-redux";
import { State } from "../../../store/index";
import { ThemeModeNames } from "../../../styles/interfaces/enums";

const SearchBox: React.FC<SearchBoxProps> = ({
	data,
	handleChange,
	handleSearch,
	isLoading,
}) => {
	const theme = useSelector((state: State) => state.theme);
	const options: OptionsType = data?.map((el: ICountry) => {
		return {
			label: el.name,
			value: el.name,
		};
	});

	const style: React.CSSProperties = {
		width: "100%",
	};

	return (
		<Select
			showSearch
			placeholder="Select Country"
			optionFilterProp="children"
			size="large"
			allowClear
			onChange={handleChange}
			onSearch={handleSearch}
			filterOption={(input, option) =>
				(option?.label ?? "").toLowerCase().includes(input.toLowerCase())
			}
			options={options}
			style={style}
			loading={isLoading}
			popupClassName={theme === ThemeModeNames.LIGHT ? "light" : "dark"}
			className={theme === ThemeModeNames.LIGHT ? "light" : "dark"}
		/>
	);
};

export default SearchBox;
