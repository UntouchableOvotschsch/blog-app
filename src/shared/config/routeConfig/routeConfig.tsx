import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import AuthWrapper from 'app/providers/RouterProvider/ui/wrappers/AuthWrapper';
import { ArticlesPageAsync } from 'pages/ArticlesPage/ui/ArticlesPage/ArticlesPage.async';
import { ArticleDetailsPage } from 'pages/ArticleDetailsPage';
import { ArticleEditPage } from 'pages/ArticleEditPage';

type AppRoutesProps = RouteProps & {
    authOnly?: boolean
}

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    // last
    NOTFOUND = 'notfound'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',

    [AppRoutes.ABOUT]: '/about',

    [AppRoutes.PROFILE]: '/profile', // + id

    [AppRoutes.ARTICLES]: '/articles',

    [AppRoutes.ARTICLE_DETAILS]: '/articles', // + id

    [AppRoutes.ARTICLE_CREATE]: '/articles/new',

    [AppRoutes.ARTICLE_EDIT]: '/articles/:id/edit', // + id

    [AppRoutes.NOTFOUND]: '*',

};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
    },

    [AppRoutes.PROFILE]: {
        path: `${RoutePath.profile}/:id`,
        element: (
            <AuthWrapper>
                <ProfilePage />
            </AuthWrapper>
        ),
        authOnly: true,
    },

    [AppRoutes.ARTICLES]: {
        path: RoutePath.articles,
        element: (
            // TODO Почему-то с импортом из паблик апи стреляет ошибка в сторибуке
            <AuthWrapper>
                <ArticlesPageAsync />
            </AuthWrapper>
        ),
    },

    [AppRoutes.ARTICLE_DETAILS]: {
        path: `${RoutePath.article_details}/:id`,
        element: (
            <AuthWrapper>
                <ArticleDetailsPage />
            </AuthWrapper>
        ),
    },

    [AppRoutes.ARTICLE_CREATE]: {
        path: `${RoutePath.article_create}`,
        element: (
            <AuthWrapper>
                <ArticleEditPage />
            </AuthWrapper>
        ),
    },

    [AppRoutes.ARTICLE_EDIT]: {
        path: `${RoutePath.article_edit}`,
        element: (
            <AuthWrapper>
                <ArticleEditPage />
            </AuthWrapper>
        ),
    },

    // last
    [AppRoutes.NOTFOUND]: {
        path: RoutePath.notfound,
        element: <NotFoundPage />,
    },
};
