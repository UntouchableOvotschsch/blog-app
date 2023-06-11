import { Story } from '@storybook/react';
import { ThemeProvider, Themes } from 'app/providers/ThemeProvider';

// eslint-disable-next-line react/display-name
export const ThemeDecorator = (theme: Themes) => (StoryCom: Story) => (
    <ThemeProvider initialTheme={theme}>
        <div className="app">
            <div className="content">
                <div className="wrapper">
                    <StoryCom />
                </div>
            </div>
        </div>
    </ThemeProvider>
);
