import MainLayout from "../../layout/MainLayout";
// import CurrentTheme from "../../styles/index";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/index";
import { useState, useEffect } from "react";
import { setGlobalDetail } from "../../store/actions/covid";
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

const Detail: React.FC = () => {
	const data = useSelector((state: State) => state.covid.details);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState({
		global: false,
	});
	const [globalBy, setGlobalBy] = useState("confirmed");

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
			} else if (response.code === "ERR_NETWORK") {
				message.error(response.message, 5);
			}

			setIsLoading({
				...isLoading,
				global: false,
			});
		};

		getData(); // eslint-disable-next-line
	}, [globalBy]);

	const handleChange = (value: string) => {
		setGlobalBy(value);
	};

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
						handleChange={handleChange}
						isLoading={isLoading.global}
					/>
				</div>
			</div>
			{isLoading.global ? <Loader /> : <GlobalTable data={data.global} />}
		</MainLayout>
	);
};

export default Detail;
