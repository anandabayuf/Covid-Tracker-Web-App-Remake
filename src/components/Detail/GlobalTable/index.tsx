import { Input, Space, Table, Button, InputRef } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import CustomText from "../../General/CustomText";
import { GlobalTableProps, TableDataType } from "./interfaces/interfaces";
import "./styles/style.scss";
import { useSelector } from "react-redux";
import { State } from "../../../store/index";
import { ThemeModeNames } from "../../../styles/interfaces/enums";
import { FilterConfirmProps } from "antd/es/table/interface";
import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import CurrentTheme from "../../../styles/index";

const GlobalTable: React.FC<GlobalTableProps> = ({ data }) => {
	const currentTheme = CurrentTheme();
	const theme = useSelector((state: State) => state.theme);
	const [searchText, setSearchText] = useState("");
	const [searchedColumn, setSearchedColumn] = useState("");
	const searchInput = useRef<InputRef>(null);
	type DataIndex = keyof TableDataType;
	const handleSearch = (
		selectedKeys: string[],
		confirm: (param?: FilterConfirmProps) => void,
		dataIndex: DataIndex
	) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters: () => void) => {
		clearFilters();
		setSearchText("");
	};

	function thousandFormatter(num: number) {
		return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	}

	const getColumnSearchProps = (
		dataIndex: DataIndex
	): ColumnType<TableDataType> => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters,
			close,
		}) => (
			<div
				style={{
					padding: 8,
					borderRadius: "20px",
				}}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(selectedKeys as string[], confirm, dataIndex)
					}
					style={{
						marginBottom: 8,
						display: "block",
						borderRadius: "10px",
					}}
				/>
				<Space>
					<Button
						type="default"
						onClick={() =>
							handleSearch(selectedKeys as string[], confirm, dataIndex)
						}
						icon={<SearchOutlined />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size="small"
						style={{ width: 90 }}
						type="text"
					>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({ closeDropdown: false });
							setSearchText((selectedKeys as string[])[0]);
							setSearchedColumn(dataIndex);
						}}
					>
						Filter
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							close();
						}}
					>
						Close
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
		),
		onFilter: (value, record) =>
			record[dataIndex]!.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{
						backgroundColor: "#ffc069",
						padding: 0,
						color: currentTheme.text,
					}}
					unhighlightStyle={{
						color: currentTheme.text,
					}}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				<CustomText text={text} />
			),
	});

	const columns: ColumnsType<TableDataType> = [
		{
			title: "Region",
			dataIndex: "combinedKey",
			key: "combinedKey",
			...getColumnSearchProps("combinedKey"),
		},
		{
			title: "Confirmed",
			dataIndex: "confirmed",
			key: "confirmed",
			render: (text) => (
				<CustomText text={!text ? "-" : thousandFormatter(text)} />
			),
		},
		{
			title: "Recovered",
			dataIndex: "recovered",
			key: "recovered",
			render: (text) => (
				<CustomText text={!text ? "-" : thousandFormatter(text)} />
			),
		},
		{
			title: "Deaths",
			dataIndex: "deaths",
			key: "deaths",
			render: (text) => (
				<CustomText text={!text ? "-" : thousandFormatter(text)} />
			),
		},
		{
			title: "Active",
			dataIndex: "active",
			key: "active",
			render: (text) => (
				<CustomText text={!text ? "-" : thousandFormatter(text)} />
			),
		},
		{
			title: "People Tested",
			dataIndex: "peopleTested",
			key: "peopleTested",
			render: (text) => (
				<CustomText text={!text ? "-" : thousandFormatter(text)} />
			),
		},
		{
			title: "People Hospitalized",
			dataIndex: "peopleHospitalized",
			key: "peopleHospitalized",
			render: (text) => (
				<CustomText text={!text ? "-" : thousandFormatter(text)} />
			),
		},
		{
			title: "Cases 28 Days",
			dataIndex: "cases28Days",
			key: "cases28Days",
			render: (text) => (
				<CustomText text={!text ? "-" : thousandFormatter(text)} />
			),
		},
		{
			title: "Deaths 28 Days",
			dataIndex: "deaths28Days",
			key: "deaths28Days",
			render: (text) => (
				<CustomText text={!text ? "-" : thousandFormatter(text)} />
			),
		},
		{
			title: "Incident Rate",
			dataIndex: "incidentRate",
			key: "incidentRate",
			render: (text) => (
				<CustomText text={!text ? "-" : thousandFormatter(text.toFixed(2))} />
			),
		},
		{
			title: "Case Fatality Ratio",
			dataIndex: "case-fatalityRatio",
			key: "case-fatalityRatio",
			render: (text) => (
				<CustomText text={!text ? "-" : thousandFormatter(text.toFixed(2))} />
			),
		},
		{
			title: "Last Update",
			dataIndex: "lastUpdate",
			key: "lastUpdate",
			render: (text) => (
				<CustomText text={!text ? "-" : new Date(text).toLocaleString()} />
			),
		},
	];

	const datas: TableDataType[] = data.map((el: TableDataType, index) => {
		if (el.incidentRate) {
			if (typeof el.incidentRate === "string") {
				el.incidentRate = parseFloat(el.incidentRate);
			}
		} else {
			el.incidentRate = parseFloat(el.incidenceRate!);
		}

		return {
			key: index,
			active: el.active,
			cases28Days: el.cases28Days,
			combinedKey: el.combinedKey || `${el.provinceState}, ${el.countryRegion}`,
			confirmed:
				typeof el.confirmed === "string"
					? parseInt(el.confirmed)
					: el.confirmed,
			deaths: typeof el.deaths === "string" ? parseInt(el.deaths) : el.deaths,
			deaths28Days: el.deaths28Days,
			incidentRate: el.incidentRate,
			peopleHospitalized: el.peopleHospitalized,
			peopleTested: el.peopleTested,
			recovered: el.recovered,
			lastUpdate: el.lastUpdate,
			"case-fatalityRatio":
				typeof el["case-fatalityRatio"] === "string"
					? parseFloat(el["case-fatalityRatio"])
					: el["case-fatalityRatio"],
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
