import { Story } from '@storybook/react';
import { ThemeProvider } from '@/app/providers/ThemeProvider/testing';
import { Themes } from '@/shared/const/theme';

// eslint-disable-next-line react/display-name
export const ThemeDecorator = (theme: Themes) => (StoryCom: Story) => (
    <ThemeProvider initialTheme={theme}>
        <div className="app">
            <div className="content">
                <StoryCom />
            </div>
        </div>
    </ThemeProvider>
);
