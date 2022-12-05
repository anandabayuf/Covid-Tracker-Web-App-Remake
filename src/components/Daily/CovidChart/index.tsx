import {
	ResponsiveContainer,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Bar,
	ReferenceLine,
	Brush,
} from "recharts";
import { CovidChartProps, DataType } from "./interfaces/interfaces";
import CurrentTheme from "../../../styles/index";

const CovidChart: React.FC<CovidChartProps> = ({ data }) => {
	const currentTheme = CurrentTheme();

	const datas = data?.map((el: DataType) => {
		return {
			date: new Date(el.reportDate).toLocaleDateString(), // eslint-disable-next-line
			Recovered: el.recovered.total,
			Confirmed: el.confirmed.total,
			Active: el.active,
			Deaths: el.deaths.total,
		};
	});

	const thousandFormatter = (num: number) => {
		return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	return (
		<div style={{ width: "100%", height: 300 }}>
			<ResponsiveContainer>
				<BarChart
					data={datas}
					margin={{
						top: 5,
						right: 30,
						left: 20,
						bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="date"
						tick={{ stroke: currentTheme.text }}
						fontWeight={100}
					/>
					<YAxis
						tick={{ stroke: currentTheme.text }}
						fontWeight={100}
						tickFormatter={(value: any, index: number) =>
							thousandFormatter(value)
						}
					/>
					<Tooltip
						formatter={(value, name) => [
							thousandFormatter(parseInt(value.toString())),
							name,
						]}
					/>
					<Legend />
					<ReferenceLine
						y={0}
						stroke="#000"
					/>
					<Brush
						dataKey="date"
						height={30}
						stroke={currentTheme.text}
						fill={currentTheme.other}
						startIndex={datas?.length! - 10}
					/>
					<Bar
						dataKey="Recovered"
						fill={currentTheme.success}
					/>
					<Bar
						dataKey="Confirmed"
						fill={currentTheme.warning}
					/>
					<Bar
						dataKey="Active"
						fill="#fd7e14"
					/>
					<Bar
						dataKey="Deaths"
						fill={currentTheme.danger}
					/>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default CovidChart;
