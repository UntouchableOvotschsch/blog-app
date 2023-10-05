import { screen } from '@testing-library/react';

import { renderForTests } from '@/shared/config/jest/renderForTests';
import {
    getRouteAboutPage, getRouteAdminPage, getRouteForbiddenPage, getRouteProfilePage,
} from '@/shared/const/router';
import { UserRoles } from '@/entities/User';

import AppRouter from './AppRouter';

describe('app/AppRouter', () => {
    test('Page should be rendered', async () => {
        renderForTests(<AppRouter />, { route: getRouteAboutPage() });

        const page = await screen.findByTestId('AboutPage');

        expect(page).toBeInTheDocument();
    });

    test('Page not found', async () => {
        renderForTests(<AppRouter />, { route: '/kajbcjkadbckjasdbvjksb' });

        const page = await screen.findByTestId('NotFoundPage');

        expect(page).toBeInTheDocument();
    });

    test('Unauthorized redirect to MainPage', async () => {
        renderForTests(<AppRouter />, { route: '/articles' });

        const page = await screen.findByTestId('MainPage');

        expect(page).toBeInTheDocument();
    });

    test('Authorized routing to ProfilePage', async () => {
        renderForTests(
            <AppRouter />,
            {
                route: getRouteProfilePage('1'),
                initialState: {
                    user: {
                        authData: {
                            id: '1',
                        },
                    },
                },
            },
        );

        const page = await screen.findByTestId('ProfilePage');

        expect(page).toBeInTheDocument();
    });

    test('Routing to admin page without Admin role', async () => {
        renderForTests(
            <AppRouter />,
            {
                route: getRouteForbiddenPage(),
                initialState: {
                    user: {
                        authData: {
                            id: '1',
                            roles: [UserRoles.USER],
                        },
                    },
                },
            },
        );

        const page = await screen.findByTestId('ForbiddenPage');

        expect(page).toBeInTheDocument();
    });

    test('Routing to admin page with Admin role', async () => {
        renderForTests(
            <AppRouter />,
            {
                route: getRouteAdminPage(),
                initialState: {
                    user: {
                        authData: {
                            id: '1',
                            roles: [UserRoles.ADMIN],
                        },
                    },
                },
            },
        );

        const page = await screen.findByTestId('AdminPage');

        expect(page).toBeInTheDocument();
    });
});
