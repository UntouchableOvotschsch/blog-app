import { RouteProps } from 'react-router-dom';

import { UserRoles } from '@/entities/User';
import { AboutPage } from '@/pages/AboutPage';
import { AdminPage } from '@/pages/AdminPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import {
    AppRoutes,
    getRouteAboutPage,
    getRouteAdminPage,
    getRouteArticleCreatePage,
    getRouteArticleDetailsPage,
    getRouteArticleEditPage,
    getRouteArticlesPage,
    getRouteForbiddenPage,
    getRouteLogin,
    getRouteMainPage,
    getRouteNotFoundPage,
    getRouteProfilePage, getRouteSettings,
} from '@/shared/const/router';
import { SettingsPage } from '@/pages/SettingsPage';

import AuthWrapper from '../ui/wrappers/AuthWrapper';
import RoleWrapper from '../ui/wrappers/RoleWrapper';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRoles[];
};
export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMainPage(),
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: getRouteAboutPage(),
        element: <AboutPage />,
    },

    [AppRoutes.PROFILE]: {
        path: getRouteProfilePage(':id'),
        element: (
            <AuthWrapper>
                <ProfilePage />
            </AuthWrapper>
        ),
        authOnly: true,
    },

    [AppRoutes.ARTICLES]: {
        path: getRouteArticlesPage(),
        element: (
            <AuthWrapper>
                <ArticlesPage />
            </AuthWrapper>
        ),
    },

    [AppRoutes.ARTICLE_DETAILS]: {
        path: getRouteArticleDetailsPage(':id'),
        element: (
            <AuthWrapper>
                <ArticleDetailsPage />
            </AuthWrapper>
        ),
    },

    [AppRoutes.ARTICLE_CREATE]: {
        path: getRouteArticleCreatePage(),
        element: (
            <AuthWrapper>
                <ArticleEditPage />
            </AuthWrapper>
        ),
    },

    [AppRoutes.ARTICLE_EDIT]: {
        path: getRouteArticleEditPage(':id'),
        element: (
            <AuthWrapper>
                <ArticleEditPage />
            </AuthWrapper>
        ),
    },

    [AppRoutes.ADMIN]: {
        path: getRouteAdminPage(),
        element: (
            <AuthWrapper>
                <RoleWrapper roles={[UserRoles.ADMIN]}>
                    <AdminPage />
                </RoleWrapper>
            </AuthWrapper>
        ),
        roles: [UserRoles.ADMIN],
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbiddenPage(),
        element: (
            <AuthWrapper>
                <ForbiddenPage />
            </AuthWrapper>
        ),
    },
    [AppRoutes.LOGIN]: {
        path: getRouteLogin(),
        element: <MainPage />,
    },
    [AppRoutes.SETTINGS]: {
        path: getRouteSettings(),
        element: (
            <AuthWrapper>
                <SettingsPage />
            </AuthWrapper>
        )
    },
    // last
    [AppRoutes.NOTFOUND]: {
        path: getRouteNotFoundPage(),
        element: <NotFoundPage />,
    },
};
