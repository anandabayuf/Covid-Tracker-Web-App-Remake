import CountryChart from "../../components/Daily/CountryChart";
import CustomTitle from "../../components/General/CustomTitle";
import MainLayout from "../../layout/MainLayout";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../store/index";
import { useEffect, useState } from "react";
import { getAllDailyData } from "../../api/summary";
import { setAllDaily } from "../../store/actions/covid";
import { message, Select } from "antd";
import Loader from "../../components/General/Loader";
import CardContainer from "../../components/Daily/CardContainer";
import CovidChart from "../../components/Daily/CovidChart/index";
import { isAxiosError } from "axios";

const Daily: React.FC = () => {
	const data = useSelector((state: State) => state.covid.daily.allDaily);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		const getDailyData = async () => {
			setIsLoading(true);

			const response = await getAllDailyData();
			// console.log(response.data);
			if (response.status === 200) {
				dispatch(setAllDaily(response.data));
			} else if (isAxiosError(response)) {
				message.error(response.message, 5);
			}

			setIsLoading(false);
		};

		getDailyData(); // eslint-disable-next-line
	}, []);

	return (
		<MainLayout>
			<div className="mb-5">
				<CustomTitle
					title="Daily"
					level={3}
				/>
			</div>
			{isLoading ? (
				<Loader />
			) : (
				<div className="grid grid-cols-2 gap-4">
					<CardContainer>
						<div className="text-center">
							<CustomTitle
								level={5}
								title="Comparison of The Total Number of Confirmed COVID-19 in Mainland China and Other Locations"
							/>
						</div>
						<CountryChart data={data} />
					</CardContainer>
					<CardContainer>
						<div className="flex flex-row gap-10">
							<div className="text-center">
								<CustomTitle
									level={5}
									title="Comparison of The Total Number of Recovered, Confirmed, Active, and Deaths by COVID-19 in The World"
								/>
							</div>
							<Select
								showSearch
								placeholder="Select Country"
								optionFilterProp="children"
								size="large"
								allowClear
							/>
						</div>
						<CovidChart data={data} />
					</CardContainer>
				</div>
			)}
		</MainLayout>
	);
};

export default Daily;
