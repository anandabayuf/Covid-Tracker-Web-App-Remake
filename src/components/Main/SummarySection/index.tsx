import { SummarySectionProps } from "./interfaces/interfaces";
import CustomText from "../../General/CustomText/index";
import SummaryCard from "../SummaryCard/index";

const SummarySection: React.FC<SummarySectionProps> = ({
	children,
	confirmed,
	recovered,
	deaths,
	lastUpdate,
}) => {
	return (
		<>
			<div className="flex flex-row justify-between items-center mb-5">
				<div className="flex flex-row items-center gap-x-4">{children}</div>
				<div>
					<CustomText
						text={`Last Update: ${new Date(lastUpdate!).toLocaleString()}`}
					/>
				</div>
			</div>
			<div className="flex flex-row justify-center gap-x-7 m-0 p-0">
				<SummaryCard
					title="Total Recovered"
					total={recovered!}
				/>
				<SummaryCard
					title="Total Confirmed"
					total={confirmed!}
				/>
				<SummaryCard
					title="Total Deaths"
					total={deaths!}
				/>
			</div>
		</>
	);
};

export default SummarySection;
