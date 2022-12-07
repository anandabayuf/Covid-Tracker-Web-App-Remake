import React, { memo } from "react";
import CurrentTheme from "../../../styles/index";
import { GlobalMapProps } from "./interfaces/interfaces";
import ReactTooltip from "react-tooltip";
import {
	ComposableMap,
	Geographies,
	Geography,
	ZoomableGroup,
} from "react-simple-maps";

const geoUrl =
	"https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const GlobalMaps: React.FC<GlobalMapProps> = ({
	tooltipContent,
	setTooltipContent,
	regionData,
}) => {
	const currentTheme = CurrentTheme();

	function thousandFormatter(num: number) {
		return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
	}

	return (
		<div>
			<div className="flex justify-center">
				<div
					data-tip=""
					className={`w-[70%]`}
				>
					<ComposableMap
						className={`rounded-2xl shadow-sm border-2 border-[${currentTheme.text}]`}
					>
						<ZoomableGroup
							center={[0, 0]}
							zoom={1}
						>
							<Geographies geography={geoUrl}>
								{({ geographies }) =>
									geographies.map((geo) => (
										<Geography
											key={geo.rsmKey}
											geography={geo}
											onMouseEnter={() => setTooltipContent(geo.properties)}
											onMouseLeave={() => setTooltipContent({})}
											onClick={() => {
												console.log(`${JSON.stringify(geo.properties)}`);
											}}
											style={{
												default: {
													fill: currentTheme.title,
													stroke: currentTheme.bg,
													strokeWidth: "0.5px",
													outline: "none",
												},
												hover: {
													fill: currentTheme.text,
													outline: "none",
												},
												pressed: {
													fill: currentTheme.text,
													outline: "none",
												},
											}}
										/>
									))
								}
							</Geographies>
							{/* <Marker coordinates={[113.9213, -0.7893]}>
							<circle
								r={3}
								fill={currentTheme.success}
							/>
						</Marker> */}
						</ZoomableGroup>
					</ComposableMap>
				</div>
			</div>
			{tooltipContent.name && (
				<ReactTooltip>
					<div className="flex flex-col">
						<div>{tooltipContent.name}</div>
						<div>{`Recovered: ${thousandFormatter(
							regionData?.recovered || 0
						)}`}</div>
						<div>{`Confirmed: ${thousandFormatter(
							regionData?.confirmed || 0
						)}`}</div>
						<div>{`Deaths: ${thousandFormatter(regionData?.deaths || 0)}`}</div>
					</div>
				</ReactTooltip>
			)}
		</div>
	);
};

export default memo(GlobalMaps);
