import { CustomTextProps } from "./interfaces/interfaces";
import { Typography } from "antd";
import CurrentTheme from '../../../styles/index';

const { Text } = Typography;

const CustomText: React.FC<CustomTextProps> = ({ text }) => {
    const currentTheme = CurrentTheme();

    const style = {
        color: currentTheme.text
    }

    return <Text style={style}>{text}</Text>;
};

export default CustomText;