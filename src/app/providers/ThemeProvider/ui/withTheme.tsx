import { ComponentType } from 'react';

import { useJsonSettings } from '@/entities/User';

import ThemeProvider from './ThemeProvider';

const withTheme = (Component: ComponentType) => () => {
    const { theme: themeFromState } = useJsonSettings();
    return (
        <ThemeProvider initialTheme={themeFromState}>
            <Component />
        </ThemeProvider>
    );
};

export default withTheme;
