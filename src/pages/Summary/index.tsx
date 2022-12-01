import SearchBox from "../../components/Summary/SearchBox";
import MainLayout from "../../layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/index";
import { useState, useEffect } from "react";
import { getAllCountries } from "../../api/country";
import {
	setCountries,
	setSelectedCountrySummary,
} from "../../store/actions/covid";
import Loader from "../../components/General/Loader/index";
import { message } from "antd";
import CustomTitle from "../../components/General/CustomTitle/index";
import { getSummaryByCountry } from "../../api/summary";
import SummarySection from "../../components/Main/SummarySection";
import Flag from "react-world-flags";
import {
	OptionType,
	OptionsType,
} from "../../components/Detail/GlobalSelect/interfaces/interfaces";

const Summary: React.FC = () => {
	const covid = useSelector((state: State) => state.covid);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState({
		fetchCountries: false,
		selectCountrySummary: false,
	});
	const [selectedCountry, setSelectedCountry] = useState({
		code: "",
		name: "",
	});

	useEffect(() => {
		const getCountries = async () => {
			setIsLoading({
				...isLoading,
				fetchCountries: true,
			});

			const response = await getAllCountries();
			// console.log(response.data);
			if (response.status === 200) {
				dispatch(setCountries(response.data.countries));
			} else if (response.code === "ERR_NETWORK") {
				message.error(response.message, 5);
			}

			setIsLoading({
				...isLoading,
				fetchCountries: false,
			});
		};

		getCountries(); // eslint-disable-next-line
	}, []);

	const handleChange:
		| ((value: string, option: OptionType | OptionsType) => void)
		| undefined = (value, option) => {
		if (!Array.isArray(option)) {
			// console.log(`selected ${value}`);
			setSelectedCountry({
				...selectedCountry,
				code: value,
				name: option?.label!,
			});
		}
	};

	const handleSearch = (value: string) => {
		// console.log("search:", value);
	};

	useEffect(() => {
		const getSelectedCountrySummary = async () => {
			setIsLoading({
				...isLoading,
				selectCountrySummary: true,
			});

			const response = await getSummaryByCountry(selectedCountry.code);
			// console.log(response.data);
			if (response.status === 200) {
				dispatch(setSelectedCountrySummary(response.data));
			} else if (response.code === "ERR_NETWORK") {
				message.error(response.message, 5);
			}

			setIsLoading({
				...isLoading,
				selectCountrySummary: false,
			});
		};

		if (selectedCountry.code !== undefined) {
			getSelectedCountrySummary();
		} // eslint-disable-next-line
	}, [selectedCountry.code]);

	return (
		<MainLayout>
			<div className="mb-5">
				<CustomTitle
					title="Per Country Summary"
					level={3}
				/>
			</div>
			<div className="mb-7">
				{isLoading.fetchCountries ? (
					<Loader />
				) : (
					<SearchBox
						data={covid.countries}
						handleChange={handleChange}
						handleSearch={handleSearch}
					/>
				)}
			</div>
			{isLoading.selectCountrySummary ? (
				<Loader />
			) : (
				selectedCountry.code && (
					<SummarySection
						confirmed={covid.summaries.selectedCountry.confirmed?.value}
						recovered={covid.summaries.selectedCountry.recovered?.value}
						deaths={covid.summaries.selectedCountry.deaths?.value}
						lastUpdate={covid.summaries.selectedCountry.lastUpdate}
					>
						<Flag
							code={selectedCountry.code}
							style={{ height: "24px" }}
							className="shadow-sm rounded-sm"
						/>
						<CustomTitle
							title={`${selectedCountry.name} Summary`}
							level={3}
						/>
					</SummarySection>
				)
			)}
		</MainLayout>
	);
};

export default Summary;
