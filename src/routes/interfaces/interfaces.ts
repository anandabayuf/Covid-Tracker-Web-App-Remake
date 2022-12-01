import { RouteNames } from "./enums";
import { BASE_PATH } from "../../constants/constants";

export interface IRoute {
    path: string;
    element: React.ReactNode;
}

export function getPathName(route: RouteNames){
    switch (route){
        case RouteNames.MAIN:
            return `${BASE_PATH}/`
        case RouteNames.SUMMARY:
            return `${BASE_PATH}/summary`
        case RouteNames.DETAIL:
            return `${BASE_PATH}/detail`
        case RouteNames.DAILY:
            return `${BASE_PATH}/daily`
        case RouteNames.ABOUT:
            return `${BASE_PATH}/about`;
        default:
            return BASE_PATH;
    }
}