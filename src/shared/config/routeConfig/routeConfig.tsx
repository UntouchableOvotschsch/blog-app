import { RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import AuthWrapper from '@/app/providers/RouterProvider/ui/wrappers/AuthWrapper';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { AdminPage } from '@/pages/AdminPage';
import { UserRoles } from '@/entities/User';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import RoleWrapper from '@/app/providers/RouterProvider/ui/wrappers/RoleWrapper';
import { AppRoutes, RoutePath } from './routePath';

type AppRoutesProps = RouteProps & {
    authOnly?: boolean
    roles?: UserRoles[]
}

const unauthorizedNavigateTo = RoutePath.main;
const forbiddenNavigateTo = RoutePath.forbidden;

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
            <AuthWrapper navigateTo={unauthorizedNavigateTo}>
                <ProfilePage />
            </AuthWrapper>
        ),
        authOnly: true,
    },

    [AppRoutes.ARTICLES]: {
        path: RoutePath.articles,
        element: (
            <AuthWrapper navigateTo={unauthorizedNavigateTo}>
                <ArticlesPage />
            </AuthWrapper>
        ),
    },

    [AppRoutes.ARTICLE_DETAILS]: {
        path: `${RoutePath.article_details}/:id`,
        element: (
            <AuthWrapper navigateTo={unauthorizedNavigateTo}>
                <ArticleDetailsPage />
            </AuthWrapper>
        ),
    },

    [AppRoutes.ARTICLE_CREATE]: {
        path: `${RoutePath.article_create}`,
        element: (
            <AuthWrapper navigateTo={unauthorizedNavigateTo}>
                <ArticleEditPage />
            </AuthWrapper>
        ),
    },

    [AppRoutes.ARTICLE_EDIT]: {
        path: `${RoutePath.article_edit}`,
        element: (
            <AuthWrapper navigateTo={unauthorizedNavigateTo}>
                <ArticleEditPage />
            </AuthWrapper>
        ),
    },

    [AppRoutes.ADMIN]: {
        path: RoutePath.admin,
        element: (
            <AuthWrapper navigateTo={unauthorizedNavigateTo}>
                <RoleWrapper roles={[UserRoles.ADMIN]} navigateTo={forbiddenNavigateTo}>
                    <AdminPage />
                </RoleWrapper>
            </AuthWrapper>
        ),
        roles: [UserRoles.ADMIN],
    },
    [AppRoutes.FORBIDDEN]: {
        path: RoutePath.forbidden,
        element: (
            <AuthWrapper navigateTo={unauthorizedNavigateTo}>
                <ForbiddenPage />
            </AuthWrapper>
        ),
    },

    // last
    [AppRoutes.NOTFOUND]: {
        path: RoutePath.notfound,
        element: <NotFoundPage />,
    },
};
