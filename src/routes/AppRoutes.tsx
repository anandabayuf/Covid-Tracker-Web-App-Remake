import { Route, Routes } from "react-router-dom"
import { IRoute } from './interfaces/interfaces';
import { PUBLIC_ROUTES } from './RouteList';

const AppRoutes: React.FC = () => {
    return (
        <>
            <Routes>
                {PUBLIC_ROUTES.map((route: IRoute, index: number) => (
                    <Route key={index} {...route} />
                ))}
            </Routes>
        </>
    );
};

export default AppRoutes;