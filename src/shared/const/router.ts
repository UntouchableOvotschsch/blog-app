export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN = 'admin',
    FORBIDDEN = 'forbidden',
    LOGIN = 'login',
    SETTINGS = 'settings',
    // last
    NOTFOUND = 'notfound',
}

export const getRouteMainPage = () => '/';
export const getRouteAboutPage = () => '/about';
export const getRouteProfilePage = (id: string) => `/profile/${id}`;
export const getRouteArticlesPage = () => '/articles';
export const getRouteArticleDetailsPage = (id: string) => `/articles/${id}`;
export const getRouteArticleCreatePage = () => '/articles/new';
export const getRouteArticleEditPage = (id: string) => `/articles/${id}/edit`;
export const getRouteAdminPage = () => '/admin';
export const getRouteForbiddenPage = () => '/forbidden';
export const getRouteNotFoundPage = () => '*';
export const getRouteLogin = () => '/login';
export const getRouteSettings = () => '/settings';

export const matchRouteToPattern: Record<string, AppRoutes> = {
    [getRouteMainPage()]: AppRoutes.MAIN,
    [getRouteAboutPage()]: AppRoutes.ABOUT,
    [getRouteProfilePage(':id')]: AppRoutes.PROFILE,
    [getRouteArticlesPage()]: AppRoutes.ARTICLES,
    [getRouteArticleDetailsPage(':id')]: AppRoutes.ARTICLE_DETAILS,
    [getRouteArticleCreatePage()]: AppRoutes.ARTICLE_CREATE,
    [getRouteArticleEditPage(':id')]: AppRoutes.ARTICLE_EDIT,
    [getRouteAdminPage()]: AppRoutes.ADMIN,
    [getRouteLogin()]: AppRoutes.LOGIN,
    [getRouteSettings()]: AppRoutes.SETTINGS,
    [getRouteForbiddenPage()]: AppRoutes.FORBIDDEN,
    // last
    [getRouteNotFoundPage()]: AppRoutes.NOTFOUND,
};
