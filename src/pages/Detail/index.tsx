import MainLayout from "../../layout/MainLayout";
// import CurrentTheme from "../../styles/index";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/index";
import { useState, useEffect } from "react";
import {
	setGlobalDetail,
	setCountries,
	setRegionDetail,
} from "../../store/actions/covid";
import Loader from "../../components/General/Loader/index";
import { message } from "antd";
import CustomTitle from "../../components/General/CustomTitle";
import {
	getAllConfirmed,
	getAllDeaths,
	getAllRecovered,
} from "../../api/summary";
import GlobalTable from "../../components/Detail/GlobalTable";
import GlobalSelect from "../../components/Detail/GlobalSelect";
import CustomText from "../../components/General/CustomText/index";
import SearchBox from "../../components/Summary/SearchBox";
import { isAxiosError } from "axios";
import {
	getAllCountries,
	getCountryConfirmed,
	getCountryDeaths,
	getCountryRecovered,
} from "../../api/country";

const Detail: React.FC = () => {
	const data = useSelector((state: State) => state.covid.details);
	const countries = useSelector((state: State) => state.covid.countries);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState({
		global: false,
		fetchCountries: false,
		region: false,
	});
	const [globalBy, setGlobalBy] = useState("confirmed");
	const [selectedCountry, setSelectedCountry] = useState({
		name: "",
	});
	const [regionBy, setRegionBy] = useState("confirmed");

	// const currentTheme = CurrentTheme();

	useEffect(() => {
		const getData = async () => {
			setIsLoading({
				...isLoading,
				global: true,
			});

			let response;

			if (globalBy === "confirmed") {
				response = await getAllConfirmed();
			} else if (globalBy === "deaths") {
				response = await getAllDeaths();
			} else {
				response = await getAllRecovered();
			}

			if (response.status === 200) {
				dispatch(setGlobalDetail(response.data));
			} else if (isAxiosError(response)) {
				message.error(response.message, 5);
			}

			setIsLoading({
				...isLoading,
				global: false,
			});
		};

		getData(); // eslint-disable-next-line
	}, [globalBy]);

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

	useEffect(() => {
		const getDataCountry = async () => {
			setIsLoading({
				...isLoading,
				region: true,
			});

			let response;

			if (regionBy === "confirmed") {
				response = await getCountryConfirmed(selectedCountry.name);
			} else if (regionBy === "deaths") {
				response = await getCountryDeaths(selectedCountry.name);
			} else {
				response = await getCountryRecovered(selectedCountry.name);
			}
			// console.log(response);
			if (response.status === 200) {
				dispatch(setRegionDetail(response.data));
			} else if (isAxiosError(response)) {
				message.error(response.message, 5);
			}

			setIsLoading({
				...isLoading,
				region: false,
			});
		};

		if (selectedCountry.name !== undefined && selectedCountry.name !== "") {
			getDataCountry();
		} // eslint-disable-next-line
	}, [regionBy, selectedCountry]);

	const handleChangeGlobalBy = (value: string) => {
		setGlobalBy(value);
	};

	const handleChangeRegionBy = (value: string) => {
		setRegionBy(value);
	};

	const handleChangeCountry = (value: string) => {
		setSelectedCountry({
			...selectedCountry,
			name: value,
		});
	};

	const handleSearch = (value: string) => {
		// console.log("search:", value);
	};

	useEffect(() => {
		document.title = "Detail - Covid-19";
	}, []);

	return (
		<MainLayout>
			<div className="flex flex-row justify-between items-center mb-5">
				<CustomTitle
					title="Global Detail"
					level={3}
				/>
				<div className="flex flex-row items-center gap-4">
					<CustomText text="By: " />
					<GlobalSelect
						handleChange={handleChangeGlobalBy}
						isLoading={isLoading.global}
					/>
				</div>
			</div>
			{isLoading.global ? <Loader /> : <GlobalTable data={data.global} />}
			<div className="flex flex-row justify-between items-center mt-5 mb-5">
				<CustomTitle
					title="Region Detail"
					level={3}
				/>
				<div
					className="flex flex-row items-center gap-4"
					style={{ width: "30%" }}
				>
					{isLoading.fetchCountries ? (
						<Loader />
					) : (
						<SearchBox
							data={countries}
							handleChange={handleChangeCountry}
							handleSearch={handleSearch}
							isLoading={isLoading.region}
						/>
					)}
					{selectedCountry.name && (
						<GlobalSelect
							handleChange={handleChangeRegionBy}
							isLoading={isLoading.region}
						/>
					)}
				</div>
			</div>
			{isLoading.region ? (
				<Loader />
			) : (
				selectedCountry.name && <GlobalTable data={data.region} />
			)}
		</MainLayout>
	);
};

export default Detail;
