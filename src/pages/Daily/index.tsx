import CountryChart from "../../components/Daily/CountryChart";
import CustomTitle from "../../components/General/CustomTitle";
import MainLayout from "../../layout/MainLayout";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../store/index";
import { useEffect, useState } from "react";
import { getAllDailyData, getDailyDataByDate } from "../../api/summary";
import { setAllDaily, setDailyByDate } from "../../store/actions/covid";
import { message, Select } from "antd";
import Loader from "../../components/General/Loader";
import CardContainer from "../../components/Daily/CardContainer";
import CovidChart from "../../components/Daily/CovidChart/index";
import { isAxiosError } from "axios";
import type { DatePickerProps } from "antd";
import CustomDatePicker from "../../components/Daily/CustomDatePicker";
import GlobalTable from "../../components/Detail/GlobalTable";

const Daily: React.FC = () => {
	const data = useSelector((state: State) => state.covid.daily);
	const [isLoading, setIsLoading] = useState({
		daily: false,
		detail: false,
	});
	const dispatch = useDispatch();
	const [selectedDate, setSelectedDate] = useState("");

	useEffect(() => {
		const getDailyData = async () => {
			setIsLoading({
				...isLoading,
				daily: true,
			});

			const response = await getAllDailyData();
			// console.log(response.data);
			if (response.status === 200) {
				dispatch(setAllDaily(response.data));
			} else if (isAxiosError(response)) {
				message.error(response.message, 5);
			}

			setIsLoading({
				...isLoading,
				daily: false,
			});
		};

		getDailyData(); // eslint-disable-next-line
	}, []);

	const onChange: DatePickerProps["onChange"] = (date, dateString) => {
		// console.log(dateString);
		setSelectedDate(dateString);
	};

	useEffect(() => {
		const getDailyByDate = async () => {
			setIsLoading({
				...isLoading,
				detail: true,
			});
			const response = await getDailyDataByDate(selectedDate);
			// console.log(response);
			if (response.status === 200) {
				dispatch(setDailyByDate(response.data));
			} else if (isAxiosError(response)) {
				message.error(response.message, 5);
			}

			setIsLoading({
				...isLoading,
				detail: false,
			});
		};

		if (
			selectedDate !== "" &&
			selectedDate !== null &&
			selectedDate !== undefined
		) {
			getDailyByDate();
		} // eslint-disable-next-line
	}, [selectedDate]);

	useEffect(() => {
		document.title = "Daily - Covid-19";
	}, []);

	return (
		<MainLayout>
			<div className="mb-5">
				<CustomTitle
					title="Daily"
					level={3}
				/>
			</div>
			{isLoading.daily ? (
				<Loader />
			) : (
				<div className="grid grid-cols-2 max-lg:grid-cols-1 gap-4">
					<CardContainer>
						<div className="text-center">
							<CustomTitle
								level={5}
								title="Comparison of The Total Number of Confirmed COVID-19 in Mainland China and Other Locations"
							/>
						</div>
						<CountryChart data={data.allDaily} />
					</CardContainer>
					<CardContainer>
						<div className="flex flex-row gap-10">
							<div className="text-center">
								<CustomTitle
									level={5}
									title="Comparison of The Total Number of Recovered, Confirmed, Active, and Deaths by COVID-19 in The World"
								/>
							</div>
							{/* <Select
								showSearch
								placeholder="Select Country"
								optionFilterProp="children"
								size="large"
								allowClear
							/> */}
						</div>
						<CovidChart data={data.allDaily} />
					</CardContainer>
				</div>
			)}
			<div className="flex flex-row justify-between items-center mt-5 mb-5">
				<CustomTitle
					title="Daily Detail"
					level={3}
				/>
				<CustomDatePicker handleChange={onChange} />
			</div>
			{isLoading.detail ? (
				<Loader />
			) : (
				selectedDate && <GlobalTable data={data.dailyByDate} />
			)}
		</MainLayout>
	);
};

export default Daily;
