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
import { isAxiosError } from "axios";
import { ICountry } from "../../components/Detail/SearchBox/interfaces/interfaces";

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
			} else if (isAxiosError(response)) {
				message.error(response.message, 5);
			}

			setIsLoading({
				...isLoading,
				fetchCountries: false,
			});
		};

		getCountries(); // eslint-disable-next-line
	}, []);

	const handleChange = (value: string) => {
		setSelectedCountry({
			...selectedCountry,
			name: value,
		});
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

			const response = await getSummaryByCountry(selectedCountry.name);
			// console.log(response.data);
			if (response.status === 200) {
				dispatch(setSelectedCountrySummary(response.data));
			} else if (isAxiosError(response)) {
				message.error(response.message, 5);
			}

			setIsLoading({
				...isLoading,
				selectCountrySummary: false,
			});
		};

		if (selectedCountry.name !== undefined) {
			getSelectedCountrySummary();
		} // eslint-disable-next-line
	}, [selectedCountry.name]);

	useEffect(() => {
		const getCountryCode = () => {
			const countryCode = covid.countries.find(
				(el: ICountry) => el.name === selectedCountry.name
			);
			// console.log(countryCode);
			if (countryCode !== undefined) {
				return countryCode.iso3;
			} else return "";
		};

		if (selectedCountry.name !== undefined) {
			setSelectedCountry({
				...selectedCountry,
				code: getCountryCode(),
			});
		} // eslint-disable-next-line
	}, [selectedCountry.name]);

	return (
		<MainLayout>
			<div className="mb-5">
				<CustomTitle
					title="Region Summary"
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
						isLoading={isLoading.selectCountrySummary}
					/>
				)}
			</div>
			{isLoading.selectCountrySummary ? (
				<Loader />
			) : (
				selectedCountry.name && (
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
