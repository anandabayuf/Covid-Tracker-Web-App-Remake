import { Card } from "antd";
import CurrentTheme from "../../../styles";
import ConfirmedLight from "../../../assets/image/icons/light/confirmed.png";
import ConfirmedDark from "../../../assets/image/icons/dark/confirmed.png";
import RecoveredLight from "../../../assets/image/icons/light/recovered.png";
import RecoveredDark from "../../../assets/image/icons/dark/recovered.png";
import DeathsLight from "../../../assets/image/icons/light/deaths.png";
import DeathsDark from "../../../assets/image/icons/dark/deaths.png";
import CustomTitle from "../../General/CustomTitle/index";
import { SummaryCardProps } from "./interfaces/interfaces";
import { ThemeModeNames } from "../../../styles/interfaces/enums";
import { useSelector } from "react-redux";
import { State } from "../../../store/index";

const SummaryCard: React.FC<SummaryCardProps> = ({ title, total }) => {
	const currentTheme = CurrentTheme();
	const theme = useSelector((state: State) => state.theme);

	const image = () => {
		switch (title) {
			case "Total Recovered":
				if (theme === ThemeModeNames.LIGHT) {
					return RecoveredLight;
				} else {
					return RecoveredDark;
				}
			case "Total Deaths":
				if (theme === ThemeModeNames.LIGHT) {
					return DeathsLight;
				} else {
					return DeathsDark;
				}
			case "Total Confirmed":
				if (theme === ThemeModeNames.LIGHT) {
					return ConfirmedLight;
				} else {
					return ConfirmedDark;
				}
			default:
				return;
		}
	};

	const thousandFormatter = (num: number) => {
		return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	const style: React.CSSProperties = {
		backgroundColor:
			title === "Total Recovered"
				? currentTheme.success
				: title === "Total Confirmed"
				? currentTheme.warning
				: currentTheme.danger,
		width: "400px",
	};

	return (
		<Card
			className="shadow-2xl rounded-2xl"
			style={style}
			bordered={false}
		>
			<div className="flex flex-row items-center gap-x-5">
				<img
					src={image()}
					alt="recovered-icon"
					width={96}
				/>
				<div
					className="flex flex-col gap-y-2"
					style={{ width: "100%" }}
				>
					<CustomTitle
						title={title}
						level={4}
					/>
					<div className="flex justify-end ">
						<CustomTitle
							title={thousandFormatter(total)}
							level={2}
						/>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default SummaryCard;
