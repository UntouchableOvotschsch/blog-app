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
