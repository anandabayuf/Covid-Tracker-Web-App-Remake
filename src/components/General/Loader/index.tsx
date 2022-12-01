import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import CurrentTheme from "../../../styles/index";

const Loader: React.FC = () => {
	const currentTheme = CurrentTheme();

	return (
		<div className="flex justify-center">
			<Spin
				size={"large"}
				indicator={
					<LoadingOutlined
						style={{ color: currentTheme.title }}
						spin
					/>
				}
			/>
		</div>
	);
};

export default Loader;
