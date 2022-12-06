import { Row, Typography, Menu } from "antd";
import CurrentTheme from "../../../styles";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles/style.scss";
import { useSelector } from "react-redux";
import { State } from "../../../store/index";
import { ThemeModeNames } from "../../../styles/interfaces/enums";

const Header: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const currentTheme = CurrentTheme();
	const theme = useSelector((state: State) => state.theme);

	const headerItem = [
		{
			key: 1,
			label: `Home`,
			link: "/",
		},
		{
			key: 2,
			label: `Summary`,
			link: "/summary",
		},
		{
			key: 3,
			label: `Detail`,
			link: "/detail",
		},
		{
			key: 4,
			label: `Daily`,
			link: "/daily",
		},
	];

	const handleClickItem = (key: string) => {
		let link = "";

		switch (key) {
			case "1":
				link = "/";
				break;
			case "2":
				link = "/summary";
				break;
			case "3":
				link = "/detail";
				break;
			case "4":
				link = "/daily";
				break;
			default:
				link = "";
				break;
		}

		navigate(link);
	};

	const style = {
		menu: {
			backgroundColor: currentTheme.bg,
			color: currentTheme.text,
			width: "100%",
		},
		title: {
			margin: "0px",
			color: currentTheme.title,
		},
	};

	return (
		<div className="flex flex-row max-md:justify-between">
			<div className="logo mr-5">
				<a href="/">
					<Typography.Title
						level={4}
						style={style.title}
						className="pt-[15px] max-md:pt-[10px]"
					>
						Covid Tracker
					</Typography.Title>
				</a>
			</div>
			<div className="flex-1">
				<Menu
					mode="horizontal"
					defaultSelectedKeys={["1"]}
					style={style.menu}
					onSelect={(_) => handleClickItem(_.key)}
					selectedKeys={
						location.pathname === "/"
							? ["1"]
							: location.pathname === "/summary"
							? ["2"]
							: location.pathname === "/detail"
							? ["3"]
							: ["4"]
					}
					items={headerItem.map((item) => {
						return {
							key: item.key,
							label: item.label,
							className: theme === ThemeModeNames.LIGHT ? "light" : "dark",
						};
					})}
					className={theme === ThemeModeNames.LIGHT ? "light" : "dark"}
					rootClassName={theme === ThemeModeNames.LIGHT ? "light" : "dark"}
				/>
			</div>
		</div>
	);
};

export default Header;
