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
		{
			key: 5,
			label: `About`,
			link: "/about",
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
			case "5":
				link = "/about";
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
			width: "30%",
		},
		title: {
			paddingTop: "15px",
			color: currentTheme.title,
		},
	};

	return (
		<Row>
			<div className="logo mr-5">
				<a href="/">
					<Typography.Title
						level={4}
						className="p-3"
						style={style.title}
					>
						Covid Tracker Web App
					</Typography.Title>
				</a>
			</div>
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
						: location.pathname === "/daily"
						? ["4"]
						: ["5"]
				}
				items={headerItem.map((item) => {
					return {
						key: item.key,
						label: item.label,
						className: theme === ThemeModeNames.LIGHT ? "light" : "dark",
					};
				})}
			/>
		</Row>
	);
};

export default Header;
