import { lazy } from 'react';

const ArticleEditPageAsync = lazy(() => import('./ArticleEditPage'));

export { ArticleEditPageAsync as ArticleEditPage };
