import MainLayout from "../../layout/MainLayout";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../store/index";
import { getAllCountries } from "../../api/country";
import { getAllSummary, getSummaryByCountry } from "../../api/summary";
import { useEffect } from "react";
import {
	setCountries,
	setGlobalSummary,
	setIndonesiaSummary,
} from "../../store/actions/covid";
import SummarySection from "../../components/Main/SummarySection";
import { useState } from "react";
import Loader from "../../components/General/Loader";
import { GlobeAmericas } from "react-bootstrap-icons";
import CurrentTheme from "../../styles";
import CustomTitle from "../../components/General/CustomTitle/index";
import { message, Select } from "antd";

const Main: React.FC = () => {
	const covid = useSelector((state: State) => state.covid);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState({
		globalSummary: false,
		indonesiaSummary: false,
		fetchCountries: false,
		selectCountrySummary: false,
	});

	const currentTheme = CurrentTheme();

	useEffect(() => {
		const getCountries = async () => {
			setIsLoading({
				...isLoading,
				fetchCountries: true,
			});

			const response = await getAllCountries();
			console.log(response.data);
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

	useEffect(() => {
		const getSummaries = async () => {
			setIsLoading({
				...isLoading,
				globalSummary: true,
			});

			const response = await getAllSummary();
			console.log(response);
			if (response.status === 200) {
				dispatch(setGlobalSummary(response.data));
			} else if (response.code === "ERR_NETWORK") {
				message.error(response.message, 5);
			}

			setIsLoading({
				...isLoading,
				globalSummary: false,
			});
		};

		getSummaries(); // eslint-disable-next-line
	}, []);

	useEffect(() => {
		const getIndonesianSummaries = async () => {
			setIsLoading({
				...isLoading,
				indonesiaSummary: true,
			});

			const response = await getSummaryByCountry("ID");

			if (response.status === 200) {
				dispatch(setIndonesiaSummary(response.data));
			} else if (response.code === "ERR_NETWORK") {
				message.error(response.message, 5);
			}

			setIsLoading({
				...isLoading,
				indonesiaSummary: false,
			});
		};

		getIndonesianSummaries(); // eslint-disable-next-line
	}, []);

	const onChange = (value: string) => {
		console.log(`selected ${value}`);
	};

	const onSearch = (value: string) => {
		console.log("search:", value);
	};

	const style = {
		icon: {
			color: currentTheme.title,
		},
	};

	return (
		<MainLayout>
			<div className="mb-7">
				{isLoading.globalSummary ? (
					<Loader />
				) : (
					<SummarySection
						confirmed={covid.summaries.global.confirmed?.value}
						recovered={covid.summaries.global.recovered?.value}
						deaths={covid.summaries.global.deaths?.value}
						lastUpdate={covid.summaries.global.lastUpdate}
					>
						<GlobeAmericas
							size={32}
							style={style.icon}
						/>
						<CustomTitle
							title="Global Summary"
							level={3}
						/>
					</SummarySection>
				)}
			</div>
			<div className="mb-7">
				{isLoading.indonesiaSummary ? (
					<Loader />
				) : (
					<SummarySection
						confirmed={covid.summaries.indonesia.confirmed?.value}
						recovered={covid.summaries.indonesia.recovered?.value}
						deaths={covid.summaries.indonesia.deaths?.value}
						lastUpdate={covid.summaries.indonesia.lastUpdate}
					>
						<span className="fi fi-id" />
						<CustomTitle
							title="Indonesia Summary"
							level={3}
						/>
					</SummarySection>
				)}
			</div>
			{/* <Select
				showSearch
				placeholder="Select a person"
				optionFilterProp="children"
				onChange={onChange}
				onSearch={onSearch}
				filterOption={(input, option) =>
					(option?.label ?? "").toLowerCase().includes(input.toLowerCase())
				}
				options={covid.countries.map((country) => {
					return {
						label: country.name,
						value: country.iso2
					}
				})}
			/> */}
		</MainLayout>
	);
};

export default Main;
