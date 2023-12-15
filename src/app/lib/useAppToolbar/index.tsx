import { ReactElement } from 'react';

import { AppRoutes } from '@/shared/const/router';
import { useAppRoute } from '@/shared/lib/hooks/useAppRoute';

import ScrollToolbar from '../../../widgets/ScrollToolbar/ui/ScrollToolbar';

export const useAppToolbar = () => {
    const currentRoute = useAppRoute();

    const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
        [AppRoutes.ARTICLES]: <ScrollToolbar />,
        [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
    };

    return toolbarByAppRoute[currentRoute];
};
