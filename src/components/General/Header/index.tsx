import { Row, Typography, Menu } from 'antd';
import CurrentTheme from "../../../styles";
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentTheme = CurrentTheme()
    const headerItem = [
        {
            key: 1,
            label: `Home`,
            link: "/"
        },
        {
            key: 2,
            label: `About`,
            link: "/about"
        },
    ]

    const handleClickItem = (key: string) => {
        let link = "";

        switch (key) {
            case "1":
                link = "/";
                break;
            case "2":
                link = "/about";
                break;
            default:
                link = ""
                break;
        }

        navigate(link)
    }

    const style = {
        menu: {
            backgroundColor: currentTheme.bg,
            color: currentTheme.text
        },
        title: {
            paddingTop: "15px",
            color: currentTheme.title
        }
    }

    return (
        <Row>
            <div className="logo mr-5">
                <a onClick={() => navigate("/")}>
                    <Typography.Title level={4} className="p-3" style={style.title}>
                        Covid Tracker Web App
                    </Typography.Title>
                </a>
            </div>
            <Menu
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={style.menu}
                onSelect={(_) => handleClickItem(_.key)}
                selectedKeys={location.pathname === "/" ? ["1"] : ["2"]}
                items={
                    headerItem.map((item) => {
                        return {
                            key: item.key,
                            label: item.label
                        }
                    })
                }
            />
        </Row>
    )
}

export default Header;