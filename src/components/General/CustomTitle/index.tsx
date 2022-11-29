import { CustomTitleProps } from "./interfaces/interfaces";
import { Typography } from "antd";
import CurrentTheme from "../../../styles";

const { Title } = Typography;

const CustomTitle: React.FC<CustomTitleProps> = ({ title, level }) => {
	const currentTheme = CurrentTheme();

	const style: React.CSSProperties = {
		color: currentTheme.title,
		margin: 0,
	};

	return (
		<Title
			level={level}
			style={style}
		>
			{title}
		</Title>
	);
};

export default CustomTitle;
