import { Select } from "antd";
import { SearchBoxProps, ICountry, OptionsType } from "./interfaces/interfaces";
import "./styles/style.scss";

const SearchBox: React.FC<SearchBoxProps> = ({
	data,
	handleChange,
	handleSearch,
}) => {
	const options: OptionsType = data?.map((el: ICountry) => {
		return {
			label: el.name,
			value: el.iso3,
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
		/>
	);
};

export default SearchBox;
