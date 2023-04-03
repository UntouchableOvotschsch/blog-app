import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ReactNode } from 'react';
import HomeIcon from 'shared/assets/icons/home.svg';
import ListIcon from 'shared/assets/icons/list.svg';

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    NOTFOUND = 'notfound'
}
interface RoutePathConfig {
    link: string
    icon?: ReactNode
}

export const RoutePath: Record<AppRoutes, RoutePathConfig> = {
    [AppRoutes.MAIN]: {
        link: '/',
        icon: <HomeIcon />,
    },
    [AppRoutes.ABOUT]: {
        link: '/about',
        icon: <ListIcon />,
    },
    [AppRoutes.NOTFOUND]: {
        link: '*',
    },
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main.link,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about.link,
        element: <AboutPage />,
    },

    // last
    [AppRoutes.NOTFOUND]: {
        path: RoutePath.notfound.link,
        element: <NotFoundPage />,
    },
};
