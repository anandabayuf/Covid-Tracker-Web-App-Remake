import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import CustomText from "../../General/CustomText";
import { GlobalTableProps, TableDataType } from "./interfaces/interfaces";
import "./styles/style.scss";
import { useSelector } from "react-redux";
import { State } from "../../../store/index";
import { ThemeModeNames } from "../../../styles/interfaces/enums";

const GlobalTable: React.FC<GlobalTableProps> = ({ data }) => {
	const theme = useSelector((state: State) => state.theme);

	function thousandFormatter(num: number) {
		return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	}

	const columns: ColumnsType<TableDataType> = [
		{
			title: "Region",
			dataIndex: "combinedKey",
			key: "combinedKey",
			render: (text) => <CustomText text={text} />,
		},
		{
			title: "Confirmed",
			dataIndex: "confirmed",
			key: "confirmed",
			render: (text) => (
				<CustomText text={text === null ? "-" : thousandFormatter(text)} />
			),
		},
		{
			title: "Recovered",
			dataIndex: "recovered",
			key: "recovered",
			render: (text) => (
				<CustomText text={text === null ? "-" : thousandFormatter(text)} />
			),
		},
		{
			title: "Deaths",
			dataIndex: "deaths",
			key: "deaths",
			render: (text) => (
				<CustomText text={text === null ? "-" : thousandFormatter(text)} />
			),
		},
		{
			title: "Active",
			dataIndex: "active",
			key: "active",
			render: (text) => (
				<CustomText text={text === null ? "-" : thousandFormatter(text)} />
			),
		},
		{
			title: "People Tested",
			dataIndex: "peopleTested",
			key: "peopleTested",
			render: (text) => (
				<CustomText text={text === null ? "-" : thousandFormatter(text)} />
			),
		},
		{
			title: "People Hospitalized",
			dataIndex: "peopleHospitalized",
			key: "peopleHospitalized",
			render: (text) => (
				<CustomText text={text === null ? "-" : thousandFormatter(text)} />
			),
		},
		{
			title: "Cases 28 Days",
			dataIndex: "cases28Days",
			key: "cases28Days",
			render: (text) => (
				<CustomText text={text === null ? "-" : thousandFormatter(text)} />
			),
		},
		{
			title: "Deaths 28 Days",
			dataIndex: "deaths28Days",
			key: "deaths28Days",
			render: (text) => (
				<CustomText text={text === null ? "-" : thousandFormatter(text)} />
			),
		},
		{
			title: "Incident Rate",
			dataIndex: "incidentRate",
			key: "incidentRate",
			render: (text) => (
				<CustomText
					text={text === null ? "-" : thousandFormatter(text.toFixed(2))}
				/>
			),
		},
		{
			title: "Last Update",
			dataIndex: "lastUpdate",
			key: "lastUpdate",
			render: (text) => (
				<CustomText
					text={text === null ? "-" : new Date(text).toLocaleString()}
				/>
			),
		},
	];

	const datas: TableDataType[] = data.map((el: TableDataType, index) => {
		return {
			key: index,
			active: el.active,
			cases28Days: el.cases28Days,
			combinedKey: el.combinedKey,
			confirmed: el.confirmed,
			deaths: el.deaths,
			deaths28Days: el.deaths28Days,
			incidentRate: el.incidentRate,
			peopleHospitalized: el.peopleHospitalized,
			peopleTested: el.peopleTested,
			recovered: el.recovered,
			lastUpdate: el.lastUpdate,
		};
	});

	return (
		<Table
			bordered={false}
			columns={columns}
			dataSource={datas}
			pagination={{
				pageSizeOptions: ["5", "10", "15", "20", "25", "50", "100"],
				defaultPageSize: 5,
				showTotal: (total, range) =>
					`${range[0]}-${range[1]} of ${total} items`,
				showQuickJumper: true,
				className: theme === ThemeModeNames.DARK ? "dark" : "light",
			}}
			className={theme === ThemeModeNames.DARK ? "dark" : "light"}
		/>
	);
};

export default GlobalTable;
