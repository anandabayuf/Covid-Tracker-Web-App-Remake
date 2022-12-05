import { Layout, Button } from "antd";
import { MainLayoutProps } from "./interfaces/interfaces";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../store";
import { switchToDark, switchToLight } from "../../store/actions";
import CurrentTheme from "../../styles";
import { Moon, BrightnessHigh } from "react-bootstrap-icons";
import { ThemeModeNames } from "../../styles/interfaces/enums";
import Footer from "../../components/General/Footer";
import Header from "../../components/General/Header";
import { useEffect } from "react";

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
	const theme = useSelector((state: State) => state.theme);

	const dispatch = useDispatch();

	const currentTheme = CurrentTheme();

	const handleChangeTheme = () => {
		if (theme === ThemeModeNames.LIGHT) {
			dispatch(switchToDark());
		} else {
			dispatch(switchToLight());
		}
	};

	useEffect(() => {
		document.body.style.backgroundColor = currentTheme.bg; // eslint-disable-next-line
	}, [theme]);

	const style = {
		page: {
			backgroundColor: currentTheme.bg,
		},
		floatButton: {
			backgroundColor: currentTheme.title,
		},
	};

	return (
		<Layout className={`min-h-[100vh]`}>
			<Layout.Header
				style={{ ...style.page, paddingInline: "10px" }}
				className="shadow-2xl"
			>
				<Header />
			</Layout.Header>
			<Layout.Content style={style.page}>
				<div className="pb-[30px] pr-[30px] pl-[30px] pt-[10px]">
					{children}
				</div>
			</Layout.Content>
			<Layout.Footer style={style.page}>
				<Footer />
			</Layout.Footer>
			<div className="fixed right-0 bottom-0 m-8">
				<Button
					shape="circle"
					size="large"
					className={`shadow-2xl rounded-2xl border-none`}
					style={style.floatButton}
					icon={
						<div className="flex justify-center">
							{theme === ThemeModeNames.LIGHT ? (
								<Moon
									size={20}
									color={currentTheme.bg}
								/>
							) : (
								<BrightnessHigh
									size={20}
									color={currentTheme.bg}
								/>
							)}
						</div>
					}
					onClick={() => handleChangeTheme()}
				/>
			</div>
		</Layout>
	);
};

export default MainLayout;
