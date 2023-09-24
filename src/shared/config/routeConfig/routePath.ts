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

    [AppRoutes.ADMIN]: '/admin',

    [AppRoutes.FORBIDDEN]: '/forbidden',

    [AppRoutes.NOTFOUND]: '*',

};
