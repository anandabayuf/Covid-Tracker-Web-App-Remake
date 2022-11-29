import { Typography } from "antd";
import CustomText from "../CustomText";
import CurrentTheme from "../../../styles/index";

const Footer: React.FC = () => {
	const currentTheme = CurrentTheme();

	const style: React.CSSProperties = {
		color: currentTheme.text,
		textDecoration: "underline",
	};
	return (
		<>
			<div className="flex justify-center m-0">
				<span>
					<CustomText text="© 2022 Copyright: Remake from " />
					<Typography.Link
						href="https://covid-tracker-web-app-team-2.herokuapp.com/"
						target="_blank"
						style={style}
					>
						Covid-Tracker-Web-App
					</Typography.Link>
				</span>
			</div>
			<div className="flex justify-center m-0">
				<span>
					<CustomText text="Made with ♡ by " />
					<Typography.Link
						href="https://github.com/anandabayuf"
						target="_blank"
						style={style}
					>
						Ananda Bayu Fauzan
					</Typography.Link>
				</span>
			</div>
		</>
	);
};

export default Footer;
