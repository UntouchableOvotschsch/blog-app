import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import i18nForTests from '../../i18n/i18nForTests';

export interface RenderForTestsOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export function renderForTests(component: ReactNode, options: RenderForTestsOptions = {}) {
    const {
        route = '/',
        initialState,
        asyncReducers,
    } = options;
    return render(
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider initialState={initialState} asyncReducer={asyncReducers}>
                <I18nextProvider i18n={i18nForTests}>
                    {component}
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>,
    );
}
