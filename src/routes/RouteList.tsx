import { Navigate } from "react-router-dom";
import { BASE_PATH } from "../constants/constants";
import { RouteNames } from "./interfaces/enums";
import { IRoute, getPathName } from "./interfaces/interfaces";
import Main from "../pages/Main";
import About from "../pages/About";
import Detail from "../pages/Detail";
import Summary from "../pages/Summary";
import Daily from "../pages/Daily";

export const PUBLIC_ROUTES: IRoute[] = [
	{
		path: getPathName(RouteNames.MAIN),
		element: <Main />,
	},
	{
		path: getPathName(RouteNames.SUMMARY),
		element: <Summary />,
	},
	{
		path: getPathName(RouteNames.DETAIL),
		element: <Detail />,
	},
	{
		path: getPathName(RouteNames.DAILY),
		element: <Daily />,
	},
	{
		path: getPathName(RouteNames.ABOUT),
		element: <About />,
	},
	{
		path: "*",
		element: <Navigate to={`${BASE_PATH}/`} />,
	},
];
