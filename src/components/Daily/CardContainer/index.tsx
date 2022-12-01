import { Card } from "antd";
import { CardContainerProps } from "./interfaces/interfaces";
import CurrentTheme from "../../../styles/index";

const CardContainer: React.FC<CardContainerProps> = ({ children }) => {
	const currentTheme = CurrentTheme();

	const style: React.CSSProperties = {
		backgroundColor: currentTheme.other,
	};

	return (
		<Card
			className="shadow-2xl rounded-2xl"
			bordered={false}
			style={style}
		>
			{children}
		</Card>
	);
};

export default CardContainer;
