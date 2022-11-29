import { Navigate } from 'react-router-dom';
import { BASE_PATH } from '../constants/constants';
import { RouteNames } from './interfaces/enums';
import { IRoute, getPathName } from './interfaces/interfaces';
import Main from '../pages/Main';
import About from '../pages/About';

export const PUBLIC_ROUTES: IRoute[] = [
    {
        path: getPathName(RouteNames.MAIN),
        // element: <UserListPage />,
        element: <Main />
    },
    {
        path: getPathName(RouteNames.ABOUT),
        // element: <CreateUserPage />
        element: <About />
    },
    {
        path: "*",
        element: <Navigate to={`${BASE_PATH}/`} />
    }
]