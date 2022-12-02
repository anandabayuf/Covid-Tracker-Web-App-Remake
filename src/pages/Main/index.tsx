import MainLayout from "../../layout/MainLayout";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../store/index";
import { getAllSummary, getSummaryByCountry } from "../../api/summary";
import { useEffect } from "react";
import {
	setGlobalSummary,
	setIndonesiaSummary,
} from "../../store/actions/covid";
import SummarySection from "../../components/Main/SummarySection";
import { useState } from "react";
import Loader from "../../components/General/Loader";
import { GlobeAmericas } from "react-bootstrap-icons";
import CurrentTheme from "../../styles";
import CustomTitle from "../../components/General/CustomTitle/index";
import { message } from "antd";
import Flag from "react-world-flags";
import { isAxiosError } from "axios";

const Main: React.FC = () => {
	const data = useSelector((state: State) => state.covid.summaries);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState({
		globalSummary: false,
		indonesiaSummary: false,
	});

	const currentTheme = CurrentTheme();

	useEffect(() => {
		const getSummaries = async () => {
			setIsLoading({
				...isLoading,
				globalSummary: true,
			});

			const response = await getAllSummary();
			// console.log(response);
			if (response.status === 200) {
				dispatch(setGlobalSummary(response.data));
			} else if (isAxiosError(response)) {
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
			} else if (isAxiosError(response)) {
				message.error(response.message, 5);
			}

			setIsLoading({
				...isLoading,
				indonesiaSummary: false,
			});
		};

		getIndonesianSummaries(); // eslint-disable-next-line
	}, []);

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
						confirmed={data.global.confirmed?.value}
						recovered={data.global.recovered?.value}
						deaths={data.global.deaths?.value}
						lastUpdate={data.global.lastUpdate}
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
						confirmed={data.indonesia.confirmed?.value}
						recovered={data.indonesia.recovered?.value}
						deaths={data.indonesia.deaths?.value}
						lastUpdate={data.indonesia.lastUpdate}
					>
						<Flag
							code="IDN"
							style={{ height: "24px" }}
							className="shadow-sm rounded-sm"
						/>
						<CustomTitle
							title="Indonesia Summary"
							level={3}
						/>
					</SummarySection>
				)}
			</div>
		</MainLayout>
	);
};

export default Main;
